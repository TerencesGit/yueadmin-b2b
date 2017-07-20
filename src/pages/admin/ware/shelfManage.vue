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
				<el-form-item label="">
					<el-button type="primary" @click="getWareList">搜索</el-button>
				</el-form-item>
			</el-form>
		</el-row>
		<el-table :data="wareList" border highlight-current-row>
			<el-table-column prop="wareId" label="商品编号" srotable></el-table-column>
			<el-table-column prop="wareName" label="商品名称" srotable></el-table-column>
			<el-table-column prop="providerName" label="供应商" width="150"></el-table-column>
			<el-table-column prop="srcCityName" label="出发城市" width="120"></el-table-column>
			<!-- <el-table-column prop="dstCityName" label="目的城市"></el-table-column> -->
			<el-table-column prop="createName" label="联系人" width="120"></el-table-column>
			<el-table-column prop="status" label="状态" :formatter="formatStatus" width="100"></el-table-column>
			<el-table-column label="操作" width="180">
				<template scope="scope">
					<el-button v-if="scope.row.status === 0" size="small" @click="handleShelf(scope.row)">上架</el-button>
					<el-button v-else size="small" @click="handleShelf(scope.row)">下架</el-button>
					<el-button size="small" @click="handleShowDetail(scope.row.wareId)">详情</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-row class="toolbar">
			<el-pagination 
				@size-change="handleSizeChange"
	      @current-change="handleCurrentChange"
	      :current-page.sync="currPage"
	      :page-size="pageSize"
	      :page-sizes="[10, 20, 30, 40]"
	      layout="total, sizes, prev, pager, next, jumper"
	      :total="total">
			</el-pagination>
		</el-row>
	</section>
</template>
<script>
	import { readWareList, updateWareUpDownStatus } from '@/api'
	export default {
		data () {
			return {
				filter: {
					name: '',
					code: '',
				},
				currPage: 1,
				pageSize: 10,
				total: 0,
				wareList: []
			}
		},
		methods: {
			formatStatus (row, column) {
				return row.status === 0 ? '下架' : row.status === 1 ? '上架' : '未知'
			},
			handleSizeChange (val) {
				this.pageSize = val;
				this.getWareList()
			},
			handleCurrentChange (val) {
				this.currPage = val;
				this.getWareList()
			},
			getWareList () {
				this.loading = true;
				let data = {
					currPage: this.currPage,
					pageSize: this.pageSize,
					wareName: this.filter.name,
					wareCode: this.filter.code,
					verifyStatus: 2
				}
				console.log(data)
				readWareList(data).then(res => {
					console.log(res)
					this.loading = false;
					if (res.data.code === '0001') {
						this.total = res.data.result.pageInfo.count;
						this.wareList = res.data.result.wareList
					} else {
						this.$message.error(res.data.message)
					}
				})
				.catch(err => {
					this.loading = false;
					console.log(err)
					this.catchError(err.response)
				})
			},
			// 商品上下架
			handleShelf (row) {
				let status = row.status === 1 ? 0 : 1
				let text = row.status === 1 ? '下架' : '上架'
				this.$confirm('确定'+text+'该产品？', '提示', {}).then(() => {
					let data = {
						wareId: row.wareId,
						// status: status
					}
					updateWareUpDownStatus(data).then(res => {
						console.log(res)
						if (res.data.code === '0001') {
							this.$message.success('操作成功')
						} else {
							this.$message.error('操作失败')
						}
					})
				}).catch(err => {
					console.log(err)
					this.$message.info('已取消操作')
				})
			},
			// 商品详情
	    handleShowDetail (wareId) {
	      this.$router.push({
	        path: '/admin/ware/detail?wareId=' + wareId
	      })
	    },
		},
		mounted () {
			this.getWareList()
		}
	}
</script> 