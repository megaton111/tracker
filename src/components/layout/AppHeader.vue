<template>
  <Disclosure as="nav" class="bg-gray-800" v-slot="{ open }">
    <div class="mx-auto max-w-4xl px-2 sm:px-6 lg:px-8 lg:max-w-6xl">
      <div class="relative flex h-16 items-center justify-between">
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <!-- Mobile menu button-->
          <DisclosureButton class="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
            <span class="sr-only">Open main menu</span>
            <Bars3Icon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
            <XMarkIcon v-else class="block h-6 w-6" aria-hidden="true" />
          </DisclosureButton>
        </div>
        <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
          <div class="flex flex-shrink-0 items-center">
            <h1 class="font-bold text-red-400 text-lg"><router-link to="/">{{title}}</router-link></h1>
          </div>
          <div class="hidden sm:ml-6 sm:block">
            <div class="flex space-x-4">
              <router-link v-for="(item,idx) in navigation" :key="idx" :to="item.href" class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium" :aria-current="item.current ? 'page' : undefined">{{ item.name }}</router-link>
              <!-- <a v-for="item in navigation" :key="item.name" :href="item.href" :class="[item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'px-3 py-2 rounded-md text-sm font-medium']" :aria-current="item.current ? 'page' : undefined">{{ item.name }}</a> -->
            </div>
          </div>
        </div>
      </div>
    </div>

    <DisclosurePanel class="sm:hidden">
      <div class="space-y-1 px-2 pt-2 pb-3">
        <DisclosureButton v-for="item in navigation" :key="item.name" as="a" :href="item.href" :class="[item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'block px-3 py-2 rounded-md text-base font-medium']" :aria-current="item.current ? 'page' : undefined">{{ item.name }}</DisclosureButton>
      </div>
    </DisclosurePanel>
  </Disclosure>
  <!-- <header class="header">
    <h1><router-link to="/">{{title}}</router-link></h1>
    <button type="button" class="btn-mobile-menu" @click="toggleMenu">모바일 메뉴 버튼</button>
    <div class="navWrap" :class="{ show : showMenu }">
      <nav><router-link v-for="(menu,idx) in menus" :key="idx" :to="menu.url">{{ menu.title }}</router-link></nav>
      <nav><router-link v-for="(menu,idx) in menus2" :key="idx" :to="menu.url">{{ menu.title }}</router-link></nav>
      <nav class="link_evt">
        <a href="#;" @click="openOrderPage">주문 관련 사이트 열기</a>
      </nav>
    </div>
  </header> -->
  
</template>
<script>
  import { reactive, toRefs } from 'vue';
  import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
  import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/vue/24/outline'

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
          { name: '통합 처리(통관번호+엑셀변환)', href: '/OrderInit', current: true },
          { name: '개인통관고유부호 일치확인', href: '/PersonalCustomsCode', current: false },
          { name: '엑셀 변환', href: '/ExcelConverter', current: false },
          { name: '배송 조회', href: '/Delivery', current: false },
          { name: '통관 조회', href: '/Unipass', current: false },
          { name: '관련사이트', href: '/SiteList', current: false },
        ],
        // menus : [
        //   { url : '/OrderInit', title : '주문 작업(통관번호+엑셀변환)'} , 
        //   { url : '/PersonalCustomsCode', title : '개인통관고유부호 일치확인'} , 
        //   { url : '/ExcelConverter', title : '주문 엑셀 변환' } ,
        //   { url : '/Delivery', title : '배송 조회' } , 
        //   { url : '/Unipass', title : '통관 조회' } ,
        // ] , 
        menus : [
          { url : '/OrderInit', title : '주문 작업(통관번호+엑셀변환)'} , 
          { url : '/PersonalCustomsCode', title : '개인통관고유부호 일치확인'} , 
          { url : '/ExcelConverter', title : '주문 엑셀 변환' } ,
          { url : '/Delivery', title : '배송 조회' } , 
          { url : '/Unipass', title : '통관 조회' } ,
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

      return { 
        ...toRefs(state) ,
        toggleMenu ,
        openOrderPage
      } ;
    }
  }
</script>