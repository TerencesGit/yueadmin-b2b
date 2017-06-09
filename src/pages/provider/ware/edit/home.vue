<template>
	<section>
		<div v-title :data-title="this.$route.name"></div>
		<el-row class="steps-bar">
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
				stepList: [
					{title: '基本信息', link: '#/provider/ware/edit/basicInfo_photography'},
					{title: '行程介绍', link: '#/provider/ware/edit/tour_itinerary'},
					{title: '多媒体', link: '#/provider/ware/edit/multiMedia'},
					{title: '费用/预定限制', link: '#/provider/ware/edit/book_limit'},
					{title: '价格库存', link: '#/provider/ware/edit/price_stock'},
					{title: '附加服务', link: '#/provider/ware/edit/chooseType'},
					{title: '推荐活动', link: '#/provider/ware/edit/chooseType'},
					{title: '多行程维护', link: '#/provider/ware/edit/multiple_pass_maintain'},
				],
		 }
		},
		computed: {
			...mapGetters([
				'stepActive'
			])
		}
	}
</script>