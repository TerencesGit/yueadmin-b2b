export const toggleSidebar = ({ commit }) => {
	commit('TOGGLE_SIDEBAR')
}
export const saveUser = ({ commit }, user) => {
	commit('SAVE_USER', user)
}
export const setUserPermission = ({ commit }, permission) => {
	commit('SET_PERMISSION', permission)
}
