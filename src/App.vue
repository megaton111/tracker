<template>

  <header class="header">
    <h1>Tracker</h1>
    <nav>
      <router-link to="/Delivery">배송완료일 체크</router-link>
      <router-link to="/PersonalCustomsCode">개인통관고유부호 검증</router-link>

      <!-- <button type="button">배송완료일 체크</button> -->
      <!-- <button type="button">개인통관고유부호 검증</button> -->
    </nav>
  </header>

  <router-view />

</template>

<script>
// import axios from 'axios';
// import { reactive, toRefs } from 'vue';
// import loading from './components/common/loading' ; 
export default {
  name: 'App',
  components : {
    // loading
  } ,
  setup () {

  } ,
};
</script>