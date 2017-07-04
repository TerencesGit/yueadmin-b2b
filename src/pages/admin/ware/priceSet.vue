<template>
	<section>
    <el-row class="toolbar">
      <el-button type="primary" @click="handleBatch">批量设置</el-button>
      <back-button></back-button>
    </el-row>
		<full-calendar 
      :events="skuData" 
      first-day='0' 
      @changeMonth="changeMonth" 
      @dayClick="dayClick"
      @eventClick="dayClick">
    </full-calendar>
    <!-- 批量sku设置 -->
    <el-dialog :visible.sync="batchPriceFormVisible" title="批量设置五级价格">
      <el-form :model="batchPriceForm" ref="batchPriceForm" :rules="rules" label-width="180px" class="input-width-control">
        <el-form-item label="起止日期：" prop="skuDateRange">
          <el-date-picker
            v-model="batchPriceForm.skuDateRange"
            type="daterange"
            placeholder="选择日期范围"
            :picker-options="pickerOptions"
            @change="dateChange">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="一级价格：" prop="price1">
          <el-input v-model.number="batchPriceForm.price1" placeholder="输入一级价格"></el-input>
        </el-form-item>
        <el-form-item label="二级价格：" prop="price2">
          <el-input v-model.number="batchPriceForm.price2" placeholder="输入二级价格"></el-input>
        </el-form-item>
        <el-form-item label="三级价格：" prop="price3">
          <el-input v-model.number="batchPriceForm.price3" placeholder="输入三级价格"></el-input>
        </el-form-item>
        <el-form-item label="四级价格：" prop="price4">
          <el-input v-model.number="batchPriceForm.price4" placeholder="输入四级价格"></el-input>
        </el-form-item>
        <el-form-item label="五级价格：" prop="price5">
          <el-input v-model.number="batchPriceForm.price5" placeholder="输入五级价格"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="batchSubmit">提交</el-button>
          <el-button @click="batchPriceFormVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
     <!-- 单条价格设置 -->
    <el-dialog :visible.sync="singlePriceFormVisible" title="设置五级价格">
      <el-form :model="singlePriceForm" ref="singlePriceForm" :rules="rules" label-width="240px" class="sku-form">
        <el-form-item label="日期：">
          <span>{{singlePriceForm.skuDate}}</span>
        </el-form-item>
        <el-form-item label="一级价格：" prop="price1">
          <el-input v-model.number="singlePriceForm.price1" placeholder="输入一级价格"></el-input>
        </el-form-item>
        <el-form-item label="二级价格：" prop="price2">
          <el-input v-model.number="singlePriceForm.price2" placeholder="输入二级价格"></el-input>
        </el-form-item>
        <el-form-item label="三级价格：" prop="price3">
          <el-input v-model.number="singlePriceForm.price3" placeholder="输入三级价格"></el-input>
        </el-form-item>
        <el-form-item label="四级价格：" prop="price4">
          <el-input v-model.number="singlePriceForm.price4" placeholder="输入四级价格"></el-input>
        </el-form-item>
        <el-form-item label="五级价格：" prop="price5">
          <el-input v-model.number="singlePriceForm.price5" placeholder="输入五级价格"></el-input>
        </el-form-item>
        <el-form-item label="" class="text-right">
          <el-button type="primary" @click="singlePriceSubmit">确定</el-button>
          <el-button @click="singlePriceFormVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
	</section>
