<template>
	<section>
		<el-row class="toolbar">
			<el-form :inline="true" :model="form">
				<el-form-item label="商品名称：">
					<el-input v-model="form.name" placeholder="商品名称"></el-input>
				</el-form-item>
			</el-form>
		</el-row>
		<el-table :data="wareList" border highlight-current-row>
			<el-table-column prop="wareId" label="商品ID"></el-table-column>
			<el-table-column prop="wareName" label="商品名称"></el-table-column>
			<el-table-column prop="cityStart" label="出发城市"></el-table-column>
			<el-table-column prop="contacts" label="联系人"></el-table-column>
			<el-table-column prop="status" label="状态" :formatter="formatStatus"></el-table-column>
			<el-table-column label="操作">
				<template scope="scope">
					<el-button size="small" @click="handleStockSet(scope.row)">库存设置</el-button>
				</template>
			</el-table-column>
		</el-table>
	</section>
</template>
<script>
	import { setShelfStatus } from '@/api'
	export default {
		data () {
			return {
				form: {
					name: ''
				},
				wareList: [{
					wareId: '0001',
					status: 0
				},
				{
					wareId: '0002',
					status: 1
				}]
			}
		},
		methods: {
			formatStatus (row, column) {
				return row.status === 0 ? '下架' : row.status === 1 ? '上架' : '未知'
			},
			handleStockSet (row) {
				console.log(row)
				this.$router.push({
					path: '/provider/ware/stockSet?id=' + row.wareId
				})
			}
		},
	}
</script> 