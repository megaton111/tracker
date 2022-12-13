<template>
  <div class="flex flex-col gap-3 w-full divide-gray-600/30 dark:divide-gray-600/70 divide-y"> 
    <div class="font-medium text-gray-900 font-bold"><h1>{{ contentTitle }}</h1></div>
    <div class="w-full space-y-6 pt-4">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import { reactive, toRefs } from 'vue';
  export default {
    name : 'ContentBox' ,
    props : {
      title : String ,
    } ,
    setup( props ) {
      const state = reactive({
        contentTitle : props.title ,
      }) ;
      return { 
        ...toRefs(state) ,
      } ;
    }
  }
</script>

<style lang="scss" scoped>

</style>