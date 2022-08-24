<template>
  <div class="contWrap">
    <div class="sectionWrap simpleFunc">

      <section class="enter">
        <div class="row">
          <div class="col">
            <t-input type="text" label="전화번호 (-) 제거" v-model="inputValue" @input="changeHandler" ref="inputTarget"></t-input>
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
  import { reactive, toRefs, ref } from 'vue';
  import { priceComma } from '@/utils';
  export default {
    name : 'OptionPrice' ,
    setup () {

      const inputTarget = ref( null ) ; 

      const state = reactive({
        // options : [ { name : '옵션 1' , value : 0 } ] ,
        inputValue : '' , // 원가
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
      
      return { 
        ...toRefs(state) ,
        addOption , 
        changeNum , 
        resetHandler , 
        changeHandler ,
        inputTarget
      } ;
    } ,

  }
</script>