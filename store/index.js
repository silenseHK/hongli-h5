import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

import users from './modules/users/users.js';

export default new Vuex.Store({
	modules:{
		users,
	}	
})