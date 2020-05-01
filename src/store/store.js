import Vue from 'vue'
import Vuex from 'vuex'

import like_module from './like_store'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    likes: []
  },
  mutations: {
    addLike: (state, rank) => {
      state.likes.push(rank)
    },
    removeLike: (state, rank) => {
      const i = state.likes.findIndex(item => {
        return item === rank
      })
      state.likes.splice(i, 1)
    }
  }
  
  
})
