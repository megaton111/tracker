<template>
  <Disclosure 
    as="nav" 
    class="bg-white border-b border-gray-500/30 dark:bg-gray-800 dark:border-gray-500" 
    v-slot="{ open }"
  >
    <div class="max-w-4xl px-2 mx-auto sm:px-6 lg:px-8 lg:max-w-6xl">
      <div class="relative flex items-center justify-between h-16 gap-6">
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <!-- Mobile menu button-->
          <DisclosureButton class="inline-flex items-center justify-center p-2 text-gray-400 rounded-md hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
            <span class="sr-only">Open main menu</span>
            <Bars3Icon v-if="!open" class="block w-6 h-6" aria-hidden="true" />
            <XMarkIcon v-else class="block w-6 h-6" aria-hidden="true" />
          </DisclosureButton>
        </div>
        <div class="flex items-center justify-center flex-1 sm:items-stretch sm:gap-10 sm:justify-between">
          <div class="flex items-center flex-shrink-0">
            <h1 class="text-2xl font-bold text-red-500"><router-link to="/">{{title}}</router-link></h1>
            <!-- <h1 class="text-sm font-semibold leading-6 text-slate-700 dark:text-slate-200"><router-link to="/">{{title}}</router-link></h1> -->
          </div>
          <div class="hidden sm:ml-10 sm:block">
            <div class="flex space-x-4">
              <router-link 
                v-for="(item,idx) in navigation" 
                :key="idx" 
                :to="item.href" 
                class="px-2 py-2 text-base font-normal leading-6 text-slate-700 dark:text-gray-50 bg-gray-white whitespace-nowrap" 
                :aria-current="item.current ? 'page' : undefined">{{ item.name }}</router-link>
            </div>
          </div>
        </div>

        <!-- <div class="relative inline-block w-10 align-middle transition duration-200 ease-in select-none">
            <input type="checkbox"
              name="toggle"
              id="toggle"
              class="absolute block w-6 h-6 bg-white border-4 rounded-full appearance-none cursor-pointer toggle-checkbox"
              @change="check($event)"
            />
            <label for="toggle" class="block h-6 overflow-hidden bg-gray-300 rounded-full cursor-pointer toggle-label"></label>
        </div> -->

        <div class="relative flex">
          <button 
            type="button" 
            @click="toggleDarkEvt()"
            class="flex justify-center p-2 text-gray-500 transition duration-150 ease-in-out bg-gray-100 border border-transparent rounded-md lg:bg-white lg:dark:bg-gray-900 dark:text-gray-200 dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-700 focus:outline-none focus:bg-gray-50 dark:focus:bg-gray-700 active:bg-gray-50">
            <svg v-if="modeDark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 transform -rotate-90"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path></svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5"><path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
          </button>
          
        </div>

      </div>
    </div>

    <DisclosurePanel class="sm:hidden">
      <div class="px-2 pt-2 pb-3 space-y-1">
        <DisclosureButton v-for="item in navigation" :key="item.name" as="a" :href="item.href" :class="[item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'block px-3 py-2 rounded-md text-base font-medium']" :aria-current="item.current ? 'page' : undefined">{{ item.name }}</DisclosureButton>
      </div>
    </DisclosurePanel>
  </Disclosure>
  
</template>
<script>
  import { reactive, toRefs, nextTick, onMounted } from 'vue';
  import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue' ;
  import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/vue/24/outline' ;
  import { useDark, useToggle } from '@vueuse/core';

  export default {
    name : 'AppHeader' ,
    components : {
      Disclosure, DisclosureButton, DisclosurePanel, Bars3Icon, XMarkIcon
    } , 
    props : {
      title : {
        type : String ,
        default: 'Site Name'
      }
    } ,
    setup( ) {
      const state = reactive({
        navigation : [
          { name: '통합 처리', href: '/OrderInit', current: true },
          { name: '배송 조회', href: '/Delivery', current: false },
          { name: '통관 조회', href: '/Unipass', current: false },
          { name: '개인통관고유부호 일치확인', href: '/PersonalCustomsCode', current: false },
          { name: '엑셀 변환', href: '/ExcelConverter', current: false },
          { name: '마진계산기', href: '/ProfitCalculator', current: false },
          { name: '관련사이트', href: '/SiteList', current: false },
        ],
        menus : [
          { url : '/OrderInit', title : '주문 작업(통관번호+엑셀변환)'} , 
          { url : '/Delivery', title : '배송 조회' } , 
          { url : '/Unipass', title : '통관 조회' } ,
          { url : '/PersonalCustomsCode', title : '개인통관고유부호 일치확인'} , 
          { url : '/ExcelConverter', title : '주문 엑셀 변환' } ,
        ] , 
        menus2 : [
          { url : '/CalculatePrice', title : '스마트스토어 수수료 계산' } , 
          { url : '/SalePrice', title : '할인율 계산' } , 
          { url : '/OptionPrice', title : '옵션 가격차이 계산' } ,
          // { url : '/KeywordSeller', title : '셀러 키워드' } ,
          // { url : '/SimpleFunction', title : '간편기능' } ,
          // { url : '/ExchangeInfo', title : '환율정보' } ,
        ] , 

        showMenu : false , 
        modeDark : false , 

      }) ;

      const toggleMenu = () => {
        state.showMenu = !state.showMenu ; 
      }

      const openOrderPage = () => {
        // window.open('https://docs.google.com/spreadsheets/u/1/d/1rN_W3I1dtsRLUuC-6g3sbFJ59MOwoDrZ3yHAxWv_-_8/edit?ouid=117064527932252276882&usp=sheets_home&ths=true') ; 
        // window.open('https://docs.google.com/spreadsheets/d/1Kqge_wdLLP60_HqFqoFaHoZsuqOxkH6q0X5EFvlUgko/edit#gid=70014937') ; 
        window.open('https://www.kingjg.com/') ; 
        window.open('https://www.tabae.co.kr/') ; 
        window.open('https://zicgoo.com/') ; 
      }
      const toggleDarkEvt = () => {
        document.documentElement.classList.toggle('dark') ;
        state.modeDark = !state.modeDark ; 
      }

      // const isDark = useDark();
      // const toggleDark = useToggle(isDark);


      // const check = (e) => {
      //   nextTick(() => {
      //     toggleDark() ;
      //     console.log( 'isDark : ', isDark.value ) ; 
      //   })
      // }

      onMounted(() => {
        console.log( 'modeDark : ', state.modeDark ) ; 
      }) ;


      return { 
        ...toRefs(state) ,
        toggleMenu ,
        openOrderPage ,
        // toggleDark ,
        toggleDarkEvt , 
        // check
      } ;
    }
  }
</script>
<style lang="scss" scoped>
.toggle-checkbox:checked {
  right: 0;
  border-color: #555555;
}
.toggle-checkbox:checked + .toggle-label {
  background-color: #696969;
}
 .route-active {
  font-weight: 700 !important ;
 }
</style>