<template>
	<section>
		<div v-title :data-title="this.$route.name"></div>
		<el-row class="steps-bar">
			<link-steps space="15%" :active="stepActive" align-center center>
			  <link-step v-for="(item, index) in stepList" :title="item.title" :key="index" :link="path + item.link + param">
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
					{title: '基本信息', link: '/base'},
					{title: '行程介绍', link: '/trip'},
					{title: '多媒体', link: '/multimedia'},
					{title: '费用/预定限制', link: '/fare'},
					{title: '价格库存', link: '/storage'},
					{title: '附加服务', link: '/service'},
					{title: '推荐活动', link: '/activity'},
				],
		 }
		},
		computed: {
			...mapGetters([
				'stepActive'
			]),
			path () {
				let _path = this.$route.path;
				return '#'+_path.substring(0, _path.lastIndexOf('/'))
			},
			param () {
				return this.$route.query.wareId ? '?wareId='+this.$route.query.wareId : ''
			}
		}
	}
</script>