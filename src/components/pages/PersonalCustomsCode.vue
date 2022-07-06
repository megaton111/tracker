<template>

  <top-description>
    수취인 이름과 개인통관고유번호가 일치한지 확인하는 기능입니다.<br />
  </top-description>

  <div class="sectionWrap personalCodeCheck" style="--sectionGap:20px">

    <t-tab :items="tabItems" v-model="tabIdx"></t-tab>

    <section class="enter" v-if="!tabIdx">

      <div class="row fix" style="--gap:10px">
        <div class="col" style="--gap-col:5px">
          <div class="row fix">
            <h1>수취인</h1>
          </div>
          <div class="row">
            <t-textarea v-model="nameList" placeholder="예) 수취인명을 한줄에 한개씩&#10;홍길동&#10;홍길동&#10;홍길동"></t-textarea>
          </div>
        </div>
        <div class="col" style="--gap-col:5px">
          <div class="row fix">
            <h1>개인통관고유번호</h1>
          </div>
          <div class="row">
            <t-textarea v-model="numberList" placeholder="예) 한줄에 하나의 정보 입력&#10;123456789&#10;123456789&#10;123456789"></t-textarea>
          </div>
        </div>
        <div class="col" style="--gap-col:5px">
          <div class="row fix">
            <h1>수취인 전화번호</h1>
          </div>
          <div class="row">
            <t-textarea v-model="telList" placeholder="예) 한줄에 하나의 정보 입력&#10;010-1234-1234&#10;010-1234-1234&#10;010-1234-1234"></t-textarea>
          </div>
        </div>
      </div>
      
      <div class="row fix"><button type="button" @click="searchHandler">조회</button></div>
      
    </section>

    <section class="enter excel" v-else>

      <div class="row">
        <div class="col bx">
          <div class="row">
            <h1>스토어 선택</h1>
          </div>
          <div class="row">
            <select name="" id="" v-model="store">
              <option value="naver">스마트스토어</option>
              <option value="tmon">티몬</option>
            </select>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col bx">
          <div class="row">
            <h1>엑셀 입력</h1>
          </div>
          <div class="row">
            <t-textarea v-model="excelData" placeholder="엑셀 전체를 복사해서 넣어주세요."></t-textarea>
          </div>
        </div>
      </div>


      <!-- <div class="row fix"><button type="button" @click="searchExcelHandler">조회</button></div> -->
      
    </section>

    <section class="result" v-if="resultList.length > 0">

      <div class="row fix" style="">
        <div class="col bx-rd" style="--gap-col:10px;">
          <ul class="lstWrap lstPersonal">
            <li v-for="(item, idx) in resultList" :key="idx">
              <div class="bx-status">
                <span class="name">{{ item.name }}</span>
                <span class="txt-result" :class="{ error : item.check!='일치' }">{{ item.check }}</span>
                <!-- <span class="txt-err" v-if="item.check!='일치'">{{ item.errMsg }}</span> -->
              </div>
              <div class="bx-err" v-if="item.check!='일치'">
                <span class="txt-err">
                  <template v-for="(t, i) in item.errMsg" :key="i">
                    {{ t }}
                  </template>
                </span>
                <button v-if="item.check!='일치'" class="btnNotify" @click="showNotifyPopup( item.name, item.number, item.tel )">안내문구생성</button>
              </div>
            </li>
          </ul>
        </div>
      </div>

    </section>

  </div> <!-- end of sectionWrap -->

  <teleport to="#teleport-area" :disabled="disableTeleport">
    <loading v-if="loading"/>
  </teleport>
  
  <!-- <loading  v-if="loading" /> -->
  <teleport to="#teleport-area" :disabled="disableTeleport">
    <div class="popupWrap" v-if="showNotify">
      <div class="popup">
        <div class="top">개인통관고유번호 오류 안내</div>
        <div class="content">
          <div class="input">
            <div class="item">
              <span>구매한 상품명</span><input type="text" v-model="product">
            </div>
          </div>
          <div class="textWrap" id="textWrap">
            안녕하세요 {{ person }} 고객님 :) <br />
            [{{product}}] 주문하신 쇼핑몰입니다~ <br />
            다름이 아니라 저희측 현지 배송업체 확인결과 주문하신 '개인통관부호'가 잘못된것으로 판단되어 재확인차 연락드립니다. 아래의 정보 확인부탁드리며, <br/>
            개인통관부호는 수취인 이름과 휴대폰번호가 일치해야합니다. 정확한 정보를 답장으로 전달주시면 감사하겠습니다~<br /><br />

            - 수취인 : [ {{ person }} ]<br />
            - 개인통관부호 : [ {{ pnumber }} ]<br />
            - 휴대폰번호 : [ {{ ptel }} ]<br />

            개인통관부호는 수취인의 이름으로 발급된 [P+12자리 숫자] 번호여야 합니다! 감사합니다!<br />

            개인통관부호는 아래의 링크에서 확인 / 발급이 가능하십니다.<br />
            https://unipass.customs.go.kr/csp/persIndex.do
          </div>
        </div>
        <div class="bottom">
          <div class="btns">
            <button type="button" @click="copyHandler">문구 복사</button>
            <button type="button" @click="closePop">닫기</button>
          </div>
        </div>
      </div>
    </div>
  </teleport>

</template>

