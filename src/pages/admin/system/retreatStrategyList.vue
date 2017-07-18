<template>
<div class="retreatStrategyList">
	<el-table v-loading="loading" :data="strategyList" border style="width: 100%">
	    <el-table-column align="center" prop="groupId" label="ID" width="140"></el-table-column>
	    <el-table-column :formatter="deadlineDateTypeTxt" align="center" prop="deadlineDateType" label="退改协议类型" width="300"></el-table-column>
	    <el-table-column align="center" prop="reserve2" label="策略名称"></el-table-column>
	    <el-table-column align="center" width="180" label="操作">
          <template scope="scope">
            <el-button
              size="small"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="small"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
	</el-table>
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
</div>
</template>

<script>
  import { retreatStrategyList, retreatStrategyDelete } from '@/api'
	export default{
		data(){
			return{
				strategyList:[],
				loading:false,
				pageInfo:{}
			}
		},
		methods:{
			handleSizeChange(val){
				this.getList(this.pageInfo.currPage,val);
			},
			handleCurrentChange(val){
				this.getList(val,this.pageInfo.pageSize);
			},
			deadlineDateTypeTxt(row){
				switch(row.deadlineDateType){
					case 1:
						return '出行日';
					case 2:
						return '拍摄日';
					case 3:
						return '付款日';
					case 4:
						return '不可退改';
					default:
						return '错误类型';
				}
			},
			handleEdit(index,row){
				let data = {
					groupId : row.groupId + ''
				}
				data = JSON.stringify(data);
				this.$router.push({ 
					path: '/admin/system/retreatStrategy/retreatStrategyEdit?groupId='+row.groupId
					// query: { data: data}
				})
			},
			handleDelete(index,row){
				this.$confirm('是否删除?', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
		          this.loading = true;
		          let data = {
		          	groupId : row.groupId + ''
		          }
		          data = JSON.stringify(data);
		          console.log(data);
		          retreatStrategyDelete(data).then((res)=>{
		          	console.log(res);
		          	if(res.data.code === "0001"){
		          	  this.$message({
	                    message: '删除策略成功',
	                    type: 'success'
	                  });
	                  this.getList();
	                  this.loading = false;
		          	}else{
		          		this.$message({
		                    message: '删除策略失败',
		                    type: 'warning'
		                  });
		          		this.loading = false;
		          	}
		          }).catch((error)=>{
		          	console.log(error);
		          	this.catchError(error.response);
		          	this.loading = false;
		          })
		        }).catch(() => {
		          this.$message({
		            type: 'info',
		            message: '已取消删除'
		          });          
		        });
				
			},
			getList(currPage = 1, pageSize = 20){
				this.loading = true;
				let params = {
					currPage : currPage,
					pageSize : pageSize
				}
				retreatStrategyList(params).then((res)=>{
					if(res.data.code === "0001"){
						console.log(res);
						this.loading = false;
						this.strategyList = res.data.result.list;
						this.pageInfo = res.data.result.pageInfo;
					} else {
						this.$message({
							message:'获取列表失败，请稍后重试',
							type:'warning'
						})
						this.loading = false;
					}
				}).catch(error =>{
					this.loading = false;
					this.catchError(error.response)
				})
			}
		},
		created(){
			this.getList();
		}
	}
</script>