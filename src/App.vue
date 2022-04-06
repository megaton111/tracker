<template>
  <app-header :title="title"></app-header>
  <app-content></app-content>
</template>

<script>
import AppHeader from './components/layout/AppHeader' ; 
import AppContent from './components/layout/AppContent' ; 
export default {
  name: 'App',
  components : {
    AppHeader , 
    AppContent
  } ,
  data () {
    return {
      title : 'Tracker' ,
    }
  }
};
</script>