<script>
  import axios from 'axios';
  import { reactive, toRefs, ref, computed, watch } from 'vue';
  import convert from 'xml-js' ; 
  import { copyText } from '@/utils';

  const PROXY = window.location.hostname === 'localhost' ? '' : '/proxy';
  const URL = `${PROXY}/ext/rest/persEcmQry/retrievePersEcm`;

  export default {
    name : 'PersonalCustomsCode' ,
    setup() {
      const disableTeleport = ref(false);
      const state = reactive({
        nameList : '' , 
        numberList : '' , 
        telList : '' , 
        resultList : [] ,
        loading : false ,
        showNotify : false , 
        person : null , 
        pnumber: null , 
        ptel : null , 
        product : '' , 
        name : computed(() => state.nameList == '' ? [] : state.nameList.split('\n').filter(i => i.length !== 0)) ,
        number : computed(() => state.numberList == '' ? [] : state.numberList.split('\n').filter(i => i.length !== 0)) ,
        tel : computed(() => state.telList == '' ? [] : state.telList.split('\n').filter(i => i.length !== 0).map(item=>item.replace(/-/g, ''))) ,

        excelData : '' ,
        store : 'naver' ,
        tabItems: [ '개별 입력', '엑셀 입력' ],
        tabIdx : 0 , 
      }) ;

      const searchHandler = () => {

        state.resultList = [] ; 

        if( state.name.length == state.number.length && state.name.length == state.tel.length ) {
          state.loading = true ; 
          state.resultList = [] ;
          checkCode() ; 
        } else {
          alert( '입력한 이름, 번호 수량이 같아야합니다' ) ; 
        }

      } ;

      const searchExcelHandler = () => {

        state.resultList = [] ; 

        let setData = state.excelData.split( '\n' ).map( item => item.split('\t') )
        ,   columnName = setData.shift()
        ,   idxName = null 
        ,   idxNumber = null 
        ,   idxTel = null 
        ;

        if( setData[setData.length-1] == '' ) { setData.splice(-1,1); }

        if( state.store == 'naver' ) {

          idxName = columnName.indexOf( '수취인명' ) ;
          idxNumber = columnName.indexOf( '개인통관고유부호' ) ;
          idxTel = columnName.indexOf( '수취인연락처1' ) ;

        } else {

          idxName = columnName.indexOf( '수취인명' ) ;
          idxNumber = columnName.indexOf( '개인통관고유부호' ) ;
          idxTel = columnName.indexOf( '수취인연락처' ) ;

        }

        for( let i=0; i<setData.length; i++ ) {
          state.name.push( setData[i][idxName] ) ; 
          state.number.push( setData[i][idxNumber] ) ; 
          state.tel.push( setData[i][idxTel].replace(/-/g, '') ) ; 
        }

        checkCode() ; 

      }

      const checkCode = () => {
        axios.get( `${URL}?crkyCn=o220p260j056x276q000c050u0&persEcm=${state.number[0]}&pltxNm=${state.name[0]}&cralTelno=${state.tel[0]}`)
        .then(( res ) => {
          
          let xml = res.data
          ,   json = convert.xml2json(xml, { compact : true } )
          ,   jsonParse = JSON.parse( json )
          ,   result = jsonParse.persEcmQryRtnVo.tCnt._text 
          ,   errMsg = [] 
          ; 

          // 에러 메세지 처리 
          if( result == 0 ) {
            if ( Array.isArray( jsonParse.persEcmQryRtnVo.persEcmQryRtnErrInfoVo ) ) {
              // 문제가 2개 이상일 경우
              // errMsg = '통관번호, 전화번호 모두 불일치' ;
              errMsg = jsonParse.persEcmQryRtnVo.persEcmQryRtnErrInfoVo.map(t => t.errMsgCn._text) ;
            } else {
              // 문제가 1개 일 경우
              errMsg.push(jsonParse.persEcmQryRtnVo.persEcmQryRtnErrInfoVo.errMsgCn._text );
            }
          }


          state.resultList.push({
            name : state.name[0] , 
            number : state.number[0] ,
            tel : state.tel[0] ,
            check : result == 1 ? '일치' : '불일치' ,
            errMsg : errMsg
          }) ; 

          state.name.shift() ; 
          state.number.shift() ; 
          state.tel.shift() ; 

          if( state.name.length > 0 ) {
            checkCode() ; 
          } else {
            state.loading = false ; 
            state.nameList = '' ; 
            state.numberList = '' ; 
            state.telList = '' ; 
          }
        }) ;

      } ;

      const showNotifyPopup = ( name , num, tel ) => {
        state.showNotify = true ; 
        state.person = name ; 
        state.pnumber = num ; 
        state.ptel = tel ; 
      } ;

      const closePop = () => {
        state.showNotify = false ; 
      } ;

      const copyHandler = () => {
        let textWrap = document.querySelector('#textWrap') ; 
        copyText( textWrap )  ;
      } ;


      watch(
        [ () => state.excelData ], () => {
          if( state.excelData !== '' ) { searchExcelHandler() ; }
        },
      );

      return { 
        ...toRefs(state) , 
        disableTeleport ,
        searchHandler ,
        checkCode ,
        showNotifyPopup ,
        closePop ,
        copyHandler ,
        searchExcelHandler
      } ;
    } ,
  }
</script>