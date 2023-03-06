<template>
  <textarea 
    rows="5" 
    v-model="text" 
    class="block w-full px-2 py-2 border border-gray-300 border-solid rounded-md shadow-sm outline-none focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm outline-0 dark:bg-gray-700 dark:border-gray-700 dark:text-gray-100" 
    :placeholder="placeholder"
  />
</template>
<script>
  import { reactive, toRefs, watch } from 'vue';
  import { expando } from '@/utils';

  export default {
    name : 'tSelect' ,
    props: {
      label: {
        type: String,
        default: '',
      },
      placeholder : {
        type : String , 
        default : '내용을 입력하세요',
      } ,
      unique: {
        type: String,
        default: () => {
          return expando('t-select');
        },
      },
      modelValue: [String, Number, Object],
    },
    setup( props, { emit } ) {
      const state = reactive({
        text : props.modelValue 
      }) ;

      watch(
        () => state.text,
        () => emit('update:modelValue', state.text)
      );

      return { ...toRefs(state) } ;
    }
  }
</script>
