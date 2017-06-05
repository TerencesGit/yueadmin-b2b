<template>
	<section>
		<el-row>
			<el-col :span="18" :offset="3">
				<el-card>
					<el-form :model="wareForm" ref="wareForm" label-width="100px" :rules="rules" style="width: 50%; margin: auto">
						<el-form-item label="商品类别" prop="kind">
					    <el-select v-model="wareForm.kind" placeholder="商品类别" class="el-select--block">
					      <el-option
						      v-for="item in options"
						      :key="item.value"
						      :label="item.label"
						      :value="item.value">
						    </el-option>
					    </el-select>
					  </el-form-item>
					  <el-form-item label="商品名称" prop="name">
					    <el-input v-model="wareForm.name" placeholder="商品名称"></el-input>
					  </el-form-item>
					  <el-form-item>
					    <el-button type="primary" @click="submitForm">下一步</el-button>
					    <el-button @click="resetForm">重置</el-button>
					  </el-form-item>
					</el-form>
				</el-card>
			</el-col>
		</el-row>
		<router-view></router-view>
	</section>
</template>
<script>
import { mapActions } from 'vuex'
	export default {
		data () {
			return {
				wareForm: {
					name: '',
					kind: '',
				},
				options: [
					{ label: '拍摄', value: 'photography' },
					{ label: '旅游', value: 'travel' },
				],
				rules: {
					name: [
						{required: true, message: '请输入商品名称', trigger: 'blur'},
					],
					kind: [
						{required: true, message: '请选择商品类别', trigger: 'change'}
					]
				}
			}
		},
		methods: {
			submitForm () {
				this.$refs.wareForm.validate((valid) => {
					if (valid) {
						let name = this.wareForm.name,
								kind = this.wareForm.kind;
						console.log(kind)
						this.$router.push({
							path: '/provider/ware/new/basicInfo_'+kind+'?name='+name
						})
					} else{
						console.log('error submit!')
					}
				})
			},
			resetForm() {
				this.$refs.wareForm.resetFields()
			}
		},
		mounted () {
			this.$store.dispatch('setStepActive', 0)
		}
	}
</script>