import Vue from 'vue'
import Vuex from "vuex"
Vue.use(Vuex);
const state={   //要设置的全局访问的state对象
    user:{}

};
const getters = {   //实时监听state值的变化(最新状态)

    getUser(){  //方法名随意,主要是用来承载变化的changableNum的值
        return state.user
    }
};

const mutations = {
    updateUser(state, user) {
        state.user = user
    }
}

const actions = {
    asyncUpdateUser(context, user) {
        context.commit('updateUser', user)
    }
}
const store = new Vuex.Store({
    state,
    getters,
    mutations,
    actions
});
export default store;