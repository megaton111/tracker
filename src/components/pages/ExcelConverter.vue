<template>
  
  <div class="flex flex-col gap-5 sm:gap-10">
    <top-description>
    마켓 주문 엑셀에서 우리 주문리스트 양식에 맞게 가져오기
    </top-description>


    <div class="flex flex-col gap-5 sm:gap-6">
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
              <MenuItems class="absolute left-0 z-10 w-56 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none w-80">
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

      <div class="flex flex-col gap-2 sm:gap-4">
        <div class="text-style-section-head">가져올 컬럼 설정</div>
        <div class="flex flex-grow gap-2">
          <div class="flex flex-1">
            <t-input type="text" v-model="setColValue" placeholder="쉼표로 구분하여 입력해주세요."></t-input>
          </div>
          <div class="flex">
            <button 
              type="submit" 
              class="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-gray-500 dark:border-gray-900 dark:text-gray-50"
              @click="setColumn"
            >설정</button>
          </div>
        </div>
      </div>
      
      <div class="flex flex-col gap-2 sm:gap-4">
        <div class="text-style-section-head">설정된 컬럼</div>
        <div class="flex flex-col gap-2" v-show="errorColumn.length > 0">
          <div v-for="( e, i ) in errorColumn" :key="i">[{{ e }}]</div> <strong>컬럼정보가없습니다.</strong>
        </div>
        <div class="flex flex-col gap-2">
          <ul class="flex flex-wrap gap-1" v-if="selectedStore.value == 'NAVER'">
            <li 
              v-for="( column , idx ) in getColumnNaver" :key="idx"
              class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-gray-500 dark:border-gray-900 dark:text-gray-50"
            >{{ column }}</li>
          </ul>
          <ul class="flex flex-wrap gap-1" v-else>
            <li 
              v-for="( column , idx ) in getColumnTmon" :key="idx"
              class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-gray-500 dark:border-gray-900 dark:text-gray-50"
            >{{ column }}</li>
          </ul>
        </div>
      </div>

      <div class="flex flex-col gap-2 sm:gap-4">
        <div class="text-style-section-head">엑셀 원본 입력</div>
        <div class="flex flex-col gap-2">
          <t-textarea v-model="excelData" placeholder="엑셀 원본 내용을 복사해서 붙여넣으세요"></t-textarea>
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
							<DialogPanel class="relative overflow-hidden text-left transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:w-full sm:max-w-4xl">
								<div class="px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-8">
									<div class="sm:flex sm:items-start">
										<div class="mt-3 text-center sm:mt-0 sm:text-left">
											<DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900">조회 결과</DialogTitle>
											<div class="mt-6" id="textWrap">
                        <div class="flex flex-col gap-4" v-if="makeData.length > 0 && errorColumn.length == 0">
                          <div class="text-base text-lg font-bold">생성 데이터</div>
                          <div class="flex flex-col gap-2">
                            
                            <div class="flex-1 w-full h-full">
                              <table class="w-full h-full border-collapse table-fixed">
                                <tbody>
                                  <tr v-for="( row, num ) in makeData" :key="num">
                                    <td 
                                      v-for="( cell, t ) in row" 
                                      :key="t"
                                      class="text-xs border border-gray-500 border-solid"
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
										</div>
									</div>
								</div>
								<div class="px-4 py-3 bg-gray-50 sm:flex sm:flex-row-reverse sm:px-6">
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
  </div>
</template>

<script>
  import { reactive, toRefs, watch, ref } from 'vue';
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
  } from '@headlessui/vue';
  import { ChevronDownIcon } from '@heroicons/vue/20/solid';

  export default {
    name : 'ExcelConverter' ,
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
    setup () {

      const state = reactive({
        excelData : '' ,
        getColumnNaver : [ '구매자명',	'수취인명', '판매사이트', '상품주문번호',	'구매자ID', '수취인연락처1', '개인통관고유부호' , '결제일', '상품명', '옵션정보', '수량', '판매가격' ] , 
        getColumnTmon : [ '주문자명',	'수취인명', '판매사이트', '주문번호',	'아이디', '수취인연락처', '개인통관고유부호' , '결제완료일', '딜명', '옵션명', '구매수량', '총 주문금액' ] , 
        makeData : [] , 
        setColValue : '' , 
        errorColumn : [] , 
        store : 'naver' ,
        storeList : [ 
          { name : '네이버', value : 'NAVER' } ,
          { name : '티몬', value : 'TMON' } ,
        ] ,
        selectedStore : { name : '네이버', value : 'NAVER' } ,
        // selectedStoreValue : 'NAVER' ,
      }) ;

      const open = ref(false) ;
      

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
          open.value = true ; 
        }

      }

      const convertTmon = ( data ) => {

        state.makeData = [] ; 
        state.errorColumn = [] ; 
        
        let setData = data.split( '\n' ).map( item => item.split('\t') )
        ,   columnName = setData.shift()
        ;

        if( setData[setData.length-1] == '' ) { setData.splice(-1,1); } // 엑셀 파일에서 복사한 자료로 작업 시 마지막 배열은 빈 배열로 들어가 있어서 삭제함

        for( let i=0; i<setData.length; i++ ) {

          let arr = []
          ,   result = null 
          ,   idx = null 
          ; 

          for( let j=0; j<state.getColumnTmon.length; j++ ) {


            idx = columnName.indexOf( state.getColumnTmon[j] ) ;

            if( idx < 0 && !(state.getColumnTmon[j] == '판매가격') && !(state.getColumnTmon[j] == '판매사이트') ) {
              if( state.errorColumn.indexOf( state.getColumnTmon[j] ) >= 0 ) return ; 
              state.errorColumn.push( state.getColumnTmon[j] ) ;
            }

            switch( state.getColumnTmon[j] ) {
              case '판매사이트' : 
                result = '티몬' ; 
                break ; 
              case '결제완료일' : 
                result = setData[i][idx].split(' ')[0] ; 
                break ; 
              case '옵션명' : 
                result = setData[i][idx].split('|')[1] ; 
                break ; 
              default : 
                result = setData[i][idx] ; 
            }

            arr.push( result ) ;

          }
          state.makeData.push( arr ) ; 
          open.value = true ; 
        }

      }

      const setColumn = () => {
        let column = state.setColValue ; 
        if( state.store == 'naver' ) {
          state.getColumnNaver = column.split(',').map(item=>item.trim()) ; 
        } else {
          state.getColumnTmon = column.split(',').map(item=>item.trim()) ; 
        }
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

      const selectStore = ( name, value ) => {
        state.selectedStore.name = name ; 
        state.selectedStore.value = value ; 
      }

      watch(
        () => state.excelData,
        (excelData) => {
          if( state.store == 'naver' ) {
            convertNaver( excelData ) ; 
          } else {
            convertTmon( excelData ) ; 
          }
        }
      )

      return { 
        ...toRefs(state) ,
        setColumn , 
        copy ,
        selectStore ,
        open
      } ;
    } ,

  }
</script>
<style lang="scss">
</style>