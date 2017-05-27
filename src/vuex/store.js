import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import * as actions from './actions'
Vue.use(Vuex)

const state = {
	sidebarStatus: false,
	user: {},
	userPermission: [],
}

const mutations = {
	TOGGLE_SIDEBAR (state) {
		state.sidebarStatus = !state.sidebarStatus
	},
	SAVE_USER (state, user) {
		state.user = user
	},
	SET_PERMISSION (state, permission) {
		state.userPermission = permission
	}
}
export default new Vuex.Store({
	state,
	actions,
	mutations,
	getters
})
