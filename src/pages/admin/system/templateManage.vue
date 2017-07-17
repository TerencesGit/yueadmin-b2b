<template>
	<div class="templateManage">
		<!-- 模糊查询 -->
		<el-row type="flex" align="middle">
			<el-form :inline="true" style="width:100%" ref="searchInfo" :model="searchInfo" label-width="80px">
				<el-form-item label="" prop="templateName">
					<el-input v-model="searchInfo.templateName" placeholder="请输入模板名"></el-input>
				</el-form-item>
				<el-form-item label="" prop="createTime">
					<el-date-picker v-model="searchInfo.createTime" type="date" placeholder="请输入创建时间">
				    </el-date-picker>
				</el-form-item>
				<el-form-item label="" prop="status">
				  <el-select v-model="searchInfo.status" placeholder="请选择状态">
				    <el-option label="正常" :value="1"></el-option>
				    <el-option label="停用" :value="0"></el-option>
				  </el-select>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="searchHandle('searchInfo')">搜索</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="handleAdd">新增</el-button>
				</el-form-item>
			</el-form>
		</el-row>
		<!-- 属性列表 -->
		<el-table v-loading="loading" :data="templateManageList" border style="width: 100%">
				<el-table-column type="expand" width="50" label="属性名">
		    	<template scope="scope">
		    		<span style="margin-right:10px" v-for="(item,index) in scope.row.attributeNameList">
		    			属性名
		    			<el-tag type="primary" v-text="item.attributeName"></el-tag>
		    		</span>
		    	</template>
		    </el-table-column>
		    <el-table-column prop="templateName" label="页面模板名"></el-table-column>
		    <!-- <el-table-column :formatter="formatterAttributeNameList" prop="attributeNameList" label="属性名">
		    </el-table-column> -->
		    <el-table-column prop="htmlName" label="路径"></el-table-column>
		    <el-table-column prop="createTime" label="创建时间" width="180"></el-table-column>
		    <el-table-column prop="createName" label="创建人"></el-table-column>
		    <el-table-column :formatter="formatterStatus" prop="status" label="状态"></el-table-column>
		    <el-table-column label="操作" width="180">
		    	<template scope="scope">
	    	        <el-button size="small"
	    	          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
	    	        <el-button size="small" type="danger"
	    	          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
    	        </template>
		    </el-table-column>
		</el-table>
		<!-- 分页 -->
		<el-row type="flex" justify="end" style="margin-top:20px">
			<el-pagination
		      @size-change="handleSizeChange"
		      @current-change="handleCurrentChange"
		      :current-page="pageInfo.currPage"
		      :page-sizes="[10, 20, 30, 40]"
		      :page-size="pageInfo.pageSize"
		      layout="total, sizes, prev, pager, next, jumper"
		      :total="pageInfo.count">
		    </el-pagination>
		</el-row>
		<!-- dialog新增框 -->
		<el-dialog title="新增属性模板管理" :visible.sync="dialogAdd">
			<el-row type="flex" justify="center">
				<el-col :span="22">
					<el-form :model="addTemplateManage" :rules="rules" ref="addTemplateManage" label-width="120px">
						<el-row>
							<el-col :span="20">
								<el-form-item label="页面模板名：" prop="templateName">
									<el-input v-model="addTemplateManage.templateName"></el-input>
								</el-form-item>
							</el-col>
						</el-row>
					    <el-row>
							<el-col :span="20">
								<el-form-item label="属性名：" prop="attributeId">
							    	<el-select style="width:100%" v-model="addTemplateManage.attributeId" multiple placeholder="请选择(可多选)">
							    	    <el-option v-for="(item,index) in propertyManageList" :key="index" :label="item.attributeName" :value="item.attributeId">
							    	    </el-option>
							    	</el-select>
								</el-form-item>
					  		</el-col>
						</el-row>
						<el-row>
							<el-col :span="20">
								<el-form-item label="路径：" prop="htmlName">
								  	<el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" v-model="addTemplateManage.htmlName"></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="20">
								<el-form-item label="状态：" prop="status">
								    <el-radio-group v-model.number="addTemplateManage.status">
								        <el-radio :label="1">正常</el-radio>
								        <el-radio :label="0">停用</el-radio>
								    </el-radio-group>
								</el-form-item>
							</el-col>
						</el-row>
					</el-form>
				</el-col>
			</el-row>
			<div slot="footer">
	    		<el-button type="primary" @click="addSave('addTemplateManage')">保存</el-button>
	    		<el-button @click="dialogAdd = false">取消</el-button>
			</div>
		</el-dialog>
		<!-- dialog编辑框 -->
		<el-dialog title="编辑属性管理" :visible.sync="dialogEdit">
			<el-row type="flex" justify="center">
				<el-col :span="22">
					<el-form :model="editTemplateManage" :rules="rules" ref="editTemplateManage" label-width="160px">
						<el-row>
							<el-col :span="20">
								<el-form-item label="页面模板名：" prop="templateName">
									<el-input v-model="editTemplateManage.templateName"></el-input>
								</el-form-item>
							</el-col>
						</el-row>
					    <el-row>
			    			<el-col :span="20">
			    				<el-form-item label="属性名：" prop="attributeNameList">
			    			    	<el-select style="width:100%" v-model="editTemplateManage.attributeNameList" multiple placeholder="请选择(可多选)">
			    			    	    <el-option v-for="(item,index) in editPropertyManageList" :key="index" :label="item.attributeName" :value="item.attributeId">
			    			    	    </el-option>
			    			    	</el-select>
			    				</el-form-item>
			    	  		</el-col>
						</el-row>
						<el-row>
							<el-col :span="20">
								<el-form-item label="路径：" prop="htmlName">
								  	<el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" v-model="editTemplateManage.htmlName"></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="20">
								<el-form-item label="状态：" prop="status">
								    <el-radio-group v-model.number="editTemplateManage.status">
								        <el-radio :label="1">正常</el-radio>
								        <el-radio :label="0">停用</el-radio>
								    </el-radio-group>
								</el-form-item>
							</el-col>
						</el-row>
					</el-form>
				</el-col>
			</el-row>
			<div slot="footer">
	    		<el-button type="primary" @click="editSave('editTemplateManage')">保存</el-button>
	    		<el-button @click="dialogEdit = false">取消</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import { createTemplate, dropDownAttributeDefineList, readTemplateList, deleteTemplate,updateTemplate } from '@/api'
	import util from '@/assets/js/utils'
	export default {
		data(){
			return {
				loading:false,
				dialogAdd:false,
				dialogEdit:false,
				propertyManageList:[
					{
						label:'大交通',
						value:1
					},
					{
						label:'签证/签注',
						value:2
					}
				],
				editPropertyManageList:[],
				searchInfo:{
					templateName:'',
					createTime:'',
					status:''
				},
				searchRules:{
					templateName:[{required: true, message: '请输入模板名', trigger: 'blur'}],
					createTime:[{required: true, message: '请输入创建时间', trigger: 'blur'}],
					status:[
						{required: true, type:'number', message: '请选择状态', trigger: 'change'}
					]
				},
				addTemplateManage:{
					templateName:'',
					attributeId:[],
					htmlName:'',
					status:''
				},
				editTemplateManage:{},
				rules:{
					templateName:[
						{ required: true, message: '请填写页面模板名', trigger: 'blur' }
					],
					attributeId:[
						{ required: true, type:'array', message: '请选择属性名', trigger: 'change' }
					],
					attributeNameList:[
						{ required: true, type:'array', message: '请选择属性名', trigger: 'change' }
					],
					htmlName:[
						{ required: true, message: '请填写路径', trigger: 'blur' }
					],
					status:[
						{ required: true, type:'number', message: '请选择状态', trigger: 'change' }
					]
				},
				templateManageList:[
					{
						templateName:'预定控制',
						attributeId:1,
						htmlName:'www.baidu.com',
						createTime:'2017.06.17 09:00',
						founder:'房峰辉',
						status:1
					},{
						templateName:'预定控制',
						attributeId:2,
						htmlName:'www.baidu.com',
						createTime:'2017.06.17 10:00',
						founder:'房峰辉2',
						status:0
					},{
						templateName:'预定控制',
						attributeId:1,
						htmlName:'www.baidu.com',
						createTime:'2017.06.17 11:00',
						founder:'房峰辉3',
						status:1
					},
				],
				pageInfo:{
					currPage:1,
					pageSize:20,
					count:0,
				}
			}
		},
		methods:{
			formatterStatus(row,column){
				return row.status === 1 ? '正常' : '停用';
			},
			handleAdd(){
				this.dialogAdd = true;
				dropDownAttributeDefineList().then((res)=>{
					console.log(res);
					this.propertyManageList = Object.assign({},res.data.result.attList);
				}).catch((error)=>{
					console.log(error);
				})
			},
			addSave(formName){
				this.$refs[formName].validate((valid) => {
		          if (valid) {
		            let data = Object.assign({},this.addTemplateManage);
		            console.log(data);
		            createTemplate(data).then((res)=>{
		            	console.log(res);
		            	if(res.data.code === "0001"){
		            		this.$message({
            		          message: res.data.message,
            		          type: 'success'
            		        });
            		        this.getTemplateManageList();
		            		for(let i in this.addTemplateManage){
		            			this.addTemplateManage[i] = '';
		            		}
		            		this.dialogAdd = false;
		            	}else{
		            		this.$message({
            		          message: res.data.message,
            		          type: 'error'
            		        });
		            	}
		            }).catch((error)=>{
		            	this.catchError(error.response)
		            })
		          } else {
		            console.log('error submit!!');
		            return false;
		          }
		        });
			},
			editSave(formName){
				this.$refs[formName].validate((valid) => {
		          if (valid) {
		          	let data = {
		          		templateId:this.editTemplateManage.templateId,
		          		htmlId:this.editTemplateManage.htmlId,
		          		templateName:this.editTemplateManage.templateName,
		          		attributeId:this.editTemplateManage.attributeNameList,
		          		htmlName:this.editTemplateManage.htmlName,
		          		status:this.editTemplateManage.status
		          	}
		          	console.log(data);
		            updateTemplate(data).then((res)=>{
		            	console.log(res);
		            	if(res.data.code === "0001"){
		            		this.$message({
            		          message: res.data.message,
            		          type: 'success'
            		        });
            		        this.getTemplateManageList();
		            		this.dialogEdit = false;
		            	}else{
		            		this.$message({
            		          message: res.data.message,
            		          type: 'error'
            		        });
		            	}
		            }).catch((error)=>{
		            	this.catchError(error.response)
		            })
		          } else {
		            console.log('error submit!!');
		            return false;
		          }
		        });
			},
			searchHandle(formName){
				this.$refs[formName].validate((valid) => {
		          if (valid) {
		          	if(this.searchInfo.createTime){
		          		this.searchInfo.createTime = util.formatDate.format(this.searchInfo.createTime);
		          	}
		            this.getTemplateManageList(this.pageInfo.currPage,this.pageInfo.pageSize,this.searchInfo.templateName,this.searchInfo.createTime,this.searchInfo.status);
		          } else {
		            console.log('error submit!!');
		            return false;
		          }
		        });
			},
			handleEdit(index,row){
				this.dialogEdit = true;
				this.editTemplateManage = Object.assign({},row);
				this.editTemplateManage.attributeNameList = [];
				row.attributeNameList.forEach((v,i,a)=>{
					this.editTemplateManage.attributeNameList.push(v.attributeId);
				})
				console.log(this.editTemplateManage);
				dropDownAttributeDefineList().then((res)=>{
					this.editPropertyManageList = Object.assign({},res.data.result.attList);
				}).catch((error)=>{
					console.log(error);
					this.catchError(error.response)
				})
			},
			handleDelete(index,row){
				this.$confirm('确认要删除属性？', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
      				this.loading = true;
      				let data = {
      					templateId:row.templateId
      				}
      				console.log(data);
      				deleteTemplate(data).then((res)=>{
      					if(res.data.code === "0001"){
      						this.$message({
              		          message: '删除成功',
              		          type: 'success'
              		        });
              		        this.getTemplateManageList();
      						this.loading = false;
      					}else{
      						this.$message({
              		          message: '删除失败',
              		          type: 'error'
              		        });
              		        this.loading = false;
      					}
      				}).catch((error)=>{
      					this.catchError(error.response)
          		        this.loading = false;
      				})
		        }).catch(() => {
		          this.$message({
		            type: 'info',
		            message: '已取消删除'
		          });          
		        });
			},
			handleSizeChange(pageSize){
				this.getTemplateManageList(this.pageInfo.currPage, pageSize,this.searchInfo.templateName,this.searchInfo.createTime,this.searchInfo.status);
			},
			handleCurrentChange(currPage){
				this.getTemplateManageList(currPage, this.pageInfo.pageSize,this.searchInfo.templateName,this.searchInfo.createTime,this.searchInfo.status);
			},
			getTemplateManageList(currPage = 1,pageSize = 20,templateName = "",createTime = "",status = ""){
				this.loading = true;
				let params = {
					currPage:currPage,
					pageSize:pageSize,
					templateName:templateName,
					createTime:createTime,
					status:status
				}
				readTemplateList(params).then((res)=>{
					if(res.data.code === "0001"){
						this.templateManageList = res.data.result.templateList;
						this.pageInfo.currPage = res.data.result.pageInfo.currPage;
						this.pageInfo.pageSize = res.data.result.pageInfo.pageSize;
						this.pageInfo.count = res.data.result.pageInfo.count;
						this.loading = false;
					}else{
						this.$message({
        		          message: res.data.message,
        		          type: 'error'
        		        });
        		        this.loading = false;
					}
				}).catch((error)=>{
					this.catchError(error.response)
    		        this.loading = false;
				})
			}
		},
		created(){
			this.getTemplateManageList();
		}
	}
</script>

<style scoped>
	
</style>