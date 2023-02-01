<template>

  <div class="flex flex-col gap-5 sm:gap-10">
    <top-description>
      운송장 번호를 1개만 입력했을 경우에는 진행과정이 모두 보이며,<br />
      운송장 번호를 여러 개 입력했을 경우에는 배송완료일만 노출합니다.<br />
      여러 운송장 번호를 입력 할 경우에는 한줄에 한개의 운송장을 입력해주세요.
    </top-description>

    <div class="flex flex-col gap-5 sm:gap-6">
      <div class="flex flex-col gap-2 sm:gap-4">
        <div class="text-style-section-head">택배사 선택</div>
        <div class="flex flex-col w-80">
          <RadioGroup v-model="selectDeliveryComp" class="">
            <RadioGroupLabel class="sr-only">택배사를 선택하세요.</RadioGroupLabel>
            <div class="grid grid-cols-3 gap-2">
              <RadioGroupOption 
                as="template" 
                v-for="comp in deliveryCompList" 
                :key="comp.name" 
                :value="comp" 
                v-slot="{ active, checked }"
              >
                <div :class="[active ? 'ring-2 ring-indigo-500 dark:ring-red-500' : '', 'bg-white dark:bg-gray-700 dark:border-gray-900 shadow-sm text-gray-900 dark:text-gray-50 cursor-pointer group relative border rounded-md py-3 px-4 flex items-center justify-center text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 ']">
                  <RadioGroupLabel as="span">{{ comp.name }}</RadioGroupLabel>
                  <span 
                    :class="[active ? 'border' : 'border-2', checked ? 'border-indigo-500 dark:border-red-500' : 'border-transparent', 'pointer-events-none absolute -inset-px rounded-md']" 
                    aria-hidden="true" 
                  />
                </div>
              </RadioGroupOption>
            </div>
          </RadioGroup>
        </div>
      </div>
      <div class="flex flex-col gap-2 sm:gap-4">
        <div class="text-style-section-head">운송장 번호 입력</div>
        <div class="flex flex-col">
          <t-textarea @input="trackCheckHandler" v-model="originTrackList" placeholder="예) 운송장번호를 여러개 입력 시 한줄에 한개씩&#10;123123123123123&#10;123123123123123&#10;123123123123123"></t-textarea>
        </div>
      </div>

    </div>


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
												
												<!-- 결과 : 운송장 번호 여러 개 조회 시 -->
												<div class="flex flex-col gap-2" v-if="deliveryResult.length > 0">
													<ul class="flex flex-col gap-2">
														<li v-for="(item, idx) in deliveryResult" :key="idx" class="dark:text-gray-50"> {{ item }} </li>
													</ul>
												</div>

												<!-- 결과 : 운송장 번호 한개 조회 시 -->
												<div class="flex flex-col gap-2" v-else-if="single.status">
													<div v-if="single.status" class="dark:text-gray-50">
														현재 상태 : <strong>{{ single.status }}</strong>
													</div>
													<ul class="flex flex-col gap-2" v-if="single.progress.length > 0">
														<li v-for="(item, idx) in single.progress" :key="idx" class="dark:text-gray-50">
															<span class="date">{{ item.timeString }}</span>
															<span>{{ item.where }}</span>
														</li>
													</ul>
												</div>

												<!-- 결과 : 오류 -->
												<div class="flex flex-col gap-2" v-else-if="alertText">
													<div class="" v-if="alertText">{{ alertText }}</div>
												</div>
												
											</div>
										</div>
									</div>
								</div>
								<div class="px-4 py-3 bg-gray-50 sm:flex sm:flex-row-reverse sm:px-6 dark:bg-gray-900">
									<button 
                    type="button" 
                    class="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                    @click="copyHandler('#textWrap'); open = false;"
                  >복사</button>
									<button 
                    type="button" 
                    class="inline-flex justify-center w-full px-4 py-2 mt-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" @click="open = false" ref="cancelButtonRef"
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
  import { reactive, toRefs, ref, computed, onBeforeMount, onMounted } from 'vue';
  import { useStore } from "vuex";
  import axios from 'axios';
  import { copyText } from '@/utils';

  // import { Listbox, ListboxButton, ListboxLabel, ListboxOption, ListboxOptions } from '@headlessui/vue'
  // import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'

  import { 
    Menu, 
    MenuButton, 
    MenuItem, 
    MenuItems, 
    RadioGroup, 
    RadioGroupLabel, 
    RadioGroupOption ,
		Dialog, 
		DialogPanel, 
		DialogTitle, 
		TransitionChild, 
		TransitionRoot 
  } from '@headlessui/vue' ;
  import { ChevronDownIcon } from '@heroicons/vue/20/solid' ;
	import { ExclamationTriangleIcon } from '@heroicons/vue/24/outline' ;

  export default {
    name : 'delivery' ,
    components : {
      RadioGroup , 
      RadioGroupLabel , 
      RadioGroupOption  ,
			Dialog , 
			DialogPanel , 
			DialogTitle , 
			TransitionChild , 
			TransitionRoot ,
    } ,
    setup () {

      const disableTeleport = ref(false);
      const store = useStore();
      const state = reactive({
        companyCode : '01' ,        // 택배사 코드(기본은 우체국택배)
        companyList : null ,        // 택배사 리스트
        originTrackList : [] ,      // 배송정보 리스트 원본
        trackList : [] ,            // 배송정보 리스트
        result : [] ,               // 결과값
        deliveryResult : [] , 
        alertText : '' ,            // 알림 텍스트
        loading : false ,
        single : {
          status : null , 
          progress : [] ,
        } ,
        trackValue : '' ,
        selectedCompanyName : '우체국택배' ,
        selectedCompanyCode : '01' ,
        deliveryInfo : computed(() => store.state.deliveryInfo ) ,
				compelete : false  ,

        // test
        trackListLength : null ,    // 입력한 운송장 수
        resultListArr : null ,      // 입력한 수만큼 배열을 만들어서 결과값을 넣을 것
      }) ;

			// 택배 API
			const COMPANY_API = 'https://info.sweettracker.co.kr/api/v1/companylist?t_key='+state.deliveryInfo.APIKEY ;  // 택배사 리스트
			const DELIVERY_API = 'https://info.sweettracker.co.kr/api/v1/trackingInfo?t_key='+state.deliveryInfo.APIKEY ;  // 운송장 조회

      // 택배사 리스트 설정
      const deliveryCompList = [
        { name: 'CJ대한통운', code: '04' },
        { name: '우체국택배', code: '01' },
        { name: '한진택배', code: '01' },
      ] ;

      // 선택된 택배사
      const selectDeliveryComp = ref(deliveryCompList[0]) ;

			const open = ref(false) ;

      // 택배사 리스트 가져와서 select value item 형태로 변환 { Name : '', Code : '' } --> { name : '', value : '' }

      const getCompanyData = () => {
        axios.get( COMPANY_API ).then(res=>{
          let arr = res.data.Company ; 
          state.companyList = arr.map( item => {
            return { name : item.Name, value : item.Code }
          }) ; 
          return state.companyList ;
        }) ; 
      }

			// 택배사 선택 : 셀렉트 박스 용
      const selectCompany = ( name, code ) => {
        state.selectedCompanyName = name ; 
        state.selectedCompanyCode = code ; 
      }

      const trackCheckHandler = () => {

				// 변수 초기화
        state.result = [] ; 
        state.deliveryResult = [] ;
        state.single.status = null ;
        state.single.progress = [] ; 

        if( state.companyCode == '' ) {
          state.alertText = '택배사를 선택하세요' ; 
        } else if ( state.originTrackList == '' ) {
          state.alertText = '운송장 번호를 입력하세요' ; 
        } else {
          state.loading = true ; 
          
          // 새로운 배열에 담는다. 기존 textarea에 트랙리스트를 계속 남겨두기 위함 , filter 는 빈값제거하기 위함
          state.trackList = state.originTrackList.split('\n').filter(Boolean) ; 
          if( state.trackList.length > 1 ) {  // 운송장 번호 1개 조회 시에는 과정까지 노출해주기 위해 분리 처리

            state.trackListLength = state.trackList.length ; 
            state.result = Array.from( { length : state.trackList.length }, ( t, i ) => '' ) ;
            
            // 운송장 여러 개 조회
            getDeliveryInfo( state.trackList ).then( res => {
              state.deliveryResult = state.result ; 
              state.alertText = '' ; 
              state.loading = false ; 
              open.value = true ; 
              state.originTrackList = '' ;
              return res.data ; 
            })

          } else {
            checkTrackInfoSingle() ;
          }
        }

      }

      // 운송장 여러 개 조회 시
      const getDeliveryInfo = infos => {
        const result = Promise.all(
          infos.map( (param,idx) => {
            return axios.get( DELIVERY_API+'&t_code='+selectDeliveryComp.value.code+'&t_invoice='+param )
            .then( res  => {
              let data = res.data ; 
              console.log( 'data : ', data ) ; 
              data.complete ? state.result[idx] = data.lastDetail.timeString.split(' ')[0] : data.result == 'Y' ? state.result[idx] = '배송중입니다.' : state.result[idx] = '검색결과가 없습니다. 운송장번호와 택배사를 확인해주세요.' ; 
              return res.data ; 
            }) 
          })
        );
        return result ; 
      }

      // 운송장 1개 조회 시
      const checkTrackInfoSingle = () => {
        axios.get( DELIVERY_API+'&t_code='+selectDeliveryComp.value.code+'&t_invoice='+state.trackList[0] )
        .then(( res ) => {
          state.alertText = '' ; 
          state.loading = false ; 
          state.single.status = res.data.lastDetail.kind ; 
          state.single.progress = res.data.trackingDetails ; 
					open.value = true ; 
          state.originTrackList = '' ;
        })
        .catch( error => {
          state.single.status = '조회된 결과가 없습니다.' ;
					open.value = true ; 
          state.originTrackList = '' ;
        })
      }

      const copyHandler = ( target ) => {
        let copyTarget = document.querySelector( target ) ; 
        copyText( copyTarget )  ;
      } ;

      onBeforeMount(async () => {
        await getCompanyData();
      });

      return { 
        ...toRefs(state) ,  
        disableTeleport ,
        COMPANY_API , 
        DELIVERY_API ,
        selectCompany ,
        deliveryCompList ,
        selectDeliveryComp ,
        trackCheckHandler ,
				open ,
        copyHandler ,
      } ;

    } ,
  }
</script>