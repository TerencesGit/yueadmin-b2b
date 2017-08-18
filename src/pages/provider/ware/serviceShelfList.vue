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
		<!-- 附加服务列表 -->
		<el-table :data="serviceList" border highlight-current-row>
			<el-table-column type="index"></el-table-column>
			<el-table-column prop="wareCode" label="服务ID" width="180px"></el-table-column>
			<el-table-column prop="wareName" label="服务名称"></el-table-column>
			<el-table-column prop="wareDesc" label="服务描述"></el-table-column>
			<el-table-column prop="updateTime" label="更新时间" width="180px" :formatter="formatUpdateTime"></el-table-column>
			<el-table-column prop="status" label="状态" width="100px" :formatter="formatStatus"></el-table-column>
			<el-table-column label="操作" width="100px">
				<template scope="scope">
					<el-button v-if="scope.row.status === 0" size="small" @click="handleShelf(scope.row)">上架</el-button>
					<el-button v-if="scope.row.status === 1" size="small" @click="handleShelf(scope.row)">下架</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-row class="toolbar">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currPage"
        :page-size="pageSize"
        :page-sizes="[10, 20, 30, 40]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </el-row>
	</section>
</template>
<script>
	import { readWareService, updateWareInfoUpDownStatus} from '@/api'
	export default {
		data () {
			return {
				wareId: '',
				currPage: 1,
				pageSize: 10,
				total: 0,
				serviceList: [{
	        wareId: 10001,
	        wareName: '三亚旅拍',
	        status: 1
	      },
	      {
	        wareId: 10002,
	        wareName: '三亚旅拍',
	        status: 0
	      }],
				filter: {
					code: '',
					name: ''
				}
			}
		},
		methods: {
			formatStatus (row) {
	      return row.status === 1 ? '上架' : row.status === 0 ? '下架' : '未知'
	    },
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
				}).catch(err => {
					console.log(err)
				})
			},
      // 上下架操作
	    handleShelf (row) {
	    	let statusInfo =  row.status === 1 ? '下架' : '上架';
	    	let upDownStatus = row.status === 1 ? 0 : 1;
	    	this.$confirm('确定'+statusInfo+'该附加服务？', '提示', {type: 'warning'}).then(() => {
	    		let data = {
	    			wareId: row.wareId,
	    			upDownStatus: upDownStatus,
	    			wareType: 3
	    		}
	        updateWareInfoUpDownStatus(data).then(res => {
		     	  console.log(res)
		     	  if(res.data.code === '0001') {
		     	  	this.$message.success(res.data.message)
		     	  	this.getServiceList()
		     	  } else {
		     	  	this.$message.error(res.data.message)
		     	  }
		      }).catch(err => {
		      	console.log(err)
		      })
	      }).catch(err => {
	      	console.log(err)
	        this.$message('取消操作')
	      })
	    }
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