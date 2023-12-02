const express = require('express');
const router = express.Router();
const AutoLoginControl = require('../controller/logninAuto.controller');


const AutoLoginApi = (app) => {

	router.post('/loginAuto', AutoLoginControl.AutoLogin);
	router.post('/likeAuto', AutoLoginControl.AutoLike);




	return app.use('/api/auto', router);
};

module.exports = AutoLoginApi;
