export const toggleSidebar = ({ commit }) => {
	commit('TOGGLE_SIDEBAR')
}
export const saveUserInfo = ({ commit }, userInfo) => {
	commit('SAVE_USERINFO', userInfo)
}
export const saveUserPermission = ({ commit }, permission) => {
	commit('SAVE_PERMISSION', permission)
}
export const setStepActive = ({ commit }, active) => {
	commit('SET_STEPACTIVE', active)
}
export const changeStepActive = ({ commit }, active) => {
	commit('CHANGE_STEPACTIVE', active)
}