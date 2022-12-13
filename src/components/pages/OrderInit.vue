<template>

  <div class="flex flex-col gap-10">

    <div class="flex flex-1 flex-col gap-6">
      <div class="flex flex-col gap-4">
        <div class="text-base font-bold text-lg">스토어 선택</div>
        <div class="flex flex-col w-80">
          <Menu as="div" class="relative inline-block text-left w-full">
            <div>
              <MenuButton class="inline-flex w-full justify-between rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
                {{ selectedStore.name }}
                <ChevronDownIcon class="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
              </MenuButton>
            </div>
            <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
              <MenuItems class="absolute left-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none w-80">
                <div class="py-1 ">

                  <template v-for="( t, i ) in storeList" :key="i">
                    <MenuItem v-slot="{ active }">
                      <button 
                        type="buton" 
                        :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm w-full text-left']"
                        @click="selectStore( t.name, t.value )"
                      >{{ t.name }}</button>
                    </MenuItem>  
                  </template>
                </div>
              </MenuItems>
            </transition>
          </Menu>
        </div>
      </div>
      <div class="flex flex-col gap-4">
        <div class="text-base font-bold text-lg">엑셀 입력</div>
        <div class="flex flex-col">
          <textarea 
            rows="5" 
            v-model="excelData" 
            class="block w-full border border-solid py-2 px-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm outline-0 outline-none" 
            placeholder="엑셀 전체를 복사해서 넣어주세요."
          />
        </div>
      </div>

      <div class="flex flex-col gap-4" v-if="makeData.length > 0 && errorColumn.length == 0">
        <div class="text-base font-bold text-lg">엑셀 생성 결과</div>
        <div class="flex flex-col gap-2">
          
          <div class="w-full flex-1 h-full">
            <table class="border-collapse table-fixed w-full h-full">
              <tbody>
                <tr v-for="( row, num ) in makeData" :key="num">
                  <td 
                    v-for="( cell, t ) in row" 
                    :key="t"
                    class="text-xs border border-gray-500 border-solid"
                  >
                    <div class="w-full whitespace-nowrap overflow-hidden text-ellipsis">{{ cell }}</div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="">
            <button 
              type="submit" 
              class="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              @click="copy"
            >복사</button>
          </div>
        </div>
      </div>
      
    </div>

    

    <!-- 팝업 -->
    <TransitionRoot as="template" :show="open">
			<Dialog as="div" class="relative z-10" @close="open = false">
				<TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
					<div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
				</TransitionChild>

				<div class="fixed inset-0 z-10 overflow-y-auto">
					<div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
						<TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
							<DialogPanel class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
								<div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-8">
									<div class="sm:flex sm:items-start">
										<div class="mt-3 text-center sm:mt-0 sm:text-left">
											<DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900">조회 결과</DialogTitle>
											<div class="mt-6" id="textWrap">

                        <div class="flex flex-col gap-2" v-if="resultList.length > 0">
													<ul class="flex flex-col gap-4">
														
                            <li class="flex flex-col gap-1" v-for="(item, idx) in resultList" :key="idx">
															<div class="flex flex-row gap-2">
                                <span class="">{{ item.name }}</span>
                                <span class="font-bold" :class="{ 'text-red-600' : item.check!='일치' }">{{ item.check }}</span>
                              </div>
                              <div class="flex flex-row gap-1" v-if="item.check!='일치'">
                                <span class="flex flex-1 p-0.5 px-2 border border-red-600 border-solid rounded items-center text-red-600 text-xs">
                                  <template v-for="(t, i) in item.errMsg" :key="i">
                                    이유 : {{ t }}
                                  </template>
                                </span>
                                <button 
                                  type="submit" 
                                  class="inline-flex h-8 justify-center rounded-md border border-transparent bg-red-500 py-1 px-2 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-red-800 focus:ring-offset-2 whitespace-nowrap"
                                  @click="copyErrorMsgHandler( item.name, item.number, item.tel, item.prod, 'person'+idx )"
                                >안내문구복사</button>
                                <div class="opacity-0 w-0 h-0" :id="'person'+idx">
                                <!-- <div class="opacity-0 invisible w-0 h-0" :id="'person'+idx"> -->
                                  안녕하세요 {{ item.name }} 고객님 :) <br />
                                  <!-- [{{ item.prod }}] 주문하신 쇼핑몰입니다~ <br /> -->
                                  브리크스토어입니다.<br />
                                  다름이 아니라 저희측 현지 배송업체 확인결과 주문하신 '개인통관부호'가 잘못된것으로 판단되어 재확인차 연락드립니다. 아래의 정보 확인부탁드리며, <br/>
                                  개인통관부호는 수취인 이름과 휴대폰번호가 일치해야합니다. 정확한 정보를 답장으로 전달주시면 감사하겠습니다~<br /><br />

                                  - 수취인 : [ {{ item.name }} ]<br />
                                  - 개인통관부호 : [ {{ item.number }} ]<br />
                                  - 휴대폰번호 : [ {{ item.tel }} ]<br />

                                  개인통관부호는 수취인의 이름으로 발급된 [P+12자리 숫자] 번호여야 합니다! 감사합니다!<br />

                                  개인통관부호는 아래의 링크에서 확인 / 발급이 가능하십니다.<br />
                                  https://unipass.customs.go.kr/csp/persIndex.do
                                </div>
                                <!-- <button class="btnNotify" @click="copyErrorMsgHandler( item.name, item.number, item.tel, item.prod, 'person'+idx )">안내문구복사</button> -->
                              </div>
														</li>

													</ul>
												</div>

                        
											</div>
										</div>
									</div>
								</div>
								<div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
									<!-- <button 
                    type="button" 
                    class="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                    @click="copyHandler('#textWrap'); open = false;"
                  >복사</button> -->
									<button 
                    type="button" 
                    class="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" 
                    @click="open = false" 
                  >확인</button>
								</div>
							</DialogPanel>
						</TransitionChild>
					</div>
				</div>
			</Dialog>
		</TransitionRoot>

    <!-- <div class="sectionWrap personalCodeCheck" style="--sectionGap:20px">

      <section class="enter excel">
        <div class="row">
          <div class="col bx">
            <div class="row">
              <h1>스토어 선택</h1>
            </div>
            <div class="row">
              <select name="" id="" v-model="store">
                <option value="naver">스마트스토어</option>
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
      </section>
      
      <section class="result" v-if="resultList.length > 0">
        <div class="row fix" style="">
          <div class="col bx-rd" style="--gap-col:10px; margin-bottom:0;">
            <div class="row"><h1>개인통관번호 일치 여부</h1></div>
            <div class="row">
              <ul class="lstWrap lstPersonal">
                <li v-for="(item, idx) in resultList" :key="idx" class="list-item">
                  <div class="bx-status">
                    <span class="name">{{ item.name }}</span>
                    <span class="txt-result" :class="{ error : item.check!='일치' }">{{ item.check }}</span>
                  </div>
                  <div class="bx-err" v-if="item.check!='일치'">
                    <span class="txt-err">
                      <template v-for="(t, i) in item.errMsg" :key="i">
                        {{ t }}
                      </template>
                    </span>
                    <button v-if="item.check!='일치'" class="btnNotify" @click="showNotifyPopup( item )">안내문구생성</button>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div> 

      </section>

      <section class="result" v-if="makeData.length > 0 && errorColumn.length == 0">

        <div class="row">
          <div class="col bx-rd" style="--gap-col:10px; margin-bottom:0;">
            <div class="row"><h1>엑셀 변환</h1></div>
            <div class="row">
              <div class="col">
                <div class="wrapTable">
                  <table>
                    <tbody>
                      <tr v-for="( row, num ) in makeData" :key="num">
                        <td v-for="( cell, t ) in row" :key="t"><div class="ellipsis">{{ cell }}</div></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div class="btnArea"><button type="button" class="btn" @click="copyHandler('.wrapTable table')">복사</button></div>
              </div>
            </div>
          </div>
        </div>

      </section>

    </div>  -->
    <!-- end of sectionWrap -->

    <teleport to="#teleport-area" :disabled="disableTeleport">
      <loading v-if="loading"/>
    </teleport>
    
    <!-- <loading  v-if="loading" /> -->
    <!-- <teleport to="#teleport-area" :disabled="disableTeleport">
      <div class="popupWrap" v-if="showNotify">
        <div class="popup">
          <div class="top">개인통관고유번호 오류 안내</div>
          <div class="content">
            <div class="textWrap" id="textWrap">
              안녕하세요 {{ person }} 고객님 :) <br />
              [{{pprod}}] 주문하신 쇼핑몰입니다~ <br />
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
              <button type="button" @click="copyHandler('#textWrap')">문구 복사</button>
              <button type="button" @click="closePop">닫기</button>
            </div>
          </div>
        </div>
      </div>
    </teleport> -->
  </div>

