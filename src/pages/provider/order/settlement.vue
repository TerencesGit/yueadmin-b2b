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
				<el-form-item label="结算状态">
				    <el-select v-model="searchForm.balanceState" size="small">
				      	<el-option label="结算中" :value="7"></el-option>
				      	<el-option label="未结算" :value="6"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" size="small" class="search-button" @click="getOrders(searchForm.date)">查询</el-button>
				</el-form-item>
			</el-form>
		</el-col>
		<!-- 订单列表 -->
		<el-table :data="orderData" border style="width: 100%" v-loading="listLoading">
		    <el-table-column prop="orderCode" label="订单号" width="150" align="center"></el-table-column>   
		    <el-table-column prop="wareId" label="悦视觉产品ID" width="150" align="center"></el-table-column>   
		    <el-table-column prop="wareName" label="产品名称" width="200" align="center"></el-table-column>   
		    <el-table-column prop="status" label="订单状态" width="100" align="center" :formatter="format">

		    </el-table-column>   
		    <el-table-column prop="totalCount" label="订单总人数" width="110" align="center"></el-table-column>   
		    <el-table-column prop="dateDepart" label="出发日期" width="150" align="center"></el-table-column>   
		    <el-table-column prop="adultPrice" label="成人价" width="180" align="center"></el-table-column>
		    <el-table-column label="操作">
		    	<template scope="scope">
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
	import { getOrderList } from '@/api'
	// import util from '../../assets/js/utils'
	export default {
		data () {
			return {
				searchForm:{
					orderCode: '',
					wareName: '',
					date: '',					
					stDate: '',
					edDate: '',
					balanceState: 7
				},
				listLoading: false,
				orderData:[],				
				pageCur: 1,
				pageSize:20,
				total:0
			}

		},
		methods: {
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
				if(row.status===7){
					return '已结算'
				}else if(row.status===6){
					return '结算中'
				}
			},
			//获取订单列表
			getOrders (data) {
				if(data && data[0]!==null){
					// this.searchForm.stDate = util.formatDate.format(this.searchForm.date[0])
					// this.searchForm.edDate = util.formatDate.format(this.searchForm.date[1])
				}else{
					this.searchForm.date="";
					this.searchForm.stDate="";
					this.searchForm.edDate="";
				}			
				var para = {
					pageCur: this.pageCur,
					pageSize: this.pageSize,
					orderCode: this.searchForm.orderCode,
					wareName: this.searchForm.wareName,
					stDate: this.searchForm.stDate,
					edDate: this.searchForm.edDate,
					status:this.searchForm.balanceState
				};
				// this.listLoading = true;
				   console.log(para)
				//调用获取订单列表接口				
				getOrderList(para).then((res) => {
					  console.log(res.data)
					if(res.data.code === "0001"){					 
						this.orderData = res.data.result.data;
						this.total = res.data.result.pageInfo.count;
						this.listLoading = false;
					}			 
				}).catch((error)=>{
					console.log(error);
					this.$message({
			          message: '服务器繁忙,请稍后再试',
			          type: 'error'
			        });
				});
			}

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