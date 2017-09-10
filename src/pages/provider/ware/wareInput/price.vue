<template>
	<section>
    <!-- 工具栏 -->
    <el-row class="toolbar">
      <el-button type="primary" @click="handleBatchAdd">批量新增</el-button>
      <el-button type="primary" v-if="skuList.length > 0" @click="handleBatchEdit">批量编辑</el-button>
    </el-row>
    <!-- 价格Sku列表 -->
		<full-calendar 
      :events="skuList" 
      first-day='0' 
      @changeMonth="changeMonth" 
      @dayClick="dayClick"
      @eventClick="dayClick">
    </full-calendar>
    <!-- 下一步 -->
    <el-row class="toolbar text-center">
      <el-button type="primary" @click="handleNext">下一步</el-button>
    </el-row>
    <!-- 批量价格Sku设置 -->
    <el-dialog title="价格设置（价格单位：元）" v-model="batchSkuVisible">
      <el-form :model="batchSkuForm" ref="batchSkuForm" :rules="rules" label-width="180px" class="input-width-control">
        <el-form-item label="起止日期：" prop="skuDateRange">
          <el-date-picker
            v-model="batchSkuForm.skuDateRange"
            type="daterange"
            placeholder="选择起止日期"
            :clearable="false"
            :picker-options="pickerOptions"
            @change="dateChange">
          </el-date-picker>
        </el-form-item>
        <!-- <el-form-item label="" label-width="80px" prop="checkedWeeks">
          <el-checkbox-group v-model="batchSkuForm.checkedWeeks" @change="handleCheckedChange" style="display: inline-block">
            <el-checkbox v-for="(item, index) in weeks" :label="index" :key="index" checked>{{item}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item> -->
        <el-form-item label="成人价：" prop="adultPrice">
          <el-input v-model.number="batchSkuForm.adultPrice" placeholder="输入成人价"></el-input>
        </el-form-item>
        <el-form-item label="儿童价：" prop="childPrice">
          <el-input v-model.number="batchSkuForm.childPrice" placeholder="输入儿童价"></el-input>
        </el-form-item>
        <el-form-item label="单人差：" prop="singlePrice">
          <el-input v-model.number="batchSkuForm.singlePrice" placeholder="输入单人差"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="batchSubmit">提交</el-button>
          <el-button @click="batchSkuVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 单条价格Sku设置 -->
    <el-dialog title="价格设置（价格单位：元）" :visible.sync="singleSkuVisible">
      <el-form :model="singleSkuForm" ref="singleSkuForm" :rules="rules" label-width="180px" class="input-width-control">
        <el-form-item label="日期：">
          <span v-text="singleSkuForm.skuDate" style="font-size:18px"></span>
        </el-form-item>
        <el-form-item label="成人价：" prop="adultPrice">
          <el-input v-model.number="singleSkuForm.adultPrice" placeholder="输入成人价"></el-input>
        </el-form-item>
        <el-form-item label="儿童价：" prop="childPrice">
          <el-input v-model.number="singleSkuForm.childPrice" placeholder="输入儿童价"></el-input>
        </el-form-item>
        <el-form-item label="单人差：" prop="singlePrice">
          <el-input v-model.number="singleSkuForm.singlePrice" placeholder="输入单人差"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="singleSubmit">提交</el-button>
          <el-button @click="singleSkuVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
	</section>
</template>
<script>
  import { saveSkuInfo, readSkuInfoList, createSkuInfoBatch, updateSkuInfoBatch } from '@/api'
  const weekOptions = ['每周日', '每周一', '每周二', '每周三', '每周四', '每周五', '每周六'];
  export default {
  	data () {
  		return {
        wareId: '',
  			skuList : [],
        batchSkuVisible: false,
        singleSkuVisible: false,
        batchType: 1,
        batchSkuForm: {
          startDate: '',
          endDate: '',
          adultPrice: '',
          childPrice: '',
          singlePrice: '',
          skuDateRange: []
        },
        singleSkuForm: {
          wareId: '',
          skuId: '',
          skuDate: '',
          adultPrice: 8000,
          childPrice: 7000,
          singlePrice: 5000,
        },
        rules: {
          adultPrice: [
            { type: 'number', required: true, message: '成人价不能为空', trigger: 'blur'},
          ],
          childPrice: [
            { type: 'number', required: true, message: '儿童价不能为空', trigger: 'blur'},
          ],
          singlePrice: [
            { type: 'number', required: true, message: '单人补差价不能为空', trigger: 'blur'},
          ],
          skuDateRange: [
            { type: 'array', required: true, message: '日期不能为空', trigger: 'change'},
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
        weeks: weekOptions,
  		}
  	},
  	methods: {
      // 获取sku列表
      getSkuList () {
        readSkuInfoList({wareId: this.wareId}).then(res => {
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
          this.$catchError(err)
        })
      },
      dateChange (val) {
        this.batchSkuForm.skuDateRange = val ? val.split(' - ') : []
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
      // 批量新增
      handleBatchAdd () {
        this.batchType = 1;
        this.batchSkuVisible = true
      },
      // 批量编辑
      handleBatchEdit () {
        this.batchType = 2;
        this.batchSkuVisible = true
      },
      // 批量提交
      batchSubmit () {
        this.$refs.batchSkuForm.validate((valid) => {
          if (valid) {
            let data = {
              wareId: this.wareId,
              startDate: this.batchSkuForm.skuDateRange[0],
              endDate: this.batchSkuForm.skuDateRange[1],
              adultPrice: this.batchSkuForm.adultPrice,
              childPrice: this.batchSkuForm.childPrice,
              singlePrice: this.batchSkuForm.singlePrice,
            }
            console.log(data)
            if (this.batchType === 1) {
              createSkuInfoBatch(data).then(res => {
                console.log(res)
                if(res.data.code === '0001'){
                  this.$message.success(res.data.message)
                  this.getSkuList()
                } else {
                  this.$message.error(res.data.message)
                }
              }).catch(err => {
                console.log(err)
              })
            } else if (this.batchType === 2) {
              updateSkuInfoBatch(data).then(res => {
                console.log(res)
                if(res.data.code === '0001'){
                  this.$message.success(res.data.message)
                  this.getSkuList()
                } else {
                  this.$message.error(res.data.message)
                }
              }).catch(err => {
                console.log(err)
              })
            } else {
              console.log('error')
              return;
            }
            this.batchSkuVisible = false;
            this.$refs.batchSkuForm.resetFields()
          } else {
            console.log('err submit')
          }
        })
      },
      // 单条设置
      dayClick (day, event) {
        day = this.$moment(day).format('YYYY-MM-DD')
        console.log(day, event)
        if (event) {
          console.log(Object.assign({}, event))
          this.singleSkuForm = Object.assign(this.singleSkuForm, event)
          console.log(Object.assign({}, this.singleSkuForm))
        } else {
          this.singleSkuForm = {}
          this.singleSkuForm.skuDate = day
        }
        this.singleSkuVisible = true
      },
      // 单条sku提交
      singleSubmit () {
        this.$refs.singleSkuForm.validate((valid) => {
          if (valid) {
            let data = {
              wareId: this.wareId,
              skuId: this.singleSkuForm.skuId,
              skuDate: this.singleSkuForm.skuDate,
              adultPrice: this.singleSkuForm.adultPrice,
              childPrice: this.singleSkuForm.childPrice,
              singlePrice: this.singleSkuForm.singlePrice,
            }
            console.log(data)
            saveSkuInfo(data).then(res => {
              console.log(res)
              if (res.data.code === '0001') {
                this.$message.success(res.data.message)
                this.getSkuList()
              } else {
                this.$message.error(res.data.message)
              }
              this.singleSkuVisible = false
            }).catch(err => {
              console.log(err)
            })
          } else {
            console.log('err submit')
          }
        })
      },
      // 下一步
      handleNext () {
        this.$router.push('/provider/ware/new/service?wareId='+this.wareId)
      }
  	},
  	mounted () {
			this.$store.dispatch('setStepActive', 4)
      this.wareId = parseInt(this.$route.query.wareId)
      this.wareId && this.getSkuList()
		}
  }
</script>
<style scoped>
  .input-width-control .el-input {
    width: 220px;
  }
</style>
