<template>
	<section>
		<div>
			<el-button @click="getUEditorContent">保存</el-button>
		</div>
		<script id="editor" type="text/plain" style="position: relative; z-index: 1; height: 500px;">
	     这里写你的初始化内容
	  </script>
	</section>
</template>
<script>
import '@/assets/ueditor/ueditor.config.js'
import '@/assets/ueditor/ueditor.all.min.js'
import '@/assets/ueditor/ueditor.parse.min.js'
import '@/assets/ueditor/lang/zh-cn/zh-cn.js'
export default {
	data () {
		return {
			editor: null
		}
	},
	mounted () {
		this.editor = UE.getEditor('editor')
	},
	destroyed () {
		this.editor.destroy()
	},
	methods: {
		getUEditorContent () {
			console.log(this.editor.getContent())
		}
	}
}
</script>
<style>
	 .edui-default {
	 	width: 100%;
	 }
</style>