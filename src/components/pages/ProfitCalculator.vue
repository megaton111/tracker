<template>
  
  <div class="flex flex-col gap-5 sm:gap-10">
    <top-description>
    마진계산기
    </top-description>

    <div class="flex flex-col gap-4">
      <div class="flex flex-col">
        <RadioGroup v-model="selectTab" class="w-80">
          <RadioGroupLabel class="sr-only">검색 방식을 선택하세요</RadioGroupLabel>
          <div class="flex flex-row gap-2">
            <RadioGroupOption 
              as="template" 
              v-for="tab in tabList" 
              :key="tab.name" 
              :value="tab" 
              v-slot="{ active, checked }"
            >
              <div :class="[active ? 'ring-2 ring-indigo-500 dark:ring-red-500' : '', 'bg-white dark:bg-gray-700 dark:border-gray-900 shadow-sm text-gray-900 dark:text-gray-50 cursor-pointer group relative border rounded-md py-3 px-4 flex items-center justify-center text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 ']">
                <RadioGroupLabel as="span">{{ tab.name }}</RadioGroupLabel>
                <span 
                  :class="[active ? 'border' : 'border-2', checked ? 'border-indigo-500 dark:border-red-500' : 'border-transparent', 'pointer-events-none absolute -inset-px rounded-md']" 
                  aria-hidden="true" 
                />
              </div>
            </RadioGroupOption>
          </div>
        </RadioGroup>
      </div>
    </div>


    <div class="flex flex-col gap-4 sm:gap-6" v-if="selectTab.value == '01'">
      
      <div class="flex flex-col gap-2 sm:gap-4">
        <div class="flex gap-2">
          <div class="flex items-center w-24"><div class="text-style-section-head">판매가</div></div>
          <div class="flex flex-1"><t-input type="text" v-model="calculator.salePrice"></t-input></div>
        </div>
        <div class="flex gap-2">
          <div class="flex items-center w-24"><div class="text-style-section-head">도매가</div></div>
          <div class="flex flex-1"><t-input type="text" v-model="calculator.buyPrice"></t-input></div>
        </div>
        <div class="flex gap-2">
          <div class="flex items-center w-24"><div class="text-style-section-head">배송비</div></div>
          <div class="flex flex-1"><t-input type="text" v-model="calculator.deliveryCharge"></t-input></div>
        </div>
        <div class="flex gap-2 pb-4 border-b border-gray-300 sm:pb-6">
          <div class="flex items-center w-24"><div class="text-style-section-head">마켓 수수료</div></div>
          <div class="flex flex-1"><t-input type="text" v-model="calculator.commissionPercent"></t-input></div>
        </div>
        <div class="flex gap-2 pb-4 border-b border-gray-300 sm:pb-6">
          <div class="flex items-center w-24"><div class="text-style-section-head">총 판매가</div></div>
          <!-- <div class="flex items-center justify-end flex-1"><span class="dark:text-gray-50 font-bold text-2xl">{{ result.totalSalePrice == 'NaN' ? '0' : result.totalSalePrice }}원</span></div> -->
          <div class="flex items-center justify-end flex-1"><span class="dark:text-gray-50 font-bold text-2xl">{{ result.totalSalePrice }}원</span></div>
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

    <div class="flex flex-col gap-4 sm:gap-6" v-else>
      <div class="flex flex-col gap-2 sm:gap-4">
        <div class="flex gap-2">
          <div class="flex items-center w-24"><div class="text-style-section-head">판매가</div></div>
          <div class="flex flex-1"><t-input type="text" v-model="coupangCalculator.salePrice"></t-input></div>
        </div>
        <div class="flex gap-2">
          <div class="flex items-center w-24"><div class="text-style-section-head">도매가</div></div>
          <div class="flex flex-1"><t-input type="text" v-model="coupangCalculator.buyPrice"></t-input></div>
        </div>
        <div class="flex gap-2">
          <div class="flex items-center w-24"><div class="text-style-section-head">입출고요금</div></div>
          <div class="flex flex-1"><t-input type="text" v-model="coupangCalculator.enterCharge"></t-input></div>
        </div>
        <div class="flex gap-2">
          <div class="flex items-center w-24"><div class="text-style-section-head">배송요금</div></div>
          <div class="flex flex-1"><t-input type="text" v-model="coupangCalculator.deliveryCharge"></t-input></div>
        </div>
        <div class="flex gap-2 pb-4 border-b border-gray-300 sm:pb-6">
          <div class="flex items-center w-24"><div class="text-style-section-head">마켓 수수료</div></div>
          <div class="flex flex-1"><t-input type="text" v-model="coupangCalculator.commissionPercent"></t-input></div>
        </div>
      </div>

      <div class="flex flex-col gap-2 sm:gap-4">
        <!-- <div class="flex gap-2 pb-2 border-b border-gray-300 sm:pb-4">
          <div class="flex items-center"><div class="text-style-section-head">배송비 수수료</div></div>
          <div class="flex items-center justify-end flex-1"><span class="dark:text-gray-50">{{ coupangResult.deliveryCommission }}원</span></div>
        </div> -->
        <div class="flex gap-2 pb-2 border-b">
          <div class="flex items-center"><div class="text-style-section-head">판매 수수료</div></div>
          <div class="flex items-center justify-end flex-1"><span class="dark:text-gray-50">{{ coupangResult.saleCommission }}원</span></div>
        </div>
        <div class="flex gap-2 pb-2 border-b">
          <div class="flex items-center"><div class="text-style-section-head">판매 수수료 VAT</div></div>
          <div class="flex items-center justify-end flex-1"><span class="dark:text-gray-50">{{ coupangResult.saleCommissionVat }}원</span></div>
        </div>
        <div class="flex gap-2 pb-2 border-b">
          <div class="flex items-center"><div class="text-style-section-head">부가세</div></div>
          <div class="flex items-center justify-end flex-1"><span class="dark:text-gray-50">{{ coupangResult.surtax }}원</span></div>
        </div>
        <div class="flex gap-2 pb-2 border-b">
          <div class="flex items-center"><div class="text-style-section-head">마진율</div></div>
          <div class="flex items-center justify-end flex-1"><span class="text-2xl font-bold text-blue-600 dark:text-yellow-200">{{ coupangProfitPercentResult }}%</span></div>
          <!-- <div class="flex items-center justify-end flex-1"><span class="text-2xl font-bold text-blue-600">{{ result.profitPercent }}%</span></div> -->
        </div>
        <div class="flex gap-2 pb-2 border-b">
          <div class="flex items-center"><div class="text-style-section-head">마진</div></div>
          <div class="flex items-center justify-end flex-1"><span class="text-2xl font-bold text-blue-600 dark:text-yellow-200">{{ coupangResult.profitPrice }}원</span></div>
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
    RadioGroup, 
    RadioGroupLabel, 
    RadioGroupOption ,
		Dialog, 
		DialogPanel, 
		DialogTitle, 
		TransitionChild, 
		TransitionRoot 
  } from '@headlessui/vue' ;
  import { ChevronDownIcon } from '@heroicons/vue/20/solid';

  export default {
    name : 'ProfitCalculator' ,
    components : {
      RadioGroup , 
      RadioGroupLabel , 
      RadioGroupOption  ,
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
          totalSalePrice : computed(() => (parseInt(state.calculator.salePrice) + parseInt(state.calculator.deliveryCharge) ) ) ,
          deliveryCommission : computed(() => (state.calculator.deliveryCharge * 0.033) ) , 
          saleCommission : computed(() => Math.floor( state.calculator.salePrice * state.calculator.commissionPercent / 100 ) ) , 
          // surtax : computed(() => Math.floor( (state.calculator.salePrice/1.1*0.1) - (state.calculator.buyPrice/1.1*0.1) ) ) ,
          surtax : computed(() => Math.round( (state.calculator.salePrice) - (state.calculator.salePrice/1.1) ) ) ,
          profitPrice : computed(() => Math.floor( state.calculator.salePrice - state.calculator.buyPrice - state.result.saleCommission - state.result.deliveryCommission - state.result.surtax ) ) ,
          profitPercent : computed(() => Math.floor( state.result.profitPrice / state.calculator.salePrice * 100 ) ) ,
        } ,

        coupangCalculator : {
          buyPrice :  '' ,
          salePrice :  '' ,
          commissionPercent :  '',
          deliveryCharge :  '' ,
          enterCharge : '' , 
        } ,
        coupangResult : {
          totalSalePrice : computed(() => (state.coupangCalculator.salePrice + state.coupangCalculator.deliveryCharge) ) ,
          saleCommission : computed(() => Math.floor( state.coupangCalculator.salePrice * state.coupangCalculator.commissionPercent / 100 ) ) , 
          saleCommissionVat : computed(() => Math.round( Math.floor( state.coupangCalculator.salePrice * state.coupangCalculator.commissionPercent / 100 ) * 0.1 ) ) , 
          // surtax : computed(() => Math.floor( (state.coupangCalculator.salePrice * state.coupangCalculator.commissionPercent / 100) * 0.1 ) ) , 
          surtax : computed(() => Math.round( (state.coupangCalculator.salePrice) - (state.coupangCalculator.salePrice/1.1) ) ) ,
          // profitPrice : computed(() => Math.floor( state.coupangCalculator.salePrice - state.coupangCalculator.buyPrice - parseInt(state.result.enterCharge) - parseInt(state.result.deliveryCharge) - parseInt(state.result.saleCommission) - parseInt(state.result.surtax)  ) ) ,
          profitPrice : computed(() => {
            return Math.floor( 
              state.coupangCalculator.salePrice - 
              state.coupangCalculator.buyPrice - 
              state.coupangCalculator.enterCharge - 
              state.coupangCalculator.deliveryCharge -
              state.coupangResult.saleCommission -
              state.coupangResult.saleCommissionVat -
              state.coupangResult.surtax
            );
          }) ,
          profitPercent : computed(() => Math.floor( state.coupangResult.profitPrice / state.coupangCalculator.salePrice * 100 ) ) ,
        }
      }) ;

      // 탭 리스트
      const tabList = [
        { name: '일반판매', value: '01' },
        { name: '로켓그로스', value: '02' },
      ] ;

      // 선택된 탭
      const selectTab = ref(tabList[0]) ;

      const profitPercentResult = computed(() => {
        return !isFinite( state.result.profitPercent ) ? '0' : state.result.profitPercent;
      }) ;

      const totalSalePriceResult = computed(() => {
        return !isNaN( state.result.totalSalePrice ) ? '0' : state.result.totalSalePrice;
      }) ;

      const coupangProfitPercentResult = computed(() => {
        return !isFinite( state.coupangResult.profitPercent ) ? '0' : state.coupangResult.profitPercent;
      }) ;

      return { 
        ...toRefs(state) ,
        profitPercentResult ,
        totalSalePriceResult ,
        tabList , 
        selectTab ,
        coupangProfitPercentResult
      } ;
    } ,

  }
</script>
<style lang="scss">
</style>