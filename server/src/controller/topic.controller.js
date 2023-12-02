const Topic = require('../models/topic.model');
const handleCreate = async (req, res) => {
	console.log('create topic', req.body);
	const newTopic = await Topic.create(req.body);
	const list = await Topic.find();

	res.status(200).json({
		status: 'success',
		data: list,
	});
};
const handleAllTopics = async (req, res) => {
	const list = await Topic.find();

	res.status(200).json({
		status: 'success',
		data: list,
	});
};
const handleDeleteTopics = async (req, res) => {
	console.log('delete', req.query);
	await Topic.deleteMany({ _id: req.query.id });
	const list = await Topic.find();

	res.status(200).json({
		status: 'success',
		data: list,
	});
};
const handleUpdateVocarb = async (req, res) => {
	console.log('req.body', req.body);
	if (req.body.listVocabulary) {
		const update = await Topic.findOneAndUpdate(
			{ _id: req.body.topic.id },
			{ listVocabulary: req.body.listVocabulary, learnTimes: 1 }
		);
	} else {
		const update = await Topic.findOneAndUpdate(
			{ _id: req.body.topic.id },
			{ listVocabulary: req.body.listVocabulary, learnTimes: 0 }
		);
	}

	res.status(200).json({
		status: 'success',
		// data: list,
	});
};
const handleAcceptReview = async (req, res) => {
	console.log('req.body', req.body);
	const newTime = new Date();
	const learnTimes = req.body.learnTimes + 1;

	console.log('ksdjfk', newTime, learnTimes);
	const update = await Topic.findOneAndUpdate(
		{ _id: req.body.id },
		{
			delayTimes: 0,
			learnTimes: learnTimes,
			timeLearn: newTime,
		}
	);

	const list = await Topic.find();

	res.status(200).json({
		status: 'success',
		data: list,
	});
};

module.exports = {
	handleCreate,
	handleAllTopics,
	handleDeleteTopics,
	handleUpdateVocarb,
	handleAcceptReview,
};
