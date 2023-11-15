<template>
  
  <div class="flex flex-col gap-5 sm:gap-10">
    <top-description>
    마진계산기
    </top-description>


    <div class="flex flex-col gap-4 sm:gap-6 w-[100px]">
      
      <div class="flex flex-col gap-2 sm:gap-4">
        <div class="flex gap-2">
          <div class="flex items-center"><div class="text-style-section-head">도매가</div></div>
          <div class="flex flex-1"><t-input type="text" v-model="calculator.buyPrice"></t-input></div>
          <div class="flex items-center"><div class="text-style-section-head">판매가</div></div>
          <div class="flex flex-1"><t-input type="text" v-model="calculator.salePrice"></t-input></div>
        </div>
        <div class="flex gap-2 pb-4 border-b border-gray-300 sm:pb-6">
          <div class="flex items-center"><div class="text-style-section-head">수수료</div></div>
          <div class="flex flex-1"><t-input type="text" v-model="calculator.commissionPercent"></t-input></div>
          <div class="flex items-center"><div class="text-style-section-head">배송비</div></div>
          <div class="flex flex-1"><t-input type="text" v-model="calculator.deliveryCharge"></t-input></div>
        </div>
      </div>

      <div class="flex flex-col gap-2 sm:gap-4">
        <div class="flex gap-2 pb-2 border-b border-gray-300 sm:pb-4">
          <div class="flex items-center"><div class="text-style-section-head">배송비 수수료</div></div>
          <div class="flex items-center justify-end flex-1"><span class="dark:text-gray-50">{{ result.deliveryCommission }}원</span></div>
        </div>
        <div class="flex gap-2 pb-2 border-b">
          <div class="flex items-center"><div class="text-style-section-head">판매 수수료</div></div>
          <div class="flex items-center justify-end flex-1"><span class="dark:text-gray-50">{{ result.saleCommission }}원</span></div>
        </div>
        <div class="flex gap-2 pb-2 border-b">
          <div class="flex items-center"><div class="text-style-section-head">부가세</div></div>
          <div class="flex items-center justify-end flex-1"><span class="dark:text-gray-50">{{ result.surtax }}원</span></div>
        </div>
        <div class="flex gap-2 pb-2 border-b">
          <div class="flex items-center"><div class="text-style-section-head">마진율</div></div>
          <div class="flex items-center justify-end flex-1"><span class="text-2xl font-bold text-blue-600 dark:text-yellow-200">{{ profitPercentResult }}%</span></div>
          <!-- <div class="flex items-center justify-end flex-1"><span class="text-2xl font-bold text-blue-600">{{ result.profitPercent }}%</span></div> -->
        </div>
        <div class="flex gap-2 pb-2 border-b">
          <div class="flex items-center"><div class="text-style-section-head">마진</div></div>
          <div class="flex items-center justify-end flex-1"><span class="text-2xl font-bold text-blue-600 dark:text-yellow-200">{{ result.profitPrice }}원</span></div>
        </div>
      </div>

    </div>


  </div>
</template>

<script>
  import { reactive, toRefs, watch, ref, computed } from 'vue';
  import { 
    Menu, 
    MenuButton, 
    MenuItem, 
    MenuItems, 
    Dialog, 
    DialogPanel, 
    DialogTitle, 
    TransitionChild, 
    TransitionRoot 
  } from '@headlessui/vue';
  import { ChevronDownIcon } from '@heroicons/vue/20/solid';

  export default {
    name : 'ProfitCalculator' ,
    components : {
    } ,
    setup () {

      const state = reactive({
        calculator : {
          buyPrice :  '' ,
          salePrice :  '' ,
          commissionPercent :  '',
          deliveryCharge :  '3000' ,
        } ,
        result : {
          deliveryCommission : computed(() => (state.calculator.deliveryCharge * 0.033).toLocaleString() ) , 
          saleCommission : computed(() => Math.floor( state.calculator.salePrice * state.calculator.commissionPercent / 100 ).toLocaleString() ) , 
          surtax : computed(() => Math.floor( (state.calculator.salePrice/1.1*0.1) - (state.calculator.buyPrice/1.1*0.1) ).toLocaleString() ) ,
          profitPercent : computed(() => Math.floor( state.result.profitPrice / state.calculator.salePrice * 100 ) ) ,
          profitPrice : computed(() => Math.floor( state.calculator.salePrice - state.calculator.buyPrice - parseInt(state.result.saleCommission) - parseInt(state.result.deliveryCommission) - parseInt(state.result.surtax) ).toLocaleString() ) ,
        }
      }) ;

      const profitPercentResult = computed(() => {
        return !isFinite( state.result.profitPercent ) ? '0' : state.result.profitPercent;
      }) ;

      return { 
        ...toRefs(state) ,
        profitPercentResult ,
      } ;
    } ,

  }
</script>
<style lang="scss">
</style>