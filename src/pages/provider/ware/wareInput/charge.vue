<template>
	<section>
		<table class="table table-bordered bg-white">
			<thead>
				<tr>
					<th colspan="2" class="text-left">费用及预订限制</th>
					<th class="text-right"><el-button @click="editorVisible = true">预览</el-button></th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td><el-checkbox v-model="checked"></el-checkbox></td>
					<td>商品介绍：</td>
					<td>
						<vue-html5-editor :content="notes" :height="200" :z-index="1" @change="updateServiceContent"></vue-html5-editor>
					</td>
				</tr>
				<tr>
					<td>
						<el-checkbox checked disabled></el-checkbox>
					</td>
					<td>费用说明：</td>
					<td>
						<vue-html5-editor :content="wareInfo" :height="200" :z-index="1" @change="updateTrafficContent"></vue-html5-editor>
					</td>
				</tr>
				<tr>
					<td><el-checkbox v-model="checked"></el-checkbox></td>
					<td>使用说明：</td>
					<td>
						<vue-html5-editor :content="charge" :height="200" :z-index="1" @change="updateAccommContent"></vue-html5-editor>
					</td>
				</tr>
				<tr>
					<td><el-checkbox v-model="checked"></el-checkbox></td>
					<td>购买须知：</td>
					<td>
						<vue-html5-editor :content="instructions" :height="200" :z-index="1" @change="updateMealsContent"></vue-html5-editor>
					</td>
				</tr>
				<tr>
					<td colspan="3">
						<el-button type="primary" @click="saveCostInfo">保存</el-button>
					</td>
				</tr>
			</tbody>
		</table>
		<el-dialog v-model="editorVisible" title="费用及预订限制预览" size="large">
			<el-card>
				<div slot="header" class="clearfix">
			    <span class="title">商品介绍</span>
			  </div>
				<div v-html="wareInfo"></div>
			</el-card>
			<el-card>
				<div slot="header" class="clearfix">
			    <span class="title">费用说明</span>
			  </div>
				<div v-html="charge"></div>
			</el-card>
			<el-card>
				<div slot="header" class="clearfix">
			    <span class="title">使用说明</span>
			  </div>
				<div v-html="instructions"></div>
			</el-card>
			<el-card>
				<div slot="header" class="clearfix">
			    <span class="title">购买须知</span>
			  </div>
				<div v-html="notes"></div>
			</el-card>
		</el-dialog>
	</section>
</template>
<script>
	export default {
    data () {
      return {
      	checked: true,
      	wareInfo: '输入商品介绍',
      	charge: '输入费用说明',
      	instructions: '输入使用说明',
      	notes: '输入购买须知',
      	editorVisible: false
      }
    },
    methods: {
    	updateTrafficContent (content) {
    		this.wareInfo = content
    	},
    	updateAccommContent (content) {
    		this.charge = content
    	},
    	updateMealsContent (content) {
    		this.instructions = content
    	},
    	updateServiceContent (content) {
    		this.notes= content
    	},
    	saveCostInfo () {
    		let data = {
    			wareInfo: this.wareInfo,
    			charge: this.charge,
    			instructions: this.instructions,
    			notes: this.notes,
    		}
    		console.log(data)
    		// saveCostInfo(data).then(res => {
    		// 	console.log(res)
    		// 	if (res.data.code === '0001') {
    		// 		this.$message.success('保存成功')
    		// 		this.$router.push('/provider/ware/new/price_stock')
    		// 	} else {
    		// 		this.$message.error(res.data.message)
    		// 	}
    		// }).catch(err => {
    		// 	console.log(err)
    		// 	this.catchError(err.response)
    		// })
    	},
    },
    mounted () {
    	this.$store.dispatch('setStepActive', 4)
    }
  }
</script>
<style scoped>
	.el-card {
		margin-bottom: 15px;
		padding: 0;
	}
	.el-card .title {
		font-weight: bold
	}
	.table th {
		padding: 15px;
		background: #fff;
		border-right: 0;
		border-bottom: 1px solid #dfe6ec;
	}
	.table > tbody td {
		text-align: center
	}
	.table > tbody td:first-child {
		width: 60px;
	}
	.table > tbody td:first-child {
		width: 60px;
	}
	.table > tbody td:nth-child(2) {
		width: 120px;
	}
	.table > tbody td:last-child {
		padding: 20px;
	}
	.table .text-right {
		text-align: right
	}
</style>