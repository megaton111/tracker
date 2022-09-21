<template>
  <div><t-input type="text" v-model="inputValue" @input="changeHandler" ref="inputTarget"></t-input></div>
</template>

<script>
  import { reactive, toRefs, ref } from 'vue';
  import { priceComma } from '@/utils';

  export default {
    name : 'TelChange' ,
    components : {
    } , 
    props : {
    } ,
    setup () {

      const inputTarget = ref( null ) ; 

      const state = reactive({
        // options : [ { name : '옵션 1' , value : 0 } ] ,
        inputValue : '' , // 원가
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
      
      return { 
        ...toRefs(state) ,
        addOption , 
        changeNum , 
        resetHandler , 
        changeHandler ,
        inputTarget
      } ;
    } ,



  }
</script>

<style lang="scss" scoped>
</style>