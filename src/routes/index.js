import { createWebHistory, createRouter } from "vue-router";
import Delivery from "@/components/pages/Delivery.vue";
import PersonalCustomsCode from "@/components/pages/PersonalCustomsCode.vue";

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
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;