import { getField, updateField } from 'vuex-map-fields';
import TopicService from '@/services/topic.service';

const dayjs = require('dayjs');

const rankDelay = (rank) => {
	switch (rank) {
		case 0:
			return 'bg-primary';
		case 1:
			return 'bg-warning';
		case 2:
			return 'bg-danger';

		default:
			break;
	}
	return 'bg-danger';
};

export default {
	namespaced: true,

	state() {
		return {
			allListTopics: [],
			originAllListTopics: [],

			listReminder: [],
			listCheck: [],
		};
	},

	actions: {
		async getAllTopics({ commit }) {
			const listTopic = await TopicService.getAllTopic();
			console.log('listTopic', listTopic);
			commit('SET_ALL_LIST_TOPIC', listTopic.data.data);

			const arrListTopic = listTopic.data.data;

			//cap nhap danh sach hien thi man hinh
			let arrList = [];
			for (let i = 0; i < arrListTopic.length; i++) {
				arrList = [
					...arrList,
					{
						id: arrListTopic[i].id,
						timeLearn: dayjs(arrListTopic[i].timeLearn).format(
							'YYYY/MM/DD HH:mm:ss'
						),
						learnTimes: arrListTopic[i].learnTimes,
						notifi: false,
						bgDelay: rankDelay(arrListTopic[i].delayTimes),
						rankDelay: arrListTopic[i].delayTimes,
						name: arrListTopic[i].name,
						ddescription: arrListTopic[i].description,
						listVocabulary: arrListTopic[i].listVocabulary,
						createdAt: arrListTopic[i].createdAt,
					},
				];
			}

			console.log('arrLít:', arrList, rankDelay(0));
			const listOfRemind = arrList.filter(
				(list) => list.rankDelay == 0
			);
			const listOfcheck = arrList.filter((list) => list.rankDelay != 0);
			console.log('danh sach;', arrList);
			console.log('listOfcheck', listOfcheck);
			console.log('listOfRemind', listOfRemind);

			commit('SET_LIST_REMINDER', listOfRemind);
			commit('SET_LIST_CHECK', listOfcheck);

			commit('SET_ORIGIN_LIST_TOPIC', arrList);
		},
		async createNewTopic({ commit }, payload) {
			console.log('payload', payload);
			const listTopic = await TopicService.creatTopic(payload);

			console.log('listTopic', listTopic);

			await commit('SET_ALL_LIST_TOPIC', listTopic.data.data);
		},
		async deleteTopic({ commit }, payload) {
			console.log('payload', payload);
			// console.log("state", state.allListTopics)
			const listTopic = await TopicService.deleteTopic(payload);
			commit('SET_ALL_LIST_TOPIC', listTopic.data.data);
		},

		async updatRankDelay({ state, commit }, payload) {
			console.log('payload asdasdasd', payload);
			const list = state.originAllListTopics;

			for (let i = 0; i < list.length; i++) {
				if (list[i].id === payload.id) {
					list[i].rankDelay = list[i].rankDelay + 1;
					list[i].bgDelay = rankDelay(list[i].rankDelay);

					const review = await TopicService.uypdateDelay(list[i]);
					console.log({ review });
				}
			}

			const listOfRemind = list.filter((list) => list.rankDelay == 0);
			const listOfcheck = list.filter((list) => list.rankDelay != 0);
			console.log('danh sach;', list, payload);
			console.log('listOfcheck', listOfcheck);
			console.log('listOfRemind', listOfRemind);

			commit('SET_LIST_REMINDER', listOfRemind);
			commit('SET_LIST_CHECK', listOfcheck);

			// commit('SET_ORIGIN_LIST_TOPIC', list);
		},

		async onAcceptReview({ state, dispatch }, payload) {
			const list = state.listReminder;
			console.log('danh sach; adsfsdfs', list, payload);

			const review = await TopicService.acceptReview(payload);

			console.log('REVIEW', review);

			dispatch('getAllTopics');

			// commit('SET_LIST_REMINDER',list);
		},
	},

	mutations: {
		updateField,
		SET_ALL_LIST_TOPIC(state, payload) {
			state.allListTopics = payload;
		},
		SET_LIST_REMINDER(state, payload) {
			state.listReminder = payload;
		},
		SET_LIST_CHECK(state, payload) {
			state.listCheck = payload;
		},
		SET_ORIGIN_LIST_TOPIC(state, payload) {
			state.originAllListTopics = payload;
		},
	},

	getters: {
		getField,
	},
};
