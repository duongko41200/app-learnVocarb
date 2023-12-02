<template>
	<div class="modal__preview" v-if="showModal">
		<div>
			<div class="modal__preview--title"> Danh sách từ mới</div>
			<div class="swap p-2 ">
				<div v-html="dataReview.listVocabulary" class="d-flex flex-column justify-content-start text-start"></div>

			</div>
			<div class="mt-2 d-flex justify-content-center gap-3 p-2">
				<button type="button" class="btn btn-success" v-show = "type === 'check'"
				@click="AcceptReview">
						Xác nhận
				</button>

				<button type="button" class="btn btn-secondary" @click="closeModal">
						Cancel
				</button>
			</div>
		</div>

	</div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
// import topicMapper from '@/sevices/imageAssets.service';
const topicMappper = createNamespacedHelpers('topic');
export default {
	name: 'HelloWorld',
	props: {
		showModal: {
			type: Boolean,
			default:false,
		},
		dataReview: {
			type: Object,
			
		},
		type: {
			typper: String,
			// default: 
		},
		data: {
			type: Object,
		},
	},
	components: {},
	data() {
		return {

	
		};
	},
	mounted() { 
		this.getAllTopics();
	
	},
	methods: {
		...topicMappper.mapActions(['getAllTopics','onAcceptReview']),
		closeModal() {
			this.$emit('closeModal');
		},
		AcceptReview() {

			console.log('AcceptReview',this.dataReview)
			this.onAcceptReview({
				id: this.dataReview.id,
				learnTimes: this.dataReview.learnTimes,
				timeLearn: this.dataReview.timeLearn,
				delayTimes: this.dataReview.delayTimes

			})
		}

	},

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.modal__preview{
	min-width: 70%;
	width: fit-content;
	height: fit-content;
	background-color: white;
	position:absolute;
	top:-15px;
	left:15%;
	border: 1px solid black;

}
.swap{
	min-height: 400px;
	
	width: 100%;
	/* background-color: aliceblue; */
}
.modal__preview--title{
	font-weight: 700;
	font-size: 1.5rem;

}
/deep/ td,tr,th{
	border:2px solid rgba(0, 0, 0, 0.439) !important
}

</style>
