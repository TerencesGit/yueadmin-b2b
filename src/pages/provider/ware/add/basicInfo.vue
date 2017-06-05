<template>
	<section>
		<el-row>
			<el-col :span="18" :offset="3">
				<el-form :model="baseForm" :rules="rules" ref="baseForm" label-width="100px">
					<el-card>
					  <el-form-item label="天数" prop="tripDays">
					    <el-col :span="5">
					    	<el-input-number v-model="form.tripDays" :min="1" :max="30">天</el-input-number>
					    </el-col>
					  </el-form-item>
					  <el-form-item label="产品形态" prop="type">
					    <el-select v-model="baseForm.type">
					      <el-option label="自由行" value="shanghai"></el-option>
					      <el-option label="自由行2" value="beijing"></el-option>
					    </el-select>
					  </el-form-item>
					  <el-form-item label="产品主题" prop="title">
					    <el-select v-model="baseForm.title" class="pull-left">
					      <el-option label="经济游" value="shanghai"></el-option>
					      <el-option label="高端游" value="beijing"></el-option>
					    </el-select>
				    	<el-input class="pull-left m-l" style="width: 300px"></el-input>
					  </el-form-item>
					  <el-row>
						  <el-col :span="10">
							  <el-form-item label="线路品牌" prop="brand">
							    <el-select v-model="baseForm.brand" class="el-se">
							      <el-option label="线路品牌1" value="1"></el-option>
							      <el-option label="线路品牌2" value="2"></el-option>
							    </el-select>
							  </el-form-item>
						  </el-col>
						  <el-col :span="10" :offset="2">
							  <el-form-item label="结算类型" prop="settlement">
							    <el-select v-model="baseForm.settlement">
							      <el-option label="结算类型1" value="1"></el-option>
							      <el-option label="结算类型2" value="2"></el-option>
							    </el-select>
							  </el-form-item>
						  </el-col>
					  </el-row>
					  <el-row>
						  <el-col :span="10">
							  <el-form-item label="出发城市" prop="satrtCity">
							    <el-input placeholder="出发城市" class="select-width"></el-input>
							  </el-form-item>
						  </el-col>
						  <el-col :span="10" :offset="2">
							  <el-form-item label="目的城市" prop="endCity">
							  	<el-col :span="20">
							    	<el-input placeholder="目的城市" class="select-width"></el-input>
							    </el-col>
							  </el-form-item>
						  </el-col>
					  </el-row>
					  <el-row>
						  <el-col :span="10">
							  <el-form-item label="产品线路" prop="line">
							    <el-select v-model="baseForm.line">
							      <el-option label="产品线路1" value="1"></el-option>
							      <el-option label="产品线路2" value="2"></el-option>
							    </el-select>
							  </el-form-item>
						  </el-col>
						  <el-col :span="10" :offset="2">
							  <el-form-item label="交通工具" prop="traffic">
							    <el-select v-model="baseForm.traffic">
							      <el-option label="飞机" value="1"></el-option>
							      <el-option label="汽车" value="2"></el-option>
							      <el-option label="高铁" value="3"></el-option>
							    </el-select>
							  </el-form-item>
						  </el-col>
					  </el-row>
					</el-card>
					<el-card>
						<p style="font-size: 14px">产品经理推荐：一共可以录入三个产品经理推荐，每条信息字数限制在36个汉字（72个字节）以内，至少录入一个产品经理推荐。</p>
						<el-form-item label="推荐理由1" prop="reason1">
					    <el-input placeholder="推荐理由1"></el-input>
					  </el-form-item>
					  <el-form-item label="推荐理由2" prop="reason2">
					    <el-input placeholder="推荐理由2"></el-input>
					  </el-form-item>
					  <el-form-item label="推荐理由3" prop="reason1">
					    <el-input placeholder="推荐理由3"></el-input>
					  </el-form-item>
					</el-card>
					<el-card>
						<p>推荐概述 最多8000字</p>
						<vue-html5-editor :content="content" :height="400"></vue-html5-editor>
					</el-card>
					<el-button>预定控制</el-button>
					<el-card>
						<el-form-item>
					    <el-button type="primary" @click="submitForm('baseForm')">立即创建</el-button>
					    <el-button @click="resetForm('baseForm')">重置</el-button>
					  </el-form-item>
					</el-card>
				</el-form>
			</el-col>
		</el-row>
	</section>
</template>
<script>
	 export default {
    data() {
      return {
      	form: {
      		tripDays: '',
      		date1: '',
      		date2: ''
      	},
        baseForm: {
          name: '',
          region: '',
          type: 'shanghai',
          title: '经济游',
          brand: '2',
          settlement: '2',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        rules: {

        },
        content: 'html5Editor'
        // rules: {
        //   name: [
        //     { required: true, message: '请输入活动名称', trigger: 'blur' },
        //     { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        //   ],
        //   region: [
        //     { required: true, message: '请选择活动区域', trigger: 'change' }
        //   ],
        //   date1: [
        //     { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        //   ],
        //   date2: [
        //     { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
        //   ],
        //   type: [
        //     { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
        //   ],
        //   resource: [
        //     { required: true, message: '请选择活动资源', trigger: 'change' }
        //   ],
        //   desc: [
        //     { required: true, message: '请填写活动形式', trigger: 'blur' }
        //   ]
        // }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    },
    mounted () {
    	this.$store.dispatch('setStepActive', 1)
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
</style>
