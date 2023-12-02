import { getField, updateField } from 'vuex-map-fields';


export default {
	namespaced: true,

	state() {
		return {
			imageProfile: '',
			dataAccount:''

		};
	},

	actions: {


	},

	mutations: {
		updateField,
		SET_ACCOUNT_INSTAGRAM(state, payload) {
			state.dataAccount = payload
		}

	},

	getters: {
		getField,
	},
};
