<template>
  <div class="tabs">
    <template v-for="(item, index) in items" :key="item">
      <button type="button" 
      @click="click(index)"
      :class="{ active: isActive(index) }">{{ item }}</button>
    </template>
      
  </div>
</template>
<script>
  import { reactive, toRefs } from 'vue';

  export default {
    name : 'tTab' ,
    props: {
      items: {
        type: Array,
        default: () => {
          return [] ; 
        },
      },
      modelValue : {
        type : Number ,
        default : 0,
      }
    },
    setup( props, { emit } ) {
      const state = reactive({
      }) ;

      const click = (index) => {
        emit('update:modelValue', index);
      };

      const isActive = (index) => {
        return props.modelValue === index;
      };

      return { 
        ...toRefs(state), 
        click, 
        isActive
      } ;
    }
  }
</script>
