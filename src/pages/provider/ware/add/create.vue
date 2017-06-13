<template>
	<section>
		<el-row>
			<el-col :span="20" :offset="2">
				<el-form :model="wareForm" :rules="rules" ref="wareForm" label-width="140px">
					<el-card class="input-width">
						<el-row>
					  	<el-col :span="12">
					  		<el-form-item label="商品编码" prop="wareCode">
						    	<el-input v-model="wareForm.wareCode" placeholder="商品编码"></el-input>
							  </el-form-item>
					  	</el-col>
					  	<el-col :span="12">
					  		<el-form-item label="商品名称" prop="wareName">
						    	<el-input v-model="wareForm.wareName" placeholder="商品名称"></el-input>
							  </el-form-item>
					  	</el-col>
					  </el-row>
						<el-row>
							<el-col :span="12">
								<el-form-item label="行程天数" prop="tripDays" style="height: 36px">
							    <el-input-number v-model="wareForm.tripDays" :min="1" :max="30" style="width: 140px"></el-input-number>
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
							    <el-input v-model="wareForm.srcCityCode" placeholder="出发城市"></el-input>
							  </el-form-item>
						  </el-col>
						  <el-col :span="12">
							  <el-form-item label="目的城市" prop="dstCityCode">
							  	<el-col :span="20">
							    	<el-input v-model="wareForm.dstCityCode" placeholder="目的城市"></el-input>
							    </el-col>
							  </el-form-item>
						  </el-col>
					  </el-row>
					</el-card>
					<el-card class="input-width">
						<el-row>
					  	<el-col :span="12">
					  		<el-form-item label="商品品牌">
						    	<el-select v-model="wareForm.brandId">
							      <el-option v-for="item in wareBrands" :label="item.brandName" :value="item.brandId"></el-option>
							    </el-select> 
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
					  		<el-form-item label="订金占位时长">
							    <el-input-number v-model="wareForm.cashReserveMinute" :min="1" :max="24" :step="0.5" style="width: 140px"></el-input-number>
							    <span class="input-unit">小时</span>
							  </el-form-item>
					  	</el-col>
					  	<el-col :span="12">
					  		<el-form-item label="无订金订单占位时长">
							    <el-input-number v-model="wareForm.nocashReserveMinute" :min="1" :max="24" style="width: 140px"></el-input-number>
							    <span class="input-unit">小时</span>
							  </el-form-item>
					  	</el-col>  
					  </el-row>
					  <el-row>
					  	<el-col :span="12">
					  		<el-form-item label="至少提前多少天购买">
							     <el-input-number v-model="wareForm.sellPreDays" :min="7" :max="90" style="width: 140px"></el-input-number>
							  </el-form-item>
					  	</el-col>
					  	<el-col :span="12">
					  		<el-form-item label="无订金订单占位时长">
							    <el-input></el-input>
							  </el-form-item>
					  	</el-col>
					  </el-row>
					</el-card>
					<el-card>
						<p><strong>推荐概述</strong><span style="margin-left: 15px; font-size: 14px">最多输入8000个字符</span></p>
						<vue-html5-editor :content="wareForm.wareDesc" :height="400" @change="updateData"></vue-html5-editor>
					</el-card>
					<el-form-item class="text-center">
				    <el-button type="primary" @click="submitForm('wareForm')">下一步</el-button>
				    <el-button @click="resetForm('wareForm')">重置</el-button>
				  </el-form-item>
				</el-form>
			</el-col>
		</el-row>
	</section>
</template>
<script>
  import { getBrandList } from '@/api'
  // import city from '@/assets/js/city'
	export default {
    data () {
      return {
      	booking: false,
      	wareBrands: [],
        wareForm: {
        	wareCode: '',
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
          tripDays: '',
          nocashReserveMinute: '',
          cashReserveMinute: '',
          cashReserveMinute: '',
          sellPreDays: '',
          wareKind: '',
          wareType: '',
          parentId: '',
          suggestedPrice: '',
        },
        rules: {

        },
        pickerOptions: {
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
        openDate: '',
        closeDate: '',
        content: 'html5Editor'
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
    	getWareBrands () {
    		let brandList = [
    			{brandId: '00001', brandName: '商品品牌1'},
    			{brandId: '00002', brandName: '商品品牌2'},
    			{brandId: '00003', brandName: '商品品牌3'},
    			{brandId: '00004', brandName: '商品品牌4'}
    		]
    		this.wareBrands = brandList
    	},
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
          	let data = Object.assign({}, this.wareForm)
            console.log(data)
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    },
    mounted () {
    	this.getWareBrands()
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
