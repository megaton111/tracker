import { createStore } from "vuex";

export default createStore({
  strict: false,
  state: {
    deliveryInfo : {
      APIKEY : '27c7c716GbkQsGgkMcj4YQ' ,
    } ,
    exchangeInfo : {
      APIKEY : 'h230q242y019c270i090x040r0' ,
    }
  },
  modules: {
    // todoStore: todoStore,
  },
});