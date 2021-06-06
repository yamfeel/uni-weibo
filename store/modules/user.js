export default {
	namespaced: true,
	state: {
		token: uni.getStorageSync('uni_id_token'),
		userInfo: uni.getStorageSync('userInfo')
	},
	getters: {
		GET_TOKEN: (state) => {
			return !!state.token && state.token
		},
		GET_USER_INFO: (state) => {
			return !!state.userInfo.userName && state.userInfo
		},
		GET_GENDER_ICON: (state) => {
			let name = !!state.userInfo.gender && state.userInfo.gender
			if (name) {
				name == 0 ? name = 'eye-off':
				name == 1 ? name = 'man': name = 'woman'
			}
			return name
		},
	},
	mutations: {
		SET_TOKEN: (state, token) => {
			state.token = token
			uni.setStorageSync('uni_id_token', token)
		},
		REMOVE_TOKEN: (state) => {
		    state.token = ''
		    state.userInfo = {}
		    uni.removeStorageSync('uni_id_token')
		},
		SET_USER_INFO: (state, userInfo) => {
		    state.userInfo = userInfo
			uni.setStorageSync('userInfo', userInfo)
		}
	},
	actions: {

	}
}