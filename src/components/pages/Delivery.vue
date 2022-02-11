<template>
  <div class="section enter">
    <select v-model="companyCode">
      <template v-for="(item, idx) in companyList" :key="idx">
        <option :value="item.Code">{{ item.Name }}</option>
      </template>
    </select>
    <textarea v-model="originTrackList" placeholder="예) 운송장번호를 한줄에 한개씩
123123123123123
123123123123123
123123123123123">
      
    </textarea>
    <button type="button" @click="deliveryCheckHandler">조회</button>
  </div> <!-- end of section -->
 
  <div class="section result">
    <!-- <h2>결과</h2> -->
    <div v-if="alertText">{{ alertText }}</div>
    <!-- <ul>
      <li v-for="(item, idx) in result" :key="idx">
        {{ item }}
      </li>
    </ul> -->
    <ul class="lstWrap">
      <li v-for="(item, idx) in deliveryResult" :key="idx"> {{ item }} </li>
    </ul>
  </div> <!-- end of section -->

  <loading  v-if="loading" />
</template>

<script>
  import axios from 'axios';
  import { reactive, toRefs } from 'vue';
  import loading from '../common/loading' ; 
  export default {
    name : 'delivery' ,
    components : {
      loading
    } ,
    setup () {

      const state = reactive({
        companyCode : '01' ,        // 택배사 코드(기본은 우체국택배)
        companyList : null ,        // 택배사 리스트
        originTrackList : [] ,      // 배송정보 리스트 원본
        trackList : [] ,            // 배송정보 리스트
        result : [] ,               // 결과값
        deliveryResult : [] , 
        alertText : '' ,            // 알림 텍스트
        loading : false ,
      }) ;

      // 택배사 리스트 가져오기
      let companyData = axios.get( 'https://info.sweettracker.co.kr/api/v1/companylist?t_key=2Etkfo4dCjwN2W779IT8ag') ; 
      companyData.then((res)=>state.companyList = res.data.Company) ; 

      // 입력 정보 검사 후 조회 실행
      const deliveryCheckHandler = () => {
        state.result = [] ; 
        state.deliveryResult = [] ;

        if( state.companyCode == '' ) {
          state.alertText = '택배사를 선택하세요' ; 
        } else if ( state.originTrackList == '' ) {
          state.alertText = '운송장 번호를 입력하세요' ; 
        } else {
          state.loading = true ; 
          state.trackList = state.originTrackList.split('\n') ; // 새로운 배열에 담는다. 기존 textarea에 트랙리스트를 계속 남겨두기 위함
          checkTrackInfo() ; 
        }
      }

      // 배송 데이터 가져오기
      const checkTrackInfo = () => {
        axios.get( 'https://info.sweettracker.co.kr/api/v1/trackingInfo?t_key=2Etkfo4dCjwN2W779IT8ag&t_code='+state.companyCode+'&t_invoice='+state.trackList[0] )
        .then(( res ) => {
          state.trackList.shift() ; 
          trackInfoSet( res ) ; 
          if( state.trackList.length > 0 ) { 
            checkTrackInfo() ; 
          } else { 
            state.deliveryResult = state.result ; 
            state.alertText = '' ; 
            state.loading = false ; 
          }
        }) ;
      }

      // 배송 데이터 체크 및 출력
      const trackInfoSet = ( res ) => {
        let data = res.data ; 
        console.log( '--------------->', res.data ) ; 
        // 운송장 문제가 없는 경우
        if( data.result && data.result == 'Y' ) {
          // 배송완료 or 배송중
          data.complete ? state.result.push( data.lastDetail.timeString.split(' ')[0] ) : state.result.push( '배송중입니다.' ) ; 
        } else {
          state.result.push( '검색결과가 없습니다. 운송장번호와 택배사를 확인해주세요.' ) ; 
        }
      }

      return { ...toRefs(state), deliveryCheckHandler, checkTrackInfo } ;
    } ,
  }
</script>