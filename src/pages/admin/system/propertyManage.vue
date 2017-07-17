<template>
	<div class="propertyManage">
		<!-- 模糊查询 -->
		<el-row type="flex" align="middle">
			<el-form :inline="true" style="width:100%" ref="searchInfo" :model="searchInfo" label-width="80px">
				<el-form-item label="属性名称" prop="attributeName">
					<el-input v-model="searchInfo.attributeName" placeholder="请输入查找属性名称"></el-input>
				</el-form-item>
				<el-form-item label="属性状态" prop="attributesStatus">
				  <el-select v-model="searchInfo.attributesStatus" placeholder="请选择状态">
				    <el-option label="启用" :value="1"></el-option>
				    <el-option label="禁用" :value="0"></el-option>
				  </el-select>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="searchHandle('searchInfo')">搜索</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="dialogAdd = true">添加</el-button>
				</el-form-item>
			</el-form>
		</el-row>
		<!-- 新增属性 -->
		<!-- 属性列表 -->
		<el-table v-loading="loading" :data="propertyManageList" border style="width: 100%">
		    <el-table-column prop="attributeName" label="属性名"></el-table-column>
		    <el-table-column prop="description" label="属性描述"></el-table-column>
		    <el-table-column prop="status" label="属性状态" :formatter="formatterStatus"></el-table-column>
		    <el-table-column prop="createTime" label="创建时间" width="180px"></el-table-column>
		    <el-table-column prop="createName" label="创建人"></el-table-column>
		    <el-table-column prop="note" label="备注"></el-table-column>
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
		<el-dialog title="新增属性管理" :visible.sync="dialogAdd">
			<el-row type="flex" justify="center">
				<el-col :span="22">
					<el-form :model="addPropertyManage" :rules="rules" ref="addPropertyManage" label-width="100px">
						<el-row>
							<el-col :span="12">
								<el-form-item label="属性名：" prop="attributeName">
									<el-input size="small" v-model="addPropertyManage.attributeName"></el-input>
								</el-form-item>
							</el-col>
						</el-row>
					    <el-row>
							<el-col :span="20">
								<el-form-item label="属性描述：" prop="description">
							    	<el-input size="small" type="textarea" v-model="addPropertyManage.description"></el-input>
								</el-form-item>
					  		</el-col>
						</el-row>
						<el-row>
							<el-col :span="20">
								<el-form-item label="备注：" prop="note">
								  	<el-input size="small" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" v-model="addPropertyManage.note"></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="20">
								<el-form-item label="属性状态" prop="status">
								    <el-radio-group size="small" v-model.number="addPropertyManage.status">
								        <el-radio :label="1">启用</el-radio>
								        <el-radio :label="0">禁用</el-radio>
								    </el-radio-group>
								</el-form-item>
							</el-col>
						</el-row>
					</el-form>
				</el-col>
			</el-row>
			<div slot="footer">
	    		<el-button type="primary" @click="addSave('addPropertyManage')">保存</el-button>
	    		<el-button @click="dialogAdd = false">取消</el-button>
			</div>
		</el-dialog>
		<!-- dialog编辑框 -->
		<el-dialog title="编辑属性管理" :visible.sync="dialogEdit">
			<el-row type="flex" justify="center">
				<el-col :span="22">
					<el-form :model="editPropertyManage" :rules="rules" ref="editPropertyManage" label-width="100px">
						<el-row>
							<el-col :span="12">
								<el-form-item label="属性名：" prop="attributeName">
									<el-input size="small" v-model="editPropertyManage.attributeName"></el-input>
								</el-form-item>
							</el-col>
						</el-row>
					    <el-row>
							<el-col :span="20">
								<el-form-item label="属性描述：" prop="description">
							    	<el-input size="small" type="textarea" v-model="editPropertyManage.description"></el-input>
								</el-form-item>
					  		</el-col>
						</el-row>
						<el-row>
							<el-col :span="20">
								<el-form-item label="备注：" prop="note">
								  	<el-input size="small" type="textarea" v-model="editPropertyManage.note"></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="20">
								<el-form-item label="属性状态" prop="status">
								    <el-radio-group size="small" v-model.number="editPropertyManage.status">
								        <el-radio :label="1">启用</el-radio>
								        <el-radio :label="0">禁用</el-radio>
								    </el-radio-group>
								</el-form-item>
							</el-col>
						</el-row>
					</el-form>
				</el-col>
			</el-row>
			<div slot="footer">
	    		<el-button type="primary" @click="editSave('editPropertyManage')">保存</el-button>
	    		<el-button @click="dialogEdit = false">取消</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import { attrManagement, readSysWareAttributeDefine, deleteAttributeDefine } from '@/api'
	export default {
		data(){
			return {
				loading:false,
				dialogAdd:false,
				dialogEdit:false,
				searchInfo:{
					attributeName:'',
					attributesStatus:''
				},
				/*searchRules:{
					attributeName:[{required: true, message: '请输入属性名称', trigger: 'blur'}],
					attributesStatus:[
						{required: true, type:'number', message: '请选择状态', trigger: 'change'}
					]
				},*/
				addPropertyManage:{
					attributeId:'',
					attributeName:'',
					description:'',
					note:'',
					status:''
				},
				editPropertyManage:{},
				rules:{
					attributeName:[
						{ required: true, message: '请填写属性名', trigger: 'blur' }
					],
					description:[
						{ required: true, message: '请填写属性描述', trigger: 'blur' }
					],
					note:[
						{ required: true, message: '请填写备注信息', trigger: 'blur' }
					],
					status:[
						{ required: true, type:'number', message: '请选择状态', trigger: 'change' }
					]
				},
				propertyManageList:[
					{
						attributeName:'大交通',
						description:'123',
						status:1,
						createTime:'2017.06.18',
						founder:'555',
						note:'111'
					},{
						attributeName:'大交通',
						description:'111',
						status:0,
						createTime:'2017.06.05',
						founder:'666',
						note:'222'
					},{
						attributeName:'大交通',
						description:'132',
						status:1,
						createTime:'2017.06.01',
						founder:'777',
						note:'333'
					}
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
				return row.status === 1 ? '启用' : '禁用';
			},
			addSave(formName){
				this.$refs[formName].validate((valid) => {
		          if (valid) {
		            let data = Object.assign({},this.addPropertyManage);
		            attrManagement(data).then((res)=>{
		            	console.log(res);
		            	if(res.data.code === "0001"){
		            		this.$message({
            		          message: res.data.message,
            		          type: 'success'
            		        });
            		        this.getAttrManageList();
            		        for(let i in this.addPropertyManage){
            		        	this.addPropertyManage[i] = '';
            		        }
		            		this.dialogAdd = false
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
		            let data = Object.assign({},this.editPropertyManage);
		            console.log(data);
		            attrManagement(data).then((res)=>{
		            	console.log(res);
		            	if(res.data.code === "0001"){
		            		this.$message({
            		          message: res.data.message,
            		          type: 'success'
            		        });
            		        this.getAttrManageList();
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
				this.getAttrManageList(this.pageInfo.currPage,this.pageInfo.pageSize,this.searchInfo.attributeName,this.searchInfo.attributesStatus)
			},
			handleEdit(index,row){
				this.dialogEdit = true;
				this.editPropertyManage = Object.assign({},row);
			},
			handleDelete(index,row){
				this.$confirm('确认要删除属性？', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
      				this.loading = true;
      				let data = {
      					attributeId:row.attributeId
      				}
      				console.log(data);
      				deleteAttributeDefine(data).then((res)=>{
      					if(res.data.code === "0001"){
      						this.$message({
              		          message: '删除成功',
              		          type: 'success'
              		        });
              		        this.getAttrManageList();
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
				this.getAttrManageList(this.pageInfo.currPage, pageSize,this.searchInfo.attributeName,this.searchInfo.attributesStatus);
			},
			handleCurrentChange(currPage){
				this.getAttrManageList(currPage, this.pageInfo.pageSize,this.searchInfo.attributeName,this.searchInfo.attributesStatus);
			},
			getAttrManageList(currPage = 1, pageSize = 20, attributeName = "", status = ""){
				this.loading = true;
				let params = {
					attributeName:attributeName,
					status:status,
					pageSize:pageSize,
					currPage:currPage
				}
				readSysWareAttributeDefine(params).then((res)=>{
					if(res.data.code === "0001"){
						this.propertyManageList = res.data.result.defineList;
						this.pageInfo.currPage = res.data.result.pageInfo.currPage;
						this.pageInfo.pageSize = res.data.result.pageInfo.pageSize;
						this.pageInfo.count = res.data.result.pageInfo.count;
						this.loading = false;
					}else{
						this.$message({
        		          message: '获取列表失败，请稍后再试',
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
			this.getAttrManageList(1,20);
		}
	}
</script>

<style scoped>
	
</style>