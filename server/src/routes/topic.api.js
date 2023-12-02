const express = require('express');
const router = express.Router();
const TopicControl = require('../controller/topic.controller');


const topicApi = (app) => {
	router.post('/create', TopicControl.handleCreate);
	// router.post('/login', ApiControl.handleLogin);
	router.get('/allTopic', TopicControl.handleAllTopics);
	router.delete('/delete', TopicControl.handleDeleteTopics);
	router.put('/updateVocarb', TopicControl.handleUpdateVocarb);
	router.put('/acceptReview', TopicControl.handleAcceptReview);

	return app.use('/api/topic', router);
};

module.exports = topicApi;
