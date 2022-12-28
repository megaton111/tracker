<template>
  <div><t-input type="text" v-model="inputValue" ref="inputTarget"></t-input></div>
  <div class="flex items-center gap-1 mt-1" v-if="changeTel">
    <div id="textWrap" class="dark:text-gray-100">{{ changeTel }}</div>
    <button 
        type="button" 
        class="inline-flex justify-center px-2 py-1 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        @click="copyHandler('#textWrap'); open = false;"
      >복사</button>
  </div>
  <!-- <div><t-input type="text" v-model="telInput" @input="changeHandler" ref="inputTarget"></t-input></div> -->
  <!-- <div><t-input type="text" v-model="inputValue" @update:model-value="$emit('update:modelValue', $event)" ref="inputTarget"></t-input></div> -->
</template>

<script>
  import { reactive, toRefs, ref, computed } from 'vue';
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

      const changeTel = computed(() => {
        return state.inputValue.replace(/-/gi, "").trim();
      }) ;
      
      return { 
        ...toRefs(state) ,
        addOption , 
        changeNum , 
        resetHandler , 
        changeHandler ,
        inputTarget ,
        changeTel ,
        copyHandler
      } ;
    } ,



  }
</script>

<style lang="scss" scoped>
</style>