<template>
	<div
		class="modal__preview p-2"
		v-if="showModal"
		:class="type === 'check' ? 'p-4' : ''"
	>
		<div>
			<div class="modal__preview--title">Danh sách từ mới</div>
			<div class="swap p-2">
				<div
					v-if="type === 'check'"
					v-html="dataReview.listVocabulary"
					class="d-flex flex-column justify-content-start text-start"
					ref="textElement"
					@mouseup="handleMouseUp"
				></div>

				<!-- //modal translate -->
				<div
					v-if="isTextHighlighted"
					class="icon"
					:class="!isModalTranslate ? 'p-1' : ''"
					:style="{
						left: iconLeftPosition + 'px',
						top: iconTopPosition + 'px',
					}"
				>
					<div v-if="isModalTranslate" class="translate">
						<div class="header"></div>
						<div class="content">
							<div class="word">
								<div class="word-value">
									<div>
										<div class="vaule" v-if="dictionarys.word">{{ dictionarys.word }}</div>
										<div v-else>
											<div class="type-word">Source</div>
											<div class="source-text">
												{{selectedText }}

											</div>
										</div>
									</div>

									<div class="pronounce d-flex">
										<div>
											{{ dictionarys.text }}
										</div>
									</div>
								</div>
								<div class="voice" v-if="dictionarys.audio">
									<audio controls class="audio">
										<source :src="dictionarys.audio" />
									</audio>
								</div>
							</div>
							<div class="box-translate">
								<div>
									<div class="type-word" :class="!dictionarys.word?'margin-box':'' ">
										{{
											dictionarys.typeWord
												? dictionarys.typeWord
												: 'Translate'
										}}
									</div>
									<div class="translate-text">
										{{ dictionarys.translate }}

										<div class="definition">
											{{ dictionarys.definition }}
										</div>
									</div>
									<div v-if="dictionarys.example">
										<div class="type-word">Example</div>
										<div class="translate-text">
											{{ dictionarys.example }}
										</div>
									</div>
									<div v-if="dictionarys.synonyms">
										<div class="type-word">synonyms</div>
										<div class="translate-text">
											<div>
												<div
													v-for="(
														synonyms, idx
													) in dictionarys.synonyms"
													:key="idx"
												>
													{{ synonyms }}
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div v-else @click="showModalTranslate">dịch</div>
				</div>
				<div
					v-else
					v-html="dataVocarb"
					class="d-flex flex-column justify-content-start text-start"
				></div>
			</div>
			<div class="mt-2 d-flex justify-content-center gap-3 p-2">
				<button
					type="button"
					class="btn btn-success"
					v-show="type === 'check'"
					@click="AcceptReview"
				>
					Xác nhận
				</button>

				<button
					type="button"
					class="btn btn-secondary"
					@click="closeModal"
				>
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
import DictionaryService from '@/services/dictionary.service.js';

