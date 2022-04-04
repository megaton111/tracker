<template>
  <header class="header">
    <h1><router-link to="/">Tracker</router-link></h1>
    <nav>
      <router-link to="/Delivery">배송완료일 체크</router-link>
      <router-link to="/PersonalCustomsCode">개인통관고유부호 검증</router-link>
      <router-link to="/Unipass">통관진행정보</router-link>
    </nav>
    <!-- <nav>
      <router-link to="/Message">자주 쓰는 메세지</router-link>
    </nav> -->
  </header>
</template>
<script>
  export default {
    name : 'Header' ,
  }
</script>
