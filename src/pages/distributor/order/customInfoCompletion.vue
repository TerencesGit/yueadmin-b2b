<template>
	<section class="custom-info">		
		<el-row type="flex" justify="center">
			<el-col :span="18">	
				<h3>{{$route.query.wareName}}</h3>				
				<!-- 基本信息 -->
				<el-card class="card-box" v-for="(infoForm, index) in forms" :key="index">
					<h4>基本信息 {{index+1}}</h4>
						<el-row type="flex" justify="center">
							<el-col :span="20">
								<el-row>
									<el-col :span="12">
										<el-form-item label="姓名：" prop="name">
								    		<el-input v-model="infoForm.name" size="small"></el-input>
								    	</el-form-item>
								    	<el-form-item label="性别：" prop="sex" class="travel-select">
									        <el-select v-model="infoForm.sex" placeholder="请选择性别" size="small">
										        <el-option label="男" :value="1"></el-option>
										        <el-option label="女" :value="2"></el-option>
							        		</el-select>
						        		</el-form-item>
						        	</el-col>
									<el-col :span="12">
								    	<el-form-item label="年龄：" prop="age">
									    	<el-input v-model.number="infoForm.age" size="small"></el-input>
									    </el-form-item>
									     <el-form-item label="生日：" prop="birthday">
								    		<el-date-picker v-model="infoForm.birthday" type="date" placeholder="选择日期" :editable="false" size="small"></el-date-picker>
								  		</el-form-item>
								  	</el-col>
								</el-row>
								<el-form-item label="身份证件类型：" prop="cardNum">
									<el-row>
										<el-col :span="7">
									        <el-select v-model="infoForm.cardType" placeholder="请选择证件类型" size="small">
										        <el-option label="身份证" :value="1"></el-option>
										        <el-option label="护照" :value="2"></el-option>
										        <el-option label="军官证" :value="3"></el-option>
										        <el-option label="驾照" :value="4"></el-option>
										        <el-option label="其他" :value="5"></el-option>
										    </el-select> 						    
									    </el-col>									    
									    <el-col :span="10">
										    	<el-input v-model="infoForm.cardNum" size="small" placeholder="请输入证件号" class="id-num"></el-input>
									    </el-col>
									</el-row>
					        	</el-form-item>
								<el-row>
									<el-col :span="12">
										<el-form-item label="手机号：" prop="mobile">
								    		<el-input v-model="infoForm.mobile" size="small"></el-input>
								    	</el-form-item>
										<el-form-item label="QQ：" prop="qq">
									        <el-input v-model="infoForm.qq" size="small"></el-input>
						        		</el-form-item>
						        		<el-form-item label="婚期：" prop="weddingDay">
									    	<el-date-picker v-model="infoForm.weddingDay" type="date" placeholder="选择日期" :editable="false" size="small"></el-date-picker>
									  	</el-form-item>								    	
									  	<el-form-item label="身高：" prop="height">
									    	<el-input v-model.number="infoForm.height" size="small" placeholder="cm"></el-input>
									    </el-form-item>	
									    <el-form-item label="胸围：" prop="chestSize">
									    	<el-input v-model="infoForm.chestSize" size="small"></el-input>
									  	</el-form-item>
									  	<el-form-item label="臀围：" prop="hiplineSize">
									    	<el-input v-model="infoForm.hiplineSize" size="small"></el-input>
									  	</el-form-item>									  	
							    	</el-col>
							    	<el-col :span="12">
							    		<el-form-item label="email邮箱：" prop="email">
									    	<el-input v-model="infoForm.email" size="small"></el-input>
									    </el-form-item>
									    <el-form-item label="微信号：" prop="wechat">
									    	<el-input v-model="infoForm.wechat" size="small"></el-input>
									  	</el-form-item>
						        		<el-form-item label="女士是否有身孕：" prop="isPregnancy">
									    	<el-select v-model="infoForm.isPregnancy" placeholder="请选择" style="width:100%">
										    	<el-option label="是" :value="1"></el-option>
      											<el-option label="否" :value="2"></el-option>
											</el-select>
									    </el-form-item>
									  	<el-form-item label="体重：" prop="weight">
									    	<el-input v-model.number="infoForm.weight" size="small" placeholder="kg"></el-input>
									  	</el-form-item>
									    <el-form-item label="腰围：" prop="waistSize">
									    	<el-input v-model="infoForm.waistSize" size="small"></el-input>
									  	</el-form-item>									  	
								    </el-col>
								</el-row>	  		   					
				    		</el-col>
						</el-row>						
					</el-form>					
				</el-card>					
			</el-col>
		</el-row>
		<el-row>
			<el-col class="save">
				<el-button type="primary" @click="submitForm()">保存并发送</el-button>
			</el-col>
		</el-row>		
	</section>
