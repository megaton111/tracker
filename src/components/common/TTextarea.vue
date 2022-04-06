<template>
  <div class="textarea-wrap">
    <template v-if="label"><label class="label" :for="unique">{{ label }}</label></template>
    <textarea :placeholder="placeholder" v-model="text" :id="unique"></textarea>
  </div>
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
