<template>
  <ul class="sm:rounded-md flex flex-col gap-2">
    <li v-for="(item, idx) in sites" :key="idx">
      <a 
        :href="item.url" 
        target="_blank"
        class="flex h-10 rounded-md items-center px-4 border border-gray-300 border-solid"
      >{{ item.name }}</a>
    </li>
  </ul>
</template>

<script>
  import { reactive, toRefs } from 'vue';
  import axios from 'axios';
  import convert from 'xml-js' ; 

  const PROXY = window.location.hostname === 'localhost' ? '' : '/proxy';
  const URL = `${PROXY}/ext/rest/trifFxrtInfoQry/retrieveTrifFxrtInfo`;
  const APIKEY = 'h230q242y019c270i090x040r0' ;

  export default {
    name : 'Exchange' ,
    components : {
    } , 
    props : {
      sites : {
        type : Array ,
        default : () => [] , 
      } ,
      currency : {
        type : Array ,
        default : () => ['USD'] , 
      }
    } ,
    setup( props ) {
      const state = reactive({
        listResult : [] ,
      }) ;

      return { 
        ...toRefs(state) ,
      } ;
    }

  }
    // https://www.koreaexim.go.kr/site/program/financial/exchangeJSON?authkey=bcekO8Poam4eb0qR0W0fxD2wDS6k8SbG&searchdate=20180102&data=AP01
</script>

<style lang="scss" scoped>
  // ul {
  //   display: flex;
  //   flex-direction: column ;
  //   gap: 5px ;
  //   padding:10px ; 
  //   background-color: #f8f8f8 ;
  //   border-radius: 5px ;
  //   li {
  //     list-style: none ;
  //     font-size:12px ; 
  //     dl {
  //       display: flex;
  //       dd {
  //         margin-left: auto ;
  //         font-weight: 700 ;
  //       }
  //     }
  //   }
  // }
</style>