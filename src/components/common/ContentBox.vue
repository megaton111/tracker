<template>
  <div class="row fix">
      <div class="col" style="--gap-col:10px"> 
        <div class="row fix"><h1>{{ contentTitle }}</h1></div>
        <div class="row fix">
          <slot></slot>
        </div>
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