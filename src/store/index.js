import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loading: false,
    userInfo:JSON.parse(sessionStorage.getItem("userInfo")),
  },
  mutations: {
    SET_LOADING: (state, v) => {
      state.loading = v;
    },
    SET_UserInfo:(state, userInfo) => {
      state.userInfo = userInfo
      sessionStorage.setItem("userInfo", JSON.stringify(userInfo))
    },
    REMOVE_INFO: (state) => {
      localStorage.setItem("token", '')
      sessionStorage.setItem("userInfo", JSON.stringify(''))
      state.userInfo = {}
    },

  },
  actions: {
    setLoading: ({commit}, v) => {
      commit('SET_LOADING', v);
    },
    setUserInfo: ({commit}, v) => {
      commit('SET_UserInfo', v);
    },
  },
  modules: {
  },
  getters:{
    loading: state => state.loading,
    userInfo: state => state.userInfo,
  }
})
