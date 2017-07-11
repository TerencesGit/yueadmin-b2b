<template>
	<section>
    <!-- 工具栏 -->
    <el-row class="toolbar">
      <el-button type="primary" @click="handleBatchInit">库存初始化</el-button>
      <el-button type="primary" @click="handleBatchSet">批量操作</el-button>
      <back-button></back-button>
    </el-row>
    <!-- 库存列表 -->
		<full-calendar 
      :events="skuList" 
      first-day='0' 
      @changeMonth="changeMonth" 
      @dayClick="dayClick"
      @eventClick="dayClick">
    </full-calendar>
    <!-- 批量库存初始化 -->
    <el-dialog title="库存初始化" :visible.sync="batchInitVisible">
      <el-form :model="batchForm" ref="batchForm" :rules="rules" label-width="180px" class="input-width-control">
        <el-form-item label="起止日期：" prop="skuDateRange">
          <el-date-picker
            v-model="batchForm.skuDateRange"
            type="daterange"
            placeholder="选择日期范围"
            :picker-options="pickerOptions"
            @change="dateChange">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="库存数量：">
          <el-input-number v-model="batchForm.skuNum" :min="1" :step="50" style="width: 220px"></el-input-number>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button type="primary" @click="batchInitSubmit">确定</el-button>
        <el-button @click="batchInitVisible = false">取消</el-button>
      </div>
    </el-dialog>
    <!-- 批量库存设置 -->
    <el-dialog title="库存设置" :visible.sync="batchSetVisible">
      <el-form :model="batchForm" ref="batchForm" :rules="rules" label-width="180px" class="input-width-control">
        <el-form-item label="起止日期：" prop="skuDateRange">
          <el-date-picker
            v-model="batchForm.skuDateRange"
            type="daterange"
            placeholder="选择日期范围"
            :picker-options="pickerOptions"
            @change="dateChange">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="出/入库数量：">
          <el-input-number v-model="batchForm.skuNum" :min="1" :step="10" style="width: 220px"></el-input-number>
        </el-form-item>
        <el-form-item label="操作类型：" prop="type">
          <el-radio-group v-model="batchForm.skuType">
            <el-radio class="radio" :label="1">入库</el-radio>
            <el-radio class="radio" :label="2">出库</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button type="primary" @click="batchSetSubmit">确定</el-button>
        <el-button @click="batchSetVisible = false">取消</el-button>
      </div>
    </el-dialog>
    <!-- 单条库存设置 -->
    <el-dialog title="库存设置" :visible.sync="singleSetVisible">
      <el-form :model="singleForm" label-width="220px" :rule="rules">
        <el-form-item label="日期：">
          <span style="font-size: 16px">{{ singleForm.skuDate }}</span> 
        </el-form-item>
        <el-form-item label="当前库存：">
            <span>{{ singleForm.storageNum }}</span>
        </el-form-item>
        <el-form-item label="出/入库数量：" prop="stockNum">
          <el-input-number v-model="singleForm.skuNum" :min="1" :step="10" style="width: 140px"></el-input-number>
        </el-form-item>
        <el-form-item label="操作类型：" prop="type">
          <el-radio-group v-model="singleForm.skuType">
            <el-radio class="radio" :label="1">入库</el-radio>
            <el-radio class="radio" :label="2">出库</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button type="primary" @click="singleSetSubmit">确定</el-button>
        <el-button @click="singleSetVisible = false">取消</el-button>
      </div>
    </el-dialog>
	</section>
