<template>
	<section>
		<el-row>
			<el-col :span="20" :offset="2">
				<el-form :model="wareForm" :rules="rules" ref="wareForm" label-width="140px">
					<el-card class="input-width">
						<el-row>
					  	<el-col :span="12">
					  		<el-form-item label="商品名称" prop="wareName">
						    	<el-input v-model="wareForm.wareName" placeholder="商品名称"></el-input>
							  </el-form-item>
					  	</el-col>
					  	<el-col :span="12">
								<el-form-item label="可售渠道" prop="channel">
							    <el-select v-model="wareForm.channel">
							      <el-option label="Web渠道" value="0001"></el-option>
							      <el-option label="H5渠道" value="0010"></el-option>
							      <el-option label="App渠道" value="0100"></el-option>
							    </el-select>
							  </el-form-item>
							</el-col>
					  </el-row>
					  <el-row>
					  	<el-col :span="12">
					  		<el-form-item label="商品缩略名" prop="briefName">
						    	<el-input v-model="wareForm.briefName" placeholder="商品缩略名"></el-input>
							  </el-form-item>
					  	</el-col>
					  	<el-col :span="12">
					  		<el-form-item label="商品关键字" prop="keyWords">
						    	<el-input v-model="wareForm.keyWords" placeholder="关键字以英文逗号分隔"></el-input>
							  </el-form-item>
					  	</el-col>
					  </el-row>
					  <el-row>
						  <el-col :span="12">
							  <el-form-item label="起售时间" prop="openDate">
							    <el-date-picker
							      v-model="wareForm.openDate"
							      type="datetime"
							      placeholder="选择日期时间"
							      align="right"
							      :picker-options="pickerOptions">
							    </el-date-picker>
							  </el-form-item>
						  </el-col>
						  <el-col :span="12">
							  <el-form-item label="停售时间" prop="closeDate">
							    <el-date-picker
							      v-model="wareForm.closeDate"
							      type="datetime"
							      placeholder="选择日期时间"
							      align="right"
							      :picker-options="pickerOptions">
							    </el-date-picker>
							  </el-form-item>
						  </el-col>
					  </el-row> 
					  <el-row>
						  <el-col :span="12">
							  <el-form-item label="出发城市" prop="srcCityCode">
							  	<region-picker v-model="wareForm.srcCityCode" width="217" @change="srcCityChange"></region-picker>
							  </el-form-item>
						  </el-col>
						  <el-col :span="12">
							  <el-form-item label="目的城市" prop="dstCityCode">
							  	<region-picker v-model="wareForm.srcCityCode" width="217" @change="dstCityChange"></region-picker>
							  </el-form-item>
						  </el-col>
					  </el-row>
					</el-card>
					<el-card class="input-width">
						<el-row>
							<el-col :span="12">
								<el-form-item label="行程天数" prop="tripDays" style="height: 36px">
							    <el-input-number v-model="wareForm.tripDays" :min="1" :max="30" style="width: 140px"></el-input-number>
							  </el-form-item>
							</el-col>
							<el-col :span="12">
					  		<el-form-item label="至少提前多少天购买">
							     <el-input-number v-model="wareForm.sellPreDays" :min="1" :max="45" style="width: 140px"></el-input-number>
							  </el-form-item>
					  	</el-col>
					  </el-row>
					  <el-row>
					  	<!-- <el-col :span="12">
					  		<el-form-item label="订金占位时长">
							    <el-input-number v-model="wareForm.cashReserveMinute" :min="1" :max="24" style="width: 140px"></el-input-number>
							    <span class="input-unit">小时</span>
							  </el-form-item>
					  	</el-col> -->
					  	<el-col :span="12">
					  		<el-form-item label="无订金订单占位时长">
							    <el-input-number v-model="wareForm.nocashReserveMinute" :min="1" :max="24" style="width: 140px"></el-input-number>
							    <span class="input-unit">小时</span>
							  </el-form-item>
					  	</el-col>  
					  </el-row>
						<el-row>
					  	<el-col :span="12">
					  		<el-form-item label="商品品牌" prop="brandId">
						    	<el-select v-model="wareForm.brandId">
							      <el-option v-for="item in wareBrands" :label="item.brandName" :value="item.brandId" :key="item.brandId"></el-option>
							    </el-select> 
							  </el-form-item>
					  	</el-col>
					  	<el-col :span="12">
					  		<el-form-item label="建议售价">
						      <el-input v-model="wareForm.suggestedPrice" placeholder="建议售价"></el-input>
							  </el-form-item>
					  	</el-col>
					  </el-row>
					  <el-row>
					  	<el-col :span="12">
					  		<el-form-item label="商品类别">
						    	<el-select v-model="wareForm.wareKind">
							      <el-option v-for="item in wareBrands" :label="item.brandName" :value="item.wareKind" :key="item.wareKind"></el-option>
							    </el-select> 
							  </el-form-item>
					  	</el-col>
					  	<el-col :span="12">
					  		<el-form-item label="商品类型">
						    	<el-select v-model="wareForm.wareType">
							      <el-option v-for="item in wareBrands" :label="item.brandName" :value="item.wareType" :key="item.wareType"></el-option>
							    </el-select> 
							  </el-form-item>
					  	</el-col>
					  </el-row>
					</el-card>
					<el-card>
						<p><strong>推荐概述</strong><span style="margin-left: 15px; font-size: 14px">最多输入8000个字符</span></p>
						<vue-html5-editor :content="wareForm.wareDesc" :height="400" @change="updateData"></vue-html5-editor>
					</el-card>
					<el-form-item class="text-center">
				    <el-button type="primary" @click="submitForm">下一步</el-button>
				    <el-button @click="resetForm('wareForm')">重置</el-button>
				  </el-form-item>
				</el-form>
			</el-col>
		</el-row>
	</section>
