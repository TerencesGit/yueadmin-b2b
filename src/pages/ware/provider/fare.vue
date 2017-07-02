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
					<td>
						<el-checkbox checked disabled></el-checkbox>
					</td>
					<td>大交通：</td>
					<td>
						<vue-html5-editor :content="trafficContent" :height="200" :z-index="1" @change="updateTrafficContent"></vue-html5-editor>
					</td>
				</tr>
				<tr>
					<td><el-checkbox v-model="checked"></el-checkbox></td>
					<td>住宿：</td>
					<td>
						<vue-html5-editor :content="accommContent" :height="200" :z-index="1" @change="updateAccommContent"></vue-html5-editor>
					</td>
				</tr>
				<tr>
					<td><el-checkbox v-model="checked"></el-checkbox></td>
					<td>餐食：</td>
					<td>
						<vue-html5-editor :content="mealsContent" :height="200" :z-index="1" @change="updateMealsContent"></vue-html5-editor>
					</td>
				</tr>
				<tr>
					<td><el-checkbox v-model="checked"></el-checkbox></td>
					<td>服务人员：</td>
					<td>
						<vue-html5-editor :content="serviceContent" :height="200" :z-index="1" @change="updateServiceContent"></vue-html5-editor>
					</td>
				</tr>
				<tr>
					<td><el-checkbox v-model="checked"></el-checkbox></td>
					<td>地面交通：</td>
					<td>
						<vue-html5-editor :content="groundContent" :height="200" :z-index="1" @change="updateGroundContent"></vue-html5-editor>
					</td>
				</tr>
				<tr>
					<td><el-checkbox v-model="checked"></el-checkbox></td>
					<td>门票及地面项目：</td>
					<td>
						<vue-html5-editor :content="ticketContent" :height="200" :z-index="1" @change="updateTicketContent"></vue-html5-editor>
					</td>
				</tr>
				<tr>
					<td><el-checkbox v-model="checked"></el-checkbox></td>
					<td>签证/签注：</td>
					<td>
						<vue-html5-editor :content="visaContent" :height="200" :z-index="1" @change="updateVisaData"></vue-html5-editor>
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
			    <span class="title">大交通</span>
			  </div>
				<div v-html="trafficContent"></div>
			</el-card>
			<el-card>
				<div slot="header" class="clearfix">
			    <span class="title">住宿</span>
			  </div>
				<div v-html="accommContent"></div>
			</el-card>
			<el-card>
				<div slot="header" class="clearfix">
			    <span class="title">餐食</span>
			  </div>
				<div v-html="mealsContent"></div>
			</el-card>
			<el-card>
				<div slot="header" class="clearfix">
			    <span class="title">服务</span>
			  </div>
				<div v-html="serviceContent"></div>
			</el-card>
			<el-card>
				<div slot="header" class="clearfix">
			    <span class="title">地面交通</span>
			  </div>
				<div v-html="groundContent"></div>
			</el-card>
			<el-card>
				<div slot="header" class="clearfix">
			    <span class="title">门票及地面交通</span>
			  </div>
				<div v-html="ticketContent"></div>
			</el-card>
			<el-card>
				<div slot="header" class="clearfix">
			    <span class="title">签证/签注</span>
			  </div>
				<div v-html="visaContent"></div>
			</el-card>
		</el-dialog>
	</section>
</template>
<script>
	export default {
    data () {
      return {
      	checked: true,
      	trafficContent: '输入交通内容',
      	accommContent: '输入住宿内容',
      	mealsContent: '输入餐食内容',
      	serviceContent: '输入服务内容',
      	groundContent: '输入地面交通内容',
      	ticketContent: '输入门票及地面项目内容',
      	visaContent: '输入签证/签注内容',
      	editorVisible: false
      }
    },
    methods: {
    	updateTrafficContent (content) {
    		this.trafficContent = content
    	},
    	updateAccommContent (content) {
    		this.accommContent = content
    	},
    	updateMealsContent (content) {
    		this.mealsContent = content
    	},
    	updateServiceContent (content) {
    		this.serviceContent= content
    	},
    	updateGroundContent (content) {
    		this.groundContent = content
    	},
    	updateTicketContent (content) {
    		this.ticketContent = content
    	},
    	updateVisaData (content) {
    		this.visaContent = content
    	},
    	saveCostInfo () {
    		let data = {
    			traffic: this.trafficContent,
    			accomm: this.accommContent,
    			meals: this.mealsContent,
    			service: this.serviceContent,
    			groundTraffic: this.groundContent,
    			ticket: this.ticketContent,
    			visa: this.visaContent
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