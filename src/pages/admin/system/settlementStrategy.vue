<template>
<div class="settlementStrategy">
	<!-- 新增策略 -->
	<el-row type="flex" justify="end" class="add">
		<el-col :span="2">
			<el-button @click="isAddShow = true">新增</el-button>
			<el-dialog title="新增" :visible.sync="isAddShow">
			  <el-form :rules="addStrategyRules" label-width="200px" ref="addStrategy" :model="addStrategy">
			    <el-form-item label="规则名:" prop="settleName">
			      <el-input placeholder="请输入规则名" size="small" v-model="addStrategy.settleName" auto-complete="off"></el-input>
			    </el-form-item>

			    <el-form-item label="平台佣金率:" prop="commissionRate">
			      <el-input placeholder="请输入0-1之间的小数" size="small" v-model.number="addStrategy.commissionRate" auto-complete="off"></el-input>
			    </el-form-item>

			    <el-form-item prop="firstSetttleDateType">
			        <el-radio-group v-model="addStrategy.firstSetttleDateType">
			          <el-radio :label="1">下单日期</el-radio>
			          <el-radio :label="2">结束日期</el-radio>
			        </el-radio-group>
			    </el-form-item>

			    <el-form-item label="首次结算日期规则名称:" prop="firstSetttleDateName">
			       <el-input size="small" v-model="addStrategy.firstSetttleDateName" auto-complete="off"></el-input>
		          </el-date-picker>
			    </el-form-item>

			    <el-form-item label="首次结算日:" prop="firstDays">
			       <el-select v-model="addStrategy.firstDays" placeholder="请选择">
			           <el-option label="半月结" :value="1">
			           </el-option>
			           <el-option label="月结" :value="2">
			           </el-option>
			        </el-select>
			    </el-form-item>

			    <el-form-item label="首次结算比率:" prop="firstRate">
			      <el-input placeholder="请输入0-1之间的小数" size="small" v-model.number="addStrategy.firstRate" auto-complete="off"></el-input>
			      <!-- <el-slider v-model="addStrategy.firstRate" :format-tooltip="formatTooltip"></el-slider> -->
			    </el-form-item>

			    <el-form-item label="二次结算日期规则名称:" prop="secondSetttleDateName">
			       <el-input size="small" v-model="addStrategy.secondSetttleDateName" auto-complete="off"></el-input>
		          </el-date-picker>
			    </el-form-item>

			    <el-form-item label="二次结算日:" prop="secondDays">
			        <el-select @change="secondDaysChange" v-model="addStrategy.secondDays" placeholder="请选择">
			        	<el-option label="一次结算完成选此项" :value="0">
			        	</el-option>
				        <el-option label="半月结" :value="1">
				        </el-option>
				        <el-option label="月结" :value="2">
				        </el-option>
				    </el-select>
			    </el-form-item>

			    <el-form-item label="二次结算比率:" prop="secondRate">
			      <el-input :disabled="secondDaysDisabled" placeholder="请输入0-1之间的小数" size="small" v-model.number="addStrategy.secondRate" auto-complete="off"></el-input>
			    </el-form-item>

			    <el-form-item label="结算状态" prop="status">
			      <el-select size="small" v-model="addStrategy.status" placeholder="请选择状态">
			        <el-option label="启用" :value="1"></el-option>
			        <el-option label="禁用" :value="0"></el-option>
			      </el-select>
			    </el-form-item>

			    <el-form-item label="备注/描述:" prop="note">
			      <el-input type="textarea" :autosize="{ minRows: 4}" v-model="addStrategy.note" auto-complete="off"></el-input>
			    </el-form-item>
			  </el-form>

			  <div slot="footer">
			    <el-button @click="saveAddStrategy('addStrategy')">保存</el-button>
			    <el-button @click="isAddShow = false">取消</el-button>
			  </div>
			</el-dialog>
		</el-col>
	</el-row>

	<!-- 策略列表渲染 -->
	<el-table v-loading="loading" element-loading-text="操作中,请稍后O(∩_∩)O" :data="strategy" border style="width: 100%">
	    <el-table-column align="center" prop="settleId" label="结算规则ID"></el-table-column>
	    <el-table-column align="center" prop="settleName" label="规则名"></el-table-column>
	    <el-table-column align="center" prop="commissionRate" :formatter="commissionRateFilter" label="平台佣金费率"></el-table-column>
	    <el-table-column align="center" prop="firstDays" :formatter="firstDaysFilter" label="首次结算日"></el-table-column>
	    <el-table-column align="center" prop="secondDays" :formatter="secondDaysFilter" label="二次结算日"></el-table-column>
	    <el-table-column align="center" prop="firstSetttleDateType" :formatter="setttleDateTypeFilter" label="结算类型"></el-table-column>
	    <el-table-column align="center" prop="status" :formatter="statusFilter" label="结算状态"></el-table-column>
	    <el-table-column align="center" width="180" label="结算操作">
	    	<template scope="scope">
	    		<el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
	    		<el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
	    	</template>
	    </el-table-column>
	    <el-table-column align="center" prop="note" label="备注/描述"></el-table-column>
	</el-table>

      
	<el-row type="flex" justify="end" style="margin-top:50px">
		<el-pagination
		  @size-change="handleSizeChange"
	      @current-change="handleCurrentChange"
	      :current-page="pageInfo.currPage"
	      :page-sizes="[10,20,30,40]"
	      :page-size="pageInfo.pageSize"
	      layout="total, sizes, prev, pager, next, jumper"
	      :total="pageInfo.count">
	    </el-pagination>
	</el-row>
	<!-- 查询弹出层star -->
		<el-row>
			<el-col :span="4">
				<el-dialog title="编辑" :visible.sync="isEditShow">
				  <el-form ref="editStrategy" :rules="addStrategyRules" label-position="right" label-width="180px" :model="editStrategy">
				    <el-form-item label="规则名:" prop="settleName">
				      <el-input style="width:60%" size="small" v-model="editStrategy.settleName" auto-complete="off"></el-input>
				    </el-form-item>

				    <el-form-item label="平台佣金率:" prop="commissionRate">
				      <el-input size="small" v-model.number="editStrategy.commissionRate" auto-complete="off"></el-input>
				    </el-form-item>

				    <el-form-item label="选择类型:" prop="firstSetttleDateType">
				        <el-radio-group v-model="editStrategy.firstSetttleDateType">
				          <el-radio :label="1">下单日期</el-radio>
				          <el-radio :label="2">结束日期</el-radio>
				        </el-radio-group>
				    </el-form-item>

				    <el-form-item label="首次结算日期规则名称:" prop="firstSetttleDateName">
				       <el-input size="small" v-model="editStrategy.firstSetttleDateName" auto-complete="off"></el-input>
			          </el-date-picker>
				    </el-form-item>

				    <el-form-item label="首次结算日:" prop="firstDays">
				        <el-select v-model="editStrategy.firstDays" placeholder="请选择">
				           <el-option label="半月结" :value="1">
				           </el-option>
				           <el-option label="月结" :value="2">
				           </el-option>
				        </el-select>
				    </el-form-item>

				    <el-form-item label="首次结算比率:" prop="firstRate">
				      <el-input size="small" v-model.number="editStrategy.firstRate" auto-complete="off"></el-input>
				    </el-form-item>

				    <el-form-item label="二次结算日期规则名称:" prop="secondSetttleDateName">
				       <el-input size="small" v-model="editStrategy.secondSetttleDateName" auto-complete="off"></el-input>
			          </el-date-picker>
				    </el-form-item>

				    <el-form-item label="二次结算日:" prop="secondDays">
					    <el-select @change="secondDaysChange1" v-model="editStrategy.secondDays" placeholder="请选择">
					    	 <el-option label="一次结算完成选此项" :value="0">
			        		 </el-option>
					         <el-option label="半月结" :value="1">
					         </el-option>
					         <el-option label="月结" :value="2">
					         </el-option>
					    </el-select>
					</el-form-item>

					<el-form-item label="二次结算比率:" prop="secondRate">
				      <el-input :disabled="secondDaysDisabled" size="small" v-model.number="editStrategy.secondRate" auto-complete="off"></el-input>
				    </el-form-item>

				    <el-form-item label="结算状态:" prop="status">
				      <el-select size="small" v-model="editStrategy.status" placeholder="请选择状态">
				        <el-option label="启用" :value="1"></el-option>
				        <el-option label="禁用" :value="0"></el-option>
				      </el-select>
				    </el-form-item>

				    <el-form-item label="备注/描述:" prop="note">
				      <el-input type="textarea" :autosize="{ minRows: 4}" v-model="editStrategy.note" auto-complete="off"></el-input>
				    </el-form-item>
				  </el-form>

				  <div slot="footer">
				    <el-button @click="updatePageStrategy('editStrategy')">保存</el-button>
				    <el-button @click="isEditShow = false">取消</el-button>
				  </div>
				</el-dialog>
			</el-col>
		</el-row>
	<!-- 查询弹出层end -->