</template>
<script>
  import { saveSkuPrice, readSkuInfoList } from '@/api'
  export default {
  	data () {
  		return {
        wareId: '',
  			skuData : [],
        batchPriceFormVisible: false,
        singlePriceFormVisible: false,
        batchPriceForm: {
          startDate: '',
          endDate: '',
          skuDate: '',
          skuDateRange: [],
          price1: '',
          price2: '',
          price3: '',
          price4: '',
          price5: '',
        },
        singlePriceForm: {
          skuId: '',
          skuDate: '',
          price1: '',
          price2: '',
          price3: '',
          price4: '',
          price5: '',
        },
        rules: {
          skuDateRange: [
            { type: 'array', required: true, message: '请选择时间范围', trigger: 'blur'},
          ],
          price1: [
            { type: 'number', required: true, message: '请输入一级价格', trigger: 'blur'},
          ],
          price2: [
            { type: 'number', required: true, message: '请输入二级价格', trigger: 'blur'},
          ],
          price3: [
            { type: 'number', required: true, message: '请输入三级价格', trigger: 'blur'},
          ],
          price4: [
            { type: 'number', required: true, message: '请输入四级价格', trigger: 'blur'},
          ],
          price5: [
            { type: 'number', required: true, message: '请输入五级价格', trigger: 'blur'},
          ],
        },
        pickerOptions: {
          shortcuts: [{
            text: '未来一周',
            onClick(picker) {
              const end = new Date(); 
              const start = new Date();
              end.setTime(start.getTime() + 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '未来一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              end.setTime(start.getTime() + 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '未来三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              end.setTime(start.getTime() + 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
  		}
  	},
  	methods: {
      // 获取sku列表
      getSkuList () {
        readSkuInfoList({wareId: this.wareId}).then(res => {
          console.log(res)
          if(res.data.code === '0001') {
            this.skuData = res.data.result.skuList;
            this.skuData.forEach((data) => {
              data.start = data.skuDate
            })
          } else {
            this.$message.error(res.data.message)
          }
        }).catch(err => {
          console.log(err)
          this.catchError(err.response)
        })
      },
      dateChange (val) {
        this.batchPriceForm.skuDateRange = val.split(' - ')
      },
      // 选择每周几
      handleCheckedChange(value) {
        let weeks = [0, 0, 0, 0, 0, 0, 0];
        value.forEach((v, i) => {
            weeks[v] = 1
        })
        let weekStr = weeks.join('')
        weekStr = weekStr === '0000000' ? '1111111' : weekStr
        console.log(weekStr)
      },
  		changeMonth (start, end, current) {
	      // console.log(current.format())
	    },
      // 选择日期
	    dayClick (day, event) {
        day = this.$moment(day).format('YYYY-MM-DD')
	      console.log(day, event)
        if(event){
          let data = Object.assign({}, event)
          console.log(data)
          this.singlePriceForm = data
          this.singlePriceForm.skuDate = data.start;
          this.singlePriceFormVisible = true
        }
	    },
      // 批量价格设置
      handleBatch () {
        this.batchPriceForm = {
          startDate: '',
          endDate: '',
          skuDate: '',
          skuDateRange: [],
          price1: '',
          price2: '',
          price3: '',
          price4: '',
          price5: '',
        }
        this.batchPriceFormVisible = true
      },
      // 批量提交
      batchSubmit () {
        this.$refs.batchPriceForm.validate((valid) => {
          if (valid) {
            this.batchPriceForm.startDate = this.batchPriceForm.skuDateRange[0]
            this.batchPriceForm.endDate = this.batchPriceForm.skuDateRange[1]
            let data = Object.assign({}, this.batchPriceForm)
            console.log(data)
            data.wareId = this.wareId;
            saveSkuPrice(JSON.stringify(data)).then(res => {
              console.log(res)
              if (res.data.code === '0001') {
                this.$message.success(res.data.message)
              } else {
                this.$message.error(res.data.message)
              }
            }).catch(err => {
              console.log(err)
            })
            this.batchPriceFormVisible = false;
          } else {
            console.log('err submit')
          }
        })
      },
      // 单条提交
      singlePriceSubmit () {
        this.$refs.singlePriceForm.validate((valid) => {
          if (valid) {
            let data = Object.assign({}, this.singlePriceForm)
            console.log(data)
            saveSkuPrice(JSON.stringify(data)).then(res => {
              console.log(res)
              if(res.data.code === '0001') {
                console.log(res.data.result)
                tihs.$message.success(res.data.message)
                this.singlePriceFormVisible = false
              } else {
                this.$message.error(res.data.message)
              }
            }).catch(err => {
              console.log(err)
            })
          } else {
            console.log(this.singlePriceForm)
          }
        })
      },
  	},
  	mounted () {
			this.$store.dispatch('setStepActive', 4)
      this.wareId = parseInt(this.$route.query.wareId)
      let demoEvents = [
        {
          start: '2017-06-06',
          adultPrice: '18000.00',
          childPrice: '12000.00',
          storageNum: '100',
          singlePrice: 5000,
          skuId: 10001,
          price1: 10000,
          price2: 20000,
          price3: 30000,
          price4: 40000,
          price5: 50000,
        },
        {
          start: '2017-06-07',
          adultPrice: '18000.00',
          // childPrice: '12000.00',
          storageNum: '100',
          price1: 10000
        },
        {
          start: '2017-06-28',
          adultPrice: '18000.00',
          childPrice: '12000.00',
          storageNum: '0',
          price1: 0
        },
        {
          start: '2017-06-09',
          adultPrice: '18000.00',
          childPrice: '12000.00',
          storageNum: '100'
        },
        {
          start: '2017-06-10',
          adultPrice: '18000.00',
          childPrice: '12000.00',
          storageNum: '100'
        },
        {
          start: '2017-05-30',
          adultPrice: '18000.00',
          childPrice: '12000.00',
          storageNum: '100'
        },
      ]
      this.skuData = demoEvents
      this.wareId && this.getSkuList()
		}
  }
</script>
<style scoped>
  .sku-form .el-input {
    width: 200px;
  }
</style>