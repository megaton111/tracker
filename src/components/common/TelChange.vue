<template>
  <div><t-input type="text" v-model="inputValue"></t-input></div>
  <div class="flex items-center gap-1 mt-1" v-if="changeTel">
    <div id="textWrap" class="dark:text-gray-100">{{ changeTel }}</div>
    <button 
        type="button" 
        class="inline-flex justify-center px-2 py-1 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        @click="copyHandler('#textWrap');"
      >복사</button>
  </div>
</template>

<script>
  import { reactive, toRefs, ref, computed } from 'vue';
  import { copyText } from '@/utils';
  export default {
    name : 'TelChange' ,
    components : {} , 
    props : {} ,
    setup () {

      const state = reactive({
        inputValue : '' ,
      }) ;

      const copyHandler = ( target ) => {
        let copyTarget = document.querySelector( target ) ; 
        copyText( copyTarget )  ;
        state.inputValue = ''  ;
      } ;

      const changeTel = computed(() => state.inputValue.replace(/-/gi, "").trim()) ;
      
      return { 
        ...toRefs(state) ,
        changeTel ,
        copyHandler
      } ;
    } ,



  }
</script>
<style lang="scss" scoped>
</style>