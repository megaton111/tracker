<template>
  <header class="header">
    <h1><router-link to="/">{{title}}</router-link></h1>
    <nav>
      <router-link v-for="(menu,idx) in menus" :key="idx" :to="menu.url">{{ menu.title }}</router-link>
    </nav>
    <nav>
      <router-link to="/CalculatePrice">스마트스토어 수수료 계산</router-link>
      <router-link to="/SalePrice">할인율 계산</router-link>
    </nav>
    <!-- <nav>
      <router-link to="/Message">자주 쓰는 메세지</router-link>
    </nav> -->
  </header>
</template>
<script>
  import { reactive, toRefs } from 'vue';
  export default {
    name : 'AppHeader' ,
    props : {
      title : {
        type : String ,
        default: 'Site Name'
      }
    } ,
    setup( ) {
      const state = reactive({
        menus : [
          { url : '/Delivery', title : '배송완료일 확인' } , 
          { url : '/PersonalCustomsCode', title : '개인통관고유부호 일치확인' } , 
          { url : '/Unipass', title : '통관진행 정보확인' }
        ] , 
      }) ;
      return { ...toRefs(state) } ;
    }
  }
</script>
