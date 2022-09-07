<template>
  <div class="contWrap">
    <div class="sectionWrap simpleFunc">

      <section class="enter">
        <div class="row">
          <div class="col">
            ExchangeInfo
            <!-- <t-input type="text" label="전화번호 (-) 제거" v-model="inputValue" @input="changeHandler" ref="inputTarget"></t-input> -->
          </div>
          <!-- 010-1234-8907 -->
        </div>
        <!-- <div class="row">
          <div class="col btns">
            <button type="button" @click="addOption">옵션 추가</button>
          </div>
        </div> -->
      </section>


    </div> <!-- end of sectionWrap -->
  </div>
</template>

<script>
  import { reactive, toRefs } from 'vue';
  export default {
    name : 'ExchangeInfo' ,
    setup () {

      const state = reactive({
      }) ;

      return { 
        ...toRefs(state) ,
      } ;
    } ,

  }
</script>