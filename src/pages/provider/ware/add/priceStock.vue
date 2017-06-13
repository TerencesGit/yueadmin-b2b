<template>
	<section>
    <el-row class="toolbar">
      <el-button type="primary" @click="skuFormVisible = true">批量设置</el-button>
    </el-row>
		<full-calendar :events="fcEvents" first-day='0' 
      @changeMonth="changeMonth" 
      @dayClick="dayClick">
    </full-calendar>
    <el-dialog title="库存设置" v-model="skuFormVisible">
      <el-form :model="skuForm" label-width="160px" :rule="rules">
        <el-form-item label="起止日期：">
          <el-date-picker
            v-model="value7"
            type="daterange"
            align="right"
            placeholder="选择日期范围"
            :picker-options="pickerOptions2">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="" label-width="80px">
          <el-checkbox v-model="checkAll" @change="handleCheckAllChange">每天</el-checkbox>
          <el-checkbox-group v-model="checkedWeeks" @change="handleCheckedCitiesChange" style="display: inline-block">
            <el-checkbox v-for="(item, index) in weeks" :label="item" :key="index">{{item}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="当前库存：">
        <span>{{ value7[0] }}</span>
        </el-form-item>
        <el-form-item label="操作类型：" prop="type">
          <el-radio-group v-model="skuForm.type">
            <el-radio class="radio" :label="0">出库</el-radio>
            <el-radio class="radio" :label="1">入库</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="库存：" prop="stockNum">
          <el-input v-model.number="skuForm.stockNum" placeholder="输入数量" class="select-width"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">提交</el-button>
          <el-button @click="skuFormVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
	</section>
</template>
<script>
	let demoEvents = [
    {
      start: '2017-06-06',
      adultPrice: '18000.00',
      childPrice: '12000.00',
      stock: '100'
    },
    {
      start: '2017-06-07',
      adultPrice: '18000.00',
      // childPrice: '12000.00',
      stock: '100'
    },
    {
      start: '2017-06-08',
      adultPrice: '18000.00',
      childPrice: '12000.00',
      stock: '100'
    },
    {
      start: '2017-06-09',
      adultPrice: '18000.00',
      childPrice: '12000.00',
      stock: '100'
    },
    {
      start: '2017-06-10',
      adultPrice: '18000.00',
      childPrice: '12000.00',
      stock: '100'
    },
    {
      start: '2017-05-30',
      adultPrice: '18000.00',
      childPrice: '12000.00',
      stock: '100'
    },
  ];
  const weekOptions = ['每周日', '每周一', '每周二', '每周三', '每周四', '每周五', '每周六'];
  export default {
  	data () {
  		return {
  			fcEvents : demoEvents,
        skuFormVisible: false,
        skuForm: {
          wareId: '',
          date: '',
          stock: '',
          type: '',
          stockNum: ''
        },
        rules: {
          type: [
            {required: true, message: '操作类型不能为空'}
          ],
          stockNum: [
            { required: true, message: '数量不能为空'},
            { type: 'number', message: '数量必须为数字值'}
          ]
        },
        pickerOptions2: {
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
        value7: '',
        checkAll: true,
        weeks: weekOptions,
        checkedWeeks: weekOptions,
        isIndeterminate: false
  		}
  	},
  	methods: {
      handleCheckAllChange(event) {
        this.checkedWeeks = event.target.checked ? weekOptions : [];
        // this.isIndeterminate = false;
      },
      handleCheckedCitiesChange(value) {
        console.log(value)
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.weeks.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.weeks.length;
      },
  		changeMonth (start, end, current) {
	      console.log('changeMonth', start.format(), end.format(), current.format())
	    },
	    dayClick (day, event) {
	      console.log(event)
	    },
      onSubmit () {

      },
  	},
  	mounted () {
			this.$store.dispatch('setStepActive', 5)
		}
  }
</script>