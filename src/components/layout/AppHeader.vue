<template>
  <header class="header">
    <h1><router-link to="/">{{title}}</router-link></h1>
    <button type="button" class="btn-mobile-menu" @click="toggleMenu">모바일 메뉴 버튼</button>
    <div class="navWrap" :class="{ show : showMenu }">
      <nav><router-link v-for="(menu,idx) in menus" :key="idx" :to="menu.url">{{ menu.title }}</router-link></nav>
      <nav><router-link v-for="(menu,idx) in menus2" :key="idx" :to="menu.url">{{ menu.title }}</router-link></nav>
      <!-- <nav>
        <router-link to="/Message">자주 쓰는 메세지</router-link>
      </nav> -->
    </div> <!-- end of navWrap -->
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
          { url : '/ExcelConverter', title : '주문 엑셀 변환' } ,
          { url : '/Delivery', title : '배송완료일 확인' } , 
          { url : '/PersonalCustomsCode', title : '개인통관고유부호 일치확인' } , 
          { url : '/Unipass', title : '통관진행 정보확인' } ,
        ] , 
        menus2 : [
          { url : '/CalculatePrice', title : '스마트스토어 수수료 계산' } , 
          { url : '/SalePrice', title : '할인율 계산' } , 
          { url : '/OptionPrice', title : '옵션 가격차이 계산' } ,
        ] , 

        showMenu : false , 

      }) ;

      const toggleMenu = () => {
        state.showMenu = !state.showMenu ; 
      }
      return { 
        ...toRefs(state) ,
        toggleMenu
      } ;
    }
  }
</script>
