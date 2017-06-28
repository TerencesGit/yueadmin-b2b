<template>
	<section>
    <el-row class="toolbar">
      <el-button type="primary" @click="batchSkuFormVisible = true">批量设置</el-button>
    </el-row>
		<full-calendar :events="skuData" first-day='0' 
      @changeMonth="changeMonth" 
      @dayClick="dayClick"
      @eventClick="dayClick">
    </full-calendar>
    <!-- 批量sku设置 -->
    <el-dialog title="库存价格设置（价格单位：元）" v-model="batchSkuFormVisible">
      <el-form :model="batchSkuForm" ref="batchSkuForm" :rules="rules" label-width="180px" class="input-width-control">
        <el-form-item label="起止日期：" prop="skuDate">
          <el-date-picker
            v-model="batchSkuForm.skuDate"
            type="daterange"
            placeholder="选择日期范围"
            :picker-options="pickerOptions"
            @change="dateChange">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="" label-width="80px" prop="checkedWeeks">
          <el-checkbox-group v-model="batchSkuForm.checkedWeeks" @change="handleCheckedChange" style="display: inline-block">
            <el-checkbox v-for="(item, index) in weeks" :label="index" :key="index" checked>{{item}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="库存：" prop="storageNum">
          <el-input v-model.number="batchSkuForm.storageNum" placeholder="输入库存数量"></el-input>
        </el-form-item>
        <el-form-item label="成人价：" prop="adultPrice">
          <el-input v-model.number="batchSkuForm.adultPrice" placeholder="输入成人价"></el-input>
        </el-form-item>
        <el-form-item label="儿童价：" prop="childPrice">
          <el-input v-model.number="batchSkuForm.childPrice" placeholder="输入儿童价"></el-input>
        </el-form-item>
        <el-form-item label="单人补差价：" prop="singlePrice">
          <el-input v-model.number="batchSkuForm.singlePrice" placeholder="输入单人补差价"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">提交</el-button>
          <el-button @click="batchSkuFormVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 单条sku设置 -->
    <el-dialog title="库存价格设置（价格单位：元）" v-model="singleSkuFormVisible">
      <el-form :model="singleSkuForm" ref="singleSkuForm" :rules="rules" label-width="180px" class="input-width-control">
        <el-form-item label="日期：">
          <span v-text="singleSkuForm.skuDate"></span>
        </el-form-item>
        <el-form-item label="库存：" prop="storageNum">
          <el-input v-model.number="singleSkuForm.storageNum" placeholder="输入库存数量"></el-input>
        </el-form-item>
        <el-form-item label="成人价：" prop="adultPrice">
          <el-input v-model.number="singleSkuForm.adultPrice" placeholder="输入成人价"></el-input>
        </el-form-item>
        <el-form-item label="儿童价：" prop="childPrice">
          <el-input v-model.number="singleSkuForm.childPrice" placeholder="输入儿童价"></el-input>
        </el-form-item>
        <el-form-item label="单人补差价：" prop="singlePrice">
          <el-input v-model.number="singleSkuForm.singlePrice" placeholder="输入单人补差价"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">提交</el-button>
          <el-button @click="singleSkuFormVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
	</section>
</template>
<script>
  import { saveSkuInfo } from '@/api'
  const weekOptions = ['每周日', '每周一', '每周二', '每周三', '每周四', '每周五', '每周六'];
  export default {
  	data () {
  		return {
  			skuData : [],
        batchSkuFormVisible: false,
        singleSkuFormVisible: false,
        batchSkuForm: {
          wareId: '',
          skuId: '',
          stockId: '',
          startDate: '',
          endDate: '',
          skuDate: '',
          storageNum: 100,
          adultPrice: 8000,
          childPrice: 7000,
          singlePrice: 5000,
          skuDate: [],
          checkedWeeks: []
        },
        singleSkuForm: {
          wareId: '',
          skuDate: '',
          storageNum: 100,
          adultPrice: 8000,
          childPrice: 7000,
          singlePrice: 5000,
        },
        rules: {
          type: [
            {required: true, message: '操作类型不能为空', trigger: 'blur'}
          ],
          adultPrice: [
            { type: 'number', required: true, message: '成人价不能为空', trigger: 'blur'},
          ],
          childPrice: [
            { type: 'number', required: true, message: '儿童价不能为空', trigger: 'blur'},
          ],
          storageNum: [
            { type: 'number', required: true, message: '库存数量不能为空', trigger: 'blur'},
          ],
          skuDate: [
            { type: 'array', required: true, message: '日期不能为空', trigger: 'change'},
          ],
          singlePrice: [
            { type: 'number', required: true, message: '单人补差价不能为空', trigger: 'change'},
          ],
          checkedWeeks: [
            { type: 'array', required: true, message: '至少勾选一项', trigger: 'change'},
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
        checkAll: true,
        weeks: weekOptions,
        isIndeterminate: false
  		}
  	},
  	methods: {
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
	      console.log('changeMonth', start.format(), end.format(), current.format())
	    },
	    dayClick (day, event) {
        day = this.$moment(day).format('YYYY-MM-DD')
	      console.log(day, event)
        if(event){
          console.log(Object.assign({}, event))
          let data = Object.assign({}, event)
          this.singleSkuForm = data
        } else {
          this.singleSkuForm = {}
        }
        this.singleSkuForm.skuDate = day
        this.singleSkuFormVisible = true
	    },
      dateChange (val) {
        this.batchSkuForm.skuDate = val.split(' - ')
      },
      onSubmit () {
        this.$refs.batchSkuForm.validate((valid) => {
          if (valid) {
            this.batchSkuForm.startDate = this.batchSkuForm.skuDate[0]
            this.batchSkuForm.endDate = this.batchSkuForm.skuDate[1]
            this.batchSkuForm.skuDate = ''
            let data = Object.assign({}, this.batchSkuForm)
            console.log(data)
            saveSkuInfo(JSON.stringify(data)).then(res => {
              console.log(res)
              if (res.data.code === '0001') {
                this.$message.success(res.data.message)
              } else {
                this.$message.error(res.data.message)
              }
            }).catch(err => {
              console.log(err)
            })
            this.batchSkuFormVisible = false;
            this.$refs.batchSkuForm.resetFields()
          } else {
            console.log('err submit')
          }
        })
      },
  	},
  	mounted () {
			this.$store.dispatch('setStepActive', 5)
      this.batchSkuForm.wareId = this.$route.query.id * 1
      let demoEvents = [
        {
          start: '2017-06-06',
          adultPrice: '18000.00',
          childPrice: '12000.00',
          storageNum: '100',
          singlePrice: 5000,
          skuId: 10001
        },
        {
          start: '2017-06-07',
          adultPrice: '18000.00',
          // childPrice: '12000.00',
          storageNum: '100'
        },
        {
          start: '2017-06-08',
          adultPrice: '18000.00',
          childPrice: '12000.00',
          storageNum: '100'
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
		}
  }
</script>
<style scoped>
  .sku-form .el-input {
    width: 180px;
  }
</style>