<template>
	<section class="region-picker">
		<el-input v-model="areaName" :placeholder="placeholder" @focus="pickerVisible = true"></el-input>
		<el-dialog v-model="pickerVisible" title="选择城市">
			<el-form :model="pickerForm" :inline="true" ref="pickerForm" :rules="pickerRules" label-width="50px">
				<el-form-item label="国家" prop="country">
          <el-select v-model="pickerForm.country" @change="countryChange">
			      <el-option v-for="item in countries" :label="item.name" :value="item.id"></el-option>
			    </el-select>
        </el-form-item>
        <el-form-item label="省" prop="province">
          <el-select v-model="pickerForm.province" @change="provinceChange">
			      <el-option v-for="item in provinces" :label="item.name" :value="item.id"></el-option>
			    </el-select>
        </el-form-item>
        <el-form-item label="市" prop="city">
          <el-select v-model="pickerForm.city" @change="cityChange">
			      <el-option v-for="item in city" :label="item.name" :value="item.id"></el-option>
			    </el-select>
        </el-form-item>
        <el-form-item label="区/县" prop="district">
          <el-select v-model="pickerForm.district" @change="districtChange">
			      <el-option v-for="item in district" :label="item.name" :value="item.id"></el-option>
			    </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer">
      	<el-button type="primary" @click="handleConfirm">确定</el-button>
      	<el-button @click="pickerVisible = false">取消</el-button>
      </div>
		</el-dialog>
	</section>
</template>
<script>
	import Region from '@/assets/js/regionData'
	export default {
		name: 'RegionPicker',
		props: {
			placeholder: {
				type: String,
				default: '选择城市'
			},
		},
		data () {
			return {
				pickerVisible: false,
				countries: [{
					name: '中国',
					id: 1
				}],
				provinces: [],
				city: [],
				district: [],
				pickerForm: {
					country: 1,
					province: '',
					city: '',
					district: ''
				},
				areaName: '',
				areaCode: '',
				pickerRules: {
					country: [{required: true, message: '请选择国家'}],
					province: [{required: true, message: '请选择省份'}],
					city: [{required: true, message: '请选择城市'}]
				}
			}
		},
		methods: {
			handleConfirm () {
				this.$refs.pickerForm.validate((valid) => {
					if (valid) {
						var pickerRegion = {};
						if (this.pickerForm.district) {
							let regionId = this.pickerForm.district
							pickerRegion = Region.filter(region => region.id === regionId && region.level === 3)
						} else {
							let regionId = this.pickerForm.city
							pickerRegion = Region.filter(region => region.id === regionId && region.level === 2)
						}
						this.areaName = pickerRegion[0].name
						this.areaCode = pickerRegion[0].areaCode
						this.$emit('change', this.areaCode)
						this.pickerVisible = false
						// this.$refs.pickerForm.resetFields()
					} else {
						return false;
					}
				})
			},
			countryChange () {
				// handle countryChange
			},
			provinceChange () {
				this.pickerForm.city = ''
				let pid = this.pickerForm.province
      	this.city = Region.filter(region => region.pid === pid && region.level === 2)
			},
			cityChange () {
				this.pickerForm.district = ''
				let pid = this.pickerForm.city
      	this.district = Region.filter(region => region.pid === pid && region.level === 3)
			},
			districtChange () {
				this.handleConfirm()
			}
		},
		mounted () {
			this.provinces = Region.filter(region => region.level === 1)
		}
	}
</script>
<style scoped>
	.region-picker .el-form-item {
		margin-bottom: 18px;
	}
</style>
