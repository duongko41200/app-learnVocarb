<template>
	<div>
		
		<div>
				<button @click="autoLoginFB">login</button>
			</div>
		<table class="table table-striped" id="dataTable" ref="dataTable">
			<thead>
				<tr>
					<th scope="col">STT</th>
					<th scope="col">username</th>
					<th scope="col">password</th>
					<th scope="col">Handle</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(item, idx) in items" :key="idx">
					<th scope="row">{{ idx + 1 }}</th>
					<td>{{ item.username }}</td>
					<td>{{ item.password }}</td>
					<td></td>
				</tr>
			</tbody>
		</table>
	</div>
</template>
<script>
export default {

	props: {
		items: {
			type: Array,
		
		}
	},
	methods: {
		autoLoginFB() {
			this.$emit('autoLoginFB')
		}
	}

}

</script>
