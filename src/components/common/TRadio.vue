<template>
  <div class="radio-group-wrap">
    <template v-if="label"><label class="label" :style="{ width : labelW + 'px' }">{{ label }}</label></template>
    <div class="radio-wrap" :style="{flexDirection:dir}">
      <template v-for="( item, idx ) in items" :key="idx">
        <div class="radio">
          <input type="radio" :name="unique" :id="item.value" :value="item.value" v-model="radioValues">
          <label :for="item.value">{{item.name}}</label>
        </div>
      </template>
      <!-- <div class="radio"><input type="radio" name="pay" id="p1" value="p1" v-model="radioValues"><label for="p1">신용카드</label></div> -->
    </div>
  </div>
</template>
<script>
  import { reactive, toRefs, watch } from 'vue';
  import { expando } from '@/utils';

  export default {
    name : 'TRadio' ,
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
          return expando('t-radio');
        },
      },
      items : {
        type : Array ,
      } , 
      dir : {
        type : String , 
        default : 'row' ,
      } ,
      modelValue: String,
    },
    setup( props, { emit } ) {
      const state = reactive({
        labelW : props.labelWidth ,
        radioValues : props.modelValue ,
      }) ;

      watch(
        () => state.radioValues,
        () => emit('update:modelValue', state.radioValues)
      );

      return { ...toRefs(state) } ;
    }
  }
</script>
