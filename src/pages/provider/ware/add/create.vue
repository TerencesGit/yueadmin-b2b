<template>
	<section>
		<el-row>
			<el-col :span="20" :offset="2">
				<el-form :model="wareForm" :rules="rules" ref="wareForm" label-width="150px">
					<el-card class="input-width">
            <el-row>
              <el-col :span="12">
                <el-form-item label="行程天数" prop="tripDays" style="height: 36px">
                  <el-input-number v-model="wareForm.tripDays" :min="1" :max="30" style="width: 140px"></el-input-number>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="至少提前多少天购买" prop="sellPreDays" style="height: 36px">
                   <el-input-number v-model="wareForm.sellPreDays" :min="1" :max="45" style="width: 140px"></el-input-number>
                </el-form-item>
              </el-col>
            </el-row>
						<el-row>
					  	<el-col :span="12">
					  		<el-form-item label="商品名称" prop="wareName">
						    	<el-input v-model="wareForm.wareName" placeholder="商品名称"></el-input>
							  </el-form-item>
					  	</el-col>
              <el-col :span="12">
                <el-form-item label="商品品牌" prop="brandId">
                  <el-select v-model="wareForm.brandId">
                    <el-option v-for="item in wareBrands" :label="item.brandName" :value="item.brandId" :key="item.brandId"></el-option>
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
							  	<region-picker v-model="wareForm.srcCityCode" :cityName="wareForm.srcCityName" width="217" @change="srcCityChange"></region-picker>
							  </el-form-item>
						  </el-col>
						  <el-col :span="12">
							  <el-form-item label="目的城市" prop="dstCityCode">
							  	<region-picker v-model="wareForm.dstCityCode" :cityName="wareForm.dstCityName" width="217" @change="dstCityChange"></region-picker>
							  </el-form-item>
						  </el-col>
					  </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="无订金订单占位时长" prop="nocashReserveMinute">
                  <el-input v-model.number="wareForm.nocashReserveMinute" placeholder="单位：小时"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="建议售价" prop="suggestedPrice">
                  <el-input v-model.number="wareForm.suggestedPrice" placeholder="建议售价"></el-input>
                </el-form-item>
              </el-col> 
            </el-row>
					</el-card>
				<!-- 	<el-card class="input-width">
					  <el-row>
					  	<el-col :span="12">
					  		<el-form-item label="订金占位时长">
							    <el-input-number v-model="wareForm.cashReserveMinute" :min="1" :max="24" style="width: 140px"></el-input-number>
							    <span class="input-unit">小时</span>
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
                <el-form-item label="商品类型">
                  <el-select v-model="wareForm.wareType">
                    <el-option v-for="item in wareBrands" :label="item.brandName" :value="item.wareType" :key="item.wareType"></el-option>
                  </el-select> 
                </el-form-item>
              </el-col>
					  	<el-col :span="12">
                <el-form-item label="商品类别" prop="wareKind">
                  <el-select v-model="wareForm.wareKind">
                    <el-option v-for="item in wareBrands" :label="item.brandName" :value="item.brandId" :key="item.brandId"></el-option>
                  </el-select> 
                </el-form-item>
              </el-col>
					  </el-row>
					</el-card> -->
					<el-card>
						<p class="m-b"><strong>推荐概述</strong><span style="margin-left: 15px; font-size: 14px">最多输入8000个字符</span></p>
						<vue-html5-editor :content="wareForm.wareDesc" :height="400" :z-index="1" @change="updateData"></vue-html5-editor>
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
  import { readBrandList, saveWareInfo, readWareInfo } from '@/api'
	export default {
    data () {
      return {
      	wareBrands: [],
      	brandList: [],
        wareForm: {
          wareId: 0,
        	wareName: '12345',
          channel: '0001',
          keyWords: '1234',
          openDate: new Date(),
          closeDate:  new Date(),
          srcCityCode: '110000',
          dstCityCode: '310000',
          wareDesc: '123456',
          briefName: '234',
          brandId: 1234,
          tripDays: 1,
          sellPreDays: 7,
          nocashReserveMinute: 12,
          suggestedPrice: 1234,
          srcCityName: '请选择城市',
          dstCityName: '请选择城市',
        },
        rules: {
        	wareName: [
        		{required: true, message: '请输入商品名称', trigger: 'blur'}
        	],
        	briefName: [
        		{required: true, message: '请输入商品缩略名', trigger: 'blur'}
        	],
        	keyWords: [
        		{required: true, message: '请输入商品关键字', trigger: 'blur'}
        	],
        	openDate: [
            { type: 'date', required: true, message: '请选择开售日期', trigger: 'change' }
          ],
          closeDate: [
            { type: 'date', required: true, message: '请选择停售时间', trigger: 'change' }
          ],
        	srcCityCode: [
        		{required: true, message: '请选择出发城市', trigger: 'change'}
        	],
        	dstCityCode: [
        		{required: true, message: '请选择目的城市', trigger: 'change'}
        	],
        	brandId: [
        		{type: 'number', required: true, message: '请选择商品品牌', trigger: 'change'}
        	],
          nocashReserveMinute: [
            {type: 'number', required: true, message: '请输入无订金订单占位时长', trigger: 'blur'}
          ],
          suggestedPrice: [
            {type: 'number', required: true, message: '请输入建议售价', trigger: 'blur'}
          ],
          tripDays: [
            {type: 'number', required: true, message: '请选择天数', trigger: 'change'}
          ],
          sellPreDays: [
            {type: 'number', required: true, message: '请选择天数', trigger: 'change'}
          ]
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
      };
    },
    methods: {
    	updateData (content) {
    		this.wareForm.wareDesc = content
    	},
      // 获取商品详情
      getWareDetail (id) {
        readWareInfo({wareId: id}).then(res => {
          console.log(res)
          if(res.data.code === '0001') {
            let wareInfo = res.data.result.wareInfo
            wareInfo.openDate = new Date(wareInfo.openDate)
            wareInfo.closeDate = new Date(wareInfo.closeDate)
            this.wareForm = res.data.result.wareInfo
            console.log(this.wareForm)
          } else {
            this.$message.error(res.data.message)
          }
        }).catch(err => {
          console.log(err)
          this.catchError(err.response)
        })
      },
    	// 获取品牌列表
    	getWareBrandList () {
    		let brandList = [
    			{brandId: 100001, brandName: '商品品牌1'},
    			{brandId: 100002, brandName: '商品品牌2'},
    			{brandId: 100003, brandName: '商品品牌3'},
    			{brandId: 100004, brandName: '商品品牌4'}
    		]
    		readBrandList()
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
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      srcCityChange (code) {
      	this.wareForm.srcCityCode = code
      },
      dstCityChange (code) {
      	this.wareForm.dstCityCode = code
      },
      submitForm() {
        this.$refs.wareForm.validate((valid) => {
        	let form = Object.assign({}, this.wareForm)
          console.log(form)
          if (valid) {
          	let data = Object.assign({}, this.wareForm)
            console.log(data)
            data.openDate = this.$moment(data.openDate).format('YYYY-MM-DD HH:mm:ss')
            data.closeDate = this.$moment(data.closeDate).format('YYYY-MM-DD HH:mm:ss')
            data.nocashReserveMinute = data.nocashReserveMinute * 60
            saveWareInfo(JSON.stringify(data))
            .then(res => {
            	console.log(res)
            	if (res.data.code === '0001') {
                let wareId = res.data.result.wareId;
                console.log(wareId)
                this.$router.push({
                  path: 'tourItinerary?wareId=' + wareId
                })
            	} else {
            		this.$message.error(res.data.message)
            	}
            })
            .catch(err => {
            	console.log(err)
              this.catchError(err.response)
            })
          } else {
          	this.$message.error('表单输入有误')
            return false;
          }
        })
      },
    },
    mounted () {
    	this.getWareBrandList()
    	this.$store.dispatch('setStepActive', 1)
      let wareId = this.$route.query.id;
      wareId && this.getWareDetail(wareId)
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
