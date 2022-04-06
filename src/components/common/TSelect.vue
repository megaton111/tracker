<template>
  <div class="select-wrap">
    <template v-if="label"><label class="label" :for="unique">{{ label }}</label></template>
    <select :id="unique" v-model="selectedValue">
      <template v-for="(item, idx) in options" :key="idx">
        <option :value="item.value">{{ item.name }}</option>
      </template>
    </select>
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
      options : {
        type : Array , 
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
        selectedValue : props.modelValue , 
        options : props.options , 
      }) ;
      watch(
        () => state.selectedValue,
        () => emit('update:modelValue', state.selectedValue)
      );

      return { ...toRefs(state) } ;
    }
  }
</script>
