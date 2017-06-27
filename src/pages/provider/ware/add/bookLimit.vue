<template>
	<table class="table table-bordered bg-white">
		<thead>
			<tr>
				<th colspan="2" class="text-left">费用及预订限制</th>
				<th class="text-right"><el-button>预览</el-button></th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td>
					<el-checkbox v-model="checked"></el-checkbox>
				</td>
				<td>大交通：</td>
				<td>
					<vue-html5-editor :content="content" :height="200" :z-index="1" @change="updateData"></vue-html5-editor>
				</td>
			</tr>
			<tr>
				<td><el-checkbox v-model="checked"></el-checkbox></td>
				<td>住宿：</td>
				<td>
					<vue-html5-editor :content="content" :height="200" :z-index="1" @change="updateData"></vue-html5-editor>
				</td>
			</tr>
			<tr>
				<td><el-checkbox v-model="checked"></el-checkbox></td>
				<td>餐食：</td>
				<td>
					<vue-html5-editor :content="content" :height="200" :z-index="1" @change="updateData"></vue-html5-editor>
				</td>
			</tr>
			<tr>
				<td><el-checkbox v-model="checked"></el-checkbox></td>
				<td>服务人员：</td>
				<td>
					<vue-html5-editor :content="content" :height="200" :z-index="1" @change="updateData"></vue-html5-editor>
				</td>
			</tr>
			<tr>
				<td><el-checkbox v-model="checked"></el-checkbox></td>
				<td>地面交通：</td>
				<td>
					<vue-html5-editor :content="content" :height="200" :z-index="1" @change="updateData"></vue-html5-editor>
				</td>
			</tr>
			<tr>
				<td><el-checkbox v-model="checked"></el-checkbox></td>
				<td>门票及地面项目：</td>
				<td>
					<vue-html5-editor :content="content" :height="200" :z-index="1" @change="updateData"></vue-html5-editor>
				</td>
			</tr>
			<tr>
				<td><el-checkbox v-model="checked"></el-checkbox></td>
				<td>签证/签注：</td>
				<td>
					<vue-html5-editor :content="content" :height="200" :z-index="1" @change="updateData"></vue-html5-editor>
				</td>
			</tr>
			<tr>
				<td colspan="3">
					<el-button type="primary" @click="save">保存</el-button>
					<el-button @click="back">返回</el-button>
				</td>
			</tr>
		</tbody>
	</table>
</template>
<script>
	export default {
    data () {
      return {
      	checked: true,
      	content: 'html5Editor'
      }
    },
    methods: {
    	save () {
    		console.log(this.content)
    		this.$router.push('/provider/ware/new/price_stock')
    	},
    	back () {

    	},
    	updateData (content) {
    		this.content = content
    	}
    },
    mounted () {
    	this.$store.dispatch('setStepActive', 4)
    }
  }
</script>
<style scoped>
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
	.table > tbody td:last-child {
		padding: 20px;
	}
	.table .text-right {
		text-align: right
	}
</style>