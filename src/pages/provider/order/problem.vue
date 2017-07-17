<template>
<div class="problem">
	<el-tabs v-model="activeName" @tab-click="getTabName" type="border-card">
	  <el-tab-pane name="refunds" label="退款"></el-tab-pane>
	  <el-tab-pane name="changeOrders" label="改单"></el-tab-pane>
	  <el-tab-pane name="systemFreeze" label="系统冻结"></el-tab-pane>
	  <keep-alive><router-view></router-view></keep-alive>
	</el-tabs>
	
</div>
</template>

<script>
	export default {
		data () {
			return {
				activeName:'refunds'
			}
		},
		methods: {
		    getTabName(tab, event) {
		        this.$router.push({ 
		        	path:'/provider/order/problem/' + tab.name, 
		        	query: { activeName: this.activeName}
		        });
		    }
		},
		mounted () {
			this.$router.push({ 
	        	path:'/provider/order/problem/refunds', 
	        	query: { activeName: this.activeName}
	        })
		}
	}
</script>