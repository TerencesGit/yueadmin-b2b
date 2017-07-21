<template>
	<div class="changeOperation">
		<el-card class="box-card" style="padding:0 20px">
			<!-- 标题 -->
		    <div slot="header" class="clearfix">
		    	<h2 style="color:#20a0ff" v-text="orderInfo.wareName"></h2>
		    	<!-- <el-button style="float: right;" type="primary">操作按钮</el-button> -->
		    </div>
		     <!-- 改单申请内容 -->
		    <!-- <el-row style="padding:20px">
		    	<h2>改单申请内容：</h2>
		    </el-row> -->
		    <el-row type="flex" justify="center">
		    	<el-col>
		    	<h2>改单申请内容：</h2>
		    		<div style="border:1px solid #bfcbd9;border-radius:5px; min-height:100px;padding:20px" v-text="changeOrderContent"></div>
		    	</el-col>
		    </el-row>
		    <!-- 日历组件 -->
	    	<el-row type="flex" justify="star">
		    	<el-col :span="16">
		    		<fullcalendar 
		    			style="padding:20px 20px 20px 0"
		    			v-loading="fullcalendarLoading"
			    	    :events="skuList" 
			    	    first-day='0' 
			    	    @changeMonth="changeMonth" 
			    	    @eventClick="dayClick">
			    	</fullcalendar>
		    	</el-col>
		    	<el-col :span="8" style="margin-top:66px">
		    		<el-form ref="orderInfo" :model="orderInfo" label-width="100px">
		    		  <el-form-item label="发团日期：">
		    		  	<el-date-picker v-model="orderInfo.date" readonly type="date" placeholder="发团日期">
		    		  	</el-date-picker>
		    		  </el-form-item>
		    		  <el-form-item label="成人数量：">
		    		  	<el-input-number v-model="orderInfo.adultNum" :disabled="true"></el-input-number>
		    		  </el-form-item>
		    		  <el-form-item label="儿童数量：">
		    		  	<el-input-number v-model="orderInfo.childNum" :disabled="true"></el-input-number>
		    		  </el-form-item>
		    		  <!-- <el-form-item label="单人差数量：">
		    		  	<el-input-number size="small" v-model="orderInfo.singleNumber" :disabled="true"></el-input-number>
		    		  </el-form-item> -->
		    		</el-form>
		    	</el-col>
		    </el-row>
		    <!-- 附加服务 -->
		    <h2>附加服务</h2>
		    <el-table v-loading="serviceLoading" ref="additionalServicesList" :data="additionalServicesList" border tooltip-effect="dark" style="width: 100%" @selection-change="additionalServices">
		        <el-table-column type="selection" width="55"></el-table-column>
		        <el-table-column prop="wareCode" label="商品编码" width="200"></el-table-column>
		        <el-table-column prop="wareName" label="商品名称" width="200"></el-table-column>
		        <el-table-column prop="openDate" label="起售时间" width="150"></el-table-column>
		        <el-table-column prop="closeDate" label="停售时间" width="150"></el-table-column>
		        <el-table-column prop="wareDesc" label="产品描述"></el-table-column>
		        <el-table-column prop="adultPrice" label="价格" width="100"></el-table-column>
		        <el-table-column prop="storageNum" label="库存" width="100"></el-table-column>
		        <el-table-column prop="adultCount" label="数量" width="100"></el-table-column>
		        <el-table-column width="180" label="操作">
		              <template scope="scope">
		                <el-button size="small"
		                  @click="handleAdd(scope.$index, scope.row)">+1</el-button>
		                <el-button size="small"
		                  type="danger"
		                  @click="handleReduce(scope.$index, scope.row)">-1</el-button>
		              </template>
		            </el-table-column>
		    </el-table>
		    <!-- 分页 -->
		    <el-row type="flex" justify="end" style="margin-top:20px">
		    	<el-pagination
		          @size-change="handleSizeChange"
		          @current-change="handleCurrentChange"
		          :current-page="servicePageInfo.currPage"
		          :page-sizes="[10, 20, 30, 40]"
		          :page-size="servicePageInfo.pageSize"
		          layout="total, sizes, prev, pager, next, jumper"
		          :total="additionalServicesList.length">
		        </el-pagination>
		    </el-row>
		    <!-- 推荐活动 -->
		    <h2>推荐活动</h2>
		    <el-table v-loading="activitieLoading" ref="recommendedActivitiesList" :data="recommendedActivitiesList" border tooltip-effect="dark" style="width: 100%" @selection-change="recommendedActivities">
		        <el-table-column type="selection" width="55"></el-table-column>
		        <el-table-column prop="wareCode" label="商品编码" width="200"></el-table-column>
		        <el-table-column prop="wareName" label="商品名称" width="200"></el-table-column>
		        <el-table-column prop="openDate" label="起售时间" width="150"></el-table-column>
		        <el-table-column prop="closeDate" label="停售时间" width="150"></el-table-column>
		        <el-table-column prop="wareDesc" label="产品描述"></el-table-column>
		        <el-table-column prop="adultPrice" label="价格" width="100"></el-table-column>
		        <el-table-column prop="storageNum" label="库存" width="100"></el-table-column>
		        <el-table-column prop="adultCount" label="数量" width="100"></el-table-column>
		        <el-table-column width="180" label="操作">
		              <template scope="scope">
		                <el-button size="small"
		                  @click="handleRecommendAdd(scope.$index, scope.row)">+1</el-button>
		                <el-button size="small"
		                  type="danger"
		                  @click="handleRecommendReduce(scope.$index, scope.row)">-1</el-button>
		              </template>
		            </el-table-column>
		    </el-table>
		    <!-- 分页 -->
		    <el-row type="flex" justify="end" style="margin-top:20px">
		    	<el-pagination
		          @size-change="handleSizeChange1"
		          @current-change="handleCurrentChange1"
		          :current-page="activitiePageInfo.currPage"
		          :page-sizes="[10, 20, 30, 40]"
		          :page-size="activitiePageInfo.pageSize"
		          layout="total, sizes, prev, pager, next, jumper"
		          :total="recommendedActivitiesList.length">
		        </el-pagination>
		    </el-row>
		    <!-- 审核信息 -->
		    <el-row type="flex" justify="center" style="margin-top:50px">
		    	<el-col>
		    		<h2>审核信息：</h2>
			    	<el-form :model="changeForm" :rules="changeRules" ref="changeForm">
			    		<el-form-item prop="auditInformation">
			    			<el-input type="textarea" :autosize="{ minRows: 4, maxRows: 4}" placeholder="请输入审核信息" v-model="changeForm.auditInformation"></el-input>
			    		</el-form-item>
			    	</el-form>
		    	</el-col>
		    </el-row>
		    <!-- 总价 -->
		    <el-row style="margin-top:50px" type="flex" justify="end">
		    		<div class="totalPrice">总价：￥<span v-text="totalPrice"></span></div>
		    </el-row>
		    <el-row style="margin-top:50px" type="flex" justify="center">
		    	<el-button type="primary" @click="changeDetail('changeForm')">确认改单</el-button>
		    	<el-button type="primary" @click="approveDetail('changeForm')">驳回改单</el-button>
		    </el-row>
		</el-card>
	</div>
