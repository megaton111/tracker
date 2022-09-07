<template>
  <ul>
    <li v-for="(item, idx) in listResult" :key="idx">
      <dl>
        <dt>{{ item.cur_unit }} </dt>    
        <dd>{{ item.tts }}</dd>
      </dl>
    </li>
  </ul>
</template>

<script>
  import { reactive, toRefs } from 'vue';
  import axios from 'axios';

  let setDate = new Date()
  ,   year = setDate.getFullYear()
  ,   month = setDate.getMonth() + 1
  ,   today = setDate.getDate() 
  ; 

  function leftZero( target ){
    return target < 10 ? '0'+target : target ;
  }

  const DATE = [ year, leftZero( month ) , leftZero( today ) ].join('') ; 
  const EXCHANGE_API = `/site/program/financial/exchangeJSON?authkey=bcekO8Poam4eb0qR0W0fxD2wDS6k8SbG&searchdate=${DATE}&data=AP01` ; 
  // ["AED","AUD","BHD","BND","CAD","CHF","CNH","DKK","EUR","GBP","HKD","IDR(100)","JPY(100)","KRW","KWD","MYR","NOK","NZD","SAR","SEK","SGD","THB","USD"]
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
      const state = reactive({
        listResult : [] ,
      }) ;

      
      console.log({EXCHANGE_API})

      axios.get( EXCHANGE_API ).then(res=>{
        let dataList = res.data ; 
        state.listResult = dataList.filter( item => props.currency.includes(item.cur_unit) ) ; 
        // console.log( 'listResult :', state.listResult ) ; 
      }) ; 

      return { 
        ...toRefs(state) ,
      } ;
    }

  }
    // https://www.koreaexim.go.kr/site/program/financial/exchangeJSON?authkey=bcekO8Poam4eb0qR0W0fxD2wDS6k8SbG&searchdate=20180102&data=AP01
</script>

<style lang="scss" scoped>
  ul {
    display: flex;
    flex-direction: column ;
    gap: 5px ;
    padding:10px ; 
    background-color: #f8f8f8 ;
    border-radius: 5px ;
    li {
      list-style: none ;
      font-size:12px ; 
      dl {
        display: flex;
        dd {
          margin-left: auto ;
          font-weight: 700 ;
        }
      }
    }
  }
</style>