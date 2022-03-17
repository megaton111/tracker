<template>

  <div class="description">
    통관 과정을 조회할 수 있는 기능입니다. <br />
    운송장 번호를 입력하세요. 년도는 통관 진행 해당년도입니다.
  </div>

  <div class="sectionWrap">

    <section class="enter">
      <div class="row" style="--gap:4px;">
        <div class="col number"><input type="text" v-model="number" placeholder="운송장 번호를 입력하세요"></div>
        <div class="col year">
          <select v-model="year">
            <option value="2022">2022</option>
            <option value="2021">2021</option>
          </select>
        </div>
        <div class="col btn"><button type="button" @click="searchHandler">조회</button></div>
      </div>
    </section> <!-- end of section -->

    <section class="result">
      <div class="status" v-if="status">현재 상태 : <strong>{{ status }}</strong></div>
      <ul class="lstWrap">
        <li v-for="(item, idx) in progress" :key="idx">
          <span class="date">{{ dateFormat( item.prcsDttm._text , '####-##-##' ) }}</span>
          <span>{{ item.cargTrcnRelaBsopTpcd._text }}</span>
        </li>
      </ul>
    </section> <!-- end of section -->

  </div> <!-- end of sectionWrap -->

  <loading  v-if="loading" />
</template>

<script>
  import axios from 'axios';
  import convert from 'xml-js' ; 
  import loading from '../common/loading' ; 

  const URL = '/ext/rest/cargCsclPrgsInfoQry/retrieveCargCsclPrgsInfo?crkyCn=k280o211a048o132e070b010d0&hblNo' ; 

  export default {
    name : 'PersonalCustomsCode' ,
    components : {
      loading
    } ,
    data () {
      return {
        number : '' ,
        year : '2022' ,  
        status : null , 
        progress : [] ,
        loading : false ,
      }
    } , 
    methods : {
      
      searchHandler() {
        console.log( 'number :', this.number ) ; 
        this.loading = true ,

        axios.get( `${URL}=${this.number}&blYy=${this.year}` )
        .then(( res ) => {

          let xml = res.data
          ,   json = convert.xml2json(xml, { compact : true } )
          ,   jsonParse = JSON.parse( json )
          ; 
          
          this.status = jsonParse.cargCsclPrgsInfoQryRtnVo.cargCsclPrgsInfoQryVo.csclPrgsStts._text
          this.progress = jsonParse.cargCsclPrgsInfoQryRtnVo.cargCsclPrgsInfoDtlQryVo

          this.loading = false;
          
        })
        .catch(error =>{
          console.log( 'error :', error ) ; 
          this.status = '조회된 결과가 없습니다' ; 
          this.progress = [] ; 
          this.loading = false;
        }) ;
      } ,

      dateFormat(value, pattern) {
        var i = 0,
          date = value.toString();
        return pattern.replace(/#/g,() => date[i++]);
      }


    } ,
    computed : {
    
    }
  }
</script>

<style lang="scss" scoped>

</style>