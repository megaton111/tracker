<template>
  
  <!-- <top-description>
  판매금액에서 정산되는 대략적인 금액을 조회하는 서비스입니다.<br />
  세금 부분은 포함되어 있지 않으니 참고해주세요.
  </top-description> -->

  <div class="sectionWrap salePrice">
    <section class="enter">
      <div class="row">
        <div class="col">
          <t-input type="number" label="원가" unit="원" labelWidth="70" v-model="priceOrigin" placeholder="원가를 입력하세요" setClass="right"></t-input>
        </div>
      </div>
      <!-- <div class="row">
        <div class="col">
          <t-input type="number" label="할인금액" unit="원" labelWidth="70" v-model="priceSale" placeholder="할인금액을 입력하세요" setClass="right"></t-input>
        </div>
      </div> -->
      <div class="row">
        <div class="col">
          <t-input type="number" label="할인율" unit="%" labelWidth="70" v-model="perSale" placeholder="할인율를 입력하세요" setClass="right"></t-input>
        </div>
      </div>
      <div class="row">
        <div class="col btns">
          <button type="button" v-for="(item,idx) in lstPerSale" :key="idx" @click="perAdd( item )">{{ item }}%</button>
        </div>
      </div>
    </section>

    <section class="result">

      <!-- 

        결과 값은 computed로 설정
        위에 입력값은 일반 state값

       -->

      <div class="row">
        <div class="col">
          원가
        </div>
        <div class="col r ">
          {{ priceOriginCom }}원
        </div>
      </div>
      <div class="row">
        <div class="col">
          할인금액 : 
        </div>
        <div class="col r ">
          -{{ resultSalePrice }}원
        </div>
      </div>
      <div class="row">
        <div class="col">
          최종가 : 
        </div>
        <div class="col r ">
          {{ resultPrice }}원
        </div>
      </div>

      <div class="row">
        <div class="col"><button type="button" @click="resetHandler">초기화</button></div>
      </div>

    </section>

  </div> <!-- end of sectionWrap -->
</template>

<script>
  import { reactive, toRefs, computed } from 'vue';
  import { priceComma } from '@/utils';
  export default {
    name : 'CalculatePrice' ,
    setup () {

      const state = reactive({
        priceOrigin : '' , // 원가
        priceSale : '' , // 할인금액
        perSale : '' ,   // 할인율
        lstPerSale : [ 1, 5, 10 ] , 
        priceOriginCom : computed(() => priceComma( state.priceOrigin) ) ,  // 원가에 콤마 추가
      }) ;

      const resetHandler = () => {
        state.priceOrigin = 0 ;
        state.perSale = 0 ; 
      }

      // 최종금액
      const resultPrice = computed( ()=> priceComma( parseFloat( state.priceOrigin * (( 100 - state.perSale )/100) ).toFixed() )) ;

      // 할인 금액
      const resultSalePrice = computed( () => priceComma( parseFloat( state.priceOrigin - (state.priceOrigin * (( 100 - state.perSale )/100)) ).toFixed() ) );

      const perAdd = ( num ) => state.perSale = state.perSale + num ;

      return { 
        ...toRefs(state) ,
        resetHandler , 
        resultPrice , 
        resultSalePrice ,
        perAdd
      } ;
    } ,
    // computed: {
    //   perSale: {
    //     get: function () {
    //       return 123123213213 ;
    //     },
    //     set: function (newValue) {
    //       return newValue ;
    //     }
    //   }
    // }

  }
</script>