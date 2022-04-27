import { createWebHistory, createRouter } from "vue-router" ;
import Delivery from "@/components/pages/Delivery.vue" ;
import PersonalCustomsCode from "@/components/pages/PersonalCustomsCode.vue" ;
import Unipass from "@/components/pages/Unipass.vue" ;
import Message from "@/components/pages/Message.vue" ;
import CalculatePrice from "@/components/pages/CalculatePrice.vue" ;
import SalePrice from "@/components/pages/SalePrice.vue" ;
import OptionPrice from "@/components/pages/OptionPrice.vue" ;

const routes = [
  {
    path: "/",
    redirect: '/Delivery' 
    // name: "Home",
    // component: Home,
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
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;