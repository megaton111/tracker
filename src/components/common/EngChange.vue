<template>
  <div>
    <t-input 
      type="text" 
      v-model="inputValue" 
      @input="changeHandler" 
      ref="inputTarget"
      placeholder="이름을 복사해서 넣으세요"
    >
    </t-input>
  </div>
  <!-- <div><button type="button" @click="testHandler">테스트</button></div> -->
</template>

<script>
  import { reactive, toRefs, ref } from 'vue';
  import axios from 'axios';

  const CLIENTID = 'OXXfyyRzb3HjCoylCjlx' ;
  const CLIENTSECRET = '2ZHW5la2HP' ;
  // import { priceComma } from '@/utils';

  export default {
    name : 'EngChange' ,
    components : {
    } , 
    props : {
    } ,
    setup () {

      const inputTarget = ref( null ) ; 

      const state = reactive({
        inputValue : '' , // 원가
      }) ;

      const changeHandler = () => {
        changeEngKor( state.inputValue ) ; 
      }

      const changeEngKor = ( text ) => {

        if( text.replace(/ /g, '').length < 1 ) return ;

        axios.get( '/v1/krdict/romanization?query=' + encodeURI( text ), {
          headers: {
            'X-Naver-Client-Id':CLIENTID, 
            'X-Naver-Client-Secret': CLIENTSECRET
          },
        } )
        .then(( res ) => {
          state.inputValue = res.data.aResult[0].aItems[0].name.replace(/ /g, ''); 
        })
        .catch( error => {
          console.log( 'error : ', error ) ; 
          state.inputValue = '조회된 결과가 없습니다.' ;
        })
      }
      
      return { 
        ...toRefs(state) ,
        changeHandler ,
        changeEngKor , 
        inputTarget
      } ;
    } ,



  }
</script>

<style lang="scss" scoped>
</style>