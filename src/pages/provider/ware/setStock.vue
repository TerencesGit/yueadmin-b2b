<template>
	<section>
		<full-calendar :events="fcEvents" first-day='0' 
      @changeMonth="changeMonth" 
      @dayClick="dayClick">
    </full-calendar>
    <el-dialog title="库存设置" v-model="setFormVisible">
      <el-form :model="setForm" label-width="220px">
        <el-form-item label="日期：">
          <span>{{ setForm.date }}</span>
        </el-form-item>
        <el-form-item label="当前库存：">
        <span>{{ setForm.stock }}</span>
        </el-form-item>
        <el-form-item label="操作类型：">
          <el-radio-group v-model="setForm.type">
            <el-radio class="radio" :label="0">出库</el-radio>
            <el-radio class="radio" :label="1">入库</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="出库/入库数量：">
          <el-input v-model.number="setForm.stockNum" placeholder="输入数量" class="select-width"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">提交</el-button>
          <el-button @click="setFormVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
	</section>
</template>
<script>
  import { getStockByWareId } from '@/api'
  export default {
  	data () {
  		return {
  			fcEvents: [],
        setFormVisible: false,
        setForm: {
          wareId: '',
          date: '',
          stock: '',
          type: '',
          stockNum: ''
        }
  		}
  	},
  	methods: {
      getStockList (id) {
        getStockByWareId({id: id}).then(res => {
          console.log(res.data)
          this.fcEvents = res.data.result
        })
      },
      formatDate (time) {
        return this.$moment(time).format('YYYY-MM-DD')
      },
  		changeMonth (start, end, current) {
	      console.log('changeMonth', start.format(), end.format(), current.format())
	    },
	    dayClick (day, event) {
        console.log(this.formatDate(day))
        console.log(event)
        this.setFormVisible = true
        this.setForm.date = this.formatDate(day)
        this.setForm.stock = event && event.stock || 0
	    },
      onSubmit () {
        console.log(this.setForm)
        if(this.setForm.type === 1) {
          console.log('入库操作')
        } else {
          console.log('出库操作')
        }
        this.setFormVisible = false
      }
  	},
  	mounted () {
      let id = this.$route.query.id
      this.setForm.wareId = id
      this.getStockList(id)
		}
  }
</script>