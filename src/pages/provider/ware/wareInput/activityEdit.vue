<template>
	<section>
		<!-- 工具栏 -->
		<el-row class="toolbar">
			<el-button type="primary" @click="handleAdd">新增推荐活动</el-button>
			<el-button type="primary" @click="backList">返回商品列表</el-button>
			<el-button type="primary" @click="submitVerify">提交审核</el-button>
		</el-row>
		<!-- 推荐活动列表 -->
		<el-table :data="activityList" border highlight-current-row>
			<el-table-column type="index"></el-table-column>
			<el-table-column prop="wareCode" label="活动ID" width="180px"></el-table-column>
			<el-table-column prop="wareName" label="活动名称"></el-table-column>
			<el-table-column prop="wareDesc" label="活动描述"></el-table-column>
			<el-table-column prop="updateTime" label="更新时间" width="180px" :formatter="formatUpdateTime"></el-table-column>
			<el-table-column label="操作" width="180px">
				<template scope="scope">
					<el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
					<el-button type="primary" size="small" @click="handleSkuSet(scope.row.wareId)">库存价格</el-button>
				</template>
			</el-table-column>
		</el-table>
		<!-- 推荐活动表单 -->
		<el-dialog :visible.sync="activityFormVisible" :title="activityFormTitle">
			<el-form :model="wareForm" :rules="rules" ref="wareForm" label-width="110px" class="form-item-width">
					<el-row>
				  	<el-col :span="12">
				  		<el-form-item label="活动名称" prop="wareName">
					    	<el-input v-model="wareForm.wareName" placeholder="活动名称"></el-input>
						  </el-form-item>
				  	</el-col>
            <el-col :span="12">
				  		<el-form-item label="缩略名" prop="briefName">
					    	<el-input v-model="wareForm.briefName" placeholder="缩略名"></el-input>
						  </el-form-item>
				  	</el-col>
				  </el-row>
				  <el-row>
				  	<el-col :span="12">
              <el-form-item label="建议售价" prop="suggestedPrice">
                <el-input v-model.number="wareForm.suggestedPrice" placeholder="建议售价"></el-input>
              </el-form-item>
            </el-col> 
				  	<el-col :span="12">
				  		<el-form-item label="关键字" prop="keyWords">
					    	<el-input v-model="wareForm.keyWords" placeholder="关键字以英文逗号分隔"></el-input>
						  </el-form-item>
				  	</el-col>
				  </el-row>
				  <el-row>
						<el-form-item label="活动描述：" prop="wareDesc">
						 <el-input v-model="wareForm.wareDesc" type="textarea" :rows="5"></el-input>
						</el-form-item>
					</el-row>
			</el-form>
			<div slot="footer" class="dialog-footer">
		    <el-button @click="activityFormVisible = false">取 消</el-button>
		    <el-button type="primary" @click="onSubmit">确 定</el-button>
		  </div>
		</el-dialog>
	</section>
</template>
<script>
	import { readWareActivity, saveWareActivityInfo, updateVerifyStatus, updateWareUpDownStatus } from '@/api'
	export default {
		data () {
			return {
				wareId: '',
				activityFormTitle: '',
				activityFormVisible: false,
				activityList: [
					{
	          wareId: 10001,
	          wareCode: 111110001,
	        	wareName: '普吉岛5日半自助游直飞随心DIY',
	        	briefName: '普吉岛5日半自助',
          	keyWords: '普吉岛',
	        	wareDesc: '普吉岛5日半自助游直飞随心DIY',
	          status: 0
	        }
				],
	      wareForm: {
          wareId: '',
        	wareName: '',
          briefName: '',
          keyWords: '',
          wareDesc: '',
          suggestedPrice: '',
          parentId: '',
        },
        rules: {
        	wareName: [
        		{required: true, message: '请输入活动名称', trigger: 'blur'}
        	],
        	briefName: [
        		{required: true, message: '请输入活动缩略名', trigger: 'blur'}
        	],
        	wareDesc: [
        		{required: true, message: '请输入活动描述', trigger: 'blur'}
        	],
          // suggestedPrice: [
          //   {type: 'number', message: '请输入建议售价', trigger: 'blur'}
          // ],
        },
			}
		},
		methods: {
			formatUpdateTime (row) {
				return row.updateTime && this.$moment(row.updateTime).format('YYYY-MM-DD HH:mm:ss')
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
			// 新增推荐活动
			handleAdd () {
				this.wareForm = {};
				this.activityFormTitle = '新增推荐活动';
				this.activityFormVisible = true
			},
			// 编辑推荐活动
			handleEdit (row) {
				this.wareForm = Object.assign({}, row);
				this.activityFormTitle = '编辑推荐活动';
				this.activityFormVisible = true
			},
      // 保存推荐活动
      onSubmit() {
        this.$refs.wareForm.validate((valid) => {
          if (valid) {
          	let form = {
		          wareId: '',
		        	wareName: '',
		          briefName: '',
		          keyWords: '',
		          wareDesc: '',
		          suggestedPrice: '',
		          parentId: '',
		          openDate: '',
		          closeDate: '',
		          srcCityCode: '',
		          dstCityCode: '',
		          brandId: '',
		          tripDays: '',
		          sellPreDays: '',
		          nocashReserveMinute: '',
		        }
          	let data = Object.assign(form, this.wareForm)
          	data.parentId = this.wareId;
            // console.log(data)
            saveWareActivityInfo(data)
            .then(res => {
            	console.log(res)
            	if (res.data.code === '0001') {
                this.$message.success(res.data.message)
                this.getActivityList()
            	} else {
            		this.$message.error(res.data.message)
            	}
            })
            .catch(err => {
            	console.log(err)
              this.catchError(err.response)
            })
            this.activityFormVisible = false;
          } else {
          	this.$message.error('表单输入有误')
            return false;
          }
        })
      },
      // 推荐活动上下架
      handleShelf (row) {
      	console.log(Object.assign({}, row))
      	let params = {
      		wareId: row.wareId
      	}
      	updateWareUpDownStatus(params).then(res => {
      		console.log(res)
      	}).catch(err => {
      		console.log(err)
      	})
      },
      // 设置sku
      handleSkuSet (wareId) {
      	this.$router.push({
      		path: '/provider/ware/activitySkuSet?wareId=' + wareId
      	})
      },
      // 返回商品列表
      backList () {
        this.$router.push('/provider/ware/wareManage')
      },
      // 提交审核
      submitVerify () {
      	this.$confirm('确定将该商品提交审核？', '提示', {type: 'warning'})
				.then(() => {
        	updateVerifyStatus({wareId: this.wareId}).then(res => {
        		console.log(res)
        		if (res.data.code === '0001') {
        			this.$message.success(res.data.message)
        			this.$router.push('/provider/ware/wareManage')
        		} else {
        			this.$message.error(res.data.message)
        		}
        	}).catch(err => {
        		console.log(err)
        		this.catchError(err.response)
        	})
				})
				.catch(err => {
					console.log(err)
					// this.$message('已取消操作')
				})
      }
		},
		mounted () {
			this.$store.dispatch('setStepActive', 6)
			let wareId = parseInt(this.$route.query.wareId)
			if (wareId) {
				this.wareForm.parentId = this.wareId = wareId;
				this.getActivityList()
			} else {
				this.$router.push('base')
			}
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
