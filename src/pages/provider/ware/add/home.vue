<template>
	<section>
		<div v-title :data-title="this.$route.name"></div>
		<el-row class="steps-row">
			<el-steps space="12%" :active="stepActive" finish-status="success" align-center center>
			  <el-step v-for="(item, index) in stepList" :title="item" :key="index"></el-step>
			</el-steps>
		</el-row>
		<router-view></router-view>
	</section>
</template>
<script>
import { mapGetters } from 'vuex'
	export default {
		data () {
			return {
				stepList: ['选择类别', '基本信息', '行程介绍', '多媒体', '费用/预定限制', '价格库存', '附加服务',
				'推荐活动', '多行程维护']
		 }
		},
		computed: {
			...mapGetters([
				'stepActive'
			])
		}
	}
</script>