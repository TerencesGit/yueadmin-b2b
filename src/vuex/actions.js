export const toggleSidebar = ({ commit }) => {
	commit('TOGGLE_SIDEBAR')
}
export const saveUser = ({ commit }, user) => {
	commit('SAVE_USER', user)
}
export const saveUserPermission = ({ commit }, permission) => {
	commit('SAVE_PERMISSION', permission)
}
