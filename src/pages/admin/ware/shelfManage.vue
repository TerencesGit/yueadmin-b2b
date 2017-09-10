<template>
	<section>
		<el-row class="toolbar">
			<el-form :inline="true" :model="filter">
				<el-form-item label="商品编号">
					<el-input v-model="filter.name" placeholder="商品编号"></el-input>
				</el-form-item>
				<el-form-item label="商品名称">
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
			<el-table-column prop="upDownTime" label="上/下架时间" sortable width="200"></el-table-column>
			<el-table-column prop="status" label="状态" :formatter="formatStatus" width="100"></el-table-column>
			<el-table-column label="操作" width="240">
				<template scope="scope">
					<el-button v-if="scope.row.status === -1" size="small" @click="showCause(scope.row)">查看原因</el-button>
					<el-button v-if="scope.row.status === -1" size="small" @click="handleShelf(scope.row)">上架</el-button>
					<el-button v-if="scope.row.status === 0" size="small" @click="return false" disabled>上架</el-button>
					<el-button v-if="scope.row.status === 1" size="small" @click="handleShelf(scope.row)">下架</el-button>
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
		<el-dialog title="商品下架" :visible.sync="dialogVisible">
      <el-form :model="shelfForm" :rules="rules" ref="shelfForm" style="padding: 0 30px">
        <el-form-item label="" prop="cause">
          <el-input type="textarea" :rows="5" v-model="shelfForm.cause" placeholder="请输入下架原因"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click.native="submitForm">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="下架原因" :visible.sync="causeVisible">
    	<div class="dialog-content">
    		{{ cause }}
    	</div>
    	<div slot="footer" class="dialog-footer">
        <el-button type="primary" @click.native="causeVisible = false">确 定</el-button>
      </div>
    </el-dialog>
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
				wareList: [{
	        wareId: 10001,
	        wareName: '三亚旅拍1',
	        status: 1
	      },
	      {
	        wareId: 10002,
	        wareName: '三亚旅拍2',
	        status: 0
	      },{
	        wareId: 10003,
	        wareName: '三亚旅拍3',
	        status: -1,
	        cause: '暂无原因'
	      }],
	      cause: '',
	      causeVisible: false,
	      dialogVisible: false,
	      wareId: '',
	      shelfForm: {
	      	cause: '',
	      },
	      rules: {
	      	cause: [
	      		{required: true, message: '请输入下架原因', trigger: 'blur'},
	      	]
	      }
			}
		},
		methods: {
			formatStatus (row, column) {
				return row.status === 0 ? '已下架' : row.status === 1 ? '已上架' : '平台下架'
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
					this.$catchError(err)
				})
			},
			// 商品上下架
			handleShelf (row) {
				this.wareId = row.wareId;
				this.shelfForm.cause = '';
				if (row.status === 0) return;
				if (row.status === 1) {
					this.dialogVisible = true;
					return;
				}
				this.$confirm('确定上架该产品？', '提示', {type: 'warning'}).then(() => {
					let data = {
						wareId: row.wareId,
						upDownStatus: 1,
					}
					updateWareUpDownStatus(data).then(res => {
						console.log(res)
						if (res.data.code === '0001') {
							this.$message.success('操作成功')
							this.getWareList()
						} else {
							this.$message.error(res.data.message)
						}
					}).catch(err => {
						console.log(err)
					})
				}).catch(err => {
					console.log(err)
					this.$message.info('已取消操作')
				})
			},
			// 商品下架提交
			submitForm() {
				this.$refs.shelfForm.validate((valid) => {
	        if(valid) {
	        	let data = {
	        		wareId: this.wareId,
	        		cause: this.shelfForm.cause,
	        		upDownStatus: 0
	        	}
	        	console.log(data)
		      	updateWareUpDownStatus(data).then(res => {
							console.log(res)
							if (res.data.code === '0001') {
								this.$message.success('操作成功')
								this.getWareList()
							} else {
								this.$message.error(res.data.message)
							}
						}).catch(err => {
							console.log(err)
						})
						this.dialogVisible = false;
	        } else {
	        	console.log('err submit')
	        }
	      })
			},
			showCause (row) {
				this.cause = row.cause;
				this.causeVisible = true;
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