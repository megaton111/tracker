<template>
  <template v-if="label"><label class="label" :for="unique" :style="{ minWidth : labelW + 'px' }">{{ label }}</label></template>
  <input 
    :type="type" 
    v-model="textValue" 
    :id="unique" 
    :placeholder="placeholder" 
    :class="setClass" 
    @input="$emit('update:modelValue',$event.target.value)"
    class="block w-full px-1 py-2 border border-gray-300 rounded-md shadow-sm outline-none outline-0 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-700 dark:text-gray-100" />
  <template v-if="unit"><span class="unit">{{ unit }}</span></template>
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
