<template>
	<section>
		<el-row class="toolbar">
			<el-button type="primary" @click="addService">新增推荐活动</el-button>
		</el-row>
		<el-table :data="service" border highlight-current-row>
			<el-table-column type="index"></el-table-column>
			<el-table-column prop="wareId" label="推荐活动ID" width="120px"></el-table-column>
			<el-table-column prop="wareName" label="推荐活动名称"></el-table-column>
			<el-table-column prop="wareDesc" label="推荐活动描述"></el-table-column>
			<el-table-column prop="status" label="状态" width="100px" :formatter="formatStatus"></el-table-column>
			<el-table-column label="操作" width="100px">
				<template scope="scope">
					<el-button type="primary" size="small" @click="handleEdit(scope.row.wareId)">编辑</el-button>
				</template>
			</el-table-column>
		</el-table>
	</section>
</template>
<script>
	export default {
		data () {
			return {
				addServiceVisible: false,
				wareId: '',
				service: [
					{
	          wareId: 10001,
	        	wareName: '普吉岛5日半自助游直飞随心DIY',
	        	wareDesc: '普吉岛5日半自助游直飞随心DIY',
	          status: 0
	        },{
	          wareId: 10001,
	        	wareName: '普吉岛5日半自助游直飞随心DIY',
	        	wareDesc: '普吉岛5日半自助游直飞随心DIY',
	          status: 1
	        }
	      ],
			}
		},
		methods: {
			formatStatus (row) {
				return row.status === 0 ? '禁用' : '启用'
			},
			addService () {
				this.$router.push({
					path: '/provider/ware/new/newAdditionalService?wareId=' + this.wareId
				})
			},
			handleEdit (id) {
				this.$router.push({
					path: '/provider/ware/new/newAdditionalService?id=' + id
				})
			}
		},
		mounted () {
			this.wareId = this.$route.query.id;
			this.$store.dispatch('setStepActive', 7)
		}
	}
</script>
<style scoped>
	.el-card {
		margin: 15px;
	}
	.el-card__body {
		padding: 30px;
	}
	.input-width .el-input {
		width: 240px;
	}
	.input-unit {
		margin-left: 5px;
		vertical-align: top;
	}
</style>