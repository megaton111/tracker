<template>
  <div class="formWrap">
    <h2>조회</h2>
    <select name="" id="" v-model="companyCode">
      <!-- <option value="01">우체국</option> -->
      <template v-for="(item, idx) in companyList" :key="idx">
        <option :value="item.Code">{{ item.Name }}</option>
      </template>
    </select>
    <textarea v-model="originTrackList"></textarea>
    <button type="button" @click="deliveryCheckHandler">조회</button>
  </div>
  <div class="resultWrap">
    <h2>결과</h2>
    <div>{{ alertText }}</div>
    <div>
      <template v-for="(item, idx) in result" :key="idx">
        <div>{{ item }}</div>
      </template>
    </div>
  </div>
</template>

<style lang="scss">
#app { 
  display: flex; gap: 20px ; flex-direction: column ;
  height : 100%; padding:20px ; 
  h2 {
    font-size:12px; 
  }
  .formWrap {
    display: flex;
    gap: 5px ; 
    flex-direction: column ;
    
    select {
      padding : 0 10px ; 
      height : 36px ;
    }
    textarea {
      flex : 1 ; 
      min-height: 300px ;
      padding: 10px ; 
    }
    button {
      flex : 1 ; 
      flex-basis : 36px ;
      cursor: pointer;
    }
  }
  .resultWrap{
    display: flex;
    gap: 5px ; 
    flex-direction: column ;
  }
}
</style>

<script>
import axios from 'axios';
import { reactive, toRefs } from 'vue';
export default {
  name: 'App',
  setup () {
    const state = reactive({
      companyCode : '' , 
      companyList : null , 
      originTrackList : [] , 
      trackList : [] , 
      result : [] , 
      alertText : '' ,
    }) ;

    // 택배사 가져오기
    let companyData = axios.get( 'https://info.sweettracker.co.kr/api/v1/companylist?t_key=2Etkfo4dCjwN2W779IT8ag') ;
    companyData.then((res)=>state.companyList = res.data.Company) ;

    // 입력 정보 검사 후 조회 실행
    const deliveryCheckHandler = () => {

      state.result = [] ; 

      if( state.companyCode == '' ) {
        state.alertText = '택배사를 선택하세요' ; 
      } else if ( state.originTrackList == '' ) {
        state.alertText = '운송장 번호를 입력하세요' ; 
      } else {
        state.trackList = state.originTrackList.split('\n') ;   // 새로운 배열에 담는다. 기존  textarea에 트랙리스트를 계속 남겨두기 위함
        checkTrackInfo() ; 
      }

    }

    // 배송 데이터 가져오기
    const checkTrackInfo = () => {
      axios.get( 'https://info.sweettracker.co.kr/api/v1/trackingInfo?t_key=2Etkfo4dCjwN2W779IT8ag&t_code='+state.companyCode+'&t_invoice='+state.trackList[0] )
      .then(( res ) => {
        state.trackList.shift() ; 
        trackInfoSet( res ) ; 
        if( state.trackList.length > 0 ) { checkTrackInfo() ; } else { state.result.push('완료') }
      }) ;
    }

    // 배송 데이터 체크 및 출력
    const trackInfoSet = ( res ) => {
      let data = res.data ; 

      // 운송장 문제 없는 경우
      if( data.result ) { 

        // 배송완료
        if( data.result == 'Y' && data.complete ) { 
          state.result.push( data.lastDetail.timeString.split(' ')[0] ) ; 

        // 배송완료 전
        } else {  
          state.result.push( '배송중' ) ; 
        }
      
      // 운송장에 문제가 있는 경우
      } else {
        state.result.push( data.msg ) ; 
      }
    }

    return { ...toRefs(state), deliveryCheckHandler, checkTrackInfo } ;

  } ,
  methods : {

    // trackHandler () {
    //   if( this.code == null ) {
    //     console.log( '택배사를 선택하세요' ) ; 
    //   } else if ( this.trackNumber == '' ) {
    //     console.log( '운송장 번호를 입력하세요' ) ; 
    //   } else {
    //     let arr = this.trackNumber.split('\n') ; 
    //     this.trackSearch( arr, this.code ) ;
    //   }
    // } ,
    // trackSearch ( invoice, code ) {
    //   const data = invoice ; 

    //   data.forEach(async ( track ) => {
    //     console.log( 'track :', track ) ; 
    //     const response = await axios.get('https://info.sweettracker.co.kr/api/v1/trackingInfo?t_key=2Etkfo4dCjwN2W779IT8ag&t_code='+code+'&t_invoice='+track)
    //     console.log( track , ' response :', response.data ) ; 
    //     this.newData.push( response.data ) ; 
    //     console.log( 'this.newData :', this.newData ) ; 
    //   }) ;
    // }

    



  } ,
};
</script>