<template>
  <top-description>
  판매금액에서 정산되는 대략적인 금액을 조회하는 서비스입니다.<br />
  세금 부분은 포함되어 있지 않으니 참고해주세요.
  </top-description>
  <div class="sectionWrap calculatePrice">
    <section class="enter">
      <div class="row">
        <div class="col">
          <h1>네이버</h1>
        </div>
        <div class="col r">
          <button type="button" class="btnNotify" @click="showNotifyPopup">수수료 안내</button>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <t-input type="number" label="공급가" unit="원" labelWidth="70" v-model="priceOrigin" placeholder="공급가를 입력하세요"></t-input>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <t-input type="number" label="판매가" unit="원" labelWidth="70" v-model="priceSale" placeholder="판매가를 입력하세요"></t-input>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <t-input type="number" label="배송비" unit="원" labelWidth="70" v-model="priceDe" placeholder="배송비를 입력하세요"></t-input>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <t-radio label="결제수단" labelWidth="60" :items="sltPays" v-model="radioValues" dir="column"></t-radio>
        </div>
      </div>
      <div class="row">
        <div class="col"><button type="button" @click="calculateHandler">조회</button></div>
      </div>
    </section>

    <section class="result" v-if="profitPrice">

      <div class="priceResult">
        <dl>
          <dt>네이버쇼핑 매출연동 수수료</dt><dd>{{ naverShopFeePrice }}원</dd>
        </dl>
        <dl class="line">
          <dt>결제수단 수수료</dt><dd>{{ payFeePrice }}원</dd>
        </dl>
        <dl>
          <dt>최종 정산 금액 (배송비 정산 포함)</dt><dd>{{ resultPrice }}원</dd>
        </dl>
        <dl>
          <dt>수익금 (최종 정산 금액 - 공급가 - 배송비)</dt><dd>{{ profitPrice }}원</dd>
        </dl>
        <dl>
          <dt>마진율</dt><dd>{{ profitPer }}%</dd>
        </dl>
      </div>

    </section>

  </div> <!-- end of sectionWrap -->

  <div class="popupWrap" v-if="showNotify">
    <div class="popup">
      <div class="top">수수료 정보</div>
      <div class="content">
        <ul class="lst_fee">
          <li>네이버쇼핑 매출연동 수수료 : 2%</li>
          <li>
            결제수단별 수수료
            <ul>
              <li>신용카드 : 3.74%</li>
              <li>계좌이체 : 1.65%</li>
              <li>무통장입금 : 1%</li>
              <li>네이버페이 : 3.85%</li>
              <li>네이버페이 포인트 : 3.74%</li>
            </ul>
          </li>
        </ul>
      </div>
      <div class="bottom">
        <div class="btns">
          <button type="button" @click="closePop">닫기</button>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import { reactive, toRefs } from 'vue';
  import { calculateFee, priceComma } from '@/utils';
  export default {
    name : 'CalculatePrice' ,
    setup () {
      const state = reactive({
        priceOrigin : '' , 
        priceSale : '' , 
        priceDe : '' , 

        naverShopFee : 2 ,  // 2%
        naverShopFeePrice : '' , 

        payFees : {
          p1 : 3.74 , 
          p2 : 1.65 , 
          p3 : 1 ,
          p4 : 3.85 , 
          p5 : 3.74
        } ,
        payFee : 3.74 ,  // 신용카드 3.74
        payFeePrice : '' , 
        dePayFeePrice : '' ,
        resultPrice : '' , // 최종 정산금액
        profitPrice : '' , // 최종 수익
        profitPer : '' , // 마진율 퍼센트
        showNotify : false , 
        radioValues : 'p1' , 
        sltPays : [
          { name : '신용카드', value : 'p1' } ,
          { name : '계좌이체', value : 'p2' } ,
          { name : '무통장입금', value : 'p3' } ,
          { name : '네이버페이', value : 'p4' } ,
          { name : '네이버페이 포인트', value : 'p5' } ,
        ]
      }) ;

      const calculateHandler = () => {
        // 2500 * 3.74 / 100 
        // 쇼핑 수수료
        state.naverShopFeePrice = calculateFee( state.priceSale, state.naverShopFee ) ; 
        // 상품 결제 수수료
        state.payFeePrice = calculateFee( state.priceSale, state.payFees[state.radioValues] ); 
        // 배송비 결제 수수료
        state.dePayFeePrice = calculateFee( state.priceDe, state.payFees[state.radioValues] ); 
        
        // 최종 상품가 정산
        state.resultPrice = state.priceSale + state.priceDe - state.naverShopFeePrice - state.payFeePrice - state.dePayFeePrice ;
        // 수익금
        state.profitPrice = state.resultPrice - state.priceOrigin - state.priceDe ; 
        // 마진율
        state.profitPer = Math.floor( state.profitPrice / state.priceSale * 100 ); 

        // 변환 
        state.resultPrice = priceComma( state.resultPrice ) ; 
        state.profitPrice = priceComma( state.profitPrice ) ; 
        state.naverShopFeePrice = priceComma( state.naverShopFeePrice ) ; 
        state.payFeePrice = priceComma( state.payFeePrice ) ; 
      }

      const showNotifyPopup = () => {
        state.showNotify = true ; 
      } ;

      const closePop = () => {
        state.showNotify = false ; 
      } ;

      return { 
        ...toRefs(state) ,
        calculateHandler ,
        showNotifyPopup ,
        closePop
      } ;
    } ,
  }
</script>