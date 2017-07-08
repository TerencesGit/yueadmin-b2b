<template>
	<section>
    <!-- 工具栏 -->
    <el-row class="toolbar">
      <el-button type="primary" @click="handleBatch">批量新增</el-button>
      <el-button type="primary" v-if="skuList.length > 0" @click="handleBatch">批量修改</el-button>
      <back-button></back-button>
    </el-row>
    <!-- sku列表 -->
		<full-calendar 
      :events="skuList" 
      first-day='0' 
      @changeMonth="changeMonth" 
      @dayClick="dayClick">
    </full-calendar>
     <!-- 批量库存设置 -->
    <el-dialog title="库存价格设置（价格单位：元）" :visible.sync="batchSkuVisible">
      <el-form :model="batchSkuForm" ref="batchSkuForm" :rules="rules" label-width="180px" class="input-width-control">
        <el-form-item label="起止日期：" prop="skuDateRange">
          <el-date-picker
            v-model="batchSkuForm.skuDateRange"
            type="daterange"
            placeholder="选择日期范围"
            :picker-options="pickerOptions"
            @change="dateChange">
          </el-date-picker>
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
          <el-button @click="batchSkuVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 库存设置 -->
    <el-dialog title="库存设置" :visible.sync="singleSkuVisible">
      <el-form :model="singleSkuForm" label-width="220px" :rule="rules">
        <el-form-item label="起止日期：">
          <span>{{ singleSkuForm.date }}</span> 
        </el-form-item>
        <!-- <el-form-item label="当前库存：">
        <span>{{ singleSkuForm.stock }}</span>
        </el-form-item> -->
        <el-form-item label="操作类型：" prop="type">
          <el-radio-group v-model="singleSkuForm.type">
            <el-radio class="radio" :label="0">出库</el-radio>
            <el-radio class="radio" :label="1">入库</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="出库/入库数量：" prop="stockNum">
          <el-input v-model.number="singleSkuForm.stockNum" placeholder="输入数量" class="select-width"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">提交</el-button>
          <el-button @click="singleSkuVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
	</section>
</template>
<script>
  import { readSkuInfoList, saveSkuInfo } from '@/api'
  export default {
  	data () {
  		return {
        wareId: '',
  			skuList: [],
        singleSkuVisible: false,
        batchSkuVisible: false,
        singleSkuForm: {
          wareId: '',
          date: '2017-07-04 - 2017-08-04',
          stock: 100,
          type: '',
          stockNum: ''
        },
        batchSkuForm: {
          wareId: '',
          skuIdList: [],
          stockId: '',
          startDate: '',
          endDate: '',
          skuDate: '',
          storageNum: 100,
          adultPrice: 8000,
          childPrice: 7000,
          singlePrice: 5000,
          checkedWeeks: [],
          skuDateRange: []
        },
        rules: {
          type: [
            {required: true, message: '操作类型不能为空'}
          ],
          stockNum: [
            { required: true, message: '数量不能为空'},
            { type: 'number', message: '数量必须为数字值'}
          ],
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
          skuDateRange: [
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
  		}
  	},
  	methods: {
      // 库存列表
      getStockList () {
        readSkuInfoList({wareId: this.wareId}).then(res => {
          console.log(res)
          // this.skuList = res.data.result
        }).catch(err => {
          console.log(err)
        })
      },
      dateChange (val) {
        this.batchSkuForm.skuDateRange = val.split(' - ')
      },
  		changeMonth (start, end, current) {
	      // console.log(current.format())
	    },
      // 批量设置库存
      handleBatch () {
        this.batchSkuVisible = true
      },
      // 单条设置库存
	    dayClick (day, event) {
        console.log(day, event)
        if (event) {
          this.singleSkuVisible = true
        }
        this.singleSkuVisible = true
        // this.singleSkuForm.stock = event && event.stock || 0
	    },
      onSubmit () {
        console.log(this.singleSkuForm)
        if(this.singleSkuForm.type === 1) {
          console.log('入库操作')
        } else {
          console.log('出库操作')
        }
        this.singleSkuVisible = false
      }
  	},
  	mounted () {
      this.wareId = this.$route.query.subWareId;
      this.wareId && this.getStockList()
		}
  }
</script>
<style scoped>
  .input-width-control .el-input {
    width: 220px;
  }
</style>