const express = require('express');
const router = express.Router();
const instagramControl = require('../controller/instagram.comtroller.js');


const InstagramApi = (app) => {

	router.post('/searchUser', instagramControl.searchUser);
	router.get('/detailAccount', instagramControl.detailProfile)




	return app.use('/api/instagram', router);
};

module.exports = InstagramApi;
