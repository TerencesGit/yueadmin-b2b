<template>
<div class="retreatStrategyEdit">
	<el-row>
		<el-col :span="6">
			<el-card class="box-card">
			    <span style="line-height: 36px;">策略名称：<span v-text="data.reserve2"></span></span>
			    <el-button style="float:right;" @click="dialogEditName=true" type="primary">修改名称</el-button>
			</el-card>
		</el-col>
	</el-row>
	<el-dialog size="tiny" title="修改策略名称" :visible.sync="dialogEditName">
		<el-form :model="data" ref="data" label-width="100px">
		  <el-form-item label="策略名称:" prop="reserve2" :rules="[
		      { required: true, message: '策略名称不能为空'}
		    ]">
		    <el-input v-model.number="data.reserve2" auto-complete="off"></el-input>
		  </el-form-item>
		  
		  <el-form-item>
		    <el-button type="primary" @click="editName('data')">修改</el-button>
		    <el-button @click="dialogEditName=false">取消</el-button>
		  </el-form-item>
		</el-form>
	</el-dialog>
	<!-- 新增界面star -->
	<el-table :data="retreatStrategysDetail" v-loading="loading" border style="width: 100%">
	    <el-table-column label="规则名" align="center" prop="refundName"></el-table-column>

	    <el-table-column label="赔偿比例" align="center" prop="compensationRate"></el-table-column>

	    <el-table-column label="退改日命名" align="center" prop="refundDateName"></el-table-column>

	    <el-table-column label="退改日期" align="center" prop="refundDays"></el-table-column>

	    <el-table-column label="备注/描述" align="center" prop="note"></el-table-column>

	    <el-table-column label="操作" align="center">
	      <template scope="scope">
	        <el-button size="small"
	          @click="handleAdd(scope.$index, scope.row)">添加</el-button>
	        <el-button size="small"
	          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
	        <el-button size="small" type="danger"
	          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
	      </template>
	    </el-table-column>
	</el-table>
	<!-- 新增界面end -->
	<!-- 新增dialog -->
	<el-dialog size="tiny" title="新增" :visible.sync="dialogAdd">
	  <el-row type="flex" justify="center">
	  	<el-col :span="20">
	  		<el-form label-width="120px" ref="tempRetreatStrategy" :rules="addRules" :model="tempRetreatStrategy">
	  		  <el-form-item label="规则名：" prop="refundName">
	  		    <el-input v-model="tempRetreatStrategy.refundName" size="small" placeholder="请输入规则名"></el-input>
	  		  </el-form-item>

	  		  <el-form-item label="赔偿比例：" prop="compensationRate">
	  		    <el-input v-model.number="tempRetreatStrategy.compensationRate" size="small" placeholder="请输入0-1之间的小数"></el-input>
	  		  </el-form-item>

	  		  <el-form-item label="退改日命名：" prop="refundDateName">
	  		    <el-input v-model="tempRetreatStrategy.refundDateName" size="small" placeholder="请输入退改日命名"></el-input>
	  		  </el-form-item>

	  		  <el-form-item label="退改日期：" prop="refundDays">
	  		    <el-input v-model.number="tempRetreatStrategy.refundDays" size="small" placeholder="请输入整数天数"></el-input>
	  		  </el-form-item>

	  		  <el-form-item label="备注/描述：" prop="note">
	  		    <el-input v-model="tempRetreatStrategy.note" :autosize="{ minRows: 2, maxRows: 4}" size="small" placeholder="请输入备注/描述" type="textarea"></el-input>
	  		  </el-form-item>
	  		</el-form>
	  	</el-col>
	  </el-row>
	  <div slot="footer">
  		  <el-button @click="dialogAdd = false">取 消</el-button>
  		  <el-button type="primary" @click="addRetreatStrategys('tempRetreatStrategy')">确 定</el-button>
  	  </div>
	</el-dialog>
	<!-- 编辑dialog -->
	<el-dialog size="tiny" title="编辑" :visible.sync="dialogEdit">
	  <el-form label-width="120px" ref="retreatStrategy" :rules="addRules" :model="retreatStrategy">
	    <el-form-item label="规则名：" prop="refundName">
	      <el-input v-model="retreatStrategy.refundName" size="small" placeholder="请输入规则名"></el-input>
	    </el-form-item>

	    <el-form-item label="赔偿比例：" prop="compensationRate">
	      <el-input v-model.number="retreatStrategy.compensationRate" size="small" placeholder="请输入0-1之间的小数"></el-input>
	    </el-form-item>

	    <el-form-item label="退改日命名：" prop="refundDateName">
	      <el-input v-model="retreatStrategy.refundDateName" size="small" placeholder="请输入退改日命名"></el-input>
	    </el-form-item>

	    <el-form-item label="退改日期：" prop="refundDays">
	      <el-input v-model.number="retreatStrategy.refundDays" size="small" placeholder="请输入整数天数"></el-input>
	    </el-form-item>

	    <el-form-item label="备注/描述：" prop="note">
	      <el-input v-model="retreatStrategy.note" :autosize="{ minRows: 2, maxRows: 4}" size="small" placeholder="请输入备注/描述" type="textarea"></el-input>
	    </el-form-item>

	  </el-form>
	  <div slot="footer">
	    <el-button @click="dialogEdit = false">取 消</el-button>
	    <el-button type="primary" @click="editRetreatStrategys('retreatStrategy')">确 定</el-button>
	  </div>
	</el-dialog>
	<!-- 保存策略star -->
    <el-row type="flex" justify="center" style="margin-top:50px">
    	<el-col :span="4">
    		<el-button type="primary" :disabled="disabledBtn" @click="saveStrategy">保存</el-button>
    		<el-button type="primary" @click="$router.push({ path: '/admin/system/retreatStrategy/retreatStrategyList'})">返回</el-button>
    	</el-col>
    </el-row>
	<!-- 保存策略end -->
