const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');

const topicSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, 'Please provide your name!'],
			trim: true,
		},

		description: {
			type: String,
			default: "Tiếng anh dễ mà"
		},
		listVocabulary: {
			type: String,
			default: ""
		},
		learnTimes: {
			type: Number,
			default: 0,
		},
		timeLearn: {
			type: Date,
			default: new Date
		},
		delayTimes: {
			type: Number,
			default: 0
		}

	},
	{
		timestamps: true,
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
);

const Topic = mongoose.model('Topic', topicSchema);
module.exports = Topic;
