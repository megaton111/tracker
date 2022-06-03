<template>

  <top-description>
    운송장 번호를 1개만 입력했을 경우에는 진행과정이 모두 보이며, 운송장 번호를 여러 개 입력했을 경우에는 배송완료일만 노출합니다.<br />
    여러 운송장 번호를 입력 할 경우에는 한줄에 한개의 운송장을 입력해주세요. (예시참고)
    <br />주문리스트에 배송완료일 입력을 위해 만든 기능입니다.
  </top-description>

  <div class="sectionWrap">

    <section class="enter">
      
      <div class="row fix">
        <t-select v-model="companyCode" :options="companyList" @update:modelValue="changeSelect"></t-select>
      </div>
      <div class="row">
        <t-textarea v-model="originTrackList" placeholder="예) 운송장번호를 여러개 입력 시 한줄에 한개씩&#10;123123123123123&#10;123123123123123&#10;123123123123123"></t-textarea>
      </div>
      <div class="row fix">
        <button type="button" @click="deliveryCheckHandler">조회</button>
      </div>
    </section>

    <!-- 운송장 번호 여러 개 조회 시 -->
    <section class="result" v-if="deliveryResult.length > 0">
      <ul class="lstWrap" v-if="deliveryResult.length > 0">
        <li v-for="(item, idx) in deliveryResult" :key="idx"> {{ item }} </li>
      </ul>
    </section>

    <!-- 운송장 번호 한개 조회 시 -->
    <section class="result" v-else-if="single.status">
      <div class="status" v-if="single.status">
        <strong>{{ single.status }}</strong>
      </div>

      <ul class="lstWrap" v-if="single.progress.length > 0">
        <li v-for="(item, idx) in single.progress" :key="idx">
          <span class="date">{{ item.timeString }}</span>
          <span>{{ item.where }}</span>
        </li>
      </ul>
    </section>

    <!-- 잘못된 검색 결과 -->
    <section class="result" v-else-if="alertText">
      <div class="status" v-if="alertText">{{ alertText }}</div>
    </section>

  </div> <!-- end of sectionWrap -->

  <teleport to="#teleport-area" :disabled="disableTeleport">
    <loading v-if="loading"/>
  </teleport>

</template>

<script>
  import { reactive, toRefs, ref } from 'vue';
  import axios from 'axios';
  const APIKEY = 'QIV4DYvA0u6CgmTpqJVqew' ;   // 개인키
  const COMPANY_API = 'https://info.sweettracker.co.kr/api/v1/companylist?t_key='+APIKEY ;  // 택배사 리스트
  const DELIVERY_API = 'https://info.sweettracker.co.kr/api/v1/trackingInfo?t_key='+APIKEY ;  // 운송장 조회

  export default {
    name : 'delivery' ,
    components : {
    } ,
    setup () {
      const disableTeleport = ref(false);
      const state = reactive({
        companyCode : '01' ,        // 택배사 코드(기본은 우체국택배)
        companyList : null ,        // 택배사 리스트
        originTrackList : [] ,      // 배송정보 리스트 원본
        trackList : [] ,            // 배송정보 리스트
        result : [] ,               // 결과값
        deliveryResult : [] , 
        alertText : '' ,            // 알림 텍스트
        loading : false ,

        single : {
          status : null , 
          progress : [] ,
        } ,

        trackValue : '' ,
      }) ;

      // 택배사 리스트 가져와서 select value item 형태로 변환 { Name : '', Code : '' } --> { name : '', value : '' }
      axios.get( COMPANY_API ).then(res=>{
        let arr = res.data.Company ; 
        arr = arr.map( item => {
          return { name : item.Name, value : item.Code }
        }) ; 
        return state.companyList = arr ;
      }) ; 


      // 입력한 정보 값 체크
      const deliveryCheckHandler = () => {
        
        // 변수 초기화
        state.result = [] ; 
        state.deliveryResult = [] ;
        state.single.status = null ;
        state.single.progress = [] ; 

        if( state.companyCode == '' ) {
          state.alertText = '택배사를 선택하세요' ; 
          console.log( 'state.alertTex :', state.alertText ) ; 
        } else if ( state.originTrackList == '' ) {
          state.alertText = '운송장 번호를 입력하세요' ; 
          console.log( 'state.alertTex :', state.alertText ) ; 
        } else {
          state.loading = true ; 
          
          // 새로운 배열에 담는다. 기존 textarea에 트랙리스트를 계속 남겨두기 위함 , filter 는 빈값제거하기 위함
          state.trackList = state.originTrackList.split('\n').filter(Boolean) ; 
          if( state.trackList.length > 1 ) {  // 운송장 번호 1개 조회 시에는 과정까지 노출해주기 위해 분리 처리
            checkTrackInfo() ;
          } else {
            checkTrackInfoSingle() ;
          }
        }
      }

      // 운송장 여러 개 조회 시
      const checkTrackInfo = () => {
        axios.get( DELIVERY_API+'&t_code='+state.companyCode+'&t_invoice='+state.trackList[0] )
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

      // 운송장 1개 조회 시
      const checkTrackInfoSingle = () => {
        console.log( '싱글 체크' ) ; 
        axios.get( DELIVERY_API+'&t_code='+state.companyCode+'&t_invoice='+state.trackList[0] )
        .then(( res ) => {
          state.alertText = '' ; 
          state.loading = false ; 
          state.single.status = res.data.lastDetail.kind ; 
          state.single.progress = res.data.trackingDetails ; 
        })
        .catch( error => {
          console.log( 'error : ', error ) ; 
          state.single.status = '조회된 결과가 없습니다.' ;
        })
      }

      // 가져온 배송 정보 체크
      const trackInfoSet = ( res ) => {
        let data = res.data ; 
        // 운송장 문제가 없는 경우 - 배송완료 or 배송중
        if( data.result && data.result == 'Y' ) {
          data.complete ? state.result.push( data.lastDetail.timeString.split(' ')[0] ) : state.result.push( '배송중입니다.' ) ; 
        } else {
          state.result.push( '검색결과가 없습니다. 운송장번호와 택배사를 확인해주세요.' ) ; 
        }
      }

      const changeSelect = ( value ) => {
        console.log( 'changeSelect value :', value ) ; 
      }
      
      return { 
        ...toRefs(state) , 
        deliveryCheckHandler , 
        checkTrackInfo , 
        changeSelect , 
        disableTeleport 
      } ;

    } ,
  }
</script>