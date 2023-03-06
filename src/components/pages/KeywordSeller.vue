<template>

  <div class="flex flex-col h-full gap-10">
    <div class="flex flex-initial">

      <div class="flex flex-col gap-10">
        <div class="flex flex-col gap-2 sm:flex-row">

          <div class="flex sm:w-80">
            <t-input type="text" v-model="keywordSeller" placeholder="키워드를 입력하세요"></t-input>
          </div>
          <div class="flex sm:flex-0">
            <button 
              type="submit" 
              class="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm sm:w-auto hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              @click="searchHandler"
            >조회</button>
          </div>
        </div>
      </div>

    </div>

    <div class="flex flex-1 w-full">
      <div class="flex flex-col flex-1 w-full gap-2 overflow-y-auto">
        <template v-for="( item, idx ) in products" :key="idx">
          <div class="flex pb-2 border-b border-gray-500/30">
            <div class="flex flex-col flex-1">
              <div class="text-lg font-bold">{{ item.title }}</div>
              <div class="text-sm">{{ item.lprice }}원</div>
              <div class="flex text-sm">{{ item.category1 }} &gt; {{ item.category2 }} &gt; {{ item.category3 }}</div>
              <div class="text-sm">{{ item.maker }}</div>
            </div>
            <div class="flex"><img :src="item.image" alt="" style="width:60px; height:60px;" ></div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
  import { reactive, toRefs } from 'vue';
  import axios from 'axios';
  import CryptoJS from 'crypto-js' ; 


  /**
   * 총 검색량
   * 총 스토어수
   * 
   * 영문이름 변환 api

https://developers.naver.com/docs/papago/papago-romanization-example-code.md#node-js

네이버 쇼핑 api

https://developers.naver.com/docs/serviceapi/search/shopping/shopping.md#%EC%87%BC%ED%95%91-%EA%B2%80%EC%83%89-%EA%B2%B0%EA%B3%BC-%EC%A1%B0%ED%9A%8C

https://github.com/gustjqdl/Naver_DailyKeyword_Crawling/blob/master/%EC%B5%9C%EA%B7%BC_%ED%95%9C%EB%8B%AC_%EC%9D%BC%EC%9D%BC_%EA%B2%80%EC%83%89%EB%9F%89/%EC%B5%9C%EA%B7%BC_%ED%95%9C%EB%8B%AC_%EC%9D%BC%EC%9D%BC_%EA%B2%80%EC%83%89%EB%9F%89.ipynb
   */

  // https://ukcasso.tistory.com/99
  // http://naver.github.io/searchad-apidoc/#/operations/GET/~2Fkeywordstool
  // https://www.selfmoa.com/bbs/board.php?bo_table=info&wr_id=4853


  
  const method = "GET";
  const api_url = "/keywordstool";
  const timestamp = Date.now() + '';
  const accessKey = '010000000084e677e74a63f62190879c5cb1402cf5ddbcceacc2ca327302d25860ff090624' ;
  const secretKey = 'AQAAAACE5nfnSmP2IZCHnFyxQCz1yrO0D6dIbSGgK3Q' ;
  const CUSTOMERID = '1723622' ; 

  var hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, secretKey);
  hmac.update(timestamp + '.' + method + '.' + api_url);

  var hash = hmac.finalize();
  hash.toString(CryptoJS.enc.Base64) ;

  // const CLIENTID = '79iwaLXFMnMTypZ1uUI4' ;
  // const CLIENTSECRET = 'ysCUOmSLqa' ;
  const CLIENTID = 'nuOJ4_haYkrHigHn6CeA' ;
  const CLIENTSECRET = 'U4S7D3tuJG' ;
  
  export default {
    name : 'KeywordSeller' ,
    setup () {

      const state = reactive({
        keywordSeller : null ,
        products : [] ,
      }) ;

      const searchHandler = () => {
        getKeywordResult() ; 
      }

      // 쇼핑 검색 결과
      const getKeywordResult = () => {
        
        console.log( 'getKeywordResult in' ) ; 

        axios.get( '/v1/search/shop.json?display=20&query=' + encodeURI( state.keywordSeller ), {
          headers: {
            'X-Naver-Client-Id':CLIENTID, 
            'X-Naver-Client-Secret': CLIENTSECRET
          },
        } )
        .then(( res ) => {
          console.log( '=========> res.data.items : ', res.data.items ) ; 
          res.data.items.forEach((item,idx)=> item.title = item.title.replace(/<[^>]*>?/g, '')) ; 
          state.products = res.data.items ; 
          console.log( '=========> state.products : ', state.products ) ; 
        })
        .catch( error => {
          console.log( 'error : ', error ) ; 
        })
      }

      const getShopKeyword = () => {
        
        console.log( ' 222222222 ' ) ;
        axios.get( '/keywordstool?hintKeywords=' + encodeURI( state.keywordSeller ) + '&showDetail=1' , {
        // axios.get( 'https://api.naver.com/keywordstool?hintKeywords=' + encodeURI( state.keywordSeller ) + '&showDetail=1' , {
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'X-Timestamp':timestamp ,
            'X-API-KEY': accessKey ,
            'X-API-SECRET': secretKey , 
            'X-CUSTOMER': CUSTOMERID, 
            'X-Signature': hash.toString(CryptoJS.enc.Base64)
          },
        } )
        .then(( res ) => {
          // state.inputValue = res.data.aResult[0].aItems[0].name.replace(/ /g, ''); 
          console.log( '=========>', res.data ) ; 
        })
        .catch( error => {
          console.log( 'error : ', error ) ; 
          // state.inputValue = '조회된 결과가 없습니다.' ;
        })

      }

      

      return { 
        ...toRefs(state) ,
        searchHandler ,
        getShopKeyword
      } ;
    } ,

  }
</script>