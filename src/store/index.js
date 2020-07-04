import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loading: false,
  },
  mutations: {
    SET_LOADING: (state, v) => {
      state.loading = v;
    },
  },
  actions: {
    setLoading: ({commit}, v) => {
      commit('SET_LOADING', v);
    },
  },
  modules: {
  },
  getters:{
    loading: state => state.loading,
  }
})
