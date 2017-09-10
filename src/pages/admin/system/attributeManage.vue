<template>
	<section>
		<!-- 条件查询 -->
		<el-row class="toolbar">
			<el-form :inline="true">
				<el-form-item label="">
					<el-input v-model="filter.attributeName" placeholder="根据属性名称搜索"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="getAttributeList">搜索</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="handleAdd">新增属性</el-button>
				</el-form-item>
			</el-form>
		</el-row>
		<!-- 属性列表 -->
		<el-table 
			border 
			highlight-current-row
			v-loading="loading"
			:data="attributeList">
				<el-table-column type="index" width="60"></el-table-column>
		    <el-table-column prop="attributeName" label="属性名称"></el-table-column>
		    <el-table-column prop="attributeType" label="属性类型"  :formatter="formatAttrType"></el-table-column>
		    <el-table-column prop="description" label="属性描述"></el-table-column>
		    <el-table-column prop="createTime" label="创建时间" :formatter="formatCreateTime" width="180"></el-table-column>
		    <el-table-column prop="createBy" label="创建人"></el-table-column>
		    <el-table-column prop="note" label="备注"></el-table-column>
		    <el-table-column prop="status" label="属性状态" :formatter="formatStatus"></el-table-column>
		    <el-table-column label="操作" width="180">
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
		<!-- 属性表单 -->
		<el-dialog :title="attrFormTitle" :visible.sync="attrFormVisible" @close="handleCancel">
			<el-row>
				<el-col :span="16" :offset="4">
					<el-form :model="attributeForm" ref="attributeForm" :rules="rules"  label-width="100px">
						<el-form-item label="属性名称：" prop="attributeName">
							<el-input v-model="attributeForm.attributeName"></el-input>
						</el-form-item>
						<el-form-item label="属性类型：" prop="attributeType">
							<el-select v-model="attributeForm.attributeType" placeholder="请选择属性类型" style="width: 100%">
								<el-option v-for="item in attrTypeList" :key="item" :value="item.value" :label="item.label"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="属性描述：" prop="description">
					    <el-input type="textarea" v-model="attributeForm.description"></el-input>
						</el-form-item>
						<el-form-item label="备注：" prop="note">
						  <el-input type="textarea" v-model="attributeForm.note"></el-input>
						</el-form-item>
						<el-form-item label="状态：" prop="status">
					  	<el-radio-group v-model.number="attributeForm.status">
					      <el-radio :label="1">启用</el-radio>
					      <el-radio :label="0">禁用</el-radio>
					    </el-radio-group>
						</el-form-item>
					</el-form>
				</el-col>
			</el-row>
			<div slot="footer">
	    	<el-button @click="handleCancel">取消</el-button>
	    	<el-button type="primary" @click="submitForm">提交</el-button>
			</div>
		</el-dialog>
	</section>
</template>

<script>
	import { readAttributeList, saveAttributeDefine, deleteAttributeDefine } from '@/api'
	export default {
		data(){
			return {
				filter: {
					attributeName: '',
					currPage: 1,
					pageSize: 20,
				},
				count: 0,
				attrFormTitle: '新增属性',
				attrFormVisible: false,
				attributeForm: {
					attributeId: 0,
					attributeName: '',
					attributeType: '',
					description: '',
					note: '',
					status: 1
				},
				attrTypeList: [
					{ value: '0', label: '非关键属性'},
					{ value: '1', label: '关键属性'},
					{ value: '2', label: '销售属性'},
					{ value: '3', label: '价格属性'},
				],
				rules: {
					attributeName:[
						{ required: true, message: '请填写属性名', trigger: 'blur' }
					],
					attributeType:[
						{ required: true, message: '请选择属性类型', trigger: 'change' }
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
				loading: false,
				attributeList: [
					{
						attributeId: '00001',
						attributeName: '大交通',
						attributeType: '1',
						description: '123',
						status: 1,
						createTime: new Date(),
						note: '111'
					}
				],
			}
		},
		methods: {
			formatStatus(row) {
				return row.status === 1 ? '启用' : '禁用';
			},
			formatCreateTime(row) {
				return this.$moment(row.createTime).format('YYYY-MM-DD HH:mm:ss')
			},
			formatAttrType(row) {
				return this.attrTypeList[row.attributeType].label;
			},
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
				}).catch(err => {
					this.$catchError(err)
    		  this.loading = false;
				})
			},
			handleAdd() {
				this.attributeForm = {
					attributeId: 0,
					attributeName: '',
					attributeType: '',
					description: '',
					note: '',
					status: 1
				}
				this.attrFormTitle = '新增属性'
				this.attrFormVisible = true
			},
			handleEdit(row) {
				this.attrFormTitle = '属性编辑'
				this.attributeForm = Object.assign({}, row);
				this.attrFormVisible = true
			},
			handleCancel () {
				this.$refs.attributeForm.resetFields()
				this.attrFormVisible = false
			},
			submitForm() {
				this.$refs.attributeForm.validate((valid) => {
          if (valid) {
            let data = Object.assign({}, this.attributeForm);
            saveAttributeDefine(data).then(res => {
            	if (res.data.code === "0001") {
            		this.$message.success(res.data.message);
    		        this.getAttributeList();
    		        // for(let i in this.attributeForm) {
    		        // 	this.attributeForm[i] = '';
    		        // }
            	} else {
            		this.$message.error(res.data.message);
            	}
            	this.attrFormVisible = false
            }).catch(err => {
            	this.attrFormVisible = false
            	this.$catchError(err)
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
			},
			handleDelete(row) {
				this.$confirm('确认要删除该属性？', '提示', {type: 'warning'}).then(() => {
    				let data = {
    					attributeId: row.attributeId
    				}
    				deleteAttributeDefine(data).then( res => {
    					if (res.data.code === "0001") {
    						this.$message.success(res.data.message);
            		this.getAttributeList();
    					} else {
    						this.$message.error(res.data.message);
    					}
    				}).catch(error => {
    					this.$catchError(err)
    				})
	      }).catch(() => {
	        this.$message('已取消操作');          
	      })
			},
			handleSizeChange(val) {
				this.filter.pageSize = val;
				this.getAttributeList()
			},
			handleCurrentChange(val) {
				this.filter.currPage = val;
				this.getAttributeList()
			},
		},
		created() {
			this.getAttributeList()
		}
	}
</script>
