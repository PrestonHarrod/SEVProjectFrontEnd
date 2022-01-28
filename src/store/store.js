import Vue from 'vue'
import Vuex from 'vuex'
import utils from '@/config/utils'

Vue.use(Vuex)

const user = utils.getStore('user')

export default new Vuex.Store({
  state: {
    loginUser: user
  },
  mutations: {
    setLoginUser(state, user) {
      state.loginUser = user
      utils.setStore('user', user)
    }
  },
  actions: {

  },
  getters: {
    getLoginUserInfo(state) {
      return state.loginUser
    }
  }
})