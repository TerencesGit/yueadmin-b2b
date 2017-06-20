<template>
	<section>
		<el-row :gutter="20">
			<!-- <el-col :span="2">
				<ul class="trip-days bg-white">
					<li v-for="num in tripInfo.tripDays" :key="num"><a href="#">D{{num}}</a></a></li>
				</ul>
			</el-col> -->
			<el-col :span="18">
				<div class="trip-title">
					<span v-text="tripInfo.wareName"></span>
					<span v-text="'产品ID:' + tripInfo.wareId"></span>
				</div>
				<ul class="trip-content bg-white">
					<li v-for="num in tripInfo.tripDays" :key="num" class="border-bottom">
						<el-card class="trip-day">
							<h4>第{{num}}天</h4>
							<ul class="trip-list">
								<li v-for="item in tripList" v-if="item.tripDayNum === num">
									<div class="trip-detail clearfix">
										<p class="pull-left">
											<span v-if="item.programType == 1"><i class="fa fa-plane"></i></span>
											<span v-else-if="item.programType == 2"><i class="fa fa-car"></i></span>
											<span v-else-if="item.programType == 10"><i class="fa fa-hotel"></i></span>
											<span v-else-if="item.programType == 20"><i class="fa fa-binoculars"></i></span>
											<span v-else-if="item.programType == 30"><i class="fa fa-cutlery"></i></span>
											<span v-else-if="item.programType == 31"><i class="fa fa-cutlery"></i></span>
											<span v-else-if="item.programType == 32"><i class="fa fa-coffee"></i></span>
											<span v-else-if="item.programType == '3,33'"><i class="fa fa-cutlery"></i></span>
											<span v-else-if="item.programType == 34"><i class="fa fa-cutlery"></i></span>
											<span v-else-if="item.programType == 40"><i class="fa fa-shopping-bag"></i></span>
											<span v-else-if="item.programType == 50"><i class="fa fa-child"></i></span>
											<span v-else-if="item.programType == 60"><i class="fa fa-bell"></i></span>
											<span v-else>&nbsp;</span>
											<span>{{item.programTime | TimeFormat}}</span>
											<span>{{item.programTitle}}</span>
										</p>
										<p class="pull-right">
											<i class="fa fa-edit" @click="handleEdit(item)"></i>
											<i class="fa fa-trash" @click="handleDelete(item)"></i>
										</p>
									</div>
								</li>
							</ul>
							<el-button type="text" @click="handleAdd(num)">+ 添加行程</el-button>
						</el-card>
					</li>
				</ul>
			</el-col>
			<el-col :span="6">
				<div class="shear-plate bg-white">
					<h4>剪切板</h4>
					<el-input type="textarea" :rows="20" placeholder="您可以将您即将录入的行程介绍复制黏贴到这里奥，方便您后续参考录入"></el-input>
				</div>
			</el-col>
		</el-row>
		<!-- <div class="itinerary">
			<div class="itinerary-days">
				<ul class="itinerary-days-ul">
					<li v-for="day in days" v-text="day"></li>
				</ul>
			</div>
			<div class="itinerary-content">
				<div class="itinerary-content-title">
					<span v-text="commodity.title"></span>
					<span v-text="'产品ID:' + commodity.id"></span>
				</div>
				<div class="itinerary-content-content">
					<ul>
						<li style="display:flex; align-items:center;">
							<div>
								<span style="font-size:14px;">第一天</span>
							</div>
							<div style="margin-left:-3%;">
								<el-button type="text" @click="changeTraffic" :value='trafficShow'>{{!trafficShow ? '请选择交通方式' : trafficShow + '--'}}<i :class="trafficIcon"></i></el-button>
								<el-dialog :before-close="closeTraffic" top="30%" title="选择交通方式" :visible.sync="dialogFormVisible">
								  <el-input :autofocus="true" :autosize="{ minRows: 6}" type="textarea" v-model="traffic"></el-input>
								  <div style="border:1px solid #999; padding:10px;">
								  	<el-button type="text">选择交通方式</el-button>
								  	<el-button @click="chooseText(index)" :key="index" v-for="(trafficBtn,index) in trafficBtns" size="small" style="border-radius:50%;"><i :class="trafficBtn.icon"></i></el-button>
								  	
								  </div>
								  
								  <div slot="footer" class="dialog-footer">
								    <el-button @click="dialogFormVisible = false">取 消</el-button>
								    <el-button type="primary" @click="isTraffic(traffic)">确 定</el-button>
								  </div>
								</el-dialog>
							</div>
						</li>
						<li v-for="list in lists">
							<div>
								<div :class="list.icon"></div>
								<div class="line"></div>
							</div>
							<div v-show="false">
								<el-time-picker size="small" style="width:50%;" placeholder="*HM:MM"></el-time-picker>
							</div>
							<div>
								<el-input :placeholder="list.placeholder" size="mini"></el-input>
							</div>
						</li>
						<el-button @click="addTripDialog = true" type="text">+ 添加行程</el-button>
					</ul>
				</div>
			</div>
			<div class="itinerary-cut">
				<h4>剪切板</h4>
				<el-input :autosize="true" type="textarea" placeholder="您可以将您即将录入的行程介绍复制黏贴到这里奥，方便您后续参考录入"></el-input>
			</div>
		</div> -->
		<el-dialog title="添加行程" :visible.sync="addTripVisible">
			<el-form :model="form" :rules="rules" ref="tripForm" class="form-item-width" label-width="100px">
				<el-row>
					<el-col :span="12">
						<el-form-item label="行程标题：" prop="programTitle">
							<el-input v-model="form.programTitle" placeholder="行程标题"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="行程类型：">
							<el-cascader
							  :options="tripTypes"
							  v-model="form.programType"
							  :show-all-levels="false"
							  placeholder="选择行程类型"
							  @change="handleChange">
						  </el-cascader>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item label="行程时间：" prop="programTime">
							<el-time-picker 
								v-model="form.programTime"
								:picker-options="{
									format: 'HH:mm:ss'
								}"
								placeholder="行程时间">
							</el-time-picker>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="行程时长：" style="height: 36px">
							<el-input-number 
								v-model="form.programDuration" 
								:min="0.5"
								:max="24"
								:step="0.5"
								style="width: 140px">
							</el-input-number>
							<span class="input-unit">小时</span>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-form-item label="行程明细：" prop="programDetail">
					 <el-input v-model="form.programDetail" type="textarea"></el-input>
					</el-form-item>
				</el-row>
				<el-row>
					<el-form-item label="是否免费：">
						<el-radio class="radio" v-model="form.programIsFree" :label="1">免费</el-radio>
						<el-radio class="radio" v-model="form.programIsFree" :label="0">自费</el-radio>
					</el-form-item>
				</el-row>
			</el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="addTripVisible = false">取 消</el-button>
		    <el-button type="primary" @click="onSubmit">确 定</el-button>
		  </div>
		</el-dialog>
	</section>
