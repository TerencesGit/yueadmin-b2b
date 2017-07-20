<template>
<div class="retreatStrategyAdd">
	<!-- 新增策略star -->
	<!-- 选择策略类型 -->
	<el-dialog top="30%" :close-on-click-modal="false" size="tiny" title="触发退改协议类型" :visible.sync="addStrategyDialog">
		<el-form :model="submit" ref="submit" label-width="130px">
			<el-form-item
			label="请选择类型" prop="deadlineDateType"
			    :rules="[{ required: true, message: '类型不能为空'}]">
				<el-radio-group v-model="submit.deadlineDateType">
			  	    <el-radio  v-for="(item,index) in strategyType" :key="index" :label="item.value">{{item.label}}</el-radio>
			  	</el-radio-group>
			</el-form-item>
			<el-form-item
			    label="请输入策略名称" prop="reserve2"
			    :rules="[{ required: true, message: '策略名称不能为空'}]">
			    <el-input size="small" v-model="submit.reserve2" auto-complete="off"></el-input>
			</el-form-item>
		</el-form>
	    <span slot="footer">
		    <el-button @click="addStrategyDialog = false">取 消</el-button>
		    <el-button type="primary" @click="addStrategy('submit')">确 定</el-button>
	    </span>
	</el-dialog>
	<!-- 新增策略end -->
	<!-- 显示策略类型star -->
	<el-row v-if="addList" style="margin-bottom:10px">
		<div>策略名称：{{submit.reserve2}}</div>
	    <div>触发退改协议类型：{{typeTxt}}</div>
	</el-row>
	<!-- 显示策略类型end -->
	<!-- 新增dialog -->
	<el-dialog size="tiny" title="新增" :visible.sync="dialogAdd">
	  <el-row type="flex" justify="center">
	  	<el-col :span="20">
	  		<el-form label-width="120px" ref="tempRetreatStrategy" :rules="addRules" :model="tempRetreatStrategy">
	  		  <el-form-item label="规则名：" prop="refundName">
	  		    <el-input v-model="tempRetreatStrategy.refundName" size="small" placeholder="请输入规则名"></el-input>
	  		  </el-form-item>

	  		  <el-form-item label="赔偿比例：" prop="compensationRate">
	  		    <el-input-number placeholder="请选择赔偿比例" v-model.number="tempRetreatStrategy.compensationRate" size="small" :step="0.01" :min="0" :max="1"></el-input-number>
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
	      <el-input-number placeholder="请选择赔偿比例" v-model.number="retreatStrategy.compensationRate" size="small" :step="0.01" :min="0" :max="1"></el-input-number>
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
	<!-- 新增界面star -->
	<el-table v-loading="loading" v-if="addList" :data="retreatStrategys" border style="width: 100%">
	    <el-table-column label="规则名" prop="refundName"></el-table-column>

	    <el-table-column label="赔偿比例" prop="compensationRate"></el-table-column>

	    <el-table-column label="退改日命名" prop="refundDateName"></el-table-column>

	    <el-table-column label="退改日期" prop="refundDays"></el-table-column>

	    <el-table-column label="备注/描述" prop="note"></el-table-column>

	    <el-table-column label="操作" width="230">
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
	<!-- 保存策略star -->
    <el-row v-if="addList" type="flex" justify="center" style="margin-top:50px">
    	<el-button type="primary" @click="saveStrategy">保存</el-button>
    </el-row>
	<!-- 保存策略end -->
</div>
</template>

<script>
	import {sysRefundInfoInsert} from '@/api'
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
				index:'',
				dialogAdd:false,
				dialogEdit:false,
				addList:true,
				submit:{
					reserve2:'',
					deadlineDateType:'',
					list:[]
				},
				strategyType:[
				{
					label:'出行日',
					value:1
				},{
					label:'拍摄日',
					value:2
				},{
					label:'付款日',
					value:3
				},{
					label:'不退改',
					value:4
				}],
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
				retreatStrategy:{
					refundName:'',
					compensationRate:'',
					refundDateName:'',
					refundDays:'',
					note:''
				},
				tempRetreatStrategy:{
					refundName:'',
					compensationRate:'',
					refundDateName:'',
					refundDays:'',
					note:''
				},
				retreatStrategys:[]
			}
		},
		methods:{
			add(){
				this.addStrategyDialog = true;
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
					this.retreatStrategys.splice(this.index + 1, 0, data);
					this.dialogAdd = false;
					for(let i in this.tempRetreatStrategy){
						this.tempRetreatStrategy[i] = '';
					}
		          } else {
		            return false;
		          }
		        });
			},
			handleEdit(index,info){
				this.dialogEdit = true;
				this.retreatStrategy = Object.assign({},info);
				console.log(info);
				this.index = index;
			},
			editRetreatStrategys(formName){
				this.$refs[formName].validate((valid) => {
		          if (valid) {
		          	this.dialogEdit = false;
  					for(let i in this.retreatStrategys[this.index]){
  						this.retreatStrategys[this.index][i] = this.retreatStrategy[i];
  					}
		          } else {
		            return false;
		          }
		        });
			},
			handleDelete(index,info){
				this.retreatStrategys.splice(index,1);
			},
			addStrategy(formName){
				this.$refs[formName].validate((valid) => {
		          if (valid) {
		          	this.addStrategyDialog = false;
	            	this.addList = true;
	            	// let data = Object.assign({},this.retreatStrategy);
	            	this.dialogAdd = true;
					this.index = -1;
	            	// this.retreatStrategys.push(data);
		          } else {
		            return false;
		          }
		        });
			},
			saveStrategy(){
				this.retreatStrategys.forEach((v,i,a)=>{
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
				let isPass = this.retreatStrategys.every((v,i,a)=>{
					if(i>0){
						return v.refundDays > a[i-1].refundDays;
					}else{
						return true;
					}
				})
				if(isPass && this.retreatStrategys.length > 0){
					this.loading = true;
					this.retreatStrategys.forEach((v)=>{
						for(let i in v){
							v[i] += '';
						}
					})
					let data = {
			        	reserve2:this.submit.reserve2,
						deadlineDateType:this.submit.deadlineDateType + '',
						list:this.retreatStrategys
			        }
			        data = JSON.stringify(data);
			        console.log(data);
			        sysRefundInfoInsert(data).then((res)=>{
	        			if(res.data.code === "0001"){
		        			this.$message({
		        	          title: '成功',
		        	          message: '成功发送请求到后台',
		        	          type: 'success'
		        	        });
		        	        this.loading = false;
		        	        this.$router.push({ path: '/admin/system/retreatStrategy/retreatStrategyList'})
	        			}
	        			this.loading = false;
			        }).catch((error)=>{
			        	console.log(error);
			        	this.catchError(error.response)
			        	this.loading = false;
			        })
				}
			}
		},
		computed:{
			typeTxt(){
				for(let i=0; i<this.strategyType.length; i++){
					if(this.submit.deadlineDateType === this.strategyType[i].value){
						return this.strategyType[i].label;
					}
				}
			}
		},
		mounted(){
			this.add();
		}
	}
</script>