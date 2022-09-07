<template>

  <div class="contWrap">
    <top-description>
      통관 과정을 조회할 수 있는 기능입니다. <br />
      운송장 번호를 입력하세요. 년도는 통관 진행 해당년도입니다.
    </top-description>

    <div class="sectionWrap">

      <section class="enter">
        <div class="row" style="--gap:4px;">
          <div class="col number">
            <t-input type="text" v-model="number" placeholder="운송장 번호를 입력하세요"></t-input>
          </div>
          <div class="col year">
            <t-select v-model="year" :options="yearList"></t-select>
          </div>
          <div class="col"><button type="button" @click="searchHandler">조회</button></div>
        </div>
      </section> <!-- end of section -->

      <section class="result" v-if="status">

        <div class="row">
          <div class="col bx">
            <div class="row">
              <h1>결과</h1>
            </div>
            <div class="row">
              <div class="col bx-rd" style="--gap-col:10px;">
                <div class="status" v-if="status">현재 상태 : <strong>{{ status }}</strong></div>
                <ul class="lstWrap lstUnipass" v-if="progress.length > 0">
                  <li v-for="(item, idx) in progress" :key="idx">
                    <span class="date">{{ dateFormat( item.prcsDttm._text , '####-##-##' ) }}</span>
                    <span>{{ item.cargTrcnRelaBsopTpcd._text }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

      </section> <!-- end of section -->

    </div> <!-- end of sectionWrap -->

    <teleport to="#teleport-area" :disabled="disableTeleport">
      <loading v-if="loading"/>
    </teleport>
  </div>
</template>

<script>
  import axios from 'axios';
  import { reactive, toRefs, ref } from 'vue';
  import convert from 'xml-js' ; 

  const PROXY = window.location.hostname === 'localhost' ? '' : '/proxy';
  const URL = `${PROXY}/ext/rest/cargCsclPrgsInfoQry/retrieveCargCsclPrgsInfo?crkyCn=k280o211a048o132e070b010d0&hblNo`;

  export default {
    name : 'PersonalCustomsCode' ,
    setup(){
      const disableTeleport = ref(false);
      const state = reactive({
        number : '' ,
        year : '2022' ,  
        status : null , 
        progress : [] ,
        loading : false ,
        yearList : [{ name : '2021' , value : '2021' }, { name : '2022' , value : '2022' }]
      }) ;

      const searchHandler = () => {
        console.log( 'number :', state.number ) ; 
        state.loading = true ,
        console.log( 'URL :', URL ) ; 

        axios.get( `${URL}=${state.number}&blYy=${state.year}` )
        .then(( res ) => {

          console.log('#################### ', res ) ; 
          let xml = res.data
          ,   json = convert.xml2json(xml, { compact : true } )
          ,   jsonParse = JSON.parse( json )
          ; 
          
          state.status = jsonParse.cargCsclPrgsInfoQryRtnVo.cargCsclPrgsInfoQryVo.csclPrgsStts._text ;
          state.progress = jsonParse.cargCsclPrgsInfoQryRtnVo.cargCsclPrgsInfoDtlQryVo ;
          state.loading = false;
          
        })
        .catch(error =>{
          console.log( 'error :', error ) ; 
          state.status = '조회된 결과가 없습니다' ; 
          state.progress = [] ; 
          state.loading = false;
        }) ;
      } ;

      const dateFormat = (value, pattern) => {
        var i = 0,
          date = value.toString();
        return pattern.replace(/#/g,() => date[i++]);
      } ;

      return { 
        ...toRefs(state) , 
        disableTeleport ,
        searchHandler ,
        dateFormat
      } ;
    },
  }
</script>