</template>

<script>
  import axios from 'axios';
  import { reactive, toRefs, ref, computed, watch } from 'vue';
  import convert from 'xml-js' ; 
  import { copyText } from '@/utils';
  import { 
    Menu, 
    MenuButton, 
    MenuItem, 
    MenuItems, 
		Dialog, 
		DialogPanel, 
		DialogTitle, 
		TransitionChild, 
		TransitionRoot 
  } from '@headlessui/vue' ;
  import { ChevronDownIcon } from '@heroicons/vue/20/solid' ;
	import { ExclamationTriangleIcon } from '@heroicons/vue/24/outline' ;

  const PROXY = window.location.hostname === 'localhost' ? '' : '/proxy';
  const URL = `${PROXY}/ext/rest/persEcmQry/retrievePersEcm`;

  export default {
    name : 'OrderInit' ,
    components : {
      Menu, 
      MenuButton, 
      MenuItem, 
      MenuItems, 
      ChevronDownIcon ,
      Dialog, 
      DialogPanel, 
      DialogTitle, 
      TransitionChild, 
      TransitionRoot 
    } ,
    setup() {
      const disableTeleport = ref(false);
      const state = reactive({
        nameList : '' , 
        numberList : '' , 
        telList : '' , 
        prodList : '', 
        resultList : [] ,
        loading : false ,
        showNotify : false , 
        person : null , 
        pnumber: null , 
        ptel : null , 
        pprod : null ,
        product : '' , 
        name : computed(() => state.nameList == '' ? [] : state.nameList.split('\n').filter(i => i.length !== 0)) ,
        number : computed(() => state.numberList == '' ? [] : state.numberList.split('\n').filter(i => i.length !== 0)) ,
        tel : computed(() => state.telList == '' ? [] : state.telList.split('\n').filter(i => i.length !== 0).map(item=>item.replace(/-/g, ''))) ,
        prod : computed(() => state.prodList == '' ? [] : state.prodList.split('\n').filter(i => i.length !== 0)) ,

        excelData : '' ,
        store : 'naver' ,
        tabItems: [ '개별 입력', '엑셀 입력' ],
        tabIdx : 1 , 

        getColumnNaver : [ '구매자명',	'수취인명', '판매사이트', '상품주문번호',	'구매자ID', '수취인연락처1', '개인통관고유부호' , '결제일', '상품명', '옵션정보', '수량', '판매가격' ] , 
        getColumnTmon : [ '주문자명',	'수취인명', '판매사이트', '주문번호',	'아이디', '수취인연락처', '개인통관고유부호' , '결제완료일', '딜명', '옵션명', '구매수량', '총 주문금액' ] , 
        makeData : [] , 
        errorColumn : [] , 

        storeList : [ 
          { name : '네이버', value : 'NAVER' } ,
          { name : '티몬', value : 'TMON' } ,
        ] ,
        selectedStore : { name : '네이버', value : 'NAVER' } ,
      }) ;

      const open = ref(false) ;

      // 실행 안함
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
        state.loading = true ; 

        let setData = state.excelData.split( '\n' ).map( item => item.split('\t') )
        ,   columnName = setData.shift()
        ,   idxName = null 
        ,   idxNumber = null 
        ,   idxTel = null 
        ,   idxProdName = null 
        ;

        if( setData[setData.length-1] == '' ) { setData.splice(-1,1); }

        if( state.store == 'naver' ) {

          idxName = columnName.indexOf( '수취인명' ) ;
          idxNumber = columnName.indexOf( '개인통관고유부호' ) ;
          idxTel = columnName.indexOf( '수취인연락처1' ) ;
          idxProdName = columnName.indexOf( '상품명' ) ;

        } else {

          idxName = columnName.indexOf( '수취인명' ) ;
          idxNumber = columnName.indexOf( '개인통관고유부호' ) ;
          idxTel = columnName.indexOf( '수취인연락처' ) ;

        }

        for( let i=0; i<setData.length; i++ ) {
          state.name.push( setData[i][idxName] ) ; 
          state.number.push( setData[i][idxNumber] ) ; 
          state.tel.push( setData[i][idxTel].replace(/-/g, '') ) ; 
          state.prod.push( setData[i][idxProdName] ) ; 
          // console.log( 'state.prod : ', state.prod ) ; 
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
            prod : state.prod[0] ,
            check : result == 1 ? '일치' : '불일치' ,
            errMsg : errMsg
          }) ; 

          state.name.shift() ; 
          state.number.shift() ; 
          state.tel.shift() ; 
          state.prod.shift() ; 

          if( state.name.length > 0 ) {
            checkCode() ; 
          } else {
            state.loading = false ; 
            state.nameList = '' ; 
            state.numberList = '' ; 
            state.telList = '' ; 
            state.prodList = '' ; 
            open.value = true ; 
          }
        }) ;
      } ;

      const showNotifyPopup = ( info ) => {
        let { name, number, tel, prod } = info ; 
        state.showNotify = true ; 
        state.person = name ; 
        state.pnumber = number ; 
        state.ptel = tel ; 
        state.pprod = prod ; 
      } ;

      const closePop = () => state.showNotify = false ;

      const copyHandler = ( target ) => {
        let copyTarget = document.querySelector( target ) ; 
        copyText( copyTarget )  ;
      } ;

      const convertNaver = ( data ) => {

        state.makeData = [] ; 
        state.errorColumn = [] ; 
        
        let setData = data.split( '\n' ).map( item => item.split('\t') )
        ,   columnName = setData.shift()
        ,   price1 = columnName.indexOf( '상품별 총 주문금액' )
        ,   price2 = columnName.indexOf( '배송비 합계' )
        ,   price3 = columnName.indexOf( '제주/도서 추가배송비' ) 
        ;

        if( setData[setData.length-1] == '' ) { setData.splice(-1,1); } // 엑셀 파일에서 복사한 자료로 작업 시 마지막 배열은 빈 배열로 들어가 있어서 삭제함

        for( let i=0; i<setData.length; i++ ) {

          let arr = []
          ,   result = null 
          ,   idx = null 
          ; 

          for( let j=0; j<state.getColumnNaver.length; j++ ) {


            idx = columnName.indexOf( state.getColumnNaver[j] ) ;

            if( idx < 0 && !(state.getColumnNaver[j] == '판매가격') && !(state.getColumnNaver[j] == '판매사이트') ) {
              if( state.errorColumn.indexOf( state.getColumnNaver[j] ) >= 0 ) return ; 
              state.errorColumn.push( state.getColumnNaver[j] ) ;
            }

            switch( state.getColumnNaver[j] ) {
              case '판매가격' : 
                result = parseFloat( setData[i][price1].replace(/(₩|,)/g, "") ) + parseFloat( setData[i][price2].replace(/(₩|,)/g, "") )+ parseFloat( setData[i][price3].replace(/(₩|,)/g, "") );
                break ; 
              case '판매사이트' : 
                result = '스마트스토어' ; 
                break ; 
              case '결제일' : 
                result = setData[i][idx].split(' ')[0] ; 
                break ; 
              default : 
                result = setData[i][idx] ; 
            }

            arr.push( result ) ;

          }
          state.makeData.push( arr ) ; 
        }

      }

      const selectStore = ( name, value ) => {
        state.selectedStore.name = name ; 
        state.selectedStore.value = value ; 
      }

      const copy = () => {
        let tableDom = document.querySelector('table');
        let range  =  document.createRange();
        range.selectNodeContents(tableDom)
        let select =  window.getSelection()
        select.removeAllRanges()
        select.addRange(range)
        document.execCommand('copy')
      }

      watch(
        [ () => state.excelData ], () => {
          if( state.excelData !== '' ) { 
            searchExcelHandler() ; 
            convertNaver( state.excelData ) ; 
          }
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
        searchExcelHandler ,
        selectStore ,
        open ,
        copy
      } ;
    } ,
  }
</script>

<style lang="scss" scoped>
</style>