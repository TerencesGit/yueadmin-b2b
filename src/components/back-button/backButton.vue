<template>
	<button type="button" class="el-button el-button--default" @click="back">
		<span>
			<slot>{{text}}</slot>
		</span>
	</button>
</template>
<script>
	export default {
		name: 'BackButton',
		data () {
			return {
				text: '返回'
			}
		},
		methods: {
			back () {
				this.$router.back()
			}
		}
	}
</script>
