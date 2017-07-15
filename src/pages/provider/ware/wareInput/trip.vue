<template>
	<section>
		<el-row :gutter="20">
			<el-col :span="18">
				<div class="trip-title">
					<span v-text="wareInfo.wareName"></span>
					<span v-text="'商品ID：' + wareInfo.wareCode"></span>
				</div>
				<ul class="trip-content">
					<li v-for="num in wareInfo.tripDays" :key="num">
						<el-card class="trip-day">
							<h4>第{{num}}天</h4>
							<ul class="trip-list">
								<li v-for="item in tripList" v-if="item.tripDayNum === num">
									<div class="trip-detail clearfix">
										<p class="pull-left">
											<span v-if="item.programType == 1"><i class="fa fa-plane"></i>&nbsp;[航班]</span>
											<span v-else-if="item.programType == 2"><i class="fa fa-car"></i>&nbsp;[交通]</span>
											<span v-else-if="item.programType == 10"><i class="fa fa-hotel"></i>&nbsp;[酒店]</span>
											<span v-else-if="item.programType == 20"><i class="fa fa-binoculars"></i>&nbsp;[景点]</span>
											<span v-else-if="item.programType == 30"><i class="fa fa-cutlery"></i>&nbsp;[早餐]</span>
											<span v-else-if="item.programType == 31"><i class="fa fa-cutlery"></i>&nbsp;[午餐]</span>
											<span v-else-if="item.programType == 32"><i class="fa fa-coffee"></i>&nbsp;[下午茶]</span>
											<span v-else-if="item.programType == 33"><i class="fa fa-cutlery"></i>&nbsp;[晚餐]</span>
											<span v-else-if="item.programType == 34"><i class="fa fa-cutlery"></i>&nbsp;[宵夜]</span>
											<span v-else-if="item.programType == 40"><i class="fa fa-shopping-bag"></i>&nbsp;[购物]</span>
											<span v-else-if="item.programType == 50"><i class="fa fa-child"></i>&nbsp;[自由活动]</span>
											<span v-else-if="item.programType == 60"><i class="fa fa-bell"></i>&nbsp;[主题活动]</span>
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
				<div class="text-center m-t">
					<el-button type="primary" size="large" @click="handleNext">下一步</el-button>
				</div>
			</el-col>
			<el-col :span="6">
				<div class="shear-plate bg-white">
					<h4>剪切板</h4>
					<el-input type="textarea" :rows="20" placeholder="您可以将您即将录入的行程介绍复制黏贴到这里奥，方便您后续参考录入"></el-input>
				</div>
			</el-col>
		</el-row>
		<el-dialog :title="dialogTitle" :visible.sync="tripFormVisible">
			<el-form :model="tripForm" :rules="rules" ref="tripForm" class="form-item-width" label-width="100px">
				<el-row>
					<el-col :span="12">
						<el-form-item label="行程标题：" prop="programTitle">
							<el-input v-model="tripForm.programTitle" placeholder="行程标题"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="行程类型：">
						  <el-select 
							  clearable 
							  v-model="tripForm.programType"
							  placeholder="选择行程类型">
						  	<el-option 
						  		v-for="item in tripTypes"
							  	:key="item.value"
							  	:label="item.label"
							  	:value="item.value">
						  	</el-option>
						  </el-select>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item label="行程时间：" prop="programTime">
							<el-time-picker
								v-model="tripForm.programTime"
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
								v-model="tripForm.programDuration" 
								:min="10"
								:max="720"
								:step="10"
								style="width: 140px">
							</el-input-number>
							<span class="input-unit">分钟</span>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-form-item label="行程明细：" prop="programDetail">
					 <el-input v-model="tripForm.programDetail" type="textarea"></el-input>
					</el-form-item>
				</el-row>
				<el-row>
					<el-form-item label="是否免费：">
						<el-radio class="radio" v-model="tripForm.programIsFree" :label="1">免费</el-radio>
						<el-radio class="radio" v-model="tripForm.programIsFree" :label="0">自费</el-radio>
					</el-form-item>
				</el-row>
			</el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="tripFormVisible = false">取 消</el-button>
		    <el-button type="primary" @click="onSubmit">确 定</el-button>
		  </div>
		</el-dialog>
	</section>
</template>
<script>
	import { readWareInfo, saveWareTripDetail, deleteTripDetail, readTripDetailList } from '@/api'
 	export default {
		data(){
			return {
				wareId: '',
				wareInfo: {},
				tripList: [],
				tripFormVisible: false,
				dialogTitle: '',
				tripForm: {
					id: '',
					wareId: '',
					tripDayNum: '',
					programType: 1,
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
					{ label: '早餐', value: 30 },
					{ label: '午餐', value: 31 },
					{ label: '下午茶', value: 32 },
					{ label: '晚餐', value: 33 },
					{ label: '宵夜', value: 34 },
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
			// 获取商品基本信息
			getWareInfo () {
				readWareInfo({wareId: this.wareId}).then(res => {
					if(res.data.code === '0001') {
						this.wareInfo = res.data.result.wareInfo;
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(err => {
					console.log(err)
				})
			},
			// 获取商品行程信息
			getTripList () {
				readTripDetailList({wareId: this.wareId}).then(res => {
					if(res.data.code === '0001') {
						this.tripList = res.data.result.tripDetailList;
						this.tripList.forEach((trip) => {
							trip.programTime = new Date(trip.programTime)
						})
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(err => {
					console.log(err)
					this.catchError(err.response)
				})
			},
			// 新增行程
			handleAdd (dayNum) {
				this.tripForm = {
					id: '',
					wareId: '',
					tripDayNum: dayNum,
					programType: 1,
					programTime: new Date(),
					programTitle: '',
					programIsFree: 1,
					programDuration: 1,
					programDetail: ''
				}
				this.dialogTitle = '添加行程';
				this.tripFormVisible = true;
			},
			// 编辑行程
			handleEdit (item) {
				this.tripForm = Object.assign({}, item);
				this.dialogTitle = '编辑行程'
				this.tripFormVisible = true
			},
			// 保存行程
			onSubmit(){
				this.$refs.tripForm.validate((valid) => {
					if (valid) {
						let data = Object.assign({}, this.tripForm)
						data.wareId = this.wareId;
						saveWareTripDetail(JSON.stringify(data)).then(res => {
							if (res.data.code === '0001') {
								this.$message.success(res.data.message)
								this.getTripList()
							} else {
								this.$message.error(res.data.message)
							}
						}).catch(err => {
							console.log(err)
							this.catchError(err.response)
						})
						this.tripFormVisible = false
					} else {
						this.$message.error('表单输入有误')
					}
				})
			},
			// 删除行程
			handleDelete (item) {
				this.$confirm('确定删除该条行程', '提示', {type: 'warning'})
				.then(() => {
					deleteTripDetail({id: item.id}).then(res => {
						console.log(res)
						if (res.data.code === '0001') {
							this.$message.success(res.data.message)
							this.getTripList()
						} else {
							this.$message.error(res.data.message)
						}
					}).catch(err => {
						console.log(err)
						this.catchError(err.response)
					})
				})
				.catch(err => {
					console.log(err)
					this.$message('已取消操作')
				})
			},
			// 下一步
			handleNext () {
				this.$router.push(`multimedia?wareId=${this.wareId}`)
			}
		},
		mounted () {
			this.$store.dispatch('setStepActive', 1)
			this.wareId = parseInt(this.$route.query.wareId)
			this.wareId && this.getWareInfo()
			this.wareId && this.getTripList()
		}
	}
</script>
<style scoped lang="scss">
  .form-item-width .el-input,
  .form-item-width .el-select {
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