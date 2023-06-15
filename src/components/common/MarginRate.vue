<template>
  <div class="flex flex-col gap-1">
    <div class="flex gap-2">
      <div class="inline-flex items-center font-bold dark:text-gray-100">구매가격</div>
      <div class="inline-flex flex-1"><t-input type="text" placeholder="가격을 입력하세요." v-model="buyPrice"></t-input></div>
      <div class="inline-flex items-center dark:text-gray-100">원</div>
    </div>
    <div class="flex gap-2">
      <div class="inline-flex items-center font-bold dark:text-gray-100">판매가격</div>
      <div class="inline-flex flex-1"><t-input type="text" placeholder="가격을 입력하세요." v-model="salePrice"></t-input></div>
      <div class="inline-flex items-center dark:text-gray-100">원</div>
    </div>
    <div class="flex gap-2" v-if="!isNaN(marginRate)&&marginRate>0">
      <div class="inline-flex items-center font-bold dark:text-gray-100">마진율</div>
      <div class="inline-flex items-center justify-end flex-1">{{ marginRate }}%</div>
    </div>
  </div>
</template>

<script>
  import { reactive, toRefs, ref, computed, watch } from 'vue';
  import { priceComma } from '@/utils';
  import { copyText } from '@/utils';

  export default {
    name : 'TelChange' ,
    components : {
    } , 
    props : {
    } ,
    setup () {

      const inputTarget = ref( null ) ; 

      const state = reactive({
        inputValue : '' ,
        buyPrice : null ,   // 구매 가격
        salePrice : null , // 판매 가격 
        // marginRate : null , 
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

      const changeHandler = () => {
        state.inputValue = state.inputValue.replace(/-/gi, "").trim();
      }

      const copyHandler = ( target ) => {
        let copyTarget = document.querySelector( target ) ; 
        copyText( copyTarget )  ;
        state.inputValue = ''  ;
      } ;

      const marginRate = computed(() => {
        // return Number(state.buyPrice) + Number( state.salePrice ) ;
        let result = ( Number( state.salePrice ) - Number( state.buyPrice ) ) / Number( state.salePrice ) * 100 ; 
        return result.toFixed( 2 ) ;  
      }) ;

      // watch(
      //   () => state.buyPrice,
      //   () => console.log( 'buyPrice ing'  ,typeof state.buyPrice) 
      // );
      
      return { 
        ...toRefs(state) ,
        addOption , 
        changeNum , 
        resetHandler , 
        changeHandler ,
        inputTarget ,
        copyHandler ,
        marginRate
      } ;
    } ,



  }
</script>

<style lang="scss" scoped>
</style>