import { createApp } from 'vue' ;
import App from './App.vue';
import store from "./store";
import router from './routes' ;
import "@/assets/scss/_index.scss";
import TopDescription from './components/layout/TopDescription' ; 
import loading from './components/common/loading' ; 
import TSelect from './components/common/TSelect';
import TTextarea from './components/common/TTextarea';
import TInput from './components/common/TInput';
import TRadio from './components/common/TRadio';
import TTab from './components/common/TTab';

const app = createApp(App);

app.component( "TopDescription", TopDescription ) ;
app.component( "loading", loading ) ;
app.component( "TSelect", TSelect ) ;
app.component( "TTextarea", TTextarea ) ;
app.component( "TInput", TInput ) ;
app.component( "TRadio", TRadio ) ;
app.component( "TTab", TTab ) ;

app
  .use(store)
  .use(router)
  .mount("#app");