<template>
  <header class="header"><h1>Tracker</h1></header>
  <div class="container">
    <div class="formWrap">
      <h2>조회</h2>
      <select v-model="companyCode">
        <template v-for="(item, idx) in companyList" :key="idx">
          <option :value="item.Code">{{ item.Name }}</option>
        </template>
      </select>
      companyCode : {{ companyCode }}
      <textarea v-model="originTrackList"></textarea>
      <button type="button" @click="deliveryCheckHandler">조회</button>
    </div> <!-- end of formWrap -->
    <div class="resultWrap">
      <h2>결과</h2>
      <div v-if="alertText">{{ alertText }}</div>
      <ul v-for="(item, idx) in result" :key="idx">
        <li>{{ item }}</li>
      </ul>
    </div> <!-- end of resultWrap -->
  </div> <!-- end of container -->

  <div class="sk-fading-dim" v-if="loading">
    <div class="sk-fading-circle">
      <div class="sk-circle1 sk-circle"></div>
      <div class="sk-circle2 sk-circle"></div>
      <div class="sk-circle3 sk-circle"></div>
      <div class="sk-circle4 sk-circle"></div>
      <div class="sk-circle5 sk-circle"></div>
      <div class="sk-circle6 sk-circle"></div>
      <div class="sk-circle7 sk-circle"></div>
      <div class="sk-circle8 sk-circle"></div>
      <div class="sk-circle9 sk-circle"></div>
      <div class="sk-circle10 sk-circle"></div>
      <div class="sk-circle11 sk-circle"></div>
      <div class="sk-circle12 sk-circle"></div>
    </div>
  </div>

</template>

<style lang="scss">
#app { 
  display: flex; flex-direction: column ;
  height : 100%; 
  .header{
    display: flex;
    flex : 0 0 40px ; 
    align-items:center;
    justify-content: center ;
    background-color: #D3DEDC;
    h1 {
      font-size:16px; 
      color:#2C3333 ;
    }
  }
  .container {
    display: flex; gap: 20px ; flex-direction: column ;
    flex : 1 ; 
    padding:10px ; 
    h2 {
      font-size:14px; 
      color:#2C3333 ; 
    }
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
      background-color: #7C99AC;
      border: 0 ; 
      border-radius: 4px ;
      color:#fff ;
      font-size:14px; 
      font-weight: 700 ;
      cursor: pointer; 
    }
  }
  .resultWrap{
    position: relative;
    display: flex ; 
    gap: 5px ; 
    flex-direction: column ; 
  }
}

.sk-fading-dim{
  display: flex;
  position: absolute;
  left:0; top:0; bottom:0; right:0; 
  background-color:rgba(0,0,0,0.6);
  align-items:center;
  justify-content: center ;
}
.sk-fading-circle {
  margin: 100px auto;
  width: 40px;
  height: 40px;
  position: relative;
}

.sk-fading-circle .sk-circle {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
}