const filterDictionary = (data, value) => {
	const param = value;
	for (let i = 0; i < data.length; i++) {
		console.log(`gias tri ${value}`, data[i][param]);
		if (data[i][param]) {
			return data[i][param];
		}
	}
	return;
};
export default {
	name: 'HelloWorld',
	props: {
		showModal: {
			type: Boolean,
			default: false,
		},
		dataReview: {
			type: Object,
		},
		dataVocarb: {
			type: String,
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
			selectedText: '',
			isTextHighlighted: false,
			iconLeftPosition: 0,
			iconTopPosition: 0,
			isModalTranslate: false,

			dictionarys: {},
		};
	},
	mounted() {
		this.getAllTopics();
	},
	methods: {
		...topicMappper.mapActions(['getAllTopics', 'onAcceptReview']),
		closeModal() {
			this.$emit('closeModal');
		},
		AcceptReview() {
			console.log('AcceptReview', this.dataReview);
			this.onAcceptReview({
				id: this.dataReview.id,
				learnTimes: this.dataReview.learnTimes,
				timeLearn: this.dataReview.timeLearn,
				delayTimes: this.dataReview.delayTimes,
			});
			this.closeModal()
		},
		async handleMouseUp() {
			this.dictionarys={}
			this.isModalTranslate = false;
			const selectedText = this.getSelectedText();
			console.log('handleMouseUp', selectedText);
			this.selectedText = selectedText;
			this.isTextHighlighted = selectedText.length > 0;
			const textElementRect =
				this.$refs.textElement.getBoundingClientRect();

			console.log('tao do', textElementRect);
			const selection = window.getSelection();
			if (selection.rangeCount > 0) {
				const range = selection.getRangeAt(0);
				const rangeRect = range.getBoundingClientRect();

				// Tính toán vị trí của biểu tượng
				this.iconLeftPosition =
					rangeRect.left -
					textElementRect.left +
					20 +
					rangeRect.width / 2;
				this.iconTopPosition =
					rangeRect.top -
					textElementRect.top +
					22 +
					rangeRect.height / 2;

				console.log(
					'top position',
					this.iconTopPosition,
					'range',
					rangeRect
				);
			}
		
			const translate = await DictionaryService.getTranslateApi(
				selectedText
			);
			console.log({ translate: translate.data.responseData.translatedText });

			try {
				const dictionary = await DictionaryService.getDictionaryApi(
					selectedText
				);

		
				let data = dictionary.data[0];
				console.log({ data });
		

				const text = await filterDictionary(
					dictionary.data[0].phonetics,
					'text'
				);
				const audio = await filterDictionary(
					dictionary.data[0].phonetics,
					'audio'
				);
				const definition = await filterDictionary(
					dictionary.data[0].meanings[0].definitions,
					'definition'
				);
				const example = await filterDictionary(
					dictionary.data[0].meanings[0].definitions,
					'example'
				);
				const typeWord = await dictionary.data[0].meanings[0]
					.partOfSpeech;
				const synonyms = await dictionary.data[0].meanings[0].synonyms;



				const arrDictory = {
					text: text ? text:dictionary.data[0].phonetic,
					audio: audio,
					definition: definition,
					example: example,
					typeWord: typeWord,
					synonyms: synonyms,
					word: dictionary.data[0].word,
					translate: translate.data.responseData.translatedText,
				};

				console.log('gais tri arrDictoru  :', arrDictory);
				this.dictionarys = arrDictory;
			} catch (error) {
				console.log('ksjdfksdjf khong tim thay');
				this.dictionarys = { translate: translate.data.responseData.translatedText };
			}

			// Lấy vị trí của đối tượng văn bản

		},
		getSelectedText() {
			const selection = window.getSelection();
			return selection.toString();
		},

		showModalTranslate() {
			const textElementRect =
				this.$refs.textElement.getBoundingClientRect();
			const selection = window.getSelection();
			const range = selection.getRangeAt(0).getBoundingClientRect();
			console.log(
				'selection',
				selection.getRangeAt(0).getBoundingClientRect()
			);
			this.iconLeftPosition = window.innerWidth / 2;
			let iconTopPosition = range.height - textElementRect.top + 100;
			console.log('text icon top position', iconTopPosition);
			this.iconTopPosition = iconTopPosition;
			this.isModalTranslate = true;

			console.log('textElementRect', textElementRect);

			console.log('height:', window.innerHeight);
		},
	},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.modal__preview {
	min-width: 70%;
	width: fit-content;
	height: fit-content;
	background-color: white;
	position: absolute;
	top: 3%;
	left: 0;
	border: 1px solid black;
}
.swap {
	min-height: 75vh;

	width: 100%;
	/* background-color: aliceblue; */
}
.modal__preview--title {
	font-weight: 700;
	font-size: 1.5rem;
}
/deep/ td,
tr,
th {
	border: 2px solid rgba(0, 0, 0, 0.439) !important;
}
.icon {
	font-size: 1em; /* Kích thước biểu tượng */
	position: absolute; /* Đặt biểu tượng tuyệt đối so với đối tượng cha */
	background-color: rgb(71, 70, 70);
	border-radius: 10px;

	color: aliceblue;
	cursor: pointer;
	transform: translate(
		-50%,
		0%
	); /* Dịch chuyển để canh giữa chính xác */
}
.translate {
	width: 350px;
	max-height: 500px;
	height: fit-content;

	background-color: #fff;
	border: 1px solid rgb(181, 180, 180) !important;
	border-radius: 10px;
	box-shadow: 3px 5px 5px 2px rgba(199, 198, 198, 0.716);
}
.header {
	width: 100%;
	height: 40px;
	border-top-right-radius: 10px;
	border-top-left-radius: 10px;
	border: 1px solid rgb(0, 179, 255) !important;
	background-color: rgb(0, 179, 255);
}
.word-value {
	width: 100%;
	height: 80px;
	/* background-color: aqua; */
}
.pronounce {
	padding: 0 20px;
	text-align: start;
	font-style: italic;

	color: rgb(155, 154, 154);
}
.vaule {
	padding: 0 20px;
	text-align: start;
	font-size: 30px;
	font-weight: 700;

	color: black;
}
.audio {
	height: 30px !important;
}
.box-translate {
	width: 100%;
	max-height: 350px;
	height: fit-content;
	/* background-color: aqua; */
	color: black;
	padding: 10px 10px;
	overflow-y: scroll;
	padding-bottom: 15px;
}
.type-word {
	padding: 5px 10px;
	text-align: start;
	font-size: 19px;
	font-weight: 700;
	color: rgba(243, 187, 84, 0.879);
}
.translate-text,.source-text {
	padding: 12px 10px;
	text-align: start;
	/* font-size: 19px; */
	/* font-weight: 700; */
	background-color: rgba(134, 134, 134, 0.238);
	border-radius: 10px;
	min-height: 100px;
	max-height: 200px;
	overflow-y: scroll;
	color: rgba(55, 55, 55, 0.879);
}
.source-text{
	/* margin-bottom: 200px; */
    overflow-y: scroll;
    max-height: 100px;
}
.margin-box{
	margin-top: 50px;
}
.definition {
	font-size: 14px;
	font-style: italic;
	color: rgba(128, 128, 128, 0.793);
}
</style>
