



import axios from 'axios';
const DictionaryService = {
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

	async getDictionaryApi(word) {
		return await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
	},
	async getTranslateApi(text) {
		return await axios.get(`https://api.mymemory.translated.net/get?q=${text}&langpair=en|vi`);
	},
	// async getTranslateApi(text) {
	// 	return await axios.get(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=vi&dt=t&q=${text} `);
	// },




	

};

export default DictionaryService;
