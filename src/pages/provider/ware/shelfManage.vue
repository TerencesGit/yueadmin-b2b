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
					<el-button v-if="scope.row.status === 0" size="small" @click="handleShelf(scope.row)">上架</el-button>
					<el-button v-else size="small" @click="handleShelf(scope.row)">下架</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-row class="toolbar">
			<el-pagination 
				@size-change="handleSizeChange"
	      @current-change="handleCurrentChange"
	      :current-page.sync="currentPage"
	      :page-sizes="[10, 20, 30, 40]"
	      :page-size="10"
	      layout="total, sizes, prev, pager, next, jumper"
	      :total="50">
			</el-pagination>
		</el-row>
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
				currentPage: 1,
				wareList: [{
					wareId: '0001',
					status: 0
				},
				{
					wareId: '0002',
					status: 1
				},{
					wareId: '0003',
					status: 1
				}]
			}
		},
		methods: {
			formatStatus (row, column) {
				return row.status === 0 ? '下架' : row.status === 1 ? '上架' : '未知'
			},
			handleShelf (row) {
				let status = row.status === 1 ? 0 : 1
				let text = row.status === 1 ? '下架' : '上架'
				this.$confirm('确定'+text+'该产品？', '提示', {}).then(() => {
					let data = {
						wareId: row.wareId,
						status: status
					}
					setShelfStatus(data).then(res => {
						console.log(res)
						if (res.data.code === '0001') {
							this.$message.success('操作成功')
						} else {
							this.$message.error('操作失败')
						}
					})
				}).catch(() => {
					this.$message.info('已取消操作')
				})
			},
			handleSizeChange () {

			},
			handleCurrentChange () {

			}
		},
	}
</script> 