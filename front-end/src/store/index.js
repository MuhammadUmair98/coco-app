 import Vuex from "vuex";
 import * as auth from "./modules/auth";


export const store = new Vuex.Store({
  modules: {
    auth,
  },
});
