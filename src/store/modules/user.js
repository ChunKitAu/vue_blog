import types from '@/store/types'

const state = {
    userInfo : localStorage.getItem('userInfo') ? localStorage.getItem('userInfo') : '',
    token:localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : '',
}

var getters = {
    userInfo: (state) => state.userInfo,
    token:(state) => state.token,
}

const  mutations = {
    [types.TOKEN](state, v){
        state.token = v;
        localStorage.setItem('Authorization', v);
    },
    [types.USER_INFO](state, v){
        state.userInfo = v;
        localStorage.setItem("userInfo",v);
    },
    [types.CLEAR_TOKEN](state){
        state.userInfo = "";
        localStorage.setItem("userInfo",'');
        localStorage.setItem("Authorization",'');
    },
}

const actions = {
    setToken: ({commit}, v) => {
        commit(types.TOKEN, v);
    },
    setUserInfo:({commit}, v) => {
        commit(types.USER_INFO, v);
    },
}



export default {
    state,
    getters,
    actions,
    mutations
}