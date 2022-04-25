<template>
  <div class="input-wrap">
    <template v-if="label"><label class="label" :for="unique" :style="{ width : labelW + 'px' }">{{ label }}</label></template>
    <input :type="type" v-model="textValue" :id="unique" :placeholder="placeholder" :class="setClass" />
    <template v-if="unit"><span class="unit">{{ unit }}</span></template>
  </div>
</template>
<script>
  import { reactive, toRefs, watch } from 'vue';
  import { expando } from '@/utils';
  export default {
    name : 'TInput' ,
    props: {
      label: {
        type: String,
        default: '',
      },
      unit: {
        type: String,
        default: '',
      },
      labelWidth: {
        type: String,
        default: 'auto',
      },
      type : {
        type : String , 
        default : 'text' ,
      } ,
      placeholder : {
        type : String , 
        default : '입력하세요' ,
      } ,
      unique: {
        type: String,
        default: () => {
          return expando('t-input');
        },
      },
      setClass : {
        type : String ,
        default : '' , 
      } ,
      modelValue: String,
    },
    setup( props, { emit } ) {
      const state = reactive({
        labelW : props.labelWidth ,
        textValue : props.modelValue ,
      }) ;

      const textChanged = ({ target }) => {
        console.log( 'target : ', target ) ; 
        state.textValue = target.value;
      };

      // 데이터 상호작용을 위한 코드(부모와 자식간 데이터 동기화 처리)
      watch(
        () => props.modelValue,
        () => (state.textValue = props.modelValue)
      );
      
      watch(
        () => state.textValue,
        () => emit('update:modelValue', state.textValue)
      );


      return { ...toRefs(state), textChanged } ;
    }
  }
</script>
