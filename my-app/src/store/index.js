
import Vue from "vue";
import Vuex from "vuex";
import listAccount from './listAccount.js'
import topic from './topic.js'
Vue.use(Vuex);

export default new Vuex.Store({

  modules: {
    listAccount,
    topic
  }
})