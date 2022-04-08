<template>
  <div class="container" id="container">
    <!-- <transition
      name="fade"
      mode="out-in"
    >
      <router-view />
    </transition> -->
    <router-view />
  </div>
</template>
<script>
  export default {
    name : 'AppContent' ,
  }
</script>