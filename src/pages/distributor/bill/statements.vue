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
			<el-col :span="24">
				<div id="chart4" class="chart"></div>
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
				const myChart4 = echarts.init(document.getElementById('chart4'));
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
		                subtext: '',
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
		    const posList = [
				    'left', 'right', 'top', 'bottom',
				    'inside',
				    'insideTop', 'insideLeft', 'insideRight', 'insideBottom',
				    'insideTopLeft', 'insideTopRight', 'insideBottomLeft', 'insideBottomRight'
				];
				app.configParameters = {
				    rotate: {
				        min: -90,
				        max: 90
				    },
				    align: {
				        options: {
				            left: 'left',
				            center: 'center',
				            right: 'right'
				        }
				    },
				    verticalAlign: {
				        options: {
				            top: 'top',
				            middle: 'middle',
				            bottom: 'bottom'
				        }
				    },
				    position: {
				        options: echarts.util.reduce(posList, function (map, pos) {
				            map[pos] = pos;
				            return map;
				        }, {})
				    },
				    distance: {
				        min: 0,
				        max: 100
				    }
				};
				app.config = {
				    rotate: 90,
				    align: 'left',
				    verticalAlign: 'middle',
				    position: 'insideBottom',
				    distance: 15,
				    onChange: function () {
				        var labelOption = {
				            normal: {
				                rotate: app.config.rotate,
				                align: app.config.align,
				                verticalAlign: app.config.verticalAlign,
				                position: app.config.position,
				                distance: app.config.distance
				            }
				        };
				        myChart.setOption({
				            series: [{
				                label: labelOption
				            }, {
				                label: labelOption
				            }, {
				                label: labelOption
				            }, {
				                label: labelOption
				            }]
				        });
				    }
				};
		    const labelOption = {
				    normal: {
				        show: true,
				        position: app.config.position,
				        distance: app.config.distance,
				        align: app.config.align,
				        verticalAlign: app.config.verticalAlign,
				        rotate: app.config.rotate,
				        formatter: '{c}  {name|{a}}',
				        fontSize: 16,
				        rich: {
				            name: {
				                textBorderColor: '#fff'
				            }
				        }
				    }
				}
				const option2 = {
				    color: ['#003366', '#006699', '#4cabce', '#e5323e'],
				    tooltip: {
				        trigger: 'axis',
				        axisPointer: {
				            type: 'shadow'
				        }
				    },
				    legend: {
				        data: ['Forest', 'Steppe', 'Desert', 'Wetland']
				    },
				    toolbox: {
				        show: true,
				        orient: 'vertical',
				        left: 'right',
				        top: 'center',
				        feature: {
				            mark: {show: true},
				            dataView: {show: true, readOnly: false},
				            magicType: {show: true, type: ['line', 'bar', 'stack', 'tiled']},
				            restore: {show: true},
				            saveAsImage: {show: true}
				        }
				    },
				    calculable: true,
				    xAxis: [
				        {
				            type: 'category',
				            axisTick: {show: false},
				            data: ['2012', '2013', '2014', '2015', '2016']
				        }
				    ],
				    yAxis: [
				        {
				            type: 'value'
				        }
				    ],
				    series: [
				        {
				            name: 'Forest',
				            type: 'bar',
				            barGap: 0,
				            label: labelOption,
				            data: [320, 332, 301, 334, 390]
				        },
				        {
				            name: 'Steppe',
				            type: 'bar',
				            label: labelOption,
				            data: [220, 182, 191, 234, 290]
				        },
				        {
				            name: 'Desert',
				            type: 'bar',
				            label: labelOption,
				            data: [150, 232, 201, 154, 190]
				        },
				        {
				            name: 'Wetland',
				            type: 'bar',
				            label: labelOption,
				            data: [98, 77, 101, 99, 40]
				        }
				    ]
				};
		    myChart3.setOption(option);
		    myChart4.setOption(option2);
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