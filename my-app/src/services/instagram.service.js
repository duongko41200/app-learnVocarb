
import ApiService from './api.service';

const baseUrl = 'instagram/';

const InstagramService = {
	// /**
	//  * Get user info
	//  * @param {Params} params
	//  * @returns {Response} response
	//  */
	// async getUserInfo(params) {
	// 	return await axios.get(`/${baseUrl}username/${params}`);
	// },

	/**
	 * Singup
	 * @param {Params} params
	 * @returns {Response} response
	 */
	async searchUser(params) {
		return ApiService.post(baseUrl + 'searchUser', params);
	},
	async detailProfile(params) {
		return ApiService.get(baseUrl + 'detailAccount', params);
	},


};

export default InstagramService;
