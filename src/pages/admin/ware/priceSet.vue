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
    <el-dialog :visible.sync="singleFormVisible" title="设置价格">
      <el-form :model="singlePriceForm" label-width="240px" class="sku-form">
        <el-form-item label="当前日期：">
          <span style="font-size: 16px">{{singlePriceForm.skuDate}}</span>
        </el-form-item>
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
  import { saveSkuPrice, readSkuInfoList } from '@/api'
  export default {
  	data () {
  		return {
        wareId: '',
  			skuList : [],
        batchFormVisible: false,
        singleFormVisible: false,
        batchPriceForm: {
          price1: '',
          price2: '',
          price3: '',
          price4: '',
          price5: '',
          priceChild: '',
          priceSingle: '',
          skuDateRange: [],
        },
        singlePriceForm: {
          price1: '',
          price2: '',
          price3: '',
          price4: '',
          price5: '',
          priceChild: '',
          priceSingle: '',
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
          type: 2
        }
        readSkuInfoList(params).then(res => {
          console.log(res)
          if(res.data.code === '0001') {
            this.skuList = res.data.result.skuList || [];
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
        this.batchPriceForm.skuDateRange = val ? val.split(' - ') : []
      },
  		changeMonth (start, end, current) {
	      // console.log(current.format())
	    },
      // 批量价格设置
      handleBatch () {
        this.batchPriceForm = {
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
        let data = {
          startDate:  this.batchPriceForm.skuDateRange[0],
          endDate:  this.batchPriceForm.skuDateRange[1],
          price1: this.batchPriceForm.price1,
          price2: this.batchPriceForm.price2,
          price3: this.batchPriceForm.price3,
          price4: this.batchPriceForm.price4,
          price5: this.batchPriceForm.price5,
          priceChild: this.batchPriceForm.priceChild,
          priceSingle: this.batchPriceForm.priceSingle,
        }
        console.log(data)
        if (!this.validateForm(data)){
          this.$notify.warning({
            title: '提示',
            message: '请将表单输入完整',
          })
        } else {
          data.wareId = this.wareId;
          console.log(data)
          saveSkuPrice(data).then(res => {
            console.log(res)
            if(res.data.code === '0001') {
              this.$message.success(res.data.message)
              this.getSkuList()
            } else {
              this.$message.error(res.data.message)
            }
          }).catch(err => {
            console.log(err)
          })
          this.batchFormVisible = false
        }
      },
      // 单条价格设置
      dayClick (day, event) {
        if(event){
          console.log(event)
          this.singlePriceForm = Object.assign({}, event)
          this.singleFormVisible = true
        }
      },
      // 单条提交
      singleSubmit () {
        let data = {
          skuId: this.singlePriceForm.skuId,
          skuDate: this.singlePriceForm.skuDate,
          price1: this.singlePriceForm.price1,
          price2: this.singlePriceForm.price2,
          price3: this.singlePriceForm.price3,
          price4: this.singlePriceForm.price4,
          price5: this.singlePriceForm.price5,
          priceChild: this.singlePriceForm.priceChild,
          priceSingle: this.singlePriceForm.priceSingle,
        }
        if (!this.validateForm(data)) {
          this.$notify.warning({
            title: '提示',
            message: '请将表单输入完整',
          })
        } else {
          data.wareId = this.wareId;
          // console.log(data)
          saveSkuPrice(data).then(res => {
            console.log(res)
            if(res.data.code === '0001') {
              this.$message.success(res.data.message)
              this.getSkuList()
            } else {
              this.$message.error(res.data.message)
            }
          }).catch(err => {
            console.log(err)
          })
          this.singleFormVisible = false
        }
      },
  	},
  	mounted () {
			this.$store.dispatch('setStepActive', 4)
      this.wareId = parseInt(this.$route.query.wareId)
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