<template>
	<div class="modal__vocarb" v-if="showModal">
		<div>
			<div class="modal__vocarb--title">Danh sách từ mới</div>
			<div class="swap p-2">
				<ckeditor v-model="dataVocarb"></ckeditor>
			</div>
			<div class="mt-2 d-flex justify-content-center gap-3 p-2">
				<button
					type="button"
					class="btn btn-success"
					@click="onSaveVocarb"
				>
					Save
				</button>
				<button
					type="button"
					class="btn btn-success"
					@click="onPreview"
				>
					Preview
				</button>
				<button
					type="button"
					class="btn btn-secondary"
					@click="closeModalVocarb"
				>
					Cancel
				</button>
			</div>
		</div>
		<modalPreview
			:dataVocarb="dataVocarb"
			:showModal="showModalPreview"
			@closeModal="closeModal"
		></modalPreview>
	</div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
// import topicMapper from '@/sevices/imageAssets.service';
const topicMappper = createNamespacedHelpers('topic');
import modalPreview from '@/components/ModalPreview/modalPreview.vue';
import TopicService from '@/services/topic.service';
export default {
	name: 'HelloWorld',
	props: {
		showModal: {
			type: Boolean,
			default: true,
		},
		data: {
			type: Object,
		},
	},
	components: {
		modalPreview,
	},
	data() {
		return {
			dataVocarb: '',
			showModalPreview: false,
		};
	},
	mounted() {
		this.getAllTopics();
	},
	methods: {
		...topicMappper.mapActions(['getAllTopics']),
		onPreview() {
			this.showModalPreview = true;
		},
		closeModal() {
			this.showModalPreview = false;
		},
		closeModalVocarb() {
			this.$emit('closeModal');
		},
		async onSaveVocarb() {
			console.log('data nhan dc', this.data);
			const newVocarb = await TopicService.updateVocarb({
				topic: this.data,
				listVocabulary: this.dataVocarb,
			});
			console.log('new vocarb', newVocarb);
			this.getAllTopics();
			this.$emit('onSaveVocarb');
		},
	},
	watch: {
		data() {
			this.dataVocarb = this.data.listVocabulary;
		},
	},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.modal__vocarb {
	width: 70%;
	min-height: 50%;
	height: fit-content;
	background-color: white;
	position: absolute;
	top: 0;
	left: 15%;
	border: 1px solid black;
}
.modal__vocarb--title {
	font-weight: 700;
	font-size: 1.5rem;
}
.handel {
	position: absolute;
}
</style>
