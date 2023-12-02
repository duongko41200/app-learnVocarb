<template>
	<div class="home">
		<div>
			<div class="swap">
				<div class="swap__header">
					<input type="text" placeholder="Search topic" />
					<button type="button" class="btn btn-secondary">
						Search
					</button>
					<div>
						<b-button v-b-modal.modal-1>Create</b-button>

						<b-modal
							id="modal-1"
							title=" Create Name Topic"
							hide-footer
						>
							<div class="d-flex row justify-content-between p-2">
								<div class="col-6">
									<label> name topic</label>
									<input
										v-model="nameTopic"
										type="text"
										style="width: 100%"
									/>
								</div>
								<div class="col-6">
									<label> descript topic</label>
									<input
										v-model="description"
										type="text"
										style="width: 100%"
									/>
								</div>
							</div>
							<div class="d-flex p-2 justify-content-end">
								<div>
									<button
										type="button"
										class="btn btn-primary"
										@click="onCreateNewTopic"
									>
										ADD
									</button>
								</div>
							</div>
						</b-modal>
					</div>
				</div>
				<div class="swap__list p-3 row gap-2 justify-content-center">
					<div
						class="d-flex p-1 mb-2 text-white justify-content-between col-lg-5 col-md-10 col-sm-10"
						:class="
							listReminder[idx].bgDelay ? listReminder[idx].bgDelay : ''
						"
						v-for="(topic, idx) in allListTopics"
						:key="idx"
					>
						<div class="d-flex gap-2">
							<div>{{ topic.name }}:</div>
							<div>{{ topic.description }}</div>
						</div>

						<div>{{ topic.learnTimes }}</div>

						<div class="d-flex gap-2">
							<div>
								<button
									type="button"
									class="btn bg-secondary btn-sm text-white"
									v-if="topic.listVocabulary"
									@click="openModalPreview(topic)"
								>
									Ôn tập
								</button>
							</div>
							<div>
								<button
									type="button"
									class="btn btn-success btn-sm"
									@click="openModalVocarb(topic)"
								>
									Edit Vocabulary
								</button>
							</div>
							<div>
								<button
									type="button"
									class="btn btn-danger btn-sm"
									@click="onDeleteTopic(topic)"
								>
									Delete
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- autodi notifi -->
		<audio
			ref="audio"
			src="@/assets/thongbao.mp3"
			@click="playAudio"
		></audio>
		<modalVocarb
			:showModal="showModal"
			:data="topic"
			@closeModal="closeModal"
			@onSaveVocarb="onSaveVocarb"
		></modalVocarb>
		<modalPreview
			:dataReview="dataPreview"
			:data="topic"
			:showModal="showModalPreview"
			:type="'check'"
			@closeModal="closeModalPreview"
		></modalPreview>
	</div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
