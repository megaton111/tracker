<template>

  <div class="flex flex-col gap-5 sm:gap-6">

    <div class="flex flex-col gap-2 sm:gap-4" v-for="(siteGroup, idx) in sites" :key="idx">
      <div class="text-style-section-head">{{ siteGroup.category }}</div>
      <div class="flex flex-col">
        <ul class="grid w-full grid-cols-3 gap-2 sm:grid-cols-6">
          <li 
            v-for="(t,i) in siteGroup.list" 
            :key="i"
            class="flex h-10 border border-gray-800 border-solid rounded-md dark:border-gray-50"
          >
            <a 
              :href="t.url"
              target="_blank"
              class="flex items-center justify-center w-full h-full text-gray-500 hover:text-gray-900 dark:text-gray-50"
            >{{ t.name }}</a>
          </li>
        </ul>
      </div>
    </div>

  </div>
</template>

<script>
  import axios from 'axios';
  import { reactive, toRefs,   ref } from 'vue';
  import convert from 'xml-js' ; 
  // import { 
  //   Menu, 
  //   MenuButton, 
  //   MenuItem, 
  //   MenuItems, 
  //   Dialog, 
	// 	DialogPanel, 
	// 	DialogTitle, 
	// 	TransitionChild, 
	// 	TransitionRoot 
  // } from '@headlessui/vue';
  // import { ChevronDownIcon } from '@heroicons/vue/20/solid';
  import { copyText } from '@/utils';

  const PROXY = window.location.hostname === 'localhost' ? '' : '/proxy';
  const URL = `${PROXY}/ext/rest/cargCsclPrgsInfoQry/retrieveCargCsclPrgsInfo?crkyCn=k280o211a048o132e070b010d0&hblNo`;

  export default {
    name : 'PersonalCustomsCode' ,
    components : { 
      // Menu, 
      // MenuButton, 
      // MenuItem, 
      // MenuItems,
      // ChevronDownIcon ,
      // Dialog, 
      // DialogPanel, 
      // DialogTitle, 
      // TransitionChild, 
      // TransitionRoot 
     } ,
    setup(){
      const disableTeleport = ref(false);
      const state = reactive({
        sites : [
          { 
            category : '배송대행업체' ,
            list : [
              { name : '킹직구', url : 'https://www.kingjg.com/' } ,
              { name : '타배', url : 'https://www.tabae.co.kr/' } ,
              { name : '직구닷컴', url : 'https://zicgoo.com/' } ,
              { name : '프리차이나', url : 'https://freechina.co.kr/' } ,
            ]
          } ,
          { 
            category : '해외쇼핑몰' ,
            list : [
              { name : '타오바오', url : '' } ,
              { name : '알리익스프레스', url : '' } ,
              { name : '1688', url : '' } ,
              { name : '아마존(미국)', url : '' } ,
              { name : '라파', url : '' } ,
            ]
          } ,
          { 
            category : '업무' ,
            list : [
              { name : 'NY로지스', url : 'http://www.fbnylogis.co.kr/ny-login.html' } ,
              // { name : '타배', url : '' } ,
              // { name : '직구닷컴', url : '' } ,
            ]
          } ,
          { 
            category : '스토어' ,
            list : [
              { name : '스마트스토어', url : 'https://sell.smartstore.naver.com/' } ,
              { name : '쿠팡', url : 'https://wing.coupang.com/' } ,
              { name : '11번가', url : 'https://soffice.11st.co.kr/view/intro' } ,
              { name : '인터파크', url : 'https://sellercenter.interpark.com/' } ,
              { name : '롯데온', url : 'https://store.lotteon.com/cm/main/login_SO.wsp' } ,
              { name : '티몬', url : 'https://spc.tmon.co.kr/member/login?return_url=%2F' } ,
              { name : '위메프', url : 'https://wpartner.wemakeprice.com/login' } ,
              // { name : '타배', url : '' } ,
              // { name : '직구닷컴', url : '' } ,
            ]
          }
        ] ,
      }) ;

      return { 
        ...toRefs(state) , 
        disableTeleport ,
      } ;
    },
  }
</script>