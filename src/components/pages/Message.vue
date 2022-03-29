<template>
  <div class="sectionWrap">
    message
  </div> <!-- end of sectionWrap -->
</template>

<script>
  import { reactive, toRefs } from 'vue';

  export default {
    name : 'Message' ,
    
    components : {
      // loading
    } ,

    setup () {
      const state = reactive({
      }) ;
      
      return { ...toRefs(state) } ;
    } ,
  }
</script>