.sk-fading-circle .sk-circle:before {
  content: '';
  display: block;
  margin: 0 auto;
  width: 15%;
  height: 15%;
  background-color: #fff;
  border-radius: 100%;
  -webkit-animation: sk-circleFadeDelay 1.2s infinite ease-in-out both;
          animation: sk-circleFadeDelay 1.2s infinite ease-in-out both;
}
.sk-fading-circle .sk-circle2 {
  -webkit-transform: rotate(30deg);
      -ms-transform: rotate(30deg);
          transform: rotate(30deg);
}
.sk-fading-circle .sk-circle3 {
  -webkit-transform: rotate(60deg);
      -ms-transform: rotate(60deg);
          transform: rotate(60deg);
}
.sk-fading-circle .sk-circle4 {
  -webkit-transform: rotate(90deg);
      -ms-transform: rotate(90deg);
          transform: rotate(90deg);
}
.sk-fading-circle .sk-circle5 {
  -webkit-transform: rotate(120deg);
      -ms-transform: rotate(120deg);
          transform: rotate(120deg);
}
.sk-fading-circle .sk-circle6 {
  -webkit-transform: rotate(150deg);
      -ms-transform: rotate(150deg);
          transform: rotate(150deg);
}
.sk-fading-circle .sk-circle7 {
  -webkit-transform: rotate(180deg);
      -ms-transform: rotate(180deg);
          transform: rotate(180deg);
}
.sk-fading-circle .sk-circle8 {
  -webkit-transform: rotate(210deg);
      -ms-transform: rotate(210deg);
          transform: rotate(210deg);
}
.sk-fading-circle .sk-circle9 {
  -webkit-transform: rotate(240deg);
      -ms-transform: rotate(240deg);
          transform: rotate(240deg);
}
.sk-fading-circle .sk-circle10 {
  -webkit-transform: rotate(270deg);
      -ms-transform: rotate(270deg);
          transform: rotate(270deg);
}
.sk-fading-circle .sk-circle11 {
  -webkit-transform: rotate(300deg);
      -ms-transform: rotate(300deg);
          transform: rotate(300deg); 
}
.sk-fading-circle .sk-circle12 {
  -webkit-transform: rotate(330deg);
      -ms-transform: rotate(330deg);
          transform: rotate(330deg); 
}
.sk-fading-circle .sk-circle2:before {
  -webkit-animation-delay: -1.1s;
          animation-delay: -1.1s; 
}
.sk-fading-circle .sk-circle3:before {
  -webkit-animation-delay: -1s;
          animation-delay: -1s; 
}
.sk-fading-circle .sk-circle4:before {
  -webkit-animation-delay: -0.9s;
          animation-delay: -0.9s; 
}
.sk-fading-circle .sk-circle5:before {
  -webkit-animation-delay: -0.8s;
          animation-delay: -0.8s; 
}
.sk-fading-circle .sk-circle6:before {
  -webkit-animation-delay: -0.7s;
          animation-delay: -0.7s; 
}
.sk-fading-circle .sk-circle7:before {
  -webkit-animation-delay: -0.6s;
          animation-delay: -0.6s; 
}
.sk-fading-circle .sk-circle8:before {
  -webkit-animation-delay: -0.5s;
          animation-delay: -0.5s; 
}
.sk-fading-circle .sk-circle9:before {
  -webkit-animation-delay: -0.4s;
          animation-delay: -0.4s;
}
.sk-fading-circle .sk-circle10:before {
  -webkit-animation-delay: -0.3s;
          animation-delay: -0.3s;
}
.sk-fading-circle .sk-circle11:before {
  -webkit-animation-delay: -0.2s;
          animation-delay: -0.2s;
}
.sk-fading-circle .sk-circle12:before {
  -webkit-animation-delay: -0.1s;
          animation-delay: -0.1s;
}

@-webkit-keyframes sk-circleFadeDelay {
  0%, 39%, 100% { opacity: 0; }
  40% { opacity: 1; }
}

@keyframes sk-circleFadeDelay {
  0%, 39%, 100% { opacity: 0; }
  40% { opacity: 1; } 
}
</style>

<script>
import axios from 'axios';
import { reactive, toRefs } from 'vue';
export default {
  name: 'App',
  setup () {

    const state = reactive({
      companyCode : '01' ,        // 택배사 코드(기본은 우체국택배)
      companyList : null ,        // 택배사 리스트
      originTrackList : [] ,      // 배송정보 리스트 원본
      trackList : [] ,            // 배송정보 리스트
      result : [] ,               // 결과값
      alertText : '' ,            // 알림 텍스트
      loading : false ,
    }) ;

    // 택배사 리스트 가져오기
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
        state.loading = true ; 
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
        if( state.trackList.length > 0 ) { checkTrackInfo() ; } else { state.result.push('완료'); state.alertText = ''; state.loading = false ;  }
      }) ;
    }

    // 배송 데이터 체크 및 출력
    const trackInfoSet = ( res ) => {
      let data = res.data ; 
      
      // 운송장 문제가 없는 경우
      if( data.result && data.result == 'Y' ) {

        // 배송완료
        if( data.complete ) {
          state.result.push( data.lastDetail.timeString.split(' ')[0] ) ; 
        
        // 배송중
        } else {
          state.result.push( '배송중입니다.' ) ; 
        }
      } else {
        state.result.push( '검색결과가 없습니다. 운송장번호와 택배사를 확인해주세요.' ) ; 
      }

    }

    return { ...toRefs(state), deliveryCheckHandler, checkTrackInfo } ;

  } ,
};
</script>