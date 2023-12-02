<template>
	<div>
		<div>
			<input
				type="text"
				placeholder="search account instagram"
				class="inputSearch"
				v-model="keyword"
			/>
			<button @click="onSubmit">Submit</button>
		</div>

		<table class="table table-striped" id="dataTable" ref="dataTable">
			<thead>
				<tr>
					<th scope="col">STT</th>
					<!-- <th scope="col">Avata</th> -->
					<th scope="col">username</th>
					<th scope="col">follower </th>
					<th scope="col">following</th>
					<th scope="col">Post</th>
					<th>handle</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(item, idx) in dataAccount" :key="idx">
					<th scope="row">{{ idx + 1 }}</th>
					<!-- <td><img :src="item.profile_pic_url_hd" /></td> -->
					<td>{{ item.username }}</td>
					<td>{{ item.edge_followed_by.count | formatCurrent}} <button>detail</button></td>
					<td>{{ item.edge_follow.count |formatCurrent }}</td>
					<td>{{ item.edge_owner_to_timeline_media.count | formatCurrent }}</td>
					<td></td>
				</tr>
			</tbody>
		</table>
	</div>
</template>
<script>
import InstagramService from '@/services/instagram.service';
import { createNamespacedHelpers } from 'vuex';
const listAccountMapper = createNamespacedHelpers('listAccount');
export default {
	data() {
		return {
			keyword: '',
			// dataAccount:[]
		};
	},

	props: {
		items: {
			type: Array,
		},
	},
	computed: {
		...listAccountMapper.mapState(['dataAccount']),
	},
	methods: {
		...listAccountMapper.mapMutations(['SET_ACCOUNT_INSTAGRAM']),
		async onSubmit() {
			const search = await InstagramService.searchUser({
				key: this.keyword,
			});

			let dataSearch =
				search.data.data.data
					.xdt_api__v1__fbsearch__topsearch_connection.users;
			console.log('ksjdfkjsdkfj:', dataSearch);

			let infoAccount = [];
			for (let i = 0; i < 10; i++) {
				let dataDetail = await InstagramService.detailProfile({
					username: dataSearch[i].user.username,
				});
				infoAccount = [...infoAccount, dataDetail.data.data.data.user];
		
			}

			// console.log('hahahaah: :', dataDetail);
			console.log('gia trij', infoAccount);
			this.SET_ACCOUNT_INSTAGRAM(infoAccount);
			
		},
	},
	filters: {
		formatCurrent(value) {
			if (!isNaN(Number(value))) {
				value = Number(value);
			}

			if (typeof value !== 'number') {
				return value;
			}

			return value.toLocaleString('en-US');
		},
	},
};
</script>
<style>
.inputSearch {
	padding: 10px;
	width: 300px;
	border-radius: 20px;
	margin-bottom: 36px;
}
</style>
