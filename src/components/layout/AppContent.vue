<template>
  <!-- <div class="container" id="container">
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in" appear>
          <component :is="Component"></component>
      </transition>
    </router-view>
  </div> -->

  <!-- <div class="container" id="container">
    <transition name="scale" mode="out-in">
      <router-view>
      </router-view>
    </transition>
  </div> -->

  <div class="container" id="container">
    <router-view v-slot="{ Component }">
      <transition name="scale" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>

</template>
<script>
  export default {
    name : 'AppContent' ,
  }
</script>

<style lang="scss" scoped>

// scale

.scale-enter-active,
.scale-leave-active {
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1) ;
}
.scale-enter-from,
.scale-leave-to {
  opacity: 0;
  transform: scale(.95);
}


// fade 

.fade-enter-active,
.fade-leave-active {
  transition-duration: 2s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0
}

.fade-leave-to {
  opacity: 0 ;
}

// scale-slide

.scale-slide-enter-active,
.scale-slide-leave-active {
  position: absolute;
  transition: all 0.85s ease;
}
.scale-slide-enter-from {
  left: -100%;
}
.scale-slide-enter-to {
  left: 0%;
}
.scale-slide-leave-from {
  transform: scale(1);
}

//  slide-down 

.slide-down-enter-active,
.slide-down-leave-active {
  position: absolute;
  transition: all 0.85s cubic-bezier(0.16, 1, 0.3, 1);
}
.slide-down-enter-from {
  top: -100px;
}
.slide-down-enter-to {
  top: 0%;
}
.slide-down-leave-to {
  position: absolute;
  top: 100px;
  transition: all 0.85s cubic-bezier(0.16, 1, 0.3, 1);
}
.slide-down-leave-from {
  position: absolute;
  top: 100px;
  transition: all 0.85s cubic-bezier(0.16, 1, 0.3, 1);
  // transform: scale(1);
  // transition: all 0.85s ease;
  // top: 100px ; 
}
</style>