<template>
	<section>
    <!-- 工具栏 -->
    <el-row class="toolbar">
      <el-button type="primary" @click="handleBatch">批量设置</el-button>
      <back-button></back-button>
    </el-row>
    <!-- 价格列表 -->
		<full-calendar 
      :events="skuList" 
      first-day='0' 
      @changeMonth="changeMonth" 
      @dayClick="dayClick"
      @eventClick="dayClick">
    </full-calendar>
    <!-- 批量价格设置 -->
    <el-dialog :visible.sync="batchFormVisible" title="批量价格设置">
      <el-form :model="batchPriceForm" label-width="240px" class="sku-form">
        <el-form-item label="起止日期：" prop="skuDateRange">
          <el-date-picker
            v-model="batchPriceForm.skuDateRange"
            type="daterange"
            placeholder="选择日期范围"
            :picker-options="pickerOptions"
            @change="dateChange">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="成人价1：" prop="price1">
          <el-input v-model.number="batchPriceForm.price1" placeholder="输入成人价1"></el-input>
        </el-form-item>
        <el-form-item label="成人价2：" prop="price2">
          <el-input v-model.number="batchPriceForm.price2" placeholder="输入成人价2"></el-input>
        </el-form-item>
        <el-form-item label="成人价3：" prop="price3">
          <el-input v-model.number="batchPriceForm.price3" placeholder="输入成人价3"></el-input>
        </el-form-item>
        <el-form-item label="成人价4：" prop="price4">
          <el-input v-model.number="batchPriceForm.price4" placeholder="输入成人价4"></el-input>
        </el-form-item>
        <el-form-item label="成人价5：" prop="price5">
          <el-input v-model.number="batchPriceForm.price5" placeholder="输入成人价5"></el-input>
        </el-form-item>
        <el-form-item label="儿童价：" prop="priceChild">
          <el-input v-model.number="batchPriceForm.priceChild" placeholder="输入儿童价"></el-input>
        </el-form-item>
        <el-form-item label="单人差：" prop="priceSingle">
          <el-input v-model.number="batchPriceForm.priceSingle" placeholder="输入单人差"></el-input>
        </el-form-item>
        <el-form-item label="" class="m-t-lg">
          <el-button type="primary" @click="batchSubmit">确定</el-button>
          <el-button @click="batchFormVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 单条价格设置 -->
    <el-dialog :visible.sync="singleFormVisible" :title="'设置价格'+singlePriceForm.skuDate">
      <el-form :model="singlePriceForm" label-width="240px" class="sku-form">
        <!-- <el-form-item label="日期：">
          <span>{{singlePriceForm.skuDate}}</span>
        </el-form-item> -->
        <el-form-item label="成人价1：" prop="price1">
          <el-input v-model.number="singlePriceForm.price1" placeholder="输入成人价1"></el-input>
        </el-form-item>
        <el-form-item label="成人价2：" prop="price2">
          <el-input v-model.number="singlePriceForm.price2" placeholder="输入成人价2"></el-input>
        </el-form-item>
        <el-form-item label="成人价3：" prop="price3">
          <el-input v-model.number="singlePriceForm.price3" placeholder="输入成人价3"></el-input>
        </el-form-item>
        <el-form-item label="成人价4：" prop="price4">
          <el-input v-model.number="singlePriceForm.price4" placeholder="输入成人价4"></el-input>
        </el-form-item>
        <el-form-item label="成人价5：" prop="price5">
          <el-input v-model.number="singlePriceForm.price5" placeholder="输入成人价5"></el-input>
        </el-form-item>
        <el-form-item label="儿童价：" prop="priceChild">
          <el-input v-model.number="singlePriceForm.priceChild" placeholder="输入儿童价"></el-input>
        </el-form-item>
        <el-form-item label="单人差：" prop="priceSingle">
          <el-input v-model.number="singlePriceForm.priceSingle" placeholder="输入单人差"></el-input>
        </el-form-item>
        <el-form-item label="" class="m-t-lg">
          <el-button type="primary" @click="singleSubmit">确定</el-button>
          <el-button @click="singleFormVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
	</section>
