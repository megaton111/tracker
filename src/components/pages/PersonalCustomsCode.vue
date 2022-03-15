<template>
  <div class="personalCoustom">
    <div class="section enter">
      <div class="row">
        <div class="col">
          <h1>수취인</h1>
          <textarea v-model="nameList"></textarea>
        </div>
        <div class="col">
          <h1>개인통관고유번호</h1>
          <textarea v-model="numberList"></textarea>
        </div>
      </div>
      <button type="button" @click="searchHandler">조회</button>
    </div> <!-- end of section -->
    <div class="section result">
      <ul class="lstWrap">
        <li v-for="(item, idx) in resultList" :key="idx">
          <span>{{ item.name }}</span>
          <span>{{ item.check }}</span>
        </li>
      </ul>
    </div> <!-- end of section -->
  </div> <!-- end of personalCoustom -->
  <loading  v-if="loading" />
</template>

<script>
  import axios from 'axios';
  import convert from 'xml-js' ; 
  import loading from '../common/loading' ; 
  // import { jsonp } from 'vue-jsonp'

  const PROXY = window.location.hostname === 'localhost' ? '' : '/proxy';
  const URL = `${PROXY}/ext/rest/persEcmQry/retrievePersEcm`;

  export default {
    name : 'PersonalCustomsCode' ,
    components : {
      loading
    } ,
    data () {
      return {
        nameList : '' , 
        numberList : '' , 
        resultList : [] ,
        loading : false ,
      }
    } , 
    methods : {
      
      searchHandler () {
        console.log( 'searchHandler in' ) ;
        // console.log( '--------->' , this.name ) ; 
        // console.log( '--------->' , this.number ) ; 
        if( this.name.length < 1 || this.number.length < 1 || this.name.length !== this.number.length ) {
          alert( '입력한 이름, 번호 수량이 같아야합니다' ) ; 
        } else {
          this.loading = true ; 
          this.resultList = [] ;
          this.checkCode() ; 
        }
      } ,

      checkCode () {
        // console.log( 'check code ininin' , this.name[0] , this.number[0]) ; 
        
        // axios.get( `/ext/rest/persEcmQry/retrievePersEcm?crkyCn=o220p260j056x276q000c050u0&persEcm=${this.number[0]}&pltxNm=${this.name[0]}`)
        axios.get( `${URL}?crkyCn=o220p260j056x276q000c050u0&persEcm=${this.number[0]}&pltxNm=${this.name[0]}`)
        .then(( res ) => {
          
          let xml = res.data
          ,   json = convert.xml2json(xml, { compact : true } )
          ,   jsonParse = JSON.parse( json )
          ,   result = jsonParse.persEcmQryRtnVo.tCnt._text 
          ; 
          this.resultList.push({
            name : this.name[0] , 
            number : this.number[0] ,
            check : result == 1 ? '일치' : '불일치'
          }) ; 

          this.name.shift() ; 
          this.number.shift() ; 

          if( this.name.length > 0 ) {
            this.checkCode() ; 
          } else {
            this.loading = false ; 
            console.log('검사끝') ; 
          }
        }) ;

      }
    } ,
    computed : {
      name : {
        get () { return this.nameList == '' ? [] : this.nameList.split('\n') ;  } ,
        set ( value ) { this.nameList = value ;  }
      } ,
      number : {
        get () { return this.numberList == '' ? [] : this.numberList.split('\n') ;  } ,
        set ( value ) { this.numberList = value ;  }
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>