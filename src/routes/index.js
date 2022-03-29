import { createWebHistory, createRouter } from "vue-router";
import Delivery from "@/components/pages/Delivery.vue";
import PersonalCustomsCode from "@/components/pages/PersonalCustomsCode.vue";
import Unipass from "@/components/pages/Unipass.vue";
import Message from "@/components/pages/Message.vue";

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
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;