</template>

<script>
	import { readWareServerList, readWareActiveList, findWareInfo ,getOrderDetail, checkChange, checkNoPass} from '@/api'
	export default{
		data(){
			return{			
				changeForm:{
					auditInformation:''
				},
				changeOrderContent:'',
				submitCommodity:{},
				currentCommodity:{},
				fullcalendarLoading:false,
				serviceLoading:false,
				activitieLoading:false,
				servicePageInfo:{
					currPage:1,
					pageSize:10,
					count:0,
				},
				activitiePageInfo:{
					currPage:1,
					pageSize:10,
					count:0,
				},
				serviceParam:{
					wareId: '',
					skuDate: '',
					currPage: 1,
					pageSize: 10
				},
				activitieParam:{
					wareId: '',
					skuDate: '',
					currPage: 1,
					pageSize: 10
				},
				totalNum:2,
				totalPrice:0,
				orderInfo:{
					wareId:'',
					orderId:'',
					date:'',
					wareName:'',
					adultPrice:0,
					adultNum:0,
					childPrice:0,
					childNum:0
				},
				additionalServicesCheckList:[],
				recommendedActivitiesCheckList:[],
				skuList:[],
				additionalServicesList: [],
				recommendedActivitiesList:[],
				changeRules: {
          auditInformation: [
            { required: true, message: '请输入审核信息', trigger: 'blur' }
          ]
        },
			}
		},
		methods:{
			dayClick(day, event){
				this.currentCommodity = Object.assign({},event);
				this.orderInfo.date = day;
				this.orderInfo.adultPrice = event.adultPrice;
				this.orderInfo.childPrice = event.childPrice;
				this.serviceParam.skuDate = event.start;
				this.activitieParam.skuDate = event.start;
				this.getTotalPrice();
				this.getReadWareServerList();
				this.getReadWareActivityList();
			},
			getReadWareServerList(currPage = 1, pageSize = 10){
				let params = {
					wareId:this.serviceParam.wareId,
					skuDate:this.serviceParam.skuDate,
					currPage:this.serviceParam.currPage,
					pageSize:this.serviceParam.pageSize
				}
				this.serviceLoading = true;
				readWareServerList(params).then((res)=>{
					if(res.data.code === "0001"){
						this.servicePageInfo.currPage = res.data.result.pageInfo.currPage;
						this.servicePageInfo.pageSize = res.data.result.pageInfo.pageSize;
						this.servicePageInfo.count = res.data.result.pageInfo.count;
						res.data.result.wareServerList.forEach((val,index)=>{
							val.adultCount = 0;
						})
						this.additionalServicesList = res.data.result.wareServerList;
					}else{
						this.$message({
        		          message: res.data.message,
        		          type: 'warning'
        		        });
					}
					this.serviceLoading = false;
				}).catch((error)=>{
					console.log(error);
					this.catchError(error.response)
    		        this.serviceLoading = false;
				})
			},
			getReadWareActivityList(currPage = 1, pageSize = 10){
				let params = {
					wareId:this.activitieParam.wareId,
					skuDate:this.activitieParam.skuDate,
					currPage:this.activitieParam.currPage,
					pageSize:this.activitieParam.pageSize
				}
				this.activitieLoading = true;
				readWareActiveList(params).then((res)=>{
					if(res.data.code === "0001"){
						this.activitiePageInfo.count = res.data.result.pageInfo.count;
						res.data.result.wareActivityInfo.forEach((val,index)=>{
							val.adultCount = 0;
						})
						this.recommendedActivitiesList = res.data.result.wareActivityInfo;
					}else{
						this.$message({
	    		    message: res.data.message,
	    		    type: 'warning'
	    		  });
					}
					this.activitieLoading = false;
				}).catch((error)=>{
					console.log(error);
					this.catchError(error.response)
    		  this.activitieLoading = false;
				})
			},
			changeMonth(){},
			getTotalPrice(){
				let additionalPrice = 0,recommendedPrice = 0;
				this.additionalServicesCheckList.forEach((value,index)=>{
					additionalPrice += parseInt(value.adultPrice) * parseInt(value.adultCount)
				});
				this.recommendedActivitiesCheckList.forEach((value,index)=>{
					recommendedPrice += parseInt(value.adultPrice) * parseInt(value.adultCount)
				});
				this.totalPrice = additionalPrice + recommendedPrice + parseInt(this.orderInfo.adultPrice)*parseInt(this.orderInfo.adultNum) + parseInt(this.orderInfo.childPrice)*parseInt(this.orderInfo.childNum);
			},
			additionalServices(val){
				console.log(val)
				this.additionalServicesCheckList = val;
				this.getTotalPrice();
			},
			recommendedActivities(val){
				console.log(val)
				this.recommendedActivitiesCheckList = val;
				this.getTotalPrice();
			},
			handleAdd(index,row){
				if(row.adultCount < row.storageNum){
					row.adultCount ++;
				}
				this.additionalServicesCheckList.forEach((val,index)=>{
					if(row.wareCode === val.wareCode){
						this.getTotalPrice();
					}
				})
			},
			handleReduce(index,row){
				if(row.adultCount > 0){
					row.adultCount --;
				}
				this.additionalServicesCheckList.forEach((val,index)=>{
					if(row.wareCode === val.wareCode){
						this.getTotalPrice();
					}
				})
			},
			handleRecommendAdd(index,row){
				if(row.adultCount < row.storageNum){
					row.adultCount ++;
				}
				this.recommendedActivitiesCheckList.forEach((val,index)=>{
					if(row.wareCode === val.wareCode){
						this.getTotalPrice();
					}
				})
			},
			handleRecommendReduce(index,row){
				if(row.adultCount > 0){
					row.adultCount --;
				}
				this.recommendedActivitiesCheckList.forEach((val,index)=>{
					if(row.wareCode === val.wareCode){
						this.getTotalPrice();
					}
				})
			},
			handleSizeChange(pageSize){
				this.serviceParam.pageSize = pageSize;
				this.getReadWareServerList();
			},
			handleCurrentChange(currPage){
				this.serviceParam.currPage = currPage;
				this.getReadWareServerList();
			},
			handleSizeChange1(pageSize){
				this.activitieParam.pageSize = pageSize;
				this.getReadWareActivityList();
			},
			handleCurrentChange1(currPage){
				this.activitieParam.currPage = currPage;
				this.getReadWareActivityList();
			},
			getfindWareInfo(wareId){
				let params = {
					wareId:116
				};
				this.fullcalendarLoading = true;
				findWareInfo(params).then((res)=>{
					if(res.data.code === "0001"){
						console.log(res);
						this.submitCommodity = Object.assign({},res.data.result.wareInfo);
						this.skuList = res.data.result.wareInfo.skuList;
						this.$message({
        		          message: res.data.message,
        		          type: 'success'
        		        });
					}else{
						this.$message({
        		          message: res.data.message,
        		          type: 'warning'
        		        });
					}
					this.fullcalendarLoading = false;
				}).catch((error)=>{
					console.log(error);
					this.catchError(error.response)
    		        this.fullcalendarLoading = false;
				})
			},
			getOrderDetail(orderId){
				let params = {
					orderId:orderId
				};
				getOrderDetail(params).then((res)=>{
					if(res.data.code === "0001"){
						this.changeOrderContent = res.data.result.info.cancelReason;
						res.data.result.item.forEach((val)=>{
							if(val.wareType === 2){
								this.orderInfo.adultNum = val.adultCount;
								this.orderInfo.childNum = val.childCount;
								this.orderInfo.singleNumber = val.singleNumber;
								this.orderInfo.wareName = val.wareName;
							}
						})
					}else{
						this.$message({
        		          message: res.data.message,
        		          type: 'warning'
        		        });
					}
				}).catch((error)=>{
					console.log(error);
					this.catchError(error.response)
				})
			},
			changeDetail(changeForm){
				if(this.orderInfo.date){
					this.$refs[changeForm].validate((valid) => {
					    if (valid) {
	    					let data = {
	    						verifyInfo:"aaaa",
	    						oldOrderId:706,
	    						order:{
	    							statusInvoice:0,
	    							orderItem:[
	    								{
	    									wareId:28,
	    									skuId:315,
	    									dateDepart:"2017-07-10",
	    									strategyId:0,
	    									wareType:2,
	    									adultCount:2,
	    									childCount:1
	    								},{
	    									wareId:39,
	    									skuId:320,
	    									wareType:1,
	    									adultCount:2,
	    									childCount:0,
	    								},{
	    									wareId:35,
	    									skuId:322,
	    									wareType:1,
	    									adultCount:2,
	    									childCount:0,
	    								}
	    							]
	    						}					
	    					}
	    					/*let data = {
	    						verifyInfo:this.changeForm.auditInformation,
	    						oldOrderId:this.orderInfo.orderId,
	    						order:{
	    							statusInvoice:0,
	    							orderItem:[]
	    						}					
	    					}
	    					let commodity = {
	    						wareId:this.submitCommodity.wareId,
	    						skuId:this.currentCommodity.skuId,
	    						dateDepart:this.currentCommodity.start,
	    						strategyId:0,
	    						wareType:this.submitCommodity.wareType,
	    						adultCount:this.orderInfo.adultNum,
	    						childCount:this.orderInfo.childNum
	    					}
	    					data.order.orderItem.push(commodity);
	    					this.additionalServicesCheckList.forEach((val)=>{
	    						let additionalServices = {
	    							wareId:val.wareId,
	    							skuId:val.skuId,
	    							wareType:val.wareType,
	    							adultCount:val.adultCount,
	    							childCount:0,
	    						}
	    						data.order.orderItem.push(additionalServices);
	    					});
	    					this.recommendedActivitiesCheckList.forEach((val)=>{
	    						let additionalServices = {
	    							wareId:val.wareId,
	    							skuId:val.skuId,
	    							wareType:val.wareType,
	    							adultCount:val.adultCount,
	    							childCount:0,
	    						}
	    						data.order.orderItem.push(additionalServices);
	    					});
	    					console.log(data);*/
	    					checkChange(data).then((res)=>{
	    						console.log(res);
	    						if(res.data.code === '0001') {
	    							this.$message({
	    					          message: res.data.message,
	    					          type: 'success'
	    					        });
	    					        this.$router.back();
	    	                  	}else{
	    	                    	this.$message({
	    					          message: res.data.message,
	    					          type: 'warning'
	    					        });
	    	                  	}    
	    					}).catch((error)=>{
	    						console.log(error);
	    						this.catchError(error.response)
	    					})
					    }else {
					        console.log('error submit!!');
					        return false;
					    }
					});
			    }else{
			    		this.$message({
			              message: "请选择主商品",
			              type: 'warning'
			            });
			    	}
			},
			approveDetail(changeForm){
				this.$refs[changeForm].validate((valid) => {
					    if (valid) {
					    	/*let data = {
					    		verifyInfo:this.changeForm.auditInformation,
	    						oldOrderId:this.orderInfo.orderId
					    	}*/
					    	let data = {
					    		verifyInfo:"aaaa",
	    						oldOrderId:706
					    	}
					    	console.log(data);
					    	checkNoPass(data).then((res)=>{
	    						console.log(res);
	    						if(res.data.code === '0001') {
	    							this.$message({
	    					          message: res.data.message,
	    					          type: 'success'
	    					        });
	    					        this.$router.back();
	    	                  	}else{
	    	                    	this.$message({
	    					          message: res.data.message,
	    					          type: 'warning'
	    					        });
	    	                  	}    
	    					}).catch((error)=>{
	    						console.log(error);
	    						this.catchError(error.response)
	    					})
					    }else {
					        console.log('error submit!!');
					        return false;
					    }
				})
			}
		},
		created(){
			this.orderInfo.wareId = this.$route.query.wareId;
			this.orderInfo.orderId = this.$route.query.orderId;
			this.getOrderDetail(this.$route.query.orderId);
			this.getfindWareInfo(this.$route.query.wareId);
			this.serviceParam.wareId = this.$route.query.wareId;
			this.activitieParam.wareId = this.$route.query.wareId;
		}
	}
</script>

<style scoped>
	.totalPrice{
		font-size: 30px;
		color:#ff6f00;
	}
</style>