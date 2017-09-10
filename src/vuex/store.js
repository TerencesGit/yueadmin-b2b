import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import * as actions from './actions'
Vue.use(Vuex)

const state = {
	sidebarStatus: false,
	userInfo: null,
	userPermission: [],
	stepActive: 0
}

const mutations = {
	TOGGLE_SIDEBAR (state) {
		state.sidebarStatus = !state.sidebarStatus
	},
	SAVE_USERINFO (state, userInfo) {
		state.userInfo = userInfo
	},
	SAVE_PERMISSION (state, permission) {
		state.userPermission = permission
	},
	SET_STEPACTIVE (state, active) {
		state.stepActive = active
	}
}
export default new Vuex.Store({
	state,
	actions,
	mutations,
	getters
})
