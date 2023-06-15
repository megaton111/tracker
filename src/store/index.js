import { createStore } from "vuex";

export default createStore({
  strict: false,
  state: {
    deliveryInfo : {
      APIKEY : 'ZtUvVqFGHwl2V4JpgBEtTw' ,
    } ,
    exchangeInfo : {
      APIKEY : 'h230q242y019c270i090x040r0' ,
    }
  },
  modules: {
    // todoStore: todoStore,
  },
});