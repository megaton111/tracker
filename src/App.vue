<template>

  <Header />
  <div class="container" id="container"><router-view /></div>

</template>

<script>
// import axios from 'axios';
// import { reactive, toRefs } from 'vue';
import Header from './components/common/Header' ; 
export default {
  name: 'App',
  components : {
    Header
  } ,
  setup () {

  } ,
};
</script>