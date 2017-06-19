<template>
	<section>
		<div v-title :data-title="this.$route.name"></div>
		<el-row class="steps-bar">
			<!-- <el-steps space="12%" :active="stepActive" finish-status="success" align-center center>
			  <el-step v-for="(item, index) in stepList" :title="item" :key="index"></el-step>
			</el-steps> -->
			<link-steps space="12%" :active="stepActive" align-center center>
			  <link-step v-for="(item, index) in stepList" :title="item.title" :key="index" :link="path + item.link">
			  </link-step>
			</link-steps>
		</el-row>
		<keep-alive>
			<router-view></router-view>
    </keep-alive>
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
					{title: '选择类别', link: '/chooseType'},
					{title: '基本信息', link: '/basicInfo_photography'},
					{title: '行程介绍', link: '/tour_itinerary'},
					{title: '多媒体', link: '/multiMedia'},
					{title: '费用/预定限制', link: '/book_limit'},
					{title: '价格库存', link: '/price_stock'},
					{title: '附加服务', link: '/additionalService'},
					{title: '推荐活动', link: '/chooseType'},
					{title: '多行程维护', link: '/multiPassMaintain'},
				]
		 }
		},
		computed: {
			...mapGetters([
				'stepActive'
			]),
			path () {
				let _path = this.$route.path;
				return '#'+_path.substring(0, _path.lastIndexOf('/'))
			}
		}
	}
</script>