</template>
<script>
  import { saveSkuPrice, readWareSkuInfo } from '@/api'
  export default {
  	data () {
  		return {
        wareId: '',
  			skuList : [],
        batchFormVisible: false,
        singleFormVisible: false,
        batchPriceForm: {
          startDate: '',
          endDate: '',
          skuDateRange: [],
          price1: '',
          price2: '',
          price3: '',
          price4: '',
          price5: '',
          priceChild: '',
          priceSingle: ''
        },
        singlePriceForm: {},
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
            { type: 'number', required: true, message: '请输入价格', trigger: 'blur'},
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
        let params = {
          wareId: this.wareId,
          busType: 2
        }
        readWareSkuInfo(params).then(res => {
          console.log(res)
          if(res.data.code === '0001') {
            this.skuList = res.data.result.skuList;
            this.skuList.forEach((data) => {
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
      // 单条价格设置
	    dayClick (day, event) {
        day = this.$moment(day).format('YYYY-MM-DD')
	      console.log(day, event)
        if(event){
          this.singlePriceForm = {
            skuId: event.skuId || 1,
            skuDate: event.start,
            price1: event.price1 || '',
            price2: event.price2 || '',
            price3: event.price3 || '',
            price4: event.price4 || '',
            price5: event.price5 || '',
            priceChild: event.priceChild || '',
            priceSingle: event.priceSingle || '',
          }
          console.log(Object.assign({}, this.singlePriceForm))
          this.singleFormVisible = true
        }
	    },
      // 批量价格设置
      handleBatch () {
        this.batchPriceForm = {
          startDate: '',
          endDate: '',
          skuDateRange: [],
          price1: '',
          price2: '',
          price3: '',
          price4: '',
          price5: '',
          priceChild: '',
          priceSingle: ''
        }
        this.batchFormVisible = true
      },
      // 表单验证
      validateForm (form) {
        form = Object.assign({}, form)
        for (let i in form) {
          if (!form[i]) {
            return false;
          }
        }
        return true
      },
      // 批量提交
      batchSubmit () {
        let dateRange = this.batchPriceForm.skuDateRange
        this.batchPriceForm.startDate = dateRange[0]
        this.batchPriceForm.endDate = dateRange[1]
        let data = Object.assign({}, this.batchPriceForm)
        console.log(data)
        if (!this.validateForm(data)){
          this.$notify.warning({
            title: '提示',
            message: '请将表单输入完整',
          })
        } else {
          data.wareId = this.wareId;
          data.skuDate = '';
          saveSkuPrice(JSON.stringify(data)).then(res => {
            console.log(res)
            if(res.data.code === '0001') {
              this.$message.success(res.data.message)
              // this.skuList = res.data.result.priceList; 
              this.singleFormVisible = false
            } else {
              this.$message.error(res.data.message)
            }
          }).catch(err => {
            console.log(err)
          })
        }
      },
      // 单条提交
      singleSubmit () {
        if (!this.validateForm(this.singlePriceForm)) {
          this.$notify.warning({
            title: '提示',
            message: '请将表单输入完整',
          })
        } else {
          let data = Object.assign({}, this.singlePriceForm)
          data.wareId = this.wareId;
          data.startDate = '';
          data.endDate = '';
          console.log(data)
          saveSkuPrice(JSON.stringify(data)).then(res => {
            console.log(res)
            if(res.data.code === '0001') {
              this.$message.success(res.data.message)
              this.skuList = res.data.result.priceList;
              this.skuList.forEach((data) => {
                data.start = data.skuDate
              })
              this.singleFormVisible = false
            } else {
              this.$message.error(res.data.message)
            }
          }).catch(err => {
            console.log(err)
          })
        }
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
          adultPrice: 18000.00,
          childPrice: 12000.00,
          singlePrice: 3000,
          storageNum: 0,
          // price1: 6000,
          // price2: 6000,
          // price3: 6000,
          // price4: 6000,
          // price5: 6000,
          // priceChild: 6000,
          // priceSingle: 0,
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
      this.skuList = demoEvents
      this.wareId && this.getSkuList()
		}
  }
</script>
<style scoped>
  .sku-form .el-input {
    width: 200px;
  }
  .sku-form .el-form-item {
    margin-bottom: 5px;
  }
</style>