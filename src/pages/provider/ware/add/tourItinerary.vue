<template>
	<div class="itinerary">
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
					<!-- 列表渲染 -->
					<li v-for="list in lists">
						<div>
							<div :class="list.icon"></div>
							<div class="line"></div>
						</div>
						<!-- <div v-show="false">
							<el-time-picker size="small" style="width:50%;" placeholder="*HM:MM"></el-time-picker>
						</div> -->
						<div>
							<el-input :placeholder="list.placeholder" size="mini"></el-input>
						</div>
					</li>
					<el-button @click="addTripDialog = true" type="text">+ 新增行程</el-button>
					<el-dialog title="新增行程" :visible.sync="addTripDialog">
					  <div>
					  	<el-cascader
						  :options="options"
						  :show-all-levels="false"
						  @change="handleChange"
						></el-cascader>
						<div style="margin-top:20px;">
							<el-row type="flex" :gutter="20">
								<el-col :span="2">
									<el-button type="text">类别</el-button>
								</el-col>
								<el-col :span="6">
									<el-time-picker size="small" 
									v-model="time" placeholder="*HM:MM"></el-time-picker>
								</el-col>
								<el-col :span="12">
							  		<el-input autosize v-model="listPlaceholder" type="textarea" placeholder="请输入内容" size="small"></el-input>
								</el-col>
								<el-col :span="4" style="display:flex; align-items:center;">
							  		<el-checkbox v-model="checked">自理</el-checkbox>
								</el-col>
							</el-row>
						</div>
					  </div>
					  <div slot="footer" class="dialog-footer">
					    <el-button @click="addTripDialog = false">取 消</el-button>
					    <el-button type="primary" @click="addTrip">确 定</el-button>
					  </div>
					</el-dialog>
				</ul>
			</div>
		</div>
		<div class="itinerary-cut">
			<h4>剪切板</h4>
			<el-input :autosize="true" type="textarea" placeholder="您可以将您即将录入的行程介绍复制黏贴到这里奥，方便您后续参考录入"></el-input>
		</div>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				options: [{
			    	value: 'fa fa-car fa-lg',
			        label: '交通',
			    },{
			    	value: 'fa fa-hotel fa-lg',
			        label: '酒店',
			    },{
			    	value: 'fa fa-building fa-lg',
			        label: '景点',
			    },{
			    	value: 'fa fa-cutlery fa-lg',
			        label: '用餐',
			        children:[{
			        		value: 'fa fa-cutlery fa-lg',
			        		label: '早餐'
			        	},{
			        		value: 'fa fa-cutlery fa-lg',
			        		label: '午餐'
			        	},{
			        		value: 'fa fa-cutlery fa-lg',
			        		label: '晚餐'
			        	}]
			    },{
			    	value: 'fa fa-shopping-cart fa-lg',
			        label: '购物',
			    },{
			    	value: 'fa fa-child fa-lg',
			        label: '自由活动',
			    },{
			    	value: 'fa fa-plane fa-lg',
			        label: '主题',
			        children: [{
			            value: 'fa fa-sun-o fa-lg',
			            label: '蜜月'   
			        },{
			            value: 'fa fa-s15 fa-lg',
			            label: '潜水'   
			        },{
			            value: 'fa fa-ship fa-lg',
			            label: '游艇'   
			        }]
			    }],
			    checked:'false',
			    time:'',
				trafficBtn:'',
				dialogFormVisible:false,
				addTripDialog:false,
				trafficShow:'',
				trafficIcon:'',
				traffic:'',
				text:'',
				travelType:'',
				listPlaceholder:'',
				days:['D1','D2','D3','D4','D5'],
				commodity:{
					id:'2355624',
					title:'泰国曼谷+普吉岛7日5晚半自助游直飞随心DIY+3晚海边酒店+双体游艇出海浮潜'
				},
				lists:[
					{
						icon:'fa fa-plane fa-lg',
						placeholder:'是否直飞：待定'
					},
					{
						icon:'fa fa-cutlery fa-lg',
						placeholder:'早餐：请输入早餐内容'
					},
					{
						icon:'fa fa-cutlery fa-lg',
						placeholder:'中餐：请输入中餐内容'
					},
					{
						icon:'fa fa-cutlery fa-lg',
						placeholder:'晚餐：请输入晚餐内容'
					},
				],
				trafficBtns:[
					{
						icon:'fa fa-plane fa-lg',
						description:'&plane'
					},
					{
						icon:'fa fa-bus fa-lg',
						description:'&bus'
					},
					{
						icon:'fa fa-train fa-lg',
						description:'&train'
					},
					{
						icon:'fa fa-ship fa-lg',
						description:'&ship'
					},
					{
						icon:'fa fa-cab fa-lg',
						description:'&cab'
					}
				],
				scheduleForms:[
					{
						isPlane:'',
						breakfast:'',
						lunch:'',
						dinner:''
					}
				],
				list:{
					icon:'',
					placeholder:''
				}

			}
		},
		methods:{
			chooseText(index){
				console.log(this.trafficBtns[index].description);
				// this.traffic += this.trafficBtns[index].description;
				this.trafficIcon = this.trafficBtns[index].icon;
			},
			addTrip(){
				/*this.lists.push({icon:'fa fa-cutlery fa-lg',
						placeholder:'晚餐：请输入晚餐内容'})*/
				if(this.list.icon){
					this.list.placeholder = this.listPlaceholder;
					this.lists.push(this.list);
					this.addTripDialog = false;
				}
			},
			changeTraffic(){
				this.dialogFormVisible = true;
			},
			closeTraffic(){
				this.dialogFormVisible = false;
			},
			isTraffic(val){
				if(!val){
					this.trafficShow = val;
					this.trafficIcon = '';
					this.dialogFormVisible = false;
				}else if(!this.trafficIcon){
					this.$message({
			          message: '请选择交通方式',
			          type: 'warning'
			        });
				}else{
					this.trafficShow = val;
					this.dialogFormVisible = false;
				}
			},
			handleChange(val){
				console.log(val[val.length-1]);
				this.list.icon = val[val.length-1];
			}
		},
		mounted () {
			this.$store.dispatch('setStepActive', 2)
		}
	}
</script>

<style scoped>
	.itinerary{
		display: flex;
		justify-content: space-between;
	}
	.itinerary > div{
		/*height:500px;*/
	}
	.itinerary-days{
		width:10%;
		text-align: center;
		/*background:#333;*/
	}
	.itinerary-content{
		width:68%;
	}
	.itinerary-cut{
		width:20%;
		background:#fff;
		padding: 20px;
	}
	.itinerary-cut > h4 {
		text-align: center;
		padding-bottom: 20px;
		border-bottom: 1px solid #eee;
	}
	.itinerary-days-ul > li{
		margin-top: 100px;
	}
	.itinerary-content-title{
		display: flex;
		justify-content: space-between;
		background:#fff;
		margin-bottom: 20px;
		padding: 16px 30px;
	}
	.itinerary-content-content{
		background:#fff;
		padding: 20px;
	}
	.line{
		width:1px;
		height:50px;
		border-left:1px solid #999; 
	}
	.itinerary-content-content > ul > li{
		display: flex;
		margin-bottom: 30px;
	}
	.itinerary-content-content > ul > li > div{
		margin-right:10%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>