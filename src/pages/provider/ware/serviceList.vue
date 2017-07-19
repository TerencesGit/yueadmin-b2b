<template>
	<section>
		<!-- 工具栏 -->
		<el-row class="toolbar">
			<el-form :inline="true" :model="filter">
        <el-form-item label="">
          <el-input v-model="filter.code" placeholder="输入服务ID"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-input v-model="filter.name" placeholder="输入服务名称"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary" @click="getServiceList">搜索</el-button>
					<back-button></back-button>
        </el-form-item>
      </el-form>
		</el-row>
		<!-- 推荐服务列表 -->
		<el-table 
			border 
			:data="serviceList" 
			v-loading="loading"
			highlight-current-row>
			<el-table-column type="index"></el-table-column>
			<el-table-column prop="wareCode" label="服务ID" width="180px"></el-table-column>
			<el-table-column prop="wareName" label="服务名称"></el-table-column>
			<el-table-column prop="wareDesc" label="服务描述"></el-table-column>
			<el-table-column prop="updateTime" label="更新时间" width="180px" :formatter="formatUpdateTime"></el-table-column>
			<el-table-column label="操作" width="160px">
				<template scope="scope">
					<el-button type="primary" size="small" @click="setStorage(scope.row.wareId)">设置库存</el-button>
				</template>
			</el-table-column>
		</el-table>
		<!-- <el-row class="toolbar">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currPage"
        :page-size="pageSize"
        :page-sizes="[10, 20, 30, 40]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </el-row> -->
	</section>
</template>
<script>
	import { readWareService, updateWareUpDownStatus} from '@/api'
	export default {
		data () {
			return {
				wareId: '',
				currPage: 1,
				pageSize: 10,
				total: 0,
				serviceList: [],
				filter: {
					code: '',
					name: ''
				},
				loading: false,
			}
		},
		methods: {
			formatUpdateTime (row) {
				return row.updateTime && this.$moment(row.updateTime).format('YYYY-MM-DD HH:mm:ss')
			},
			handleSizeChange (val) {
				this.pageSize = val
			},
			handleCurrentChange (val) {
				this.currPage = val
			},
			// 获取附加服务列表
			getServiceList () {
				this.loading = true;
				let params = {
					parentId: this.wareId
				}
				readWareService(params).then(res => {
					console.log(res)
					if (res.data.code === '0001') {
						this.serviceList = res.data.result.wareServiceList;
					} else {
						this.$message.error(res.data.message)
					}
					this.loading = false;
				}).catch(err => {
					this.loading = false;
					console.log(err)
					this.catchError(err.response)
				})
			},
			// 设置库存
      setStorage (wareId) {
      	this.$router.push({
      		path: '/provider/ware/storageSet?wareId=' + wareId
      	})
      },
		},
		mounted () {
			this.wareId = parseInt(this.$route.query.wareId)
			this.wareId && this.getServiceList()
		}
	}
</script>
<style scoped>
	.el-card {
		margin: 15px;
	}
	.el-card__body {
		padding: 30px;
	}
	.input-width .el-input {
		width: 240px;
	}
	.input-unit {
		margin-left: 5px;
		vertical-align: top;
	}
</style>