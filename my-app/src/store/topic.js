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
};

export default {
	namespaced: true,

	state() {
		return {
			allListTopics: [],

			listReminder: [],
		};
	},

	actions: {
		async getAllTopics({ commit }) {
			const listTopic = await TopicService.getAllTopic();
			console.log('listTopic', listTopic);
			commit('SET_ALL_LIST_TOPIC', listTopic.data.data);

			const arrListTopic = listTopic.data.data;
			let arrList = [];
			for (let i = 0; i < arrListTopic.length; i++) {
				arrList = [
					...arrList,
					{
						id: arrListTopic[i].id,
						timeLearn: dayjs(arrListTopic[i].timeLearn).format('YYYY/MM/DD HH:mm:ss'),
						learnTimes: arrListTopic[i].learnTimes,
						notifi: false,
						bgDelay: rankDelay(arrListTopic[i].delayTimes),
						rankDelay: arrListTopic[i].delayTimes,
					},
				];
			}

			console.log('arrLít:', arrList,rankDelay(0));

			commit('SET_LIST_REMINDER', arrList);
		},
		async createNewTopic({ commit }, payload) {
			console.log('payload', payload);
			const listTopic = await TopicService.creatTopic(payload);

			console.log('listTopic', listTopic);

			commit('SET_ALL_LIST_TOPIC', listTopic.data.data);
		},
		async deleteTopic({ commit }, payload) {
			console.log('payload', payload);
			// console.log("state", state.allListTopics)
			const listTopic = await TopicService.deleteTopic(payload);
			commit('SET_ALL_LIST_TOPIC', listTopic.data.data);
		},
		updatRankDelay({state,commit},payload) {
			const list = state.listReminder 

			
			for (let i = 0; i < list.length; i++) {
				if (list[i].id === payload.id) {
					list[i].rankDelay = list[i].rankDelay + 1
					list[i].bgDelay = rankDelay(list[i].rankDelay)
				}
				
			}
			console.log("danh sach;",list , payload)

			commit('SET_LIST_REMINDER',list);
		
		},
		async onAcceptReview({state,commit},payload) {
			const list = state.listReminder 
			console.log("danh sach; adsfsdfs",list , payload)

			const review = await TopicService.acceptReview(payload)

			console.log("review",review)

			

	
			commit('SET_ALL_LIST_TOPIC', review.data.data);

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
	},

	getters: {
		getField,
	},
};
