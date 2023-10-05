import { createStore } from "vuex";

export default createStore({
  strict: false,
  state: {
    deliveryInfo : {
      APIKEY : 'uJjhV6uSx5YG8I22S6d4QA' ,
    } ,
    exchangeInfo : {
      APIKEY : 'h230q242y019c270i090x040r0' ,
    }
  },
  modules: {
    // todoStore: todoStore,
  },
});