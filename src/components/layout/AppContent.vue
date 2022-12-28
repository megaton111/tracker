<template>

  <div class="flex flex-1 dark:bg-gray-800">
    <!-- <div class="grid items-start flex-1 max-w-4xl grid-cols-10 gap-4 px-2 px-4 py-10 mx-auto sm:px-6 lg:px-8 lg:max-w-6xl sm:">
      <app-aside class="col-span-2 mx-auto max-w-[40rem] lg:mx-0 lg:max-w-none lg:flex-none"></app-aside>
      <div class="col-span-8 min-w-0 max-w-[40rem] lg:mt-0 lg:ml-0 lg:ml-16 lg:max-w-[50rem] lg:flex-auto prose-sm prose prose-slate prose-a:font-semibold prose-a:text-sky-500 hover:prose-a:text-sky-600">
        <router-view v-slot="{ Component }">
          <transition name="scale" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </div>
    </div> -->

    <div class="flex flex-col items-start flex-1 max-w-4xl gap-5 px-2 px-4 py-5 mx-auto sm:gap-10 sm:py-10 sm:px-6 lg:px-8 lg:max-w-6xl sm:flex-row ">
      <app-aside class="flex flex-col items-start w-full gap-6 p-3 mx-auto border border-gray-200 grow-0 shrink-0 sm:w-52 bg-gray-50 sm:bg-transparent sm:p-0 sm:border-0"></app-aside>
      <div class="flex flex-col flex-1 min-w-0 w-full max-w-[40rem] lg:mt-0 lg:max-w-[50rem] hover:prose-a:text-sky-600">
        <router-view v-slot="{ Component }">
          <!-- <transition name="scale" mode="out-in"> -->
            <component :is="Component" />
          <!-- </transition> -->
        </router-view>
      </div>
    </div>

  </div>

</template>
<script>
  import AppAside from '../layout/AppAside' ; 
  export default {
    name : 'AppContent' ,
    components : {
    AppAside
  } ,
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
  // transform: scale(.5);
}


// fade 
.fade-enter-active,
.fade-leave-active {
  transition-duration: 1s;
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