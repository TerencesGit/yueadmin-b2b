<template>
	<section>
		<!-- 工具栏 -->
		<el-row class="toolbar">
			<el-button type="primary" @click="handleAdd">新增附加服务</el-button>
		</el-row>
		<!-- 附加服务列表 -->
		<el-table :data="serviceList" border highlight-current-row>
			<el-table-column type="index"></el-table-column>
			<el-table-column prop="wareCode" label="服务ID" width="180px"></el-table-column>
			<el-table-column prop="wareName" label="服务名称"></el-table-column>
			<el-table-column prop="wareDesc" label="服务描述"></el-table-column>
			<el-table-column prop="status" label="状态" width="100px" :formatter="formatStatus"></el-table-column>
			<el-table-column label="操作" width="220px">
				<template scope="scope">
					<el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
					<!-- <el-button v-if="scope.row.status === 0" type="primary" size="small" @click="handleShelf(scope.row)">上架</el-button>
					<el-button v-if="scope.row.status === 1" type="primary" size="small">下架</el-button> -->
					<el-button type="primary" size="small" @click="handleSkuSet(scope.row.wareId)">设置库存</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-row class="toolbar text-center">
			<el-button type="primary" @click="next">下一步</el-button>
		</el-row>
		<!-- 新增服务 -->
		<el-dialog :visible.sync="serviceFormVisible" title="新增附加服务">
			<el-form :model="wareForm" :rules="rules" ref="wareForm" label-width="110px" class="form-item-width">
					<el-row>
				  	<el-col :span="12">
				  		<el-form-item label="服务名称" prop="wareName">
					    	<el-input v-model="wareForm.wareName" placeholder="服务名称"></el-input>
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
						<el-form-item label="服务描述：" prop="wareDesc">
						 <el-input v-model="wareForm.wareDesc" type="textarea" :rows="5"></el-input>
						</el-form-item>
					</el-row>
			</el-form>
			<div slot="footer" class="dialog-footer">
		    <el-button @click="serviceFormVisible = false">取 消</el-button>
		    <el-button type="primary" @click="onSubmit">确 定</el-button>
		  </div>
		</el-dialog>
	</section>
</template>
<script>
	import { readWareService, saveWareServerInfo, updateWareUpDownStatus } from '@/api'
	export default {
		data () {
			return {
				wareId: '',
				serviceFormVisible: false,
				serviceList: [
					{
	          wareId: 10001,
	          wareCode: 111110001,
	        	wareName: '普吉岛5日半自助游直飞随心DIY',
	        	briefName: '普吉岛5日半自助',
          	keyWords: '普吉岛',
	        	wareDesc: '普吉岛5日半自助游直飞随心DIY',
	          status: 0
	        },{
	          wareId: 10002,
	          wareCode: 111110002,
	        	wareName: '普吉岛5日半自助游直飞随心DIY',
	        	briefName: '普吉岛5日半自助',
          	keyWords: '普吉岛',
	        	wareDesc: '普吉岛5日半自助游直飞随心DIY',
	          status: 1
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
        		{required: true, message: '请输入服务名称', trigger: 'blur'}
        	],
        	briefName: [
        		{required: true, message: '请输入服务缩略名', trigger: 'blur'}
        	],
        	wareDesc: [
        		{required: true, message: '请输入服务描述', trigger: 'blur'}
        	],
          // suggestedPrice: [
          //   {type: 'number', message: '请输入建议售价', trigger: 'blur'}
          // ],
        },
			}
		},
		methods: {
			formatStatus (row) {
				return row.status === 0 ? '下架' : '上架'
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
			// 新增附加服务
			handleAdd () {
				this.wareForm = {}
				this.serviceFormVisible = true
			},
			// 编辑附加服务
			handleEdit (row) {
				this.wareForm = Object.assign({}, row);
				this.serviceFormVisible = true
			},
      // 保存附加服务
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
            console.log(data)
            saveWareServerInfo(JSON.stringify(data))
            .then(res => {
            	console.log(res)
            	if (res.data.code === '0001') {
                this.$message.success(res.data.message)
                this.getServiceList()
            	} else {
            		this.$message.error(res.data.message)
            	}
            })
            .catch(err => {
            	console.log(err)
              this.catchError(err.response)
            })
            this.serviceFormVisible = false;
          } else {
          	this.$message.error('表单输入有误')
            return false;
          }
        })
      },
      // 附加服务上下架
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
      handleSkuSet (wareId) {
      	this.$router.push({
      		path: '/provider/ware/serviceSkuSet?subWareId=' + wareId
      	})
      },
      // 下一步
      next () {
        this.$router.push('/provider/ware/new/activity?wareId='+this.wareId)
      }
		},
		mounted () {
			this.$store.dispatch('setStepActive', 6)
			let wareId = parseInt(this.$route.query.wareId)
			if (wareId) {
				this.wareForm.parentId = this.wareId = wareId;
				this.getServiceList()
			} else {
				this.$router.push('/provider/ware/new/base')
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