</template>
<script>
  import { readSkuInfoList, outOrInStock, outOrInStockList } from '@/api'
  export default {
  	data () {
  		return {
        wareId: '',
        skuList: [],
        batchInitVisible: false,
        batchSetVisible: false,
        singleSetVisible: false,
        singleForm: {
          skuId: '',
          skuDate: '',
          storageNum: '',
          skuNum: 100,
          skuType: 1,
        },
        batchForm: {
          skuNum: 100,
          skuType: 1,
          skuDateRange: []
        },
        rules: {
          skuNum: [
            { type: 'number', required: true, message: '库存数量不能为空', trigger: 'blur'},
          ],
          skuDateRange: [
            { type: 'array', required: true, message: '日期不能为空', trigger: 'change'},
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
          if (res.data.code === '0001') {
            this.skuList = res.data.result.skuList || [];
            this.skuList.forEach((data) => {
              data.start = data.skuDate
            })
          } else {
            this.$message.success(res.data.message)
          }
        }).catch(err => {
          console.log(err)
        })
      },
      dateChange (val) {
        this.batchForm.skuDateRange = val ? val.split(' - ') : []
      },
  		changeMonth (start, end, current) {
	      // console.log(current.format())
	    },
      // 库存初始化
      handleBatchInit () {
        this.batchForm.skuNum = 100;
        this.batchForm.skuDateRange = [];
        this.batchInitVisible = true
      },
      // 库存批量设置
      handleBatchSet () {
        this.batchForm.skuNum = 100;
        this.batchForm.skuDateRange = [];
        this.batchSetVisible = true
      },
      // 库存单条设置
	    dayClick (day, event) {
        if (event) {
          this.singleForm = Object.assign(this.singleForm, event)
          this.singleForm.skuNum = 100;
          this.singleSetVisible = true
        }
	    },
      // 库存初始化提交
      batchInitSubmit () {
        this.$refs.batchForm.validate((valid) => {
          if (valid) {
            let data = {
              wareId: this.wareId,
              startDate: this.batchForm.skuDateRange[0],
              endDate: this.batchForm.skuDateRange[1],
              skuNum: this.batchForm.skuNum,
              skuType: this.batchForm.skuType,
            }
            console.log(data)
            outOrInStockList(data).then(res => {
              console.log(res)
              if (res.data.code === '0001') {
                this.$message.success(res.data.message)
                this.getStockList()
              } else {
                this.$message.error(res.data.message)
              }
              this.batchSetVisible = false
            }).catch(err => {
              console.log(err)
              this.catchError(err.response)
            })
          } else {
            console.log('err submit')
          }
        })
      },
      // 库存批量操作提交
      batchSetSubmit () {
        this.$refs.batchForm.validate((valid) => {
          if (valid) {
            let data = {
              wareId: this.wareId,
              startDate: this.batchForm.skuDateRange[0],
              endDate: this.batchForm.skuDateRange[1],
              skuNum: this.batchForm.skuNum,
              skuType: this.batchForm.skuType,
            }
            console.log(data)
            outOrInStockList(data).then(res => {
              console.log(res)
              if (res.data.code === '0001') {
                this.$message.success(res.data.message)
                this.getStockList()
              } else {
                this.$message.error(res.data.message)
              }
              this.batchSetVisible = false
            }).catch(err => {
              console.log(err)
              this.catchError(err.response)
            })
          } else {
            console.log('err submit')
          }
        })
      },
      // 单条出入库操作
      singleSetSubmit () {
        if (this.singleForm.skuType === 2 && this.singleForm.skuNum > this.singleForm.storageNum) {
          this.$notify.error({
            title: '错误',
            message: '出库数量不得超过当前库存',
          })
          return false;
        }
        let data = {
          skuId: this.singleForm.skuId,
          skuNum: this.singleForm.skuNum,
          skuType: this.singleForm.skuType,
        }
        outOrInStock(data).then(res => {
          console.log(res)
          if (res.data.code === '0001') {
            this.$message.success(res.data.message)
            this.getStockList()
          } else {
            this.$message.error(res.data.message)
          }
          this.singleSetVisible = false
        }).catch(err => {
          console.log(err)
        })
      }
  	},
  	mounted () {
      this.wareId = this.$route.query.wareId;
      this.wareId && this.getStockList()
		}
  }
</script>
<style scoped>
  .input-width-control .el-input {
    width: 220px;
  }
</style>