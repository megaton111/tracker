<template>
  <div class="flex flex-col w-full gap-2 divide-y sm:gap-2 divide-gray-600/30 dark:divide-gray-500"> 
    <div class="font-bold text-gray-900 dark:text-gray-100"><h1 class="text-sm sm:text-lg">{{ contentTitle }}</h1></div>
    <div class="w-full pt-1 sm:pt-4">
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