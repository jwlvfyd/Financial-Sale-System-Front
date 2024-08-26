// store.js
import { createStore } from 'vuex';

export default createStore({
  state: {
    customerId: null
  },
  mutations: {
    setcustomerId(state, data) {
      state.customerId = data;
    }
  },
  actions: {
    updatecustomerId({ commit }, data) {
      commit('setcustomerId', data);
    }
  },
  getters: {
    getcustomerId: state => state.customerId
  }
});
