<template>
  
  <aside class="aside">
    <div class="row fix">
      <div class="col" style="--gap-col:10px"> 
        <div class="row fix"><h1>환율 정보</h1></div>
        <div class="row fix">
          <exchange :currency="[ 'USD', 'CNH' ]" />
        </div>
      </div>
    </div>
    <!-- <div class="row fix">
      <div class="col" style="--gap-col:10px">
        <div class="row fix"><h1>krw</h1></div>
        <div class="row fix">adfsdfsdf</div>
      </div>
    </div> -->
  </aside> <!-- end of aside -->

</template>
<script>
  import { reactive, toRefs } from 'vue';
  import Exchange from '../common/Exchange' ;
  export default {
    name : 'AppAside' ,
    components : {
      Exchange
    } , 
    props : {
    } ,
    setup( ) {
      const state = reactive({
      }) ;

      

      return { 
        ...toRefs(state) ,
      } ;
    }
  }
</script>