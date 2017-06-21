<template>
	<section>
		<el-row class="toolbar">
			<el-form :inline="true" :model="filter">
				<el-form-item label="商品编号：">
					<el-input v-model="filter.name" placeholder="商品编号"></el-input>
				</el-form-item>
				<el-form-item label="商品名称：">
					<el-input v-model="filter.name" placeholder="商品名称"></el-input>
				</el-form-item>
			</el-form>
		</el-row>
		<el-table :data="wareList" border highlight-current-row>
			<el-table-column prop="wareId" label="商品编号"></el-table-column>
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
	      :current-page.sync="currPage"
	      :page-sizes="[10, 20, 30, 40]"
	      :page-size="pageSize"
	      layout="total, sizes, prev, pager, next, jumper"
	      :total="total">
			</el-pagination>
		</el-row>
	</section>
</template>
<script>
	import { readWareList, setShelfStatus } from '@/api'
	export default {
		data () {
			return {
				filter: {
					name: '',
					code: '',
					status: ''
				},
				currPage: 1,
				pageSize: 10,
				total: 0,
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
			getWareList () {
				let data = {
					currPage: this.currPage,
					pageSize: this.pageSize,
					wareName: this.filter.name,
					wareCode: this.filter.code,
					verifyStatus: this.filter.status
				}
				console.log(data)
				readWareList(data)
				.then(res => {
					console.log(err)
					if (res.data.code === '0001') {
						console.log(res.data.wareList)
						this.wareList = res.data.wareList
					} else {
						this.$message.error(res.data.message)
					}
				})
				.catch(err => {
					console.log(err)
					// this.$message.error(this.GLOBAL.resError)
				})
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
		mounted () {
			this.getWareList()
		}
	}
</script> 