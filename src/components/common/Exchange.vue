<template>
  <ul class="p-2 pb-0 sm:rounded-md bg-gray-50 sm:pb-2 dark:bg-gray-700">
    <li v-for="(item, idx) in listResult" :key="idx">
      <dl class="flex justify-between">
        <dt class="font-bold text-gray-900 dark:text-gray-100">{{ item.currSgn._text }} </dt>    
        <dd class="dark:text-gray-100">{{ item.fxrt._text }}</dd>
      </dl>
    </li>
  </ul>
</template>
<script>
  import { reactive, toRefs, onMounted } from 'vue';
  import { useStore } from "vuex";
  import axios from 'axios';
  import convert from 'xml-js' ; 
  const PROXY = window.location.hostname === 'localhost' ? '' : '/proxy';
  const URL = `${PROXY}/ext/rest/trifFxrtInfoQry/retrieveTrifFxrtInfo`;

  export default {
    name : 'Exchange' ,
    components : {
    } , 
    props : {
      currency : {
        type : Array ,
        default : () => ['USD'] , 
      }
    } ,
    setup( props ) {
      const store = useStore();
      const state = reactive({
        exchangeInfo : store.state.exchangeInfo ,
        listResult : [] ,
      }) ;

      onMounted(() => {
        let today = new Date().toJSON().slice(0,10).replaceAll('-','') ; 
        axios.get( `${URL}?crkyCn=${state.exchangeInfo.APIKEY}&qryYymmDd=${today}&imexTp=2`)
        .then(( res ) => {
          let xml = res.data
          ,   json = convert.xml2json(xml, { compact : true } )
          ,   jsonParse = JSON.parse( json )
          ,   result = jsonParse.trifFxrtInfoQryRtnVo.trifFxrtInfoQryRsltVo
          ; 
          state.listResult = result.filter(item=> props.currency.includes(item.currSgn._text) ) ;
        }) ;
      })
      return { 
        ...toRefs(state) ,
      } ;
    }

  }
</script>