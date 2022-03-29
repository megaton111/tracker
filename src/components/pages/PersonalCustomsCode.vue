<template>

  <div class="description">
    수취인 이름과 개인통관고유번호가 일치한지 확인하는 기능입니다.<br />
    여러 개 입력 시 줄바꿈하여 입력해주세요 (예시참고)
  </div>
  <div class="sectionWrap">

    <section class="enter">

      <div class="row fix" style="--gap:10px">
        <div class="col" style="--gap-col:5px">
          <div class="row fix">
            <h1>수취인</h1>
          </div>
          <div class="row">
              <textarea resize="false" v-model="nameList" placeholder="예) 수취인명을 한줄에 한개씩
홍길동
홍길동
홍길동"></textarea>
          </div>
        </div>
        <div class="col" style="--gap-col:5px">
          <div class="row fix">
            <h1>개인통관고유번호</h1>
          </div>
          <div class="row">
              <textarea resize="false" v-model="numberList" placeholder="예) 한줄에 하나의 정보 입력
123456789
123456789
123456789"></textarea>
          </div>
        </div>
      </div>
      
      <div class="row fix"><button type="button" @click="searchHandler">조회</button></div>
      
    </section>

    <section class="result" v-if="resultList.length > 0">
      <ul class="lstWrap">
        <li v-for="(item, idx) in resultList" :key="idx">
          <span class="name">{{ item.name }}</span>
          <span>{{ item.check }}</span>
          <button v-if="item.check!='일치'" class="btnNotify" @click="showNotifyPopup( item.name, item.number )">안내문구생성</button>
        </li>
      </ul>
    </section>

  </div> <!-- end of sectionWrap -->
  <loading  v-if="loading" />
  
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
  다름이 아니라 저희측 현지 배송업체 확인결과 주문하신 '개인통관부호'가 잘못된것으로 판단되어 재확인차 연락드립니다. 아래의 정보 확인부탁드리며, 정확한 정보를 답장으로 전달주시면 감사하겠습니다~<br /><br />

  - 수취인 : [ {{ person }} ]<br />
  - 개인통관부호 : [ {{ pnumber }} ]<br />

  개인통관부호는 수취인의 이름으로 발급된 [P+12자리 숫자] 번호여야 합니다! 감사합니다!<br />

  개인통관부호는 아래의 링크에서 확인 / 발급이 가능하십니다.<br />
  https://unipass.customs.go.kr/csp/persIndex.do
        </div>
      </div>
      <div class="bottom">
        <div class="btns">
          <button type="button" @click="copyText">문구 복사</button>
          <button type="button" @click="closePop">닫기</button>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import axios from 'axios';
  import convert from 'xml-js' ; 
  import loading from '../common/loading' ; 

  const PROXY = window.location.hostname === 'localhost' ? '' : '/proxy';
  const URL = `${PROXY}/ext/rest/persEcmQry/retrievePersEcm`;

  export default {
    name : 'PersonalCustomsCode' ,
    components : {
      loading
    } ,
    data () {
      return {
        nameList : '' , 
        numberList : '' , 
        resultList : [] ,
        loading : false ,
        showNotify : false , 
        person : null , 
        pnumber: null , 
        product : '' , 
      }
    } , 
    methods : {
      
      searchHandler () {

        if( this.name.length < 1 || this.number.length < 1 || this.name.length !== this.number.length ) {
          alert( '입력한 이름, 번호 수량이 같아야합니다' ) ; 
        } else {
          this.loading = true ; 
          this.resultList = [] ;
          this.checkCode() ; 
        }
      } ,

      checkCode () {
        axios.get( `${URL}?crkyCn=o220p260j056x276q000c050u0&persEcm=${this.number[0]}&pltxNm=${this.name[0]}`)
        .then(( res ) => {
          
          let xml = res.data
          ,   json = convert.xml2json(xml, { compact : true } )
          ,   jsonParse = JSON.parse( json )
          ,   result = jsonParse.persEcmQryRtnVo.tCnt._text 
          ; 

          this.resultList.push({
            name : this.name[0] , 
            number : this.number[0] ,
            check : result == 1 ? '일치' : '불일치'
          }) ; 

          this.name.shift() ; 
          this.number.shift() ; 

          if( this.name.length > 0 ) {
            this.checkCode() ; 
          } else {
            this.loading = false ; 
            this.nameList = '' ; 
            this.numberList = '' ; 
            console.log('검사끝') ; 
          }
        }) ;

      } ,

      showNotifyPopup ( name , num ) {
        console.log( 'showNotify in' ) ; 
        this.showNotify = true ; 
        this.person = name ; 
        this.pnumber = num ; 
      } ,

      closePop () {
        this.showNotify = false ; 
      } ,

      copyText () {
        console.log( 'copy text' ) ; 
        let textWrap = document.querySelector('#textWrap') ; 
        let r = document.createRange();

        r.selectNode(textWrap);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(r);
        document.execCommand('copy');
        window.getSelection().removeAllRanges();
      }
    } ,
    computed : {
      name : {
        get () { return this.nameList == '' ? [] : this.nameList.split('\n').filter(i => i.length !== 0) ;  } ,
        set ( value ) { this.nameList = value ;  }
      } ,
      number : {
        get () { return this.numberList == '' ? [] : this.numberList.split('\n').filter(i => i.length !== 0) ;  } ,
        set ( value ) { this.numberList = value ;  }
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>