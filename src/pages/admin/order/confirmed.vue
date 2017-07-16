<template>
	<section>
	<!-- 搜索查询 -->
		<el-col :span="24">
			<el-form :model="searchForm" label-width="80px" :inline="true">
				<el-form-item label="订单号">
				    <el-input v-model="searchForm.orderCode" size="small" placeholder="请输入完整订单号"></el-input>
				</el-form-item>
				<el-form-item label="产品名称">
				    <el-input v-model="searchForm.wareName" size="small" placeholder="请输入产品名称"></el-input>
				</el-form-item>
				<el-form-item label="出发日期">
				     <el-date-picker v-model="searchForm.date" type="daterange" placeholder="选择日期范围" size="small"></el-date-picker>					    
				</el-form-item>
				<el-form-item>
					<el-button type="primary" size="small" class="search-button" @click="getOrders(searchForm.date)">查询</el-button>
				</el-form-item>
			</el-form>
		</el-col>
		<!-- 订单列表 -->
		<el-table :data="orderData" border style="width: 100%" v-loading="listLoading">
		    <el-table-column prop="orderCode" label="订单号" width="180"></el-table-column>   
		    <el-table-column prop="wareId" label="悦视觉产品ID" width="180"></el-table-column>   
		    <el-table-column prop="wareName" label="产品名称"></el-table-column>   
		    <el-table-column prop="status" label="订单状态" width="120" :formatter="format">

		    </el-table-column>   
		    <el-table-column label="订单总人数" width="120">
		    	<template scope="scope">
		    		{{parseInt(scope.row.adultCount ? scope.row.adultCount:0) + parseInt(scope.row.childCount ? scope.row.childCount:0)}}
		    	</template>
		    </el-table-column>   
		    <el-table-column prop="dateDepart" label="出发日期" width="150"></el-table-column>   
		    <el-table-column prop="adultPrice" :formatter="formatterAdultPrice" label="成人价" width="150"></el-table-column>
		    <el-table-column label="操作" width="150">
		    	<template scope="scope">
			        <el-button size="small" @click="handleConfirm(scope.$index, scope.row)">确认</el-button>
			        <el-button size="small" @click="handleCheck(scope.$index, scope.row)">查看</el-button>
		    	</template>
    		</el-table-column>  
  		</el-table>
  		<!-- 分页 -->
  		<div class="pagination">
  			<el-pagination
		    	@size-change="handleSizeChange"
		        @current-change="handleCurrentChange"
		        :current-page="pageCur"
		        :page-sizes="[10,20,30,40]"
		        :page-size="pageSize"
		        layout="total, sizes, prev, pager, next, jumper"
		        :total="total">
    		</el-pagination>
  		</div>
	</section>	
</template>
<script>
	import { readOrderList } from '@/api'
	import util from '../../assets/js/utils'
	export default {
		data () {
			return {
				searchForm:{
					orderCode: '',
					wareName: '',
					date: '',					
					stDate: '',
					edDate: ''
				},
				listLoading: false,

				orderData:[{adultCount:5,childCount:"",adultPrice:100},{adultCount:5,childCount:3,adultPrice:100},{adultCount:5,childCount:3,adultPrice:100}],				
				pageCur: 1,
				pageSize:20,
				total:0
			}
		},
		methods: {
			formatterAdultPrice(row){
				return "￥" + Number(row.adultPrice != "" ? row.adultPrice : 0).toFixed(2);
			},
			//每页条数改变的时候
			handleSizeChange (val) {
				this.pageSize = val;
				this.pageCur = 1;
				this.getOrders();
			},
			//当前页数改变的时候
			handleCurrentChange (val) {
				this.pageCur = val;
				this.getOrders();
			},
			// 查看
			handleCheck (index,row) {
				this.$router.push({
					path:'/admin/order/orderDetail',
					query: { orderId: row.orderId }
				})
			},
			format(row,col){
				if(row.status===2){
					return '待确认'
				}
			},
			//获取订单列表
			getOrders (data) {
				if(data && data[0]!==null){
					this.searchForm.stDate = util.formatDate.format(this.searchForm.date[0])
					this.searchForm.edDate = util.formatDate.format(this.searchForm.date[1])
				}else{
					this.searchForm.date = "";
					this.searchForm.stDate = "";
					this.searchForm.edDate = "";
				}	
				var para = {
					pageCur: this.pageCur,
					pageSize: this.pageSize,
					orderCode: this.searchForm.orderCode,
					wareName: this.searchForm.wareName,
					stDate: this.searchForm.stDate,
					edDate: this.searchForm.edDate,
					status:2
				};
				this.listLoading = true;
				 // console.log(para)
				//调用获取订单列表接口				
				readOrderList(para).then((res) => {
					console.log(res)
					if(res.data.code === "0001"){					 
						this.orderData = res.data.result.data;
						this.total = res.data.result.pageInfo.count;
					}		
					this.listLoading = false;	 
				}).catch((error)=>{
					console.log(error);
					this.catchError(error.response);
			        this.listLoading = false;
				});
			},
			handleConfirm (index,data) {
				console.log(data.id);
				this.$alert('确认成功！', '确认订单', {
		          confirmButtonText: '确定',
		          callback: action => {
		            this.$message({
		              type: 'success',
		              message: `订单ID为${data.id}确认成功!`
		            });
		          }
		        });
			},

		},
		created () {
			this.getOrders();
		}
	}
</script>
<style scoped>
	.search-button{
		margin-bottom:3px;
	}
	.pagination{
		text-align:right;
	}
</style>