</template>
<script>
	import { saveWareTripDetail } from '@/api'
 	export default {
		data(){
			return {
				tripInfo: {
					wareId: '2355624',
					wareName: '泰国曼谷+普吉岛7日5晚半自助游直飞随心DIY+3晚海边酒店+双体游艇',
					tripDays: 5
				},
				tripList: [
					{tripDayNum: 1, 
						programTime: new Date(), 
						programTitle: '早餐',
						programType: [3, 33],
						programDuration: 1,
						programIsFree: 1,
						programDetail: '普吉岛7日5晚半自助游直飞随心DIY普吉岛7日5晚半自助游直飞随心DIY普吉岛7日5晚半自助游直飞随心DIY'
					}, 
					{tripDayNum: 2, programTime: new Date(), programTitle: '旅行'}
				],
				addTripVisible: false,
				form: {
					id: '',
					wareId: '',
					tripDayNum: '',
					programType: [0],
					programTime: '',
					programTitle: '',
					programIsFree: 1,
					programDuration: 1,
					programDetail: ''
				},
				tripTypes: [
					{ label: '航班', value: 1 },
					{ label: '交通', value: 2 },
					{ label: '酒店', value: 10 },
					{ label: '景点', value: 20 },
					{
						label: '用餐',
						value: 3,
						children: [
							{ label: '早餐', value: 30 },
							{ label: '午餐', value: 31 },
							{ label: '下午茶', value: 32 },
							{ label: '晚餐', value: 33 },
							{ label: '宵夜', value: 34 },
						]
					},
					{ label: '购物', value: 40 },
					{ label: '自由活动', value: 50 },
					{ label: '主题活动', value: 60 }
				],
				rules: {
					programTitle: [
						{required: true, message: '请输入行程标题', trigger: 'blur'}
					],
					programTime: [
						{type: 'date', required: true, message: '请选择行程时间', trigger: 'change'}
					],
					programDetail: [
						{required: true, message: '请输入行程详情', trigger: 'blur'}
					],
				},
			}
		},
		methods:{
			handleAdd (num) {
				this.form.id = 0;
				this.form.tripDayNum = num;
				this.addTripVisible = true
			},
			onSubmit(){
				this.$refs.tripForm.validate((valid) => {
					if (valid) {
						let form = Object.assign({}, this.form)
						console.log(form)
						let data = {
							id: form.id,
							wareId: form.wareId,
							tripDayNum: form.tripDayNum,
							programType: form.programType[form.programType.length - 1] * 1,
							programTime: form.programTime,
							programTitle: form.programTitle,
							programIsFree: form.programIsFree,
							programDuration: form.programDuration * 60,
							programDetail: form.programDetail,
							versionId: ''
						}
						data.programType = [data.programType]
						this.tripList.push(data)
						data = JSON.stringify(data)
						console.log(data)
						// saveWareTripDetail(data)
						// .then(res => {
						// 	console.log(res)
						// 	if (res.data.code === '0001') {
						// 		let result = res.data.result;
						// 		this.$message.success('添加成功')
						// 		this.addTripVisible = false
						// 		this.$refs.tripForm.resetFields()
						// 	} else {
						// 		this.$message.error(res.data.message)
						// 	}
						// })
						// .catch(err => {
						// 	console.log(err)
						// 	this.$message.error(this.GLOBAL.resError)
						// })
						this.addTripVisible = false
						this.$refs.tripForm.resetFields()
					} else {
						this.$message.error('表单输入有误')
					}
				})
			},
			handleEdit (item) {
				console.log(item)
				// item.programType = [item.programType]
				// console.log(item)
				this.form = item;
				this.addTripVisible = true
			},
			handleDelete (item) {
				console.log(item)
				this.$confirm('确定删除该条行程', '提示', {type: 'warning'})
				.then(() => {

				})
				.catch(err => {
					console.log(err)
					this.$message('已取消操作')
				})
			},
			handleChange(val){
				console.log(val)
				console.log(val[val.length-1])
				this.form.programType = val
			}
		},
		mounted () {
			let wareId = this.$route.query;
			this.form.wareId = 10001
			this.$store.dispatch('setStepActive', 2)
		}
	}
</script>

<style scoped lang="scss">
	h4 {
		margin: 0
	}
  .form-item-width .el-input,
	.form-item-width .el-cascader {
		width: 192px;
	}
	.trip-title {
		display: flex;
		justify-content: space-between;
		margin-bottom: 20px;
		padding: 15px 20px;
		background: #fff;
	}
	.trip-days li{
		padding: 30px 0;
	}
	/*.trip-content {
		padding: 15px;
	}*/
	.trip-list {
		padding: 5px 15px;
	}
	.trip-list > li {
		margin: 10px 0;
		padding: 10px;
		background: #f0f0f0
	}
	.trip-detail .pull-left span {
		margin: 0 5px;
	}
	.trip-detail .pull-right {
		display: none;
	}
	.trip-detail .pull-right i {
		cursor: pointer;
	}
	.trip-detail:hover .pull-right {
		display: block;
	}
	.shear-plate {
		padding: 15px;
		h4 { 
			margin-bottom: 15px
		}
	}
</style>