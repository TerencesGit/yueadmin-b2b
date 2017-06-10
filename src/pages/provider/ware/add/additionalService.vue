<template>
	<section>
		<el-row class="toolbar">
			<el-button type="primary" @click="newAdditionalService">新增附加服务</el-button>
		</el-row>
		<el-table :data="service" border highlight-current-row>
			<el-table-column type="selection"></el-table-column>
			<el-table-column prop="id" label="服务ID"></el-table-column>
			<el-table-column prop="name" label="服务名称"></el-table-column>
			<el-table-column prop="desc" label="服务描述"></el-table-column>
			<el-table-column prop="status" label="服务状态"></el-table-column>
			<el-table-column label="操作">
				<template scope="scope">
					<el-button type="primary" size="small">编辑</el-button>
					<el-button type="danger" size="small">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-dialog title="新增附加服务">
			<el-form>
				<el-form-item>
					<el-input></el-input>
				</el-form-item>
			</el-form>
		</el-dialog>
	</section>
</template>
<script>
	export default {
		data () {
			return {
				service: [
					{
						id: '00001',
						name: '名称1',
						desc: '描述1',
						status: 1,
					},
					{
						id: '00002',
						name: '名称2',
						desc: '描述2',
						status: 2,
					}
				]
			}
		},
		methods: {
			newAdditionalService () {
				this.$router.push('/provider/ware/new/newAdditionalService')
			}
		},
		mounted () {
			this.$store.dispatch('setStepActive', 6)
		}
	}
</script>