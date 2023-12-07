const Topic = require('../models/topic.model');
const { Builder, By, Key, until } = require('selenium-webdriver');


const autoDictionary = async (nameWeb,word) => {
	const driver = await new Builder().forBrowser('chrome').build();

	await driver.executeScript(
		"Object.defineProperty(navigator, 'webdriver', {get: () => undefined})"
	);


	try {
		if (nameWeb == 'cambridge') {
			await driver.get(`https://dictionary.cambridge.org/vi/dictionary/english/${word}`);
		} else if (nameWeb == 'google') {
			await driver.get(`https://www.google.com/search?q=${word}&sca_esv=588712944&sxsrf=AM9HkKnnjxqpovA6jmQe1Eg3nrv-7dLoxQ%3A1701950075179&ei=e7JxZaDMCsbj2roPx5aTiA4&ved=0ahUKEwjg9Z-Nov2CAxXGsVYBHUfLBOEQ4dUDCBA&uact=5&oq=dog&gs_lp=Egxnd3Mtd2l6LXNlcnAiA2RvZzIKECMYgAQYigUYJzIKECMYgAQYigUYJzILEC4YgwEYsQMYgAQyCxAAGIAEGLEDGIMBMgoQABiABBiKBRhDMggQABiABBixAzIFEC4YgAQyCBAAGIAEGLEDMgsQABiABBixAxiDATIFEAAYgARIvwxQAFjWCXABeAGQAQCYAbMBoAHZA6oBAzAuM7gBA8gBAPgBAagCFMICBxAjGOoCGCfCAhYQABiABBjjBBjpBBjqAhi0AhgK2AEBwgIUEAAYgAQY4wQY6QQY6gIYtALYAQHCAhAQABgDGI8BGOoCGLQC2AECwgIQEC4YAxiPARjqAhi0AtgBAsICDBAjGIAEGIoFGBMYJ8ICBBAjGCfCAgsQLhiABBixAxiDAeIDBBgAIEGIBgG6BgYIARABGAG6BgYIAhABGAo&sclient=gws-wiz-serp`);
		} else if (nameWeb == 'video') {
			await driver.get(`https://youglish.com/`);

			const usernameInput = await driver.wait(
				until.elementLocated(By.id('q')),
				2000
			);
			await usernameInput.sendKeys(word, Key.RETURN);
		}
		
	
		
		

	} finally {
		// Đóng trình duyệt khi hoàn thành
		// await driver.quit();
	}
};









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

const handleupdateDelaytime = async (req, res, next) => { 
	console.log('req.body', req.body);
	const dataList = req.body

 	const update = await Topic.findOneAndUpdate(
		{ _id: req.body.id },
		{
			delayTimes: dataList.rankDelay,
		}
	);
	
	res.status(200).json({
		status: 'success',
		// data: list,
	});

}

const handleAutoLookUpDictionary = async (req, res, next) => { 
	const word = req.body.word
	const nameWeb = req.body.nameWeb

	console.log('ksdjfksdjfk')
	await autoDictionary(nameWeb,word)
	res.status(200).json({
		status:'success'
	})

}

module.exports = {
	handleCreate,
	handleAllTopics,
	handleDeleteTopics,
	handleUpdateVocarb,
	handleAcceptReview,
	handleupdateDelaytime,
	handleAutoLookUpDictionary
};
