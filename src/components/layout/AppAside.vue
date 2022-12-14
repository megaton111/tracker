<template>
  
  <aside class="">
    
    <content-box title="환율정보" class="flex-1">
      <exchange :currency="[ 'USD', 'CNY' ]" />
    </content-box>

    <!-- <content-box title="배송대행 사이트" class="flex-1 bg-white">
      <rel-site 
        :currency="[ 'USD', 'CNY' ]" 
        :sites="sites"
      />
    </content-box> -->

    <!--  [중국가격X300] -->
    <!-- <content-box title="사입단가 계산" class="flex-1 bg-white">
      <cost-change />
    </content-box>

    <content-box title="전화번호 (-) 제거" class="flex-1 bg-white">
      <tel-change />
    </content-box> -->

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