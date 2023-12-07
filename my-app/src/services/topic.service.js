
import ApiService from './api.service';

const baseUrl = 'topic/';

const TopicService = {
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

	async getAllTopic(params) {
		return ApiService.get(baseUrl + 'allTopic', params);
	},
	async creatTopic(params) {
		return ApiService.post(baseUrl + 'create', params);
	},
	async deleteTopic(params) {
		return ApiService.delete(baseUrl + 'delete', params);
	},
	async updateVocarb(params) {
		return ApiService.put(baseUrl + 'updateVocarb', params);
	},
	async acceptReview(params) {
		return ApiService.put(baseUrl + 'acceptReview', params);
	},
	async uypdateDelay(params) {
		return ApiService.put(baseUrl + 'updateDelayTime', params);
	},

	async autoDictionary(params) {
		return ApiService.post(baseUrl + 'autoLookUpDictionary', params);
	},

	

};

export default TopicService;