</template>
<script>
	import { customInfoCompletion } from '@/api'
	export default {
    data() {
      return {
        forms:[],
        disabled:true,
        visible:false,
        rules: {
          name: [
            { required: true, message: '请输入姓名', trigger: 'blur' }
          ], 
          mobile:[
            { required: true, message: '请输入手机号码', trigger: 'blur'},            
            { min: 11, max: 11, message: '手机号不合法' }
          ], 
          email: [
      		{ type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }
          ]
        }
      };
    },
    methods: {
      	submitForm() { 
	      	let arr = [];
	      	for(var i=0;i<this.$refs.infoForm.length;i++){					
	      		this.$refs.infoForm[i].validate((valid) => {
	      			arr.push(valid);
	      		})
	      	}
	      	let flag = arr.every((v,i,a)=>{
        		return v;
        	})
        	if(flag){
        		for(var i=0;i<this.forms.length;i++){
					if(this.forms[i].birthday){
						this.forms[i].birthday = this.$moment(this.forms[i].birthday).format('YYYY-MM-DD')
					}
					if(this.forms[i].weddingDay){
						this.forms[i].weddingDay = this.$moment(this.forms[i].weddingDay).format('YYYY-MM-DD')
					}	
  	   			}
        		var data = this.forms;
        		data.forEach((v,i,a)=>{
        			for(let i in v){
        				if(!v[i]){
        					v[i]=null;
        				}
        			}
        		})
        		console.log(data);
        		customInfoCompletion(data).then((res) => {
	            	console.log(res);
	            	if(res.data.code === "0001"){
	            		this.$message({
				          message: '保存成功',
				          type: 'success'
				        });
				        this.$router.push({path:'/distributor/order/pendingPayment'})
	            	}else {
			        	this.$message.error(res.data.message)
			      	}  	            						
						}).catch((err)=>{
							console.log(err)
		      		this.$catchError(err)
						})	
	      }
    	}
	  },
		created(){
			if(!this.$route.query.adultCount) return;
			for(var i = 0;i<this.$route.query.adultCount;i++){
				this.forms.push({
	        	name:'',
	        	age:'',
	        	sex:'',
	        	birthday:'',
	        	cardType:'',
	        	cardNum:'',
	        	mibile:'',
	        	email:'',
	        	qq:'',
	        	wechat:'',
	        	weddingDay:'',
	        	isPregnancy:'',
	        	height:'',
	        	weight:'',
	        	chestSize:'',
	        	waistSize:'',
	        	hiplineSize:'',
	        	orderId: this.$route.query.orderId
	      })
			}
		}
  }
</script>
<style scoped>
	h3{
		color:#1d8ce0;
        margin:20px 0;
	}
	.save{
		text-align: center;
		margin-top:20px;	
	}
	.id-num{
		margin-left:10px;
		line-height: 37px;		
	}
	.card-box{
		margin-bottom:20px;
	}
    .custom-info .el-date-editor.el-input{
        width:100%;
    }
    .custom-info .el-select{
        width:100%;
    }
</style>