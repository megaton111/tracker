<template>
  <div class="flex flex-col gap-2">
    <div class=""><t-input type="text" v-model="cnyPrice" placeholder="가격"></t-input></div>
    <div class="text-right">{{ resultPrice }}원</div>
  </div>
</template>

<script>
  import { reactive, toRefs, watch } from 'vue';
  import { priceComma } from '@/utils';
  // import axios from 'axios';
  // import convert from 'xml-js' ;

  export default {
    name : 'CostChange' ,
    components : {
    } , 
    props : {
    } ,
    setup(  ) {
      const state = reactive({
        cnyPrice : null , 
        resultPrice : null ,
      }) ;

      watch(() => state.cnyPrice, ( newVal ) => {
        // state.resultPrice = Number( newVal * 300 ).toLocaleString() ; 
        state.resultPrice = priceComma( newVal * 300 ) ; 
      }) ;

      return { 
        ...toRefs(state) ,
      } ;
    } ,



  }
</script>

<style lang="scss" scoped>
.result{
  display: flex;
  align-items: center ;
  justify-content: flex-end;
  font-size: 14px ;
  font-weight: 700 ;
}
</style>