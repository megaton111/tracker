<template>

  <div class="sectionWrap">
    <section class="enter">
      <div class="row" style="--gap:4px;">
        <div class="col"><t-input type="text" v-model="keywordSeller" placeholder="키워드를 입력하세요"></t-input></div>
        <div class="col fit"><button type="button" class="fluid" @click="searchHandler">조회 1</button></div>
        <div class="col fit"><button type="button" class="fluid" @click="getShopKeyword">조회 2</button></div>
      </div>
    </section>

    <section class="result">
      <div class="row">
        <div class="col">1</div>
      </div>
    </section>
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
  const CUSTOMERID = 1723622 ; 

  var hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, secretKey);
  hmac.update(timestamp + '.' + method + '.' + api_url);

  var hash = hmac.finalize();
  hash.toString(CryptoJS.enc.Base64) ;

  const CLIENTID = '79iwaLXFMnMTypZ1uUI4' ;
  const CLIENTSECRET = 'ysCUOmSLqa' ;
  
  export default {
    name : 'KeywordSeller' ,
    setup () {

      const state = reactive({
        keywordSeller : null
      }) ;

      const searchHandler = () => {
        console.log( 'searchHandler in' ) ; 
        getKeywordResult() ; 
      }

      const getShopKeyword = () => {

        axios.get( '/keywordstool?hintKeywords=' + encodeURI( state.keywordSeller ) + '&showDetail=1' , {
          headers: {
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

      const getKeywordResult = () => {


        axios.get( '/v1/search/shop.json?query=' + encodeURI( state.keywordSeller ), {
          headers: {
            'X-Naver-Client-Id':CLIENTID, 
            'X-Naver-Client-Secret': CLIENTSECRET
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