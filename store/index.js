// Vuex配置文件

import Vue from 'vue'

import Vuex from 'vuex'

Vue.use(Vuex)

const actions={

}

const mutations={
    Tage(state,value){
        state.ActivePath=value;
    }
}

const state={
    ActivePath:'',
    index:'',
    obj:'',
}

const store=new Vuex.Store({
    actions,
    mutations,
    state,
})

export default store;