</div>
</template>

<script>
	import {updateStrategy, sysSettleInfoList, deleteStrategy, insertStrategy} from '@/api'
	export default{
		data(){
			var validateCommissionRate = (rule, value, callback)=>{
				if(!value){
					callback(new Error("请输入平台佣金率"))
				}else if(isNaN(value)){
					callback(new Error("请输入数字"))
				}else if(value < 0 || value >= 1){
					callback(new Error("请输入0-1之间的小数"))
				}else{
					callback();
				}
			}
			var validateDays = (rule, value, callback)=>{
				if(!value){
					callback(new Error("请输入天数"))
				}else if(!Number.isInteger(Number(value))){
					callback(new Error("请输入整天数"))
				}else{
					callback();
				}
			}
			var validateNum = (rule, value, callback)=>{
				if(value && Number.isInteger(value)){
					callback()
				}else{
					callback(new Error('请选择类型'));
				}
			}
			return{
				isAddShow:false,
				isEditShow:false,
				secondDaysDisabled:false,
				editStrategy:{
					settleName:'',
					commissionRate:'',
					firstSetttleDateType:1,
					firstSetttleDateName:'',
					firstDays:'',
					firstRate:'',
					secondSetttleDateType:1,
					secondSetttleDateName:'',
					secondDays:'',
					secondRate:'',
					status:'',
					note:''
				},
				loading:false,
				pageInfo:{
					count:null,
					currPage:1,
					pageSize:20,
					currentPage:1
				},
				addStrategy: {
					settleName:'',
					commissionRate:'',
					firstSetttleDateType:'',
					firstSetttleDateName:'',
					firstDays:'',
					firstRate:'',
					secondSetttleDateType:'',
					secondSetttleDateName:'',
					secondDays:'',
					secondRate:'',
					status:'',
					note:''
				},
				addStrategyRules:{
					settleName:[
						{ required: true, message: '请输入规则名', trigger: 'blur' }
					],
					commissionRate:[
						{required: true, validator:validateCommissionRate, trigger: 'blur' }
					],
					firstSetttleDateType:[
						{required: true, type: 'number', message:'请选择类型', trigger: 'change' }
					],
					firstSetttleDateName:[
						{ required: true, message: '请输入首次结算日期规则名称', trigger: 'blur' }
					],
					firstDays:[
						{ required: true, type: 'number', message:'请选择类型', trigger: 'change' }
					],
					firstRate:[
						{ required: true, validator:validateCommissionRate, trigger: 'blur' }
					],
					secondSetttleDateName:[
						{ required: true, message: '请输入二次结算日期规则名称', trigger: 'blur' }
					],
					secondDays:[
						{ required: true, type: 'number', message:'请选择类型', trigger: 'change' }
					],
					secondRate:[
						// { required: true, validator:validateCommissionRate, trigger: 'blur' }
					],
					status:[
						{ type: 'number', required: true, message:'请选择类型', trigger: 'change' }
					],
					note:[
						{ required: true, message: '请输入备注/描述', trigger: 'blur' }
					],
				},
				strategy:[]
			}
		},
		methods:{
			secondDaysChange(){
				if(this.addStrategy.secondDays === 0){
					this.secondDaysDisabled = true;
					this.addStrategy.secondRate = 0;
				}else{
					this.secondDaysDisabled = false
				}
			},
			secondDaysChange1(){
				if(this.editStrategy.secondDays === 0){
					this.secondDaysDisabled = true;
					this.editStrategy.secondRate = 0;
				}else{
					this.secondDaysDisabled = false
				}
			},
			formatTooltip(val){
				return `${val}%`;
			},
			handleSizeChange(val){
				this.loading = true;
				let params = {
					pageSize:val,
					currPage:this.pageInfo.currPage
				}
				sysSettleInfoList(params).then((res)=>{
					if(res.data.code === "0001"){
						let page = res.data.result.pageInfo;
						this.pageInfo.count = page.count;
						this.pageInfo.currPage = page.currPage;
						this.pageInfo.pageSize = page.pageSize;
						this.strategy = res.data.result.settleInfoList;
						this.loading = false;
					}else{
						this.$message('获取失败,请稍后再试');
						this.loading = false;
					}
				}).catch((error)=>{
					console.log(error);
					this.catchError(error.response)
					this.loading = false;
				})
			},
			handleCurrentChange(val){
				this.loading = true;
				let params = {
					currPage:val,
					pageSize:this.pageInfo.pageSize
				}
				sysSettleInfoList(params).then((res)=>{
					if(res.data.code === "0001"){
						let page = res.data.result.pageInfo;
						this.pageInfo.count = page.count;
						this.pageInfo.currPage = page.currPage;
						this.pageInfo.pageSize = page.pageSize;
						this.strategy = res.data.result.settleInfoList;
						this.loading = false;
					}else{
						this.$message('获取失败,请稍后再试');
						this.loading = false;
					}
				}).catch((error)=>{
					console.log(error);
					this.catchError(error.response)
					this.loading = false;
				})
			},
			handleEdit(index,details){
				this.isEditShow = true;
				this.editStrategy = Object.assign({},details);
			},
			updatePageStrategy(editStrategy){
				this.$refs[editStrategy].validate((valid) => {
		          if (valid) {
		          	let flag;
		          	if(this.editStrategy.secondDays === 0){
		          		this.editStrategy.secondRate = 0;
		          		flag = (this.editStrategy.commissionRate + this.editStrategy.firstRate === 1)
		          	}else{
		          		flag = (this.editStrategy.commissionRate + this.editStrategy.firstRate + this.editStrategy.secondRate === 1)
		          	}
		          	if(flag){
			          	let data = Object.assign({},(this.editStrategy));
	    				for(let i in data){
	    					data[i] += '';
	    				}
	    				data = JSON.stringify(data);
	    				updateStrategy(data).then(res=>{
	    					this.isEditShow = false;
	    					this.loading = true;
	    					if(res.data.code === '0001'){
	    						this.getList();
	    						this.pageInfo.currPage = 1;
	    						this.$message({
	    			    	        message: '修改成功',
	    			    	        type: 'success'
	    			    	    });
	    			    	    this.loading = false;
	    					}else{
	    						this.$message({
	    			    	        message: '修改失败,请稍后再试',
	    			    	        type: 'error'
	    			    	    });
	    			    	    this.loading = false;
	    					}
	    				})
	    				.catch(error=>{
	    					this.catchError(error.response)
	    		    	    this.loading = false;
	    				})
		          	}else{
		          		if(this.editStrategy.secondDays !== 0){
		          			this.$message({
		          				message:'平台佣金率，首次结算比率，二次结算比率，和必须为1！',
		          				type:'warning'
		          			});
		          		}else{
		          			this.$message({
		          				message:'平台佣金率，首次结算比率,和必须为1！',
		          				type:'warning'
		          			});
		          		}
		          	}
		          } else {
		            return false;
		          }
		        });
				
			},
			handleDelete(index,details){
				this.$confirm('是否删除', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
		          this.loading = true;
		          let data = {settleId: details.settleId}
		          deleteStrategy(data).then((res)=>{
		          	console.log(res);
		          	if(res.data.code === '0001'){
		          		this.getList(this.pageInfo.currPage,this.pageInfo.pageSize)
		          		this.$message({
		          		  type: 'success',
		          		  message: '删除成功!'
		          		});
		          		this.loading = false;
		          	}else{
		          		this.$message.error('删除失败,请稍后再试');
		          		this.loading = false;
		          	}
		          }).catch((error)=>{
		          	this.loading = false;
		          	this.catchError(error.response)
		          	console.log(error);
		          })
		        }).catch(() => {
		          this.$message({
		            type: 'info',
		            message: '已取消删除'
		          });          
		          this.loading = false;
		        });
				
			},
			setttleDateTypeFilter(row){
				return row.firstSetttleDateType === 1 ? '下单日期' : '出团日期';
			},
			statusFilter(row){
				return row.status === 1 ? '启用' : '禁用';
			},
			firstDaysFilter(row){
				if(row.firstDays === 1){
					return '半月结';
				}else if(row.firstDays === 2){
					return '月结';
				}else if(row.firstDays === 0){
					return '首次全额结算'
				}else{
					return ''
				}
			},
			secondDaysFilter(row){
				if(row.secondDays === 1){
					return '半月结';
				}else if(row.secondDays === 2){
					return '月结';
				}else if(row.secondDays === 0){
					return '首次全额结算'
				}else{
					return ''
				}
			},
			commissionRateFilter(row){
				return row.commissionRate * 100 + '%';
			},
			getList(currPage = 1, pageSize = 20){
				this.loading = true;
				let params = {
					pageSize:pageSize,
					currPage:currPage
				}
				sysSettleInfoList(params).then((res)=>{
					if(res.data.code === "0001"){
						let page = res.data.result.pageInfo;
						this.pageInfo.count = page.count;
						this.pageInfo.currPage = page.currPage;
						this.pageInfo.pageSize = page.pageSize;
						this.strategy = res.data.result.settleInfoList;
						this.loading = false;
					}else{
						this.$message('获取失败,请稍后再试');
						this.loading = false;
					}
				}).catch((error)=>{
					console.log(error);
					this.catchError(error.response);
					this.loading = false;
				})
			},
			saveAddStrategy(addStrategy){
				this.$refs[addStrategy].validate((valid) => {
		          if (valid) {
		          	let flag;
		          	if(this.addStrategy.secondDays === 0){
		          		this.addStrategy.secondRate = 0;
		          		flag = (this.addStrategy.commissionRate + this.addStrategy.firstRate === 1)
		          	}else{
		          		flag = (this.addStrategy.commissionRate + this.addStrategy.firstRate + this.addStrategy.secondRate === 1)
		          	}
		          	if(flag){
		          		this.loading = true;
			          	this.isAddShow = false;
			          	this.addStrategy.secondSetttleDateType = this.addStrategy.firstSetttleDateType
			          	for(let i in this.addStrategy){
			          		this.addStrategy[i] += '';
			          	}
			          	let data = JSON.stringify(Object.assign({},(this.addStrategy)));
	            		insertStrategy(data).then(res=>{
	            			if(res.data.code === '0001'){
	            				this.getList();
	            				this.pageInfo.currPage = 1;
	            				this.$message({
	            		          message: '恭喜你,新增成功',
	            		          type: 'success'
	            		        });
	            		        for(let i in this.addStrategy){
	            		        	this.addStrategy[i] = '';
	            		        }
	            		        this.firstSetttleDateType = 1;
	            		        this.secondSetttleDateType = this.firstSetttleDateType;
	            		        this.loading = false;
	            			}else{
	            				this.$message({
	            	    	        message: '新增失败,请稍后再试',
	            	    	        type: 'error'
	            	    	    });
	            	    	    this.loading = false;
	            			}
	            		}).catch(error=>{
	            			this.catchError(error.response)
	                	    this.loading = false;
	            		})
		          	}else{
		          		if(this.addStrategy.secondDays !== 0){
		          			this.$message({
		          				message:'平台佣金率，首次结算比率，二次结算比率，和必须为1！',
		          				type:'warning'
		          			});
		          		}else{
		          			this.$message({
		          				message:'平台佣金率，首次结算比率,和必须为1！',
		          				type:'warning'
		          			});
		          		}
		          	}
		          } else {
		            return false;
		          }
		        });
			}
		},
		created (){
			this.getList(1,20)
		}
	}
</script>

<style scoped>
	.add{
		margin-bottom: 20px;
	}
</style>