// import topicMapper from '@/sevices/imageAssets.service';
const topicMappper = createNamespacedHelpers('topic');
import modalVocarb from '@/components/ModalVocarb/modalVocarb.vue';
import modalPreview from '@/components/ModalPreview/modalPreview.vue';
import {
	minutesToTimestamp,
	hoursToTimestamp,
} from '@/utils/changeTimetoTimeStamp.js';
// const dayjs = require('dayjs');
export default {
	name: 'HelloWorld',
	props: {
		msg: String,
	},
	components: {
		modalVocarb,
		modalPreview,
	},
	data() {
		return {
			showModal: false,
			showModalPreview: false,
			dataPreview: {},

			topic: {},
			description: '',
			nameTopic: '',
		};
	},
	async mounted() {
		await this.getAllTopics();
		this.handleRemindVocarb(this.listReminder);
		this.checkTimetoRemind();
		console.log('tiemStemp:', minutesToTimestamp(5));
	},
	computed: {
		...topicMappper.mapState(['allListTopics', 'listReminder']),
	},
	methods: {
		...topicMappper.mapActions([
			'getAllTopics',
			'createNewTopic',
			'deleteTopic',
			'updatRankDelay',
		]),
		closeModal() {
			this.showModal = false;
		},
		openModalVocarb(topic) {
			this.showModal = true;
			this.topic = topic;
		},
		async onCreateNewTopic() {
			await this.createNewTopic({
				name: this.nameTopic,
				description: this.description,
			});
			this.$bvModal.hide('modal-1');
		},
		async onDeleteTopic(topic) {
			this.deleteTopic(topic);
		},
		onSaveVocarb() {
			this.showModal = false;
		},
		openModalPreview(topic) {
			this.dataPreview = topic;
			// this.topic = topic;
			this.showModalPreview = true;
		},
		closeModalPreview() {
			this.showModalPreview = false;
		},
		playAudio() {
			const audio = this.$refs.audio;
			audio.play();
		},

		async checkTimetoRemind() {
			// const currentDate = new Date();
			// const timestamp = dayjs(currentDate).unix();
			const remindVocarb = this.listReminder;

			// for (let i = 0; i < remindVocarb.length; i++) {
			// 	console.log('ksdjfk');
			// 	this.updatRankDelay(remindVocarb[i]);

			// 	await this.playAudio()

			// }

			let timer = setInterval(async () => {
				this.handleRemindVocarb(remindVocarb);

				//neuw ma vuot 1 ngay thi se thong bao vaof 9h :30
			}, 30 * 60 * 1000);

			console.log('timer: ', timer);
		},

		async handleRemindVocarb(remindVocarb) {
			const currentDate = new Date();
			for (let i = 0; i < remindVocarb.length; i++) {
				const originalDate = new Date(remindVocarb[i].timeLearn);

				console.log(
					'jksdjfksd',
					currentDate.getTime(),
					hoursToTimestamp(originalDate, 1),
					remindVocarb[0].learnTimes
				);

				if (
					remindVocarb[i].learnTimes === 1 &&
					currentDate.getTime() >= hoursToTimestamp(originalDate, 5)
				) {
					this.updatRankDelay(remindVocarb[i]);
					await this.playAudio();
				}
				if (
					remindVocarb[i].learnTimes == 2 &&
					currentDate.getTime() >= hoursToTimestamp(originalDate, 24)
				) {
		
					this.updatRankDelay(remindVocarb[i]);
					await this.playAudio();
				}
				if (
					remindVocarb[i].learnTimes === 3 &&
					currentDate.getTime() >= hoursToTimestamp(originalDate, 24)
				) {
					this.updatRankDelay(remindVocarb[i]);
					await this.playAudio();
				}
				if (
					remindVocarb[i].learnTimes === 4 &&
					currentDate.getTime() >= hoursToTimestamp(originalDate, 48)
				) {
					this.updatRankDelay(remindVocarb[i]);
					await this.playAudio();
				}
				if (
					remindVocarb[i].learnTimes === 5 &&
					currentDate.getTime() >= hoursToTimestamp(originalDate, 72)
				) {
					this.updatRankDelay(remindVocarb[i]);
					await this.playAudio();
				}
				if (
					remindVocarb[i].learnTimes === 6 &&
					currentDate.getTime() >=
						hoursToTimestamp(originalDate, 5 * 24)
				) {
					this.updatRankDelay(remindVocarb[i]);
					await this.playAudio();
				}
				if (
					remindVocarb[i].learnTimes === 7 &&
					currentDate.getTime() >=
						hoursToTimestamp(originalDate, 7 * 24)
				) {
					this.updatRankDelay(remindVocarb[i]);
					await this.playAudio();
				}
				if (
					remindVocarb[i].learnTimes === 8 &&
					currentDate.getTime() >=
						hoursToTimestamp(originalDate, 7 * 24)
				) {
					this.updatRankDelay(remindVocarb[i]);
					await this.playAudio();
				}
			}
		},
	},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home {
	position: relative;
	height: 100vh;
	background-color: rgba(181, 178, 178, 0.42);
}
</style>
