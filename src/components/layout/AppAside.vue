<template>
  
  <aside class="aside">
    
    <content-box title="환율정보">
      <exchange :currency="[ 'USD', 'CNY' ]" />
    </content-box>

    <content-box title="사입단가 계산 [중국가격X300]">
      <cost-change />
    </content-box>

    <content-box title="전화번호 (-) 제거">
      <tel-change />
    </content-box>

    <!-- <content-box title="이름 영문변환">
      <eng-change />
    </content-box> -->

  </aside> <!-- end of aside -->

</template>
<script>
  import { reactive, toRefs } from 'vue';
  export default {
    name : 'AppAside' ,
    components : {
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