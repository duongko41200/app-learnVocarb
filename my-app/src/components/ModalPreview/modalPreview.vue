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
										<div class="vaule" v-if="dictionarys.word">
											{{ dictionarys.word }}
										</div>
										<div v-else>
											<div class="type-word">Source</div>
											<div class="source-text">
												{{ selectedText }}
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
								<div class="d-flex gap-2 justify-content-end align-items-center">
									<!-- //google -->
									<div @click="LookUpDictionary('google')" v-show="lengthText===1">
										<svg width="24" height="16" fill="none">
											<path
												d="M.5 8A7.5 7.5 0 018 .5h8a7.5 7.5 0 010 15H8A7.5 7.5 0 01.5 8z"
												stroke="#8C8C8C"
											></path>
											<g
												clip-path="url(#gg-icon_svg__clip0_8801_60807)"
											>
												<path
													d="M17.28 8.125c0-.39-.035-.765-.1-1.125H12v2.127h2.96a2.53 2.53 0 01-1.098 1.66v1.38h1.778c1.04-.957 1.64-2.367 1.64-4.042z"
													fill="#4285F4"
												></path>
												<path
													d="M12 13.5c1.485 0 2.73-.493 3.64-1.333l-1.777-1.38c-.493.33-1.123.525-1.863.525-1.432 0-2.645-.968-3.077-2.268H7.085v1.425A5.498 5.498 0 0012 13.5z"
													fill="#34A853"
												></path>
												<path
													d="M8.922 9.044A3.306 3.306 0 018.75 8c0-.362.062-.715.172-1.045V5.53H7.085a5.498 5.498 0 000 4.94l1.837-1.425z"
													fill="#FBBC05"
												></path>
												<path
													d="M12 4.687c.807 0 1.533.278 2.102.823l1.578-1.578C14.727 3.045 13.483 2.5 12 2.5a5.498 5.498 0 00-4.915 3.03l1.838 1.425c.432-1.3 1.645-2.268 3.077-2.268z"
													fill="#EA4335"
												></path>
											</g>
											<defs>
												<clipPath id="gg-icon_svg__clip0_8801_60807">
													<path
														fill="#fff"
														transform="translate(6 2)"
														d="M0 0h12v12H0z"
													></path>
												</clipPath>
											</defs>
										</svg>
									</div>

									<!-- //camprit dictionary -->
									<div @click = "LookUpDictionary('cambridge')" v-show="lengthText===1">
										<svg width="24" height="16" fill="none">
											<rect
												x="0.5"
												y="0.5"
												width="23"
												height="15"
												rx="7.5"
												stroke="#8C8C8C"
											></rect>
											<path
												d="M18.902 4.057H15.913v.511H16.212a.65.65 0 01.564.32c.119.201.123.444.012.649l-3.215 5.9-1.464-3.49 1.38-2.53a1.627 1.627 0 011.429-.85h.163v-.51h-3.087v.511H12.293a.65.65 0 01.564.32c.119.201.123.444.012.649l-1 1.836-.892-2.125a.483.483 0 01.044-.461.483.483 0 01.408-.22h.327v-.51H8.102v.511H8.248c.682 0 1.293.406 1.557 1.035l1.317 3.14-1.468 2.694-2.596-6.19a.483.483 0 01.044-.46.483.483 0 01.408-.22H7.96v-.51H4v.511h.329c.682 0 1.293.406 1.557 1.035l2.993 7.135a.335.335 0 00.603.03l.39-.716 1.49-2.735 1.436 3.42a.335.335 0 00.603.031l.39-.716 3.616-6.635a1.627 1.627 0 011.43-.85H19v-.51h-.098z"
												fill="#000"
											></path>
										</svg>
									</div>

									<div @click = "LookUpDictionary('video')" :class="lengthText>1?'margin-top-box':''">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="24"
											height="16"
											viewBox="0 0 24 16"
											fill="none"
										>
											<path
												d="M0.5 8C0.5 3.85786 3.85786 0.5 8 0.5H16C20.1421 0.5 23.5 3.85786 23.5 8C23.5 12.1421 20.1421 15.5 16 15.5H8C3.85786 15.5 0.5 12.1421 0.5 8Z"
												stroke="#8C8C8C"
											></path>
											<g clip-path="url(#clip0_1431_12482)">
												<path
													d="M8.61987 8.49037V12.6C8.61987 12.8449 8.81784 13.0428 9.06269 13.0428C9.30713 13.0428 9.50551 12.8449 9.50551 12.6V8.49037C9.50551 8.24585 9.30713 8.04755 9.06269 8.04755C8.81784 8.04755 8.61987 8.24564 8.61987 8.49037Z"
													fill="#8C8C8C"
												></path>
												<path
													d="M7.22996 13.0478H8.20499V8.16864C8.20766 8.14526 8.21192 8.12192 8.21192 8.09795C8.21192 5.99296 9.91096 4.28064 11.9991 4.28064C14.0869 4.28064 15.786 5.99296 15.786 8.09795C15.786 8.13014 15.7907 8.16133 15.7955 8.19244V13.0478H16.7707C17.4494 13.0478 18 12.4782 18 11.7755V9.23111C18 8.65163 17.6247 8.16342 17.1123 8.0098C17.0651 5.21338 14.7903 2.95219 11.9993 2.95219C9.2075 2.95219 6.93236 5.21359 6.88568 8.01089C6.37396 8.16471 6 8.6525 6 9.23153V11.7755C6 12.4778 6.55063 13.0478 7.22996 13.0478Z"
													fill="#8C8C8C"
												></path>
												<path
													d="M14.4954 8.49037V12.6C14.4954 12.8449 14.6936 13.0428 14.9381 13.0428C15.1827 13.0428 15.3809 12.8449 15.3809 12.6V8.49037C15.3809 8.24585 15.1827 8.04755 14.9381 8.04755C14.6932 8.04755 14.4954 8.24564 14.4954 8.49037Z"
													fill="#8C8C8C"
												></path>
											</g>
											<defs>
												<clipPath id="clip0_1431_12482">
													<rect
														width="12"
														height="12"
														fill="white"
														transform="translate(6 2)"
													></rect>
												</clipPath>
											</defs>
										</svg>
									</div>
								</div>
								<div>
									<div
										class="type-word"
										:class="!dictionarys.word ? 'margin-box' : ''"
									>
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
import TopicService from '@/services/topic.service.js';

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
			lengthText:0
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
			this.closeModal();
		},
		async handleMouseUp() {
			this.dictionarys = {};
			this.isModalTranslate = false;
			const selectedText = this.getSelectedText();
			console.log('handleMouseUp', selectedText);
			this.selectedText = selectedText;
			this.lengthText = this.selectedText.split(' ').length
			this.isTextHighlighted = selectedText.length > 0;

			//toa do
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
			console.log({
				translate: translate.data.responseData.translatedText,
			});

			try {
				const dictionary = await DictionaryService.getDictionaryApi(
					selectedText
				);

				let data = dictionary.data[0];
				console.log({ data });

				const text =  filterDictionary(
					dictionary.data[0].phonetics,
					'text'
				);
				const audio =  filterDictionary(
					dictionary.data[0].phonetics,
					'audio'
				);
				const definition =  filterDictionary(
					dictionary.data[0].meanings[0].definitions,
					'definition'
				);
				const example =  filterDictionary(
					dictionary.data[0].meanings[0].definitions,
					'example'
				);
				const typeWord =  dictionary.data[0].meanings[0]
					.partOfSpeech;
				const synonyms =  dictionary.data[0].meanings[0].synonyms;

				const arrDictory = {
					text: text ? text : dictionary.data[0].phonetic,
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
				this.dictionarys = {
					translate: translate.data.responseData.translatedText,
				};
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


		async LookUpDictionary(value) {
			console.log('lookupDictionary', value);
			await TopicService.autoDictionary({
				nameWeb: value,
				word: this.selectedText

			})
		}
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
	max-height: 341px;
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
.translate-text,
.source-text {
	padding: 12px 10px;
	text-align: start;
	/* font-size: 19px; */
	/* font-weight: 700; */
	background-color: rgba(134, 134, 134, 0.238);
	border-radius: 10px;
	min-height: 100px;
	max-height: 150px;
	overflow-y: scroll;
	color: rgba(55, 55, 55, 0.879);
}
.source-text {
	/* margin-bottom: 200px; */
	overflow-y: scroll;
	max-height: 100px;
}
.margin-box {
	margin-top: 25px;
}
.definition {
	font-size: 14px;
	font-style: italic;
	color: rgba(128, 128, 128, 0.793);
}
.margin-top-box{
	margin-top: 49px;
}
</style>
