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
import Exchange from './components/common/Exchange';
import ContentBox from './components/common/ContentBox';
import CostChange from './components/common/CostChange';
import TelChange from './components/common/TelChange';
import EngChange from './components/common/EngChange';
import RelSite from './components/common/RelSite';
import MarginRate from './components/common/MarginRate';

const app = createApp(App);

app.component( "TopDescription", TopDescription ) ;
app.component( "loading", loading ) ;
app.component( "TSelect", TSelect ) ;
app.component( "TTextarea", TTextarea ) ;
app.component( "TInput", TInput ) ;
app.component( "TRadio", TRadio ) ;
app.component( "TTab", TTab ) ;
app.component( "Exchange", Exchange ) ;
app.component( "ContentBox", ContentBox ) ;
app.component( "CostChange", CostChange ) ;
app.component( "TelChange", TelChange ) ;
app.component( "EngChange", EngChange ) ;
app.component( "RelSite", RelSite ) ;
app.component( "MarginRate", MarginRate ) ;

app
  .use(store)
  .use(router)
  .mount("#app");