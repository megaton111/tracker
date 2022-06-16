<template>
  
  <!-- <top-description>
  판매금액에서 정산되는 대략적인 금액을 조회하는 서비스입니다.<br />
  세금 부분은 포함되어 있지 않으니 참고해주세요.
  </top-description> -->

  <div class="sectionWrap salePrice">
    <section class="enter">
      <div class="row">
        <div class="col">
          <t-input type="number" label="기준 판매가" unit="원" labelWidth="70" v-model="priceOrigin" placeholder="기준 판매가를 입력하세요" setClass="right"></t-input>
        </div>
      </div>
      <template v-for="(item, idx) in options" :key="idx">
        <div class="row">
          <div class="col">
            <t-input type="number" :label="item.name" unit="원" labelWidth="70" v-model="item.value" :placeholder="item.name+' 가격을 입력하세요'" setClass="right"></t-input>
          </div>
        </div>
      </template>
      <div class="row">
        <div class="col btns">
          <button type="button" @click="addOption">옵션 추가</button>
        </div>
      </div>
    </section>

    <section class="result">
      <template v-for="(item, idx) in options" :key="idx">
        <div class="row">
          <div class="col">기준 판매가와 {{ item.name }} 가격 차이 </div>
          <div class="col r"> {{ changeNum( item.value - priceOrigin ) }}원 </div>
        </div>
      </template>

      <div class="row">
        <div class="col"><button type="button" @click="resetHandler">초기화</button></div>
      </div>

    </section>

    <!-- 
      
     -->

  </div> <!-- end of sectionWrap -->
</template>

<script>
  import { reactive, toRefs } from 'vue';
  import { priceComma } from '@/utils';
  export default {
    name : 'OptionPrice' ,
    setup () {

      const state = reactive({
        options : [ { name : '옵션 1' , value : 0 } ] ,
        priceOrigin : '' , // 원가
      }) ;

      const addOption = () => {
        let count = state.options.length+1 ;
        state.options.push({ name : '옵션 '+ count, value : 0 })
      }

      const changeNum = ( num ) => priceComma( parseFloat( num ).toFixed() ) ; 

      const resetHandler = () => {
        state.priceOrigin = 0 ;
        state.options = [{ name : '옵션 1' , value : 0 }] ;
      }
      
      return { 
        ...toRefs(state) ,
        addOption , 
        changeNum , 
        resetHandler , 
      } ;
    } ,

  }
</script>