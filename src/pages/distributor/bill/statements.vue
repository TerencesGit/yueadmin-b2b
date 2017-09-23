<template>
	<section>
		<el-row :gutter="15">
			<el-col :span="12">
				<div id="chart1" class="chart"></div>
			</el-col>
			<el-col :span="12">
				<div id="chart2" class="chart"></div>
			</el-col>
			<el-col :span="24">
				<div id="chart3" class="chart"></div>
			</el-col>
		</el-row>
	</section>
</template>
<script>
	import echarts from 'echarts'
	export default {
		data() {
			return {

			}
		},
		methods: {
			drawCharts() {
				const myChart = echarts.init(document.getElementById('chart1'));
				const myChart2 = echarts.init(document.getElementById('chart2'));
				const myChart3 = echarts.init(document.getElementById('chart3'));
				// 绘制图表
				myChart.setOption({
			    series : [
			        {
			            name: '访问来源',
			            type: 'pie',
			            roseType: 'angle',
			            radius: '55%',
			            data: [
			                {value:235, name:'视频广告'},
			                {value:274, name:'联盟广告'},
			                {value:310, name:'邮件营销'},
			                {value:335, name:'直接访问'},
			                {value:400, name:'搜索引擎'}
			            ]
			        }
			    ],
			    backgroundColor: '#ccc'
				})
			  myChart2.setOption({
			    xAxis: {
			        type: 'value'
			    },
			    yAxis: {
			        type: 'value'
			    },
			    dataZoom: [
			        {   // 这个dataZoom组件，默认控制x轴。
			            type: 'slider', // 这个 dataZoom 组件是 slider 型 dataZoom 组件
			            start: 10,      // 左边在 10% 的位置。
			            end: 60         // 右边在 60% 的位置。
			        }
			    ],
			    series: [
			        {
			            type: 'scatter', // 这是个『散点图』
			            itemStyle: {
			                normal: {
			                    opacity: 0.8
			                }
			            },
			            symbolSize: function (val) {
			                return val[2] * 40;
			            },
			            data: [["14.616","7.241","0.896"],["3.958","5.701","0.955"],["2.768","8.971","0.669"],["9.051","9.710","0.171"],["14.046","4.182","0.536"],["12.295","1.429","0.962"],["4.417","8.167","0.113"],["0.492","4.771","0.785"],["7.632","2.605","0.645"],["14.242","5.042","0.368"]]
			        }
			    ]
			  })
			  const option = {
		        baseOption: {
		            title : {
		                text: '南丁格尔玫瑰图',
		                subtext: '纯属虚构',
		                x:'center'
		            },
		            tooltip : {
		                trigger: 'item',
		                formatter: "{a} <br/>{b} : {c} ({d}%)"
		            },
		            legend: {
		                data:['rose1','rose2','rose3','rose4','rose5','rose6','rose7','rose8']
		            },
		            toolbox: {
		                show : true,
		                feature : {
		                    mark : {show: true},
		                    dataView : {show: true, readOnly: false},
		                    magicType : {
		                        show: true,
		                        type: ['pie', 'funnel']
		                    },
		                    restore : {show: true},
		                    saveAsImage : {show: true}
		                }
		            },
		            calculable : true,
		            series : [
		                {
		                    name:'半径模式',
		                    type:'pie',
		                    roseType : 'radius',
		                    label: {
		                        normal: {
		                            show: false
		                        },
		                        emphasis: {
		                            show: true
		                        }
		                    },
		                    lableLine: {
		                        normal: {
		                            show: false
		                        },
		                        emphasis: {
		                            show: true
		                        }
		                    },
		                    data:[
		                        {value:10, name:'rose1'},
		                        {value:5, name:'rose2'},
		                        {value:15, name:'rose3'},
		                        {value:25, name:'rose4'},
		                        {value:20, name:'rose5'},
		                        {value:35, name:'rose6'},
		                        {value:30, name:'rose7'},
		                        {value:40, name:'rose8'}
		                    ]
		                },
		                {
		                    name:'面积模式',
		                    type:'pie',
		                    roseType : 'area',
		                    data:[
		                        {value:10, name:'rose1'},
		                        {value:5, name:'rose2'},
		                        {value:15, name:'rose3'},
		                        {value:25, name:'rose4'},
		                        {value:20, name:'rose5'},
		                        {value:35, name:'rose6'},
		                        {value:30, name:'rose7'},
		                        {value:40, name:'rose8'}
		                    ]
		                }
		            ]
		        },
		        media: [
		            {
		                option: {
		                    legend: {
		                        right: 'center',
		                        bottom: 0,
		                        orient: 'horizontal'
		                    },
		                    series: [
		                        {
		                            radius: [20, '50%'],
		                            center: ['25%', '50%']
		                        },
		                        {
		                            radius: [30, '50%'],
		                            center: ['75%', '50%']
		                        }
		                    ]
		                }
		            },
		            {
		                query: {
		                    minAspectRatio: 1
		                },
		                option: {
		                    legend: {
		                        right: 'center',
		                        bottom: 0,
		                        orient: 'horizontal'
		                    },
		                    series: [
		                        {
		                            radius: [20, '50%'],
		                            center: ['25%', '50%']
		                        },
		                        {
		                            radius: [30, '50%'],
		                            center: ['75%', '50%']
		                        }
		                    ]
		                }
		            },
		            {
		                query: {
		                    maxAspectRatio: 1
		                },
		                option: {
		                    legend: {
		                        right: 'center',
		                        bottom: 0,
		                        orient: 'horizontal'
		                    },
		                    series: [
		                        {
		                            radius: [20, '50%'],
		                            center: ['50%', '30%']
		                        },
		                        {
		                            radius: [30, '50%'],
		                            center: ['50%', '70%']
		                        }
		                    ]
		                }
		            },
		            {
		                query: {
		                    maxWidth: 500
		                },
		                option: {
		                    legend: {
		                        right: 10,
		                        top: '15%',
		                        orient: 'vertical'
		                    },
		                    series: [
		                        {
		                            radius: [20, '50%'],
		                            center: ['50%', '30%']
		                        },
		                        {
		                            radius: [30, '50%'],
		                            center: ['50%', '75%']
		                        }
		                    ]
		                }
		            }
		        ]
		    };
		    myChart3.setOption(option);
			}
		},
		mounted() {
			this.drawCharts()
		}
	}
</script>
<style scoped lang="scss">
	.chart {
		height: 300px;
	}
</style>