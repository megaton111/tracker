import { createStore } from "vuex";

export default createStore({
  strict: false,
  state: {
    deliveryInfo : {
      APIKEY : 'MytdaG6kU86HoUjjgdnyYQ' ,
    } ,
    exchangeInfo : {
      APIKEY : 'h230q242y019c270i090x040r0' ,
    }
  },
  modules: {
    // todoStore: todoStore,
  },
});