import { createWebHistory, createRouter } from "vue-router" ;
import Delivery from "@/components/pages/Delivery.vue" ;
import PersonalCustomsCode from "@/components/pages/PersonalCustomsCode.vue" ;
import Unipass from "@/components/pages/Unipass.vue" ;
import Message from "@/components/pages/Message.vue" ;
import CalculatePrice from "@/components/pages/CalculatePrice.vue" ;
import SalePrice from "@/components/pages/SalePrice.vue" ;
import OptionPrice from "@/components/pages/OptionPrice.vue" ;
import ExcelConverter from "@/components/pages/ExcelConverter.vue" ;
// import SimpleFunction from "@/components/pages/SimpleFunction.vue" ;
import OrderInit from "@/components/pages/OrderInit.vue" ;
import ExchangeInfo from "@/components/pages/ExchangeInfo.vue" ;
import KeywordSeller from "@/components/pages/KeywordSeller.vue" ;
import SiteList from "@/components/pages/SiteList.vue" ;
import ProfitCalculator from "@/components/pages/ProfitCalculator.vue" ;
import calculator from "@/components/pages/calculator.vue" ;

const routes = [
  {
    path: "/",
    redirect: '/OrderInit' 
    // name: "Home",
    // component: Home,
  },
  {
    path: "/OrderInit",
    name: "OrderInit",
    component: OrderInit,
  },
  {
    path: "/Delivery",
    name: "Delivery",
    component: Delivery,
  },
  {
    path: "/PersonalCustomsCode",
    name: "PersonalCustomsCode",
    component: PersonalCustomsCode,
  },
  {
    path: "/Unipass",
    name: "Unipass",
    component: Unipass,
  },
  {
    path: "/Message",
    name: "Message",
    component: Message,
  },
  {
    path: "/CalculatePrice",
    name: "CalculatePrice",
    component: CalculatePrice,
  },
  {
    path: "/SalePrice",
    name: "SalePrice",
    component: SalePrice,
  },
  {
    path: "/OptionPrice",
    name: "OptionPrice",
    component: OptionPrice,
  },
  {
    path: "/ExcelConverter",
    name: "ExcelConverter",
    component: ExcelConverter,
  },
  {
    path: "/ProfitCalculator",
    name: "ProfitCalculator",
    component: ProfitCalculator,
  },
  {
    path: "/calculator",
    name: "calculator",
    component: calculator,
  },
  {
    path: "/ExchangeInfo",
    name: "ExchangeInfo",
    component: ExchangeInfo,
  },
  {
    path: "/KeywordSeller",
    name: "KeywordSeller",
    component: KeywordSeller,
  },
  {
    path: "/SiteList",
    name: "SiteList",
    component: SiteList,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  // linkActiveClass: "bg-gray-900 text-white",
  linkActiveClass : "text-gray-900 dark:text-gray-100", 
  linkExactActiveClass: "route-active"
});

export default router;