<template>
	<section>
		<div v-title :data-title="this.$route.name"></div>
		<el-row class="steps-bar">
			<!-- <el-steps space="12%" :active="stepActive" finish-status="success" align-center center>
			  <el-step v-for="(item, index) in stepList" :title="item" :key="index"></el-step>
			</el-steps> -->
			<link-steps space="12%" :active="stepActive" align-center center>
			  <link-step v-for="(item, index) in stepList" :title="item.title" :key="index" :link="item.link">
			  </link-step>
			</link-steps>
		</el-row>
		<router-view></router-view>
	</section>
</template>
<script>
import { mapGetters } from 'vuex'
	export default {
		data () {
			return {
				// stepList: ['选择类别', '基本信息', '行程介绍', '多媒体', '费用/预定限制', '价格库存', '附加服务',
				// '推荐活动', '多行程维护']
				stepList: [
					{title: '选择类别', link: '#/provider/ware/new/choose_type'},
					{title: '基本信息', link: '#/provider/ware/new/basicInfo_photography'},
					{title: '行程介绍', link: '#/provider/ware/new/tour_itinerary'},
					{title: '多媒体', link: '#/provider/ware/new/multiMedia'},
					{title: '费用/预定限制', link: '#/provider/ware/new/book_limit'},
					{title: '价格库存', link: '#/provider/ware/new/price_stock'},
					{title: '附加服务', link: '#/provider/ware/new/chooseType'},
					{title: '推荐活动', link: '#/provider/ware/new/chooseType'},
					{title: '多行程维护', link: '#/provider/ware/new/multiPassMaintain'},
				]
		 }
		},
		computed: {
			...mapGetters([
				'stepActive'
			])
		}
	}
</script>