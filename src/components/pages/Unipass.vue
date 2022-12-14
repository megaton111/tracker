<template>

  <div class="flex flex-col gap-5 sm:gap-10">
    <top-description>
      통관 과정을 조회할 수 있는 기능입니다. <br />
      운송장 번호를 입력하세요. 년도는 통관 진행 해당년도입니다.
    </top-description>

    <div class="flex flex-col gap-10">
      <div class="flex flex-col sm:flex-row gap-2">

        <div class="flex sm:w-80">
          <t-input type="text" v-model="trackNumber" placeholder="운송장 번호를 입력하세요"></t-input>
        </div>
        <div class="flex sm:w-28">
          <Menu as="div" class="relative inline-block text-left w-full">
            <div>
              <MenuButton class="inline-flex w-full justify-between rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
                {{ selectedYear }}
                <ChevronDownIcon class="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
              </MenuButton>
            </div>
            <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
              <MenuItems class="absolute left-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none w-80">
                <div class="py-1 ">

                  <template v-for="( t, i ) in yearList" :key="i">
                    <MenuItem v-slot="{ active }">
                      <button 
                        type="buton" 
                        :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm w-full text-left']"
                        @click="selectYear( t.name )"
                      >{{ t.name }}</button>
                    </MenuItem>  
                  </template>
                </div>
              </MenuItems>
            </transition>
          </Menu>
        </div>
        <div class="flex sm:flex-0">
          <button 
            type="submit" 
            class="inline-flex w-full sm:w-auto justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            @click="searchHandler"
          >조회</button>
        </div>
      </div>
    </div>

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
											<div class="mt-6">
												<div class="flex flex-col gap-2">
													<div class="" v-if="status">
														현재 상태 : <strong>{{ status }}</strong>
													</div>
													<ul class="flex flex-col gap-2" v-if="progress.length > 0" id="textWrap">
                            <li v-for="(item, idx) in progress" :key="idx">
                              <span class="date">{{ dateFormat( item.prcsDttm._text , '####-##-##' ) }}</span>
                              <span>{{ item.cargTrcnRelaBsopTpcd._text }}</span>
                            </li>
                          </ul>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
									<button 
                    type="button" 
                    class="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm" 
                    @click="copyHandler('#textWrap'); open = false;"
                  >복사</button>
									<button 
                    type="button" 
                    class="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" 
                    @click="open = false" ref="cancelButtonRef"
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
  import { reactive, toRefs, ref } from 'vue';
  import convert from 'xml-js' ; 
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
  import { copyText } from '@/utils';

  const PROXY = window.location.hostname === 'localhost' ? '' : '/proxy';
  const URL = `${PROXY}/ext/rest/cargCsclPrgsInfoQry/retrieveCargCsclPrgsInfo?crkyCn=k280o211a048o132e070b010d0&hblNo`;

  export default {
    name : 'PersonalCustomsCode' ,
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
    setup(){
      const disableTeleport = ref(false);
      const state = reactive({
        trackNumber : '' ,
        year : '2022' ,  
        selectedYear : '2022' , 
        status : null , 
        progress : [] ,
        loading : false ,
        yearList : [{ name : '2021' , value : '2021' }, { name : '2022' , value : '2022' }]
      }) ;

      const open = ref(false) ;

      const searchHandler = () => {
        state.loading = true ,

        axios.get( `${URL}=${state.trackNumber}&blYy=${state.year}` )
        .then(( res ) => {

          let xml = res.data
          ,   json = convert.xml2json(xml, { compact : true } )
          ,   jsonParse = JSON.parse( json )
          ; 
          
          state.status = jsonParse.cargCsclPrgsInfoQryRtnVo.cargCsclPrgsInfoQryVo.csclPrgsStts._text ;
          state.progress = jsonParse.cargCsclPrgsInfoQryRtnVo.cargCsclPrgsInfoDtlQryVo ;
          state.loading = false;
          open.value = true ; 
          state.trackNumber = '' ;
          
        })
        .catch(error =>{
          console.log( 'error :', error ) ; 
          state.status = '조회된 결과가 없습니다' ; 
          state.progress = [] ; 
          state.loading = false;
          open.value = true ; 
          state.trackNumber = '' ;
        }) ;
      } ;

      const dateFormat = (value, pattern) => {
        var i = 0,
          date = value.toString();
        return pattern.replace(/#/g,() => date[i++]);
      } ;

      const selectYear = ( name ) => {
        state.selectedYear = name ; 
      }

      const copyHandler = ( target ) => {
        let copyTarget = document.querySelector( target ) ; 
        copyText( copyTarget )  ;
      } ;

      return { 
        ...toRefs(state) , 
        disableTeleport ,
        searchHandler ,
        dateFormat ,
        selectYear ,
        open ,
        copyHandler
      } ;
    },
  }
</script>