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
						<vue-html5-editor :content="attributeForm.introduce" :height="200" :z-index="1" @change="updateIntroduce"></vue-html5-editor>
					</td>
				</tr>
				<tr>
					<td>
						<el-checkbox checked></el-checkbox>
					</td>
					<td>费用说明：</td>
					<td>
						<vue-html5-editor :content="attributeForm.charge" :height="200" :z-index="1" @change="updateCharge"></vue-html5-editor>
					</td>
				</tr>
				<tr>
					<td><el-checkbox v-model="checked"></el-checkbox></td>
					<td>使用说明：</td>
					<td>
						<vue-html5-editor :content="attributeForm.explains" :height="200" :z-index="1" @change="updateExplain"></vue-html5-editor>
					</td>
				</tr>
				<tr>
					<td><el-checkbox v-model="checked"></el-checkbox></td>
					<td>购买须知：</td>
					<td>
						<vue-html5-editor :content="attributeForm.notice" :height="200" :z-index="1" @change="updateNotice"></vue-html5-editor>
					</td>
				</tr>
				<tr>
					<td colspan="3">
						<el-button type="primary" @click="saveChargeInfo">保存</el-button>
						<el-button type="primary" @click="handleNext">下一步</el-button>
					</td>
				</tr>
			</tbody>
		</table>
		<el-dialog v-model="editorVisible" title="费用及预订限制预览" size="large">
			<el-card>
				<div slot="header" class="clearfix">
			    <span class="title">商品介绍</span>
			  </div>
				<div v-html="attributeForm.introduce"></div>
			</el-card>
			<el-card>
				<div slot="header" class="clearfix">
			    <span class="title">费用说明</span>
			  </div>
				<div v-html="attributeForm.charge"></div>
			</el-card>
			<el-card>
				<div slot="header" class="clearfix">
			    <span class="title">使用说明</span>
			  </div>
				<div v-html="attributeForm.explains"></div>
			</el-card>
			<el-card>
				<div slot="header" class="clearfix">
			    <span class="title">购买须知</span>
			  </div>
				<div v-html="attributeForm.notice"></div>
			</el-card>
		</el-dialog>
	</section>
</template>
<script>
	import { saveAttribute, readAttribute } from '@/api'
	export default {
    data () {
      return {
      	wareId: '',
      	checked: true,
      	editorVisible: false,
      	attributeForm: {
      		id: '',
      		introduce: '输入商品介绍',
	      	charge: '输入费用说明',
	      	explains: '输入使用说明',
	      	notice: '输入购买须知',
      	},
      }
    },
    methods: {
    	updateIntroduce (content) {
    		console.log(content)
    		this.attributeForm.introduce = content
    	},
    	updateCharge (content) {
    		this.attributeForm.charge = content
    	},
    	updateExplain (content) {
    		this.attributeForm.explains = content
    	},
    	updateNotice (content) {
    		this.attributeForm.notice = content
    	},
    	// 获取费用信息
    	getChargeInfo () {
    		readAttribute({wareId: this.wareId}).then(res => {
    			console.log(res)
    			if (res.data.code === '0001') {
    				this.attributeForm = res.data.result.AttributeInfo
    			} else {
    				this.$message.error(res.data.message)
    			}
    		}).catch(err => {
    			console.log(err)
    		})
    	},
    	// 保存费用信息
    	saveChargeInfo () {
    		let data = Object.assign({}, this.attributeForm)
    		data.wareId = this.wareId;
    		console.log(data)
    		saveAttribute(data).then(res => {
    			if (res.data.code === '0001') {
    				this.$message.success('保存成功')
    			} else {
    				this.$message.error(res.data.message)
    			}
    		}).catch(err => {
    			console.log(err)
    			this.catchError(err.response)
    		})
    	},
    	handleNext () {
    		this.$confirm('确定已保存录入信息？', '提示', {type: 'warning'})
				.then(() => {
					this.$router.push(`storage?wareId=${this.wareId}`)
				}).catch(err => {
					console.log(err)
				})
    	}
    },
    mounted () {
    	this.$store.dispatch('setStepActive', 3)
    	this.wareId = parseInt(this.$route.query.wareId)
    	this.wareId && this.getChargeInfo()
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