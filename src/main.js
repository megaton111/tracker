import { createApp } from 'vue' ;
import App from './App.vue';
import store from "./store";
import router from './routes' ;
import "@/assets/scss/_index.scss";

const app = createApp(App);

app
  .use(store)
  .use(router)
  .mount("#app");