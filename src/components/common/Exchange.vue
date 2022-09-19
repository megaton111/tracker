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

  // let setDate = new Date()
  // ,   year = setDate.getFullYear()
  // ,   month = setDate.getMonth() + 1
  // ,   today = setDate.getDate() 
  // ; 

  // function leftZero( target ){
  //   return target < 10 ? '0'+target : target ;
  // }

  // const DATE = [ year, leftZero( month ) , leftZero( today ) ].join('') ; 
  // const PROXY = window.location.hostname === 'localhost' ? '' : '/proxy';
  // const EXCHANGE_API = `${PROXY}/site/program/financial/exchangeJSON?authkey=bcekO8Poam4eb0qR0W0fxD2wDS6k8SbG&searchdate=${DATE}&data=AP01` ; 
  const headers = {
    'Content-Type' : 'application/json',
    'Accept' : 'application/json'
  };

  // const EXCHANGE_API = `/site/program/financial/exchangeJSON?authkey=bcekO8Poam4eb0qR0W0fxD2wDS6k8SbG&searchdate=${DATE}&data=AP01` ; 
  // ["AED","AUD","BHD","BND","CAD","CHF","CNH","DKK","EUR","GBP","HKD","IDR(100)","JPY(100)","KRW","KWD","MYR","NOK","NZD","SAR","SEK","SGD","THB","USD"]
  // const EXCHANGE_API = 'http://fx.kebhana.com/FER1101M.web' ; 

    const PROXY = window.location.hostname === 'localhost' ? '' : '/proxy';
    const URL = `${PROXY}/FER1101M.web`;

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
    setup(  ) {
      const state = reactive({
        listResult : [] ,
        baseUrl: process.env.VUE_APP_BASE_URL ,
        getStr : null , 
      }) ;

      const leftZero = ( target ) => {
        return target < 10 ? '0'+target : target ;
      }

      const setDay = () => {
        console.log( 'setDay in' ) ; 
        let setDate = new Date()
        ,   year = setDate.getFullYear()
        ,   month = setDate.getMonth() + 1
        ,   today = setDate.getDate() 
        ; 

        return [ year, leftZero( month ) , leftZero( today ) ].join('') ; 
      }

      const getCurrency = () => {

        // let today = setDay() ; 
        // let exc_api = `/site/program/financial/exchangeJSON?authkey=bcekO8Poam4eb0qR0W0fxD2wDS6k8SbG&searchdate=${today}&data=AP01` ; 
        // let exc_api2 = `/FER1101M.web` ; 
        
        axios.get( URL, headers ).then(res=>{
          
          let dataList = res.data ; 
          let stringData = dataList.replace(/\n|\r|\s*/g, "") ; 
          let startNum = stringData.indexOf('[') ; 
          let lastNum = stringData.indexOf(']') ; 
          let cutStr = stringData.substring(startNum,lastNum-1) + ']' ; 
          // let result = JSON.parse( cutStr ) ;
          console.log( 'stringData ========> ', stringData ) ; 
          console.log( 'cutStr ========>', cutStr ) ; 
          // console.log( '========>', result[0] ) ; 

        }) ; 
        
      }

      // let b = '[ 1, 2, 3, 4, ]' ; 
      // console.log( 'b :', b ) ;
      // console.log( 'b.length :', b.length ) ;
      // console.log( JSON.parse( b ) ) ; 





      getCurrency() ; 
      // console.log({EXCHANGE_API})

      return { 
        ...toRefs(state) ,
        getCurrency ,
        setDay ,
        leftZero
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