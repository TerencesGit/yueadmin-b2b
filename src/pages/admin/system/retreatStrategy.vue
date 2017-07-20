<template>
<div>
	<el-row type="flex" style="margin-bottom:20px">
		<el-radio-group @change="changeStrategy" v-model="currentStrategy">
		    <el-radio-button label="/retreatStrategyList">策略列表</el-radio-button>
		    <el-radio-button label="/retreatStrategyAdd">新增策略</el-radio-button>
		</el-radio-group>
	</el-row>
	<router-view @add="add"></router-view>
</div>
</template>

<script>
	export default{
		data(){
			return{
				currentStrategy:''
			}
		},
		methods:{
			add(){
				console.log('parentAdd',this);
			},
			changeStrategy(val){
				this.$router.push({ path: '/admin/system/retreatStrategy' + val});
			}
		}
	}
</script>