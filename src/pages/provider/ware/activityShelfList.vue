<template>
	<section>
		<!-- 工具栏 -->
		<el-row class="toolbar">
			<el-form :inline="true" :model="filter">
        <el-form-item label="">
          <el-input v-model="filter.code" placeholder="输入活动ID"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-input v-model="filter.name" placeholder="输入活动名称"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary" @click="getActivityList">搜索</el-button>
					<back-button></back-button>
        </el-form-item>
      </el-form>
		</el-row>
		<!-- 推荐活动列表 -->
		<el-table :data="activityList" border highlight-current-row>
			<el-table-column type="index"></el-table-column>
			<el-table-column prop="wareId" label="活动ID" width="180px"></el-table-column>
			<el-table-column prop="wareName" label="活动名称"></el-table-column>
			<el-table-column prop="wareDesc" label="活动描述"></el-table-column>
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
	import { readWareActivity, updateWareInfoUpDownStatus} from '@/api'
	export default {
		data () {
			return {
				wareId: '',
				currPage: 1,
				pageSize: 10,
				total: 0,
				activityList: [{
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
			// 获取推荐活动列表
			getActivityList () {
				let params = {
					parentId: this.wareId
				}
				readWareActivity(params).then(res => {
					console.log(res)
					if (res.data.code === '0001') {
						this.activityList = res.data.result.wareActivityList;
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
	    	this.$confirm('确定'+statusInfo+'该推荐活动？', '提示', {type: 'warning'}).then(() => {
	    		let data = {
	    			wareId: row.wareId,
	    			upDownStatus: upDownStatus,
	    			wareType: 2
	    		}
	        updateWareInfoUpDownStatus(data).then(res => {
		     	  // console.log(res)
		     	  if(res.data.code === '0001') {
		     	  	this.$message.success(res.data.message)
		     	  	this.getActivityList()
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
			this.wareId && this.getActivityList()
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