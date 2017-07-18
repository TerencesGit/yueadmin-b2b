<template>
<div>
	<el-row type="flex" justify="end" style="margin-bottom:50px">
		<el-col :span="4">
			<el-button type="primary" @click="addList">新增策略</el-button>
		</el-col>
	</el-row>
	<router-view @add="add"></router-view>
</div>
</template>

<script>
	export default{
		data(){
			return{

			}
		},
		methods:{
			add(){
				// console.log('parentAdd',this);
			},
			addList(){
				this.$router.push({ path: '/admin/system/retreatStrategy/retreatStrategyAdd'});
				// console.log(this);
			}
		},
		created(){
			this.$router.push({ path: '/admin/system/retreatStrategy/retreatStrategyList'});
		}
	}
</script>