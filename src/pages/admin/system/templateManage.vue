<template>
	<section>
		<!-- 条件搜索 -->
		<el-row class="toolbar">
			<el-form :inline="true">
				<el-form-item label="模板名称">
					<el-input v-model="filter.templateName" placeholder="输入模板名称搜索"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="getTemplateList">搜索</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="handleAdd">新增模板</el-button>
				</el-form-item>
			</el-form>
		</el-row>
		<!-- 模板列表 -->
		<el-table 
			border 
			v-loading="loading" 
			:data="templateList"
			@expand="handleExpand">
		  <el-table-column type="expand" width="50" label="属性名">
	    	<template scope="scope">
	    		<el-form inline label-position="left" class="table-expand">
	    			<el-form-item label="模板名称">
	    				<span>{{scope.row.templateName}}</span>
	    			</el-form-item>
	    			<el-form-item label="模板页面名称">
	    				<span>{{scope.row.htmlName}}</span>
	    			</el-form-item>
	    			<el-form-item label="模板描述">
	    				<span>{{scope.row.description}}</span>
	    			</el-form-item>
	    			<el-form-item label="创建时间">
	    				<span>{{scope.row.createTime}}</span>
	    			</el-form-item>
						<el-form-item label="创建人">
	    				<span>{{scope.row.createBy}}</span>
	    			</el-form-item>
	    			<el-form-item label="模板属性">
	    				<span v-for="(item, index) in scope.row.attributeNameList" :key="index">
	    				<el-tag type="primary" v-text="item.attributeName"></el-tag>
	    				</span>
	    			</el-form-item>
	    		</el-form>
	    	</template>
	    </el-table-column>
	    <el-table-column prop="templateName" label="模板名称"></el-table-column>
	    <el-table-column prop="htmlName" label="模板页面名称"></el-table-column>
	    <!-- <el-table-column prop="description" label="模板描述"></el-table-column> -->
	    <el-table-column prop="createTime" label="创建时间" width="180"></el-table-column>
	    <el-table-column prop="createBy" label="创建人"></el-table-column>
	    <el-table-column :formatter="formatStatus" prop="status" label="状态" width="90"></el-table-column>
	    <el-table-column label="操作" width="170">
	    	<template scope="scope">
	        <el-button size="small" type="warning"
	          @click="handleEdit(scope.row)">编辑</el-button>
	        <el-button size="small" type="danger"
	          @click="handleDelete(scope.row)">删除</el-button>
        </template>
	    </el-table-column>
		</el-table>
		<!-- 分页 -->
		<el-row class="toolbar">
			<el-pagination
		      @size-change="handleSizeChange"
		      @current-change="handleCurrentChange"
		      :current-page="filter.currPage"
		      :page-sizes="[10, 20, 30, 40]"
		      :page-size="filter.pageSize"
		      layout="total, sizes, prev, pager, next, jumper"
		      :total="count">
		    </el-pagination>
		</el-row>
		<!-- 模板表单 -->
		<el-dialog 
			:title="templateFormTitle" 
			:visible.sync="templateFormVisible">
			<el-row>
				<el-col :span="16" :offset="4">
					<el-form :model="templateForm" :rules="rules" ref="templateForm" label-width="120px">
						<el-form-item label="模板名称：" prop="templateName">
							<el-input v-model="templateForm.templateName" placeholder="请输入模板名称"></el-input>
						</el-form-item>
						<el-form-item label="模板页面：" prop="htmlName">
						  <el-input v-model="templateForm.htmlName" placeholder="请输入模板页面名"></el-input>
						</el-form-item>
						<el-form-item label="模板属性：" prop="attributeIdList">
				    	<el-select v-model="templateForm.attributeIdList" multiple placeholder="请选择属性(可多选)" style="width: 100%">
			    	    <el-option v-for="(item, index) in attributeList" :key="index" :label="item.attributeName" :value="item.attributeId">
			    	    </el-option>
				    	</el-select>
						</el-form-item>
						<el-form-item label="模板描述：" prop="description">
						  <el-input type="textarea" v-model="templateForm.description" placeholder="请输入模板描述"></el-input>
						</el-form-item>
						<el-form-item label="状态：" prop="status">
					    <el-radio-group v-model.number="templateForm.status">
					      <el-radio :label="1">启用</el-radio>
					      <el-radio :label="0">禁用</el-radio>
					    </el-radio-group>
						</el-form-item>
					</el-form>
				</el-col>
			</el-row>
			<div slot="footer">
	    	<el-button @click="templateFormVisible = false">取消</el-button>
	    	<el-button type="primary" @click="submitForm">提交</el-button>
			</div>
		</el-dialog>
	</section>
</template>