</div>
</template>

<script>
	import { retreatStrategyEdit,retreatStrategyUpdate } from '@/api'
	export default{
		data(){
			var validateCompensationRate = (rule, value, callback)=>{
				if(!value){
					callback(new Error('请输入赔偿比例'));
				}else if(typeof value !== 'number'){
					callback(new Error('请输入数字'));
				}else if(value < 0 || value > 1){
					callback(new Error('请输入0-1之间的数字'));
				}else{
					callback();
				}
			}
			var validateDays = (rule, value, callback)=>{
				if(!value){
					callback(new Error('请输入退改日期'));
				}else if(typeof value !== 'number'){
					callback(new Error('请输入数字'));
				}else if(value && !Number.isInteger(value)){
					callback(new Error('请输入整数天数'));
				}else{
					callback();
				}
			}
			return{
				loading:false,
				disabledBtn:false,
				retreatStrategysDetail:[],//策略详情列表
				delIdlList:[],//策略详情删除的id
				data:{
		        	reserve2:'',
					deadlineDateType:'',
					groupId:'',
					list:[],
					delIdlList:[]
		        },
				index:'',
				dialogEditName:false,
				dialogAdd:false,
				dialogEdit:false,
				addList:false,
				submit:{
					reserve2:'',
					deadlineDateType:'',
					list:[]
				},
				addStrategyDialog:false,
				addRules: {
		          refundName: [
		            { required: true, message: '请输入规则名', trigger: 'blur'}
		          ],
		          compensationRate: [
		            { required: true, validator: validateCompensationRate, trigger: 'blur' }
		          ],
		          refundDateName: [
		            { required: true, message: '请输入退改日命名', trigger: 'blur'}
		          ],
		          refundDays: [
		            { required: true, validator: validateDays, trigger: 'blur'}
		          ],
		          status: [
		            { required: true, type:'number', message: '请选择退改状态', trigger: 'change' }
		          ],
		          note: [
		            { required: true, message: '请输入备注/描述', trigger: 'blur' }
		          ]
		        },
				retreatStrategy:{},
				tempRetreatStrategy:{
					refundName:'',
					compensationRate:'',
					refundDateName:'',
					refundDays:'',
					note:'',
					refundId:''
				}
			}
		},
		methods:{
			editName(formName){
				this.$refs[formName].validate((valid) => {
		          if (valid) {
		          	this.dialogEditName = false;
		          } else {
		            return false;
		          }
		        });
			},
			handleAdd(index,info){
				// let data = Object.assign({},this.tempRetreatStrategy);
				// this.retreatStrategys.splice(index+1,0,data);
				this.dialogAdd = true;
				this.index = index;
			},
			addRetreatStrategys(formName){
				this.$refs[formName].validate((valid) => {
		          if (valid) {
		          	let data = Object.assign({},this.tempRetreatStrategy);
					this.retreatStrategysDetail.splice(this.index + 1, 0, data);
					this.dialogAdd = false;
		          } else {
		            return false;
		          }
		        });
				for(let i in this.tempRetreatStrategy){
					this.tempRetreatStrategy[i] = '';
				}
			},
			handleEdit(index,info){
				this.dialogEdit = true;
				this.retreatStrategy = Object.assign({},info);
				this.index = index;
			},
			editRetreatStrategys(formName){
				this.$refs[formName].validate((valid) => {
		          if (valid) {
  					for(let i in this.retreatStrategysDetail[this.index]){
  						this.retreatStrategysDetail[this.index][i] = this.retreatStrategy[i];
  					}
  					this.dialogEdit = false;
		          } else {
		            return false;
		          }
		        });
			},
			handleDelete(index,info){
				if(info.refundId){
					let data = {
						refundId:info.refundId + ''
					}
					this.delIdlList.push(data);
				}
				this.retreatStrategysDetail.splice(index,1);
			},
			saveStrategy(){
				this.retreatStrategysDetail.forEach((v,i,a)=>{
					if(i>0){
						if(v.refundDays <= a[i-1].refundDays){
			        		this.$message({
			                  title: '警告',
			                  message: `第${i+1}条退改日期必须比第${i}条天数大`,
			                  type: 'warning'
			                });
			                return;
						}
					}
				})
				let isPass = this.retreatStrategysDetail.every((v,i,a)=>{
					if(i>0){
						return v.refundDays > a[i-1].refundDays;
					}else{
						return true;
					}
				})
				if(isPass && this.retreatStrategysDetail.length > 0){
					this.retreatStrategysDetail.forEach((v)=>{
						for(let i in v){
							v[i] += ''
							if(i=='createTime' || i=='updateTime'){
								delete v[i];
							}
						}
					});
					let data = {
			        	reserve2:this.data.reserve2,
						deadlineDateType:this.data.deadlineDateType + '',
						groupId:this.data.groupId + '',
						list:this.retreatStrategysDetail,
						delIdlList:this.delIdlList
			        };
			        data = JSON.stringify(data);
			        console.log(data);
			        this.disabledBtn = true;
			        this.loading = true;
			        retreatStrategyUpdate(data).then((res)=>{
	        			if(res.data.code === "0001"){
		        			this.$message({
		        	          title: '成功',
		        	          message: '修改成功',
		        	          type: 'success'
		        	        });
				        	console.log(res);
				        	this.loading = false;
				        	this.disabledBtn = false;
				        	this.$router.push({ path: '/admin/system/retreatStrategy/retreatStrategyList'})
	        			}else{
	        				this.$message({
		        	          title: '提示',
		        	          message: '修改失败，请稍后重试',
		        	          type: 'warning'
		        	        });
		        	        this.loading = false;
	        			}
			        }).catch((error)=>{
			        	console.log(error);
			        	this.catchError(error.response)
			        	this.loading = false;
			        })
				}else{
					this.$message({
        	          title: '提示',
        	          message: '您还有未填写的信息，请完善',
        	          type: 'error'
        	        });
				}
			}
		},
		created(){
			this.loading = true;
			console.log(this.$route.query);
			let data = this.$route.query.data;
			if(data){
				retreatStrategyEdit(data).then((res)=>{
					if(res.data.code === "0001"){
						this.loading = false;
						this.data.reserve2 = res.data.result.reserve2;
				        this.data.deadlineDateType = res.data.result.deadlineDateType;
				        this.data.groupId = res.data.result.groupId;
						this.strategyName = res.data.result.reserve2;

						this.retreatStrategysDetail = res.data.result.list.sort((a,b)=>{
							return a.refundDays - b.refundDays
						});
						this.$message({
				          message: '退改策略获取成功',
				          type: 'success'
				        });
				        this.loading = false;
				        console.log(res);
					}else{
						this.$message({
							message:'获取列表失败，请稍后重试',
							type:'warning'
						})
						this.loading = false;
					}
				}).catch((error)=>{
					this.catchError(error.response)
					this.loading = false;
				})
			}
		}
	}
</script>