</template>
<script>
  import { readBrandList, saveWareInfo } from '@/api'
	export default {
    data () {
      return {
      	wareBrands: [],
      	brandList: [],
        wareForm: {
        	wareName: '',
          channel: '0001',
          keyWords: '',
          openDate: '',
          closeDate: '',
          srcCityCode: '',
          dstCityCode: '',
          wareDesc: '',
          briefName: '',
          status: '',
          brandId: '',
          tripDays: '1',
          sellPreDays: '7',
          nocashReserveMinute: '12',
          cashReserveMinute: '24',
          wareKind: '',
          wareType: '',
          parentId: '',
          suggestedPrice: '',
        },
        rules: {
        	wareName: [
        		{required: true, message: '请输入商品名称', trigger: 'blur'}
        	],
        	briefName: [
        		{required: true, message: '请输入商品缩略名', trigger: 'blur'}
        	],
        	keyWords: [
        		{required: true, message: '请输入商品缩略名', trigger: 'blur'}
        	],
        	openDate: [
            { type: 'date', required: true, message: '请选择开售日期', trigger: 'change' }
          ],
          closeDate: [
            { type: 'date', required: true, message: '请选择停售时间', trigger: 'change' }
          ],
        	srcCityCode: [
        		{required: true, message: '请选择出发城市', trigger: 'blur'}
        	],
        	dstCityCode: [
        		{required: true, message: '请选择目的城市', trigger: 'blur'}
        	],
        	brandId: [
        		{type: 'number', required: true, message: '请选择商品品牌', trigger: 'change'}
        	],
        },
        pickerOptions: {
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '明天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() + 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周后',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() + 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }, {
            text: '一月后',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() + 3600 * 1000 * 24 * 30);
              picker.$emit('pick', date);
            }
          }]
        },
        // rules: {
        //   name: [
        //     { required: true, message: '请输入活动名称', trigger: 'blur' },
        //     { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        //   ],
        //   region: [
        //     { required: true, message: '请选择活动区域', trigger: 'change' }
        //   ],
        //   date1: [
        //     { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        //   ],
        //   date2: [
        //     { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
        //   ],
        //   type: [
        //     { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
        //   ],
        //   resource: [
        //     { required: true, message: '请选择活动资源', trigger: 'change' }
        //   ],
        //   desc: [
        //     { required: true, message: '请填写活动形式', trigger: 'blur' }
        //   ]
        // }
      };
    },
    methods: {
    	updateData (content) {
    		this.wareForm.wareDesc = content
    	},
    	// 获取品牌列表
    	getWareBrandList () {
    		let brandList = [
    			{brandId: '00001', brandName: '商品品牌1'},
    			{brandId: '00002', brandName: '商品品牌2'},
    			{brandId: '00003', brandName: '商品品牌3'},
    			{brandId: '00004', brandName: '商品品牌4'}
    		]
    		readBrandList({})
    		.then(res => {
    			if (res.data.code === '0001') {
    				this.wareBrands = res.data.result.brandInfo
    			} else {
    				this.$message.error(res.data.message)
    			}
    		})
    		.catch((err) => {
    			this.wareBrands = brandList
    			this.$message.error(this.GLOBAL.resError)
    		})
    	},
      submitForm() {
        this.$refs.wareForm.validate((valid) => {
        	let form = Object.assign({}, this.wareForm)
          console.log(form)
          if (valid) {
          	let data = Object.assign({}, this.wareForm)
            console.log(data)
          } else {
          	this.$message.error('表单输入有误')
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      srcCityChange (code) {
      	this.wareForm.srcCityCode = code
      },
      dstCityChange (code) {
      	this.wareForm.dstCityCode = code
      }
    },
    mounted () {
    	this.getWareBrandList()
    	this.$store.dispatch('setStepActive', 1)
    }
  }
</script>
<style scoped>
	.el-card {
		margin: 15px;
	}
	.el-card__body {
		padding: 30px;
	}
	.input-width .el-input {
		width: 217px;
	}
	.input-unit {
		margin-left: 5px;
		vertical-align: top;
	}
</style>