<script>
	import { readTemplateList, readAttributeList, createTemplate, findAttributeListByTemplateId, deleteTemplate, updateTemplate } from '@/api'
	export default {
		data(){
			return {
				filter: {
					templateName: '',
					currPage: 1,
					pageSize: 20
				},
				count: 0,
				loading: false,
				attributeList: [
					{
						attributeId: 100001,
						attributeName: '大交通',
					},
					{
						attributeId: 100002,
						attributeName: '商品介绍',
					},
					{
						attributeId: 100003,
						attributeName: '费用说明',
					},
				],
				templateAttrList: [],
				templateFormVisible: false,
				templateFormTitle: '',
				templateForm: {
					templateId: '',
					templateName: '',
					attributeIdList: [],
					description: '',
					htmlName: '',
					status: 1
				},
				rules: {
					templateName: [
						{ required: true, message: '请输入模板名称', trigger: 'blur' }
					],
					attributeIdList: [
						{ required: true, type:'array', message: '请选择属性', trigger: 'blur' }
					],
					description: [
						{ required: true, message: '请输入模板描述', trigger: 'blur' }
					],
					htmlName:[
						{ required: true, message: '请输入模板页面', trigger: 'blur' }
					],
				},
				templateList: [{
					templateId: 100001,
					templateName: '模板1',
					htmlName: '模板页面1',
					createTime: new Date(),
					status: 1,
					attributeNameList: []
				},{
					templateId: 100002,
					templateName: '模板2',
					htmlName: '模板页面2',
					createTime: new Date(),
					status: 0,
					attributeNameList: []
				}],
			}
		},
		methods:{
			formatStatus(row) {
				return row.status === 1 ? '启用' : '禁用';
			},
			// 获取属性列表
			getAttributeList() {
				this.loading = true;
				let params = Object.assign({}, this.filter);
				readAttributeList(params).then((res) => {
					console.log(res)
					if (res.data.code === "0001") {
						this.attributeList = res.data.result.defineList;
						this.count = res.data.result.pageInfo.count;
					} else {
						this.$message(res.data.message);
					}
					this.loading = false;
				}).catch((error) => {
					this.catchError(error.response)
    		  this.loading = false;
				})
			},
			// 获取模板列表
			getTemplateList(){
				this.loading = true;
				let params = Object.assign({}, this.filter)
				readTemplateList(params).then(res => {
					console.log(res)
					if(res.data.code === "0001"){
						this.templateList = res.data.result.templateList;
						this.count = res.data.result.pageInfo.count;
					}else{
						this.$message(res.data.message);
					}
					this.loading = false;
				}).catch((error) => {
					this.catchError(error.response)
    		  this.loading = false;
				})
			},
			// 获取模板对应属性列表
			// getAttrListByTemplateId(templateId) {
			// 	let params = {
			// 		templateId: templateId
			// 	}
			// 	let selList = this.templateList.filter(template => {
			// 		if(template.templateId === templateId) return true;
			// 		return false;
			// 	})
			// 	if(selList[0].attributeNameList.length !== 0) return;
			// 	findAttributeListByTemplateId(params).then(res => {
			// 		console.log(res)
			// 		if(res.data.code === '0001') {
			// 			selList[0].attributeNameList = res.data.result.attributeList.map(item => item.attributeName)
			// 			this.templateForm.attributeIdList = res.data.result.attributeList.map(item => item.attributeId)
			// 		} else {
			// 			this.$message.error(res.data.message)
			// 		}
			// 	}).catch(err => {
			// 		this.catchError(err.response)
			// 	})
			// },
			// 新增模板
			handleAdd() {
				this.templateFormTitle = '新增属性模板'
				this.templateForm = {
					templateId: '',
					templateName: '',
					attributeIdList: [],
					description: '',
					htmlName: '',
					status: 1
				}
				this.templateFormVisible = true;
			},
			// 编辑模板
			handleEdit(row) {
				this.templateFormTitle = '编辑属性模板'
				this.templateForm = Object.assign({}, row);
				this.templateForm.attributeIdList = row.attributeNameList.map(item => item.attributeId)
				console.log(this.templateForm)
				this.templateFormVisible = true;
			},
			// 表单提交
			submitForm() {
				this.$refs.templateForm.validate((valid) => {
          if (valid) {
            let data = Object.assign({}, this.templateForm);
            console.log(data)
            createTemplate(data).then(res => {
            	if(res.data.code === "0001") {
            		this.$message.success(res.data.message);
        		    this.getTemplateList();
            		// for(let i in this.templateForm){
            		// 	this.templateForm[i] = '';
            		// }
            		// this.templateForm.attributeId = [];
            	} else {
            		this.$message.error(res.data.message);
            	}
            	this.templateFormVisible = false;
            }).catch((error) => {
            	this.catchError(error.response)
            	this.templateFormVisible = false;
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        })
			},
			// 
			handleExpand (row, expanded) {
				// expanded && this.getAttrListByTemplateId(row.templateId)
			},
			// 模板删除
			handleDelete(row) {
				this.$confirm('确认要删除该模板？', '提示', {type: 'warning'}).then(() => {
      				let data = {
      					templateId:row.templateId
      				}
      				console.log(data);
      				deleteTemplate(data).then((res) => {
      					console.log(res)
      					if(res.data.code === "0001") {
      						this.$message.success(res.data.message);
      		        this.getTemplateList();
      					}else{
      						this.$message.error(res.data.message);
      					}
      				}).catch((error)=>{
      					this.catchError(error.response)
      				})
        }).catch(() => {
          this.$message('已取消操作')
        })
			},
			handleSizeChange(val) {
				this.filter.pageSize = val;
				this.getTemplateList();
			},
			handleCurrentChange(val) {
				this.filter.currPage = val;
				this.getTemplateList();
			},
		},
		created() {
			this.getAttributeList()
			this.getTemplateList()
		}
	}
</script>
<style scoped lang="scss">
	.table-expand {
		font-size: 0;
		label {
			width: 120px;
    	color: #99a9bf;
		}
	  .el-form-item {
	    width: 50%;
	    margin-right: 0;
	    margin-bottom: 0;
	    .el-form-item__label {
				width: 120px;
	    	color: #99a9bf;
			}
	    .el-tag {
	    	margin-right: 10px
	    }
	  }
	}
</style>