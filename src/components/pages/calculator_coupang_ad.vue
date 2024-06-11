<script setup>
import { reactive, toRefs, watch, ref, computed, defineProps } from 'vue';
import { ChevronDownIcon } from '@heroicons/vue/20/solid';
const props = defineProps({
  chatDataList: Object,
});

const state = reactive({
  priceValue : {
    sale : 0 ,            // 판매가
    buy :  0 ,            // 원가
    stockOpr : 1100 ,     // 입출고비 
    delivery : 1700 ,     // 배송비
    commission :  computed(() => parseInt( state.priceValue.sale ) - ( state.priceValue.sale * 0.88 ) ),  // 판매 수수료
    profitPrice : computed(() => state.priceValue.sale - state.priceValue.buy - state.priceValue.stockOpr - state.priceValue.delivery - state.priceValue.commission )
  } ,
  result : {
    minAdPercent : computed(() => Math.round( state.priceValue.sale / ( state.priceValue.sale - state.priceValue.buy - state.priceValue.stockOpr - state.priceValue.delivery - state.priceValue.commission ) * 1.1 * 100))
  }
}); 

const { priceValue, result } = toRefs(state);
</script>

<template>
  <div class="flex flex-col gap-2 sm:gap-4">
    <div class="flex gap-2">
      <div class="flex items-center w-24"><div class="text-style-section-head">판매가</div></div>
      <div class="flex flex-1"><input type="number" v-model="priceValue.sale" class="block w-full px-1 py-2 border border-gray-300 rounded-md shadow-sm outline-none outline-0 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-700 dark:text-gray-100"></div>
    </div>
    <div class="flex gap-2">
      <div class="flex items-center w-24"><div class="text-style-section-head">원가</div></div>
      <div class="flex flex-1"><input type="number" v-model="priceValue.buy" class="block w-full px-1 py-2 border border-gray-300 rounded-md shadow-sm outline-none outline-0 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-700 dark:text-gray-100"></div>
    </div>
    <div class="flex gap-2">
      <div class="flex items-center w-24"><div class="text-style-section-head">입출고비</div></div>
      <div class="flex flex-1"><input type="number" v-model="priceValue.stockOpr" class="block w-full px-1 py-2 border border-gray-300 rounded-md shadow-sm outline-none outline-0 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-700 dark:text-gray-100"></div>
    </div>
    <div class="flex gap-2">
      <div class="flex items-center w-24"><div class="text-style-section-head">배송비</div></div>
      <div class="flex flex-1"><input type="number" v-model="priceValue.delivery" class="block w-full px-1 py-2 border border-gray-300 rounded-md shadow-sm outline-none outline-0 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-700 dark:text-gray-100"></div>
    </div>
    <div class="flex gap-2">
      <div class="flex items-center w-24"><div class="text-style-section-head">마진</div></div>
      <div class="flex flex-1">{{ priceValue.profitPrice }}</div>
    </div>
    <div class="flex gap-2 pb-4 border-b border-gray-300 sm:pb-6">
      <div class="flex items-center w-24"><div class="text-style-section-head">쿠팡 수수료</div></div>
      <div class="flex flex-1">{{ priceValue.commission }}</div>
    </div>
  </div>

  <div class="flex flex-col gap-2 sm:gap-4">
    <div class="flex gap-2">
      최소 광고 수익율 : <strong>{{ result.minAdPercent }}%</strong>
    </div>
  </div>
</template>

<style lang="scss" scoped>
</style>