import types from '@/store/types'

const state = {
    loading : false,
}

var getters = {
    loading: (state) => state.loading,
}


const  mutations = {
    [types.LOADING](state, v){
        state.loading = v;
    },
}


const actions = {
    setLoading: ({commit}, v) => {
        commit(types.LOADING, v);
    },
}



export default {
    state,
    getters,
    actions,
    mutations
}