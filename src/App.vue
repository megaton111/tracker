<template>
  <app-header :title="title"></app-header>
  <!-- <app-aside></app-aside> -->
  <app-content></app-content>
</template>

<script>
import AppHeader from './components/layout/AppHeader' ; 
import AppContent from './components/layout/AppContent' ; 
// import AppAside from './components/layout/AppAside' ; 
export default {
  name: 'App',
  components : {
    AppHeader , 
    AppContent ,
    // AppAside
  } ,
  data () {
    return {
      title : 'Tracker' ,
    }
  }
};
</script>