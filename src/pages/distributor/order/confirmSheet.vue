<template>
	<section>
	<el-row type="flex" justify="center">
		<el-col :span="20">					
			<h1>悦视觉平台确认单</h1>
			<el-row class="order-info">
				<el-col :span="10">注：相同客户订单号确认单已最后一次为准</el-col>
				<el-col :span="7">客户订单号：<span v-text="confirmInfo.orderNumber"></span></el-col>				
			</el-row>
			<el-row :gutter="20">
				<el-col :span="11">
					<table cellspacing="0" cellpadding="0" border="0" class="company-table">
						<thead>
							<tr>
								<th colspan="2">To</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>分销商公司名称</td>
								<td></td>
							</tr>
							<tr>
								<td>联系人：</td>
								<td></td>
							</tr>
							<tr>
								<td>联系电话：</td>
								<td></td>
							</tr>
							<tr>
								<td>传真</td>
								<td></td>
							</tr>
						</tbody>
						<tfoot></tfoot>
					</table>
				</el-col>
				<el-col :span="11" :offset="2">
					<table cellspacing="0" cellpadding="0" border="0" class="company-table">
						<thead>
							<tr>
								<th colspan="2">From</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>平台公司名称</td>
								<td></td>
							</tr>
							<tr>
								<td>联系人：</td>
								<td></td>
							</tr>
							<tr>
								<td>联系电话：</td>
								<td></td>
							</tr>
							<tr>
								<td>传真</td>
								<td></td>
							</tr>
						</tbody>
						<tfoot></tfoot>
					</table>
				</el-col>
			</el-row>
			<h4>客户信息</h4>
			<el-table
			    :data="confirmInfo.traveler"
			    border
			    style="width: 100%"
			    class="traveler-table">
			    <el-table-column
			      prop="name"
			      align="center"
			      label="姓名">
			    </el-table-column>
			    <el-table-column
			      prop="sex"
			      align="center"
			      label="性别"
			      width="70">
			    </el-table-column>
			    <el-table-column
			      prop="type"
			      align="center"
			      label="类型"
			      width="100">
			    </el-table-column>
			    <el-table-column
			      prop="birthday"
			      align="center"
			      label="生日">
			    </el-table-column>
			    <el-table-column
			      prop="nationality"
			      align="center"
			      label="国籍">
			    </el-table-column>
			    <el-table-column
			      prop="typeOfCertificate"
			      align="center"
			      width="140"
			      label="出行人证件类型">
			    </el-table-column>
			    <el-table-column
			      prop="licenseNumber"
			      align="center"
			      label="证件号">
			    </el-table-column>
			    <el-table-column
			      prop="validPeriod"
			      align="center"
			      label="证件有效期">
			    </el-table-column>
			    <el-table-column
			      prop="phone"
			      align="center"
			      label="电话">
			    </el-table-column>		   
			</el-table>
			<el-table
			    :data="confirmInfo.pInfo"
			    border
			    style="width: 100%">
			    <el-table-column
			      prop="scheduledItems"
			      align="center"
			      label="预定项目">
			    </el-table-column>
			    <el-table-column
			      prop="confirmState"
			      align="center"
			      label="确认状态">
			    </el-table-column>
			    <el-table-column
			      prop="person"
			      align="center"
			      label="份数/人数">
			    </el-table-column>
			    <el-table-column
			      prop="dateStart"
			      align="center"
			      label="出发日期">
			    </el-table-column>
			    <el-table-column
			      prop="dateEnd"
			      align="center"
			      label="返回日期">
			    </el-table-column>
			    <el-table-column
			      align="center"
			      label="卖价">
			      <template scope="scope">
			      	<p>成人:{{parseInt(scope.row.adultPrice).toFixed(2)}}</p>
			      	<p>儿童:{{parseInt(scope.row.childrenPrice).toFixed(2)}}</p>
			      </template>
			    </el-table-column>
			    <el-table-column
			      prop="totalPrice"
			      align="center"
			      label="卖价总价">
			    </el-table-column>		  
			</el-table>
			<h4>备注</h4>
			<el-input type="textarea" :rows="6">
			</el-input>
		</el-col>		
	</el-row>
	<el-row>
			<el-col class="print">
				<el-button type="primary" size="large">打印</el-button>
				<el-button type="primary" size="large">下载</el-button>
			</el-col>
	</el-row>
	</section>
	
</template>
<script>
	export default{
		data(){
			return{
				confirmInfo:{
					orderNumber:'123456',
					traveler:[{
						name:'LVLINLIN(吕琳琳)',
						sex:'女',
						type:'成人',
						birthday:'1982-12-07',
						nationality:'中国大陆',
						typeOfCertificate:'护照',
						licenseNumber:'G50530240',
						validPeriod:'2026-05-31',
						phone:'13911999253'
				}],
				pInfo:[{
						scheduledItems:'旅拍写真·【巴厘岛旅拍婚纱照2日1晚游】 赠送后期产品包邮、及拍摄用车-巴厘岛套餐A',
						confirmState:'已确认',
						person:'2人',
						dateStart:'2017-06-09',
						dateEnd:'2017-06-10',
						adultPrice:'4780',
						childrenPrice:'4780',
						totalPrice:'9560.00'
					}],
				}
				
			}
		}
	}
</script>
<style scoped>
	h1{
		text-align: center;
	}
	.order-info{
		margin-bottom:20px;
	}
	.company-table{
		border-collapse:collapse;
		border: 1px solid #dfe6ec;
		width:100%;
	}
	.company-table tr{
		background: #fff;
		line-height: 30px;
	}
	.company-table th,.company-table td{
	    border: 1px solid #dfe6ec;
	    padding: 10px;
	}
	.company-table tr td:first-child{
		width:180px;
		text-align: center;
	}
	.traveler-table{
		margin-bottom:20px;
	}
	.print{
		text-align: center;
		margin-top:20px;
	}
</style>