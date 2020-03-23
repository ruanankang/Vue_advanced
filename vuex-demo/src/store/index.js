import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    add(state) {
      // eslint-disable-next-line no-plusplus
      state.count++;
    },
    addRandom(state, step) {
      state.count += step;
    },
    sub(state) {
      // eslint-disable-next-line no-plusplus
      state.count--;
    }
  },
  actions: {
    addAsync(context) {
      setTimeout(() => {
        context.commit('add')
      }, 2000)
    },
    subAsync(context) {
      setTimeout(() => {
        context.commit('sub')
      }, 2000)
    }
  },
  modules: {}
})