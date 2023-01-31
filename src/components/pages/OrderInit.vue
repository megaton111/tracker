<template>

  <div class="flex flex-col w-full gap-5 sm:gap-10">
    <top-description>
    엑셀 변환과 개인통관고유번호 일치 확인을 동시에 진행합니다.
    </top-description>

    <div class="flex flex-col flex-1 gap-5 sm:gap-6">
      <div class="flex flex-col gap-2 sm:gap-4">
        <div class="text-style-section-head">스토어 선택</div>
        <div class="flex flex-col w-full sm:w-80">
          <Menu as="div" class="relative inline-block w-full text-left">
            <div>
              <MenuButton class="inline-flex justify-between w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-700">
                {{ selectedStore.name }}
                <ChevronDownIcon class="w-5 h-5 ml-2 -mr-1" aria-hidden="true" />
              </MenuButton>
            </div>
            <transition enter-active-class="transition duration-100 ease-out" enter-from-class="transform scale-95 opacity-0" enter-to-class="transform scale-100 opacity-100" leave-active-class="transition duration-75 ease-in" leave-from-class="transform scale-100 opacity-100" leave-to-class="transform scale-95 opacity-0">
              <MenuItems class="absolute left-0 z-10 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none w-80">
                <div class="py-1">

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
      <div class="flex flex-col gap-2 sm:gap-4">
        <div class="text-style-section-head">엑셀 입력</div>
        <div class="flex flex-col">
          <t-textarea v-model="excelData" placeholder="엑셀 전체를 복사해서 넣어주세요."></t-textarea>
        </div>
      </div>

      <div class="flex flex-col gap-4" v-if="makeData.length > 0 && errorColumn.length == 0">
        <div class="text-style-section-head">엑셀 생성 결과</div>
        <div class="flex flex-col gap-4">
          
          <div class="flex-1 w-full h-full">
            <table class="w-full h-full border-collapse table-fixed">
              <tbody>
                <tr v-for="( row, num ) in makeData" :key="num">
                  <td 
                    v-for="( cell, t ) in row" 
                    :key="t"
                    class="text-xs border border-gray-500 border-solid dark:border-gray-50 dark:text-gray-50"
                  >
                    <div class="w-full overflow-hidden whitespace-nowrap text-ellipsis">{{ cell }}</div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="">
            <button 
              type="submit" 
              class="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
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
					<div class="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" />
				</TransitionChild>

				<div class="fixed inset-0 z-10 overflow-y-auto">
					<div class="flex items-end justify-center min-h-full p-4 text-center sm:items-center sm:p-0">
						<TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
							<DialogPanel class="relative overflow-hidden text-left transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:w-full sm:max-w-lg">
								<div class="px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-8 dark:bg-gray-800">
									<div class="sm:flex sm:items-start">
										<div class="mt-3 text-center sm:mt-0 sm:text-left">
											<DialogTitle as="h3" class="text-style-section-head">조회 결과</DialogTitle>
											<div class="mt-6" id="textWrap">

                        <div class="flex flex-col gap-2" v-if="resultList.length > 0">
													<ul class="flex flex-col gap-4">
														
                            <li class="flex flex-col gap-1" v-for="(item, idx) in resultList" :key="idx">
															<div class="flex flex-row gap-2">
                                <span class="dark:text-gray-50">{{ item.name }}</span>
                                <span class="font-bold dark:text-red-400" :class="{ 'text-red-600' : item.check!='일치' }">{{ item.check }}</span>
                              </div>
                              <div class="flex flex-row gap-1" v-if="item.check!='일치'">
                                <span class="flex flex-1 p-0.5 px-2 border border-red-600 dark:border-red-400 border-solid rounded items-center text-red-600 text-xs dark:text-red-400">
                                  <template v-for="(t, i) in item.errMsg" :key="i">
                                    이유 : {{ t }}
                                  </template>
                                </span>
                                <button 
                                  type="submit" 
                                  class="inline-flex justify-center h-8 px-2 py-1 text-sm font-medium text-white bg-red-500 border border-transparent rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-800 focus:ring-offset-2 whitespace-nowrap"
                                  @click="copyErrorMsgHandler( item.name, item.number, item.tel, item.prod, 'person'+idx )"
                                >안내문구복사</button>
                                <div class="w-0 h-0 opacity-0" :id="'person'+idx">
                                <!-- <div class="invisible w-0 h-0 opacity-0" :id="'person'+idx"> -->
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
								<div class="px-4 py-3 bg-gray-50 sm:flex sm:flex-row-reverse sm:px-6 dark:bg-gray-900">
									<!-- <button 
                    type="button" 
                    class="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                    @click="copyHandler('#textWrap'); open = false;"
                  >복사</button> -->
									<button 
                    type="button" 
                    class="inline-flex justify-center w-full px-4 py-2 mt-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" 
                    @click="open = false" 
                  >확인</button>
								</div>
							</DialogPanel>
						</TransitionChild>
					</div>
				</div>
			</Dialog>
		</TransitionRoot>

    <teleport to="#teleport-area" :disabled="disableTeleport">
      <loading v-if="loading"/>
    </teleport>
    
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
        resultListArr : [] ,
      }) ;

      const open = ref(false) ;

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

        state.resultListArr = Array.from( { length : setData.length }, ( t, i ) => '' ) ;

        checkPersonalCode( state.name ).then( res => {
          state.resultList = state.resultListArr ; 
          state.loading = false ; 
          state.nameList = '' ; 
          state.numberList = '' ; 
          state.telList = '' ; 
          state.prodList = '' ; 
          state.excelData = '' ; 
          open.value = true ; 
          return res.data ; 
        }) ; 

        // checkCode() ; 

      }

      const checkPersonalCode = infos => {
        const result = Promise.all(
          infos.map( (param,idx) => {
            return axios.get( `${URL}?crkyCn=o220p260j056x276q000c050u0&persEcm=${state.number[idx]}&pltxNm=${state.name[idx]}&cralTelno=${state.tel[idx]}` )
            .then( res  => {
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

              state.resultListArr[idx] = {
                name : state.name[idx] , 
                number : state.number[idx] ,
                tel : state.tel[idx] ,
                prod : state.prod[idx] ,
                check : result == 1 ? '일치' : '불일치' ,
                errMsg : errMsg
              }

              return state.resultListArr ; 

            }) 
          })
        );
        return result ; 
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
        state.excelData = '' ;
      }

      const copyErrorMsgHandler = ( name , num, tel, prod, target ) => {
        let textWrap = document.getElementById( target ) ; 
        copyText( textWrap )  ;
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
        checkCode ,
        showNotifyPopup ,
        closePop ,
        copyHandler ,
        searchExcelHandler ,
        selectStore ,
        open ,
        copy ,
        copyErrorMsgHandler ,
        checkPersonalCode
      } ;
    } ,
  }
</script>

<style lang="scss" scoped>
</style>