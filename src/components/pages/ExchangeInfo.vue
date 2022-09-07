<template>
  <div class="contWrap">
    <div class="sectionWrap simpleFunc">

      <section class="enter">
        <div class="row">
          <div class="col">
            <GChart
              type="AreaChart"
              :data="chartData"
              :options="chartOptions"
            />
            <!-- <t-input type="text" label="전화번호 (-) 제거" v-model="inputValue" @input="changeHandler" ref="inputTarget"></t-input> -->
          </div>
          <!-- 010-1234-8907 -->
        </div>
        <!-- <div class="row">
          <div class="col btns">
            <button type="button" @click="addOption">옵션 추가</button>
          </div>
        </div> -->
      </section>


    </div> <!-- end of sectionWrap -->
  </div>
</template>

<script>
  import { reactive, toRefs } from 'vue';
  import { GChart } from 'vue-google-charts'

  export default {
    name : 'ExchangeInfo' ,
    components: {
      GChart
    } ,
    setup () {

      const state = reactive({
        chartData: [
          ['Year', 'USD' ],
          ['2001', 940 ],
          ['2002', 955 ],
          ['2003', 1000 ],
          ['2004', 955 ],
          ['2005', 951 ],
          ['2006', 955 ],
          ['2007', 960 ],
          ['2008', 975 ],
          ['2009', 970 ],
          ['2010', 980 ],
          ['2011', 999 ],
          ['2012', 840 ],
          ['2013', 1200 ],
          ['2014', 980 ],
          ['2015', 1170 ],
          ['2016', 660 ],
          ['2017', 1030 ]
        ],
        chartOptions: {
          chart: {
            title: 'Company Performance',
            subtitle: 'Sales, Expenses, and Profit: 2014-2017',
          }
        }
      }) ;

      return { 
        ...toRefs(state) ,
      } ;
    } ,

  }
</script>