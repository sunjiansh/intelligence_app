<template>
		<!-- <view>
			<view id="main" class="echarts" style="height: 500px;width: 100%;"></view>
		</view> -->
		<view class="address-management">
			<view class="item">
				<view class="cu-bar bg-white solid-bottom">
					<view class="action">
						<text class="cuIcon-titles text-orange"></text> 睡眠
					</view>
				</view>
				<view class="operation acea-row row-between-wrapper">
					<view class="acea-row row-middle">
						<view style="font-size: 25px;">{{this.allSleepTimeStr}}</view>
					</view>
					<view class="acea-row row-middle">
						<!-- <text style="align-items: center;flex-direction: column;display: flex;" @click.native="openDateObjPickerPicker">
						{{this.dateStr}}
						</text> -->
						<!-- <picker mode="date" :value="dateStr" fields="day"  @change="handleConfirm">
							<view class="uni-input">{{dateStr}}</view>
						</picker> -->
						<view class="cu-list menu sm-border">
						    <view class="cu-item arrow" @click="">
								<picker mode="date" :value="dateStr" fields="day"  @change="handleConfirm">
									<view class="uni-input">{{dateStr}}</view>
								</picker>
							</view>
						</view>
					</view>
				</view>
				<view class="address">
					<view class="">
						就寝时间<view style="font-size: 17px;">{{sleepDown}}</view>
						起床时间<view style="font-size: 17px;">{{sleepUp}}</view>
						<!-- <view id="main" class="echarts" style="height: 250px;width: 100%;"></view> -->
						<view class="echarts" style="height: 270px;width: 100%;"><l-echart ref="chart" @finished="initData"></l-echart></view>
					</view>
				</view>
		    </view>
			
			<view class="cu-bar bg-white solid-bottom">
				<view class="action">
					<text class="cuIcon-titles text-orange"></text> 养生百科
				</view>
				<view class="action" @click="openArticleList">
					更多
				</view>
			</view>
			
			<view class="item">
				<view v-for="(item, index) in articleList"  class="address">
					<view class="consignee" @click="openArticle(item.id)">
						{{item.title}}
					</view>
				</view>
				<!-- <view class="address">
					<view class="consignee">
						谢谢谢谢
					</view>
				</view> -->
				
			</view>
			
			<!-- <template>
			  <mt-datetime-picker
				ref="dateObjPicker"
				v-model="dateObj"
				type="date"
				year-format="{value} 年"
				month-format="{value} 月"
				date-format="{value} 日"
				@confirm="handleConfirm"
				>
			  </mt-datetime-picker>
			</template> -->
		</view>
</template>

<script>
	import * as echarts from 'echarts';
	//import { Toast,Range,DatetimePicker  } from 'mint-ui';
	import{getSleepDataByDay,getHealthArticleTop5} from "@/api/systemsetting.js"
	
	export default {
		
		data() {
			return {
				uid:null,
				option:null,
				myChart:null,
				dateStr:'',
				dateObj:new Date(),
				allSleepTimeStr:'',
				articleList:[],
				sleepDown:'',
				sleepUp:''
			}
		},
		methods: {
			renderItem(params, api) {
			  var categoryIndex = api.value(0);
			  var start = api.coord([api.value(1), categoryIndex]);
			  var end = api.coord([api.value(2), categoryIndex]);
			  var height = api.size([0, 1])[1] * 0.8;
			  //var height = 30
			  var rectShape = echarts.graphic.clipRectByRect(
			    {
			      x: start[0],
			      y: start[1] - height / 2,
			      width: end[0] - start[0],
			      height: height
			    },
			    {
			      x: params.coordSys.x,
			      y: params.coordSys.y,
			      width: params.coordSys.width,
			      height: params.coordSys.height
			    }
			  );
			  return (
			    rectShape && {
			      type: 'rect',
			      transition: ['shape'],
			      shape: rectShape,
			      style: api.style()
			    }
			  );
			},
			renderData(res){
				var data = [];
				//res  = '9220000122009999992000002000220000011000000000000020002200111000000000000000000000000000000000000200000022222';
				
				//let res  = [0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,2,2,2,2,2,0,0,0,2,2,2,0,0,1,,9,1,2,2,2,2,2];
				var resCount = res.length;
				var startTime = 0;
				var categories = ['深睡眠', '浅睡眠','清醒' ];
				var types = [
				  { name: '深睡眠', color: '#5233CC' },
				  { name: '浅睡眠', color: '#C01D7F' },
				  { name: '清醒', color: '#CECE0F' },
				];
				
				categories.forEach(function (category, index) {
				  var baseTime = startTime;
				  for (var i = 0; i < resCount; i++) {
				    var duration = 1;
					var endTime = baseTime + duration;
					var v = res.charAt(i)
				    if(index == 0 && v == 1){//深睡眠
						data.push({
						  value: [index, baseTime, endTime, duration],
						  itemStyle: {
						    normal: {
						      color: types[0].color
						    }
						  }
						})
					}else if(index == 1 && v == 0){//浅睡眠
						data.push({
						  value: [index, baseTime, endTime, duration],
						  itemStyle: {
						    normal: {
						      color: types[1].color
						    }
						  }
						})
					}else if(index == 2 && v == 2){//清醒
						data.push({
						  value: [index, baseTime, endTime, duration],
						  itemStyle: {
						    normal: {
						      color: types[2].color
						    }
						  }
						})
					}else{
						data.push({
						  value: [index, baseTime, endTime, duration],
						  itemStyle: {
						    normal: {
						      color: 'transparent'
						    }
						  }
						})
					}
				    baseTime = endTime;
				  }
				});
				
				this.option = {
				  tooltip: {},
				  title: {
					text: '',
					textStyle: {
					  fontSize: 12,
					  fontWeight: 'normal'
					}
				  },
				  grid: {
				    height: 150,
					right: '5%',
					left: '15%',
				  },
				  xAxis: {
				  //  min: 0,
				    //scale: true,
					splitLine: {
						show: false // 显示网格线
					},
				    axisLabel: {
				      formatter: function (val) {
						return "";
				        //return val * 5 + '分钟';
				      }
				    }
				  },
				  yAxis: {
				    data: categories,
					splitLine: {
						show: true, // 显示网格线
						lineStyle: {
						  type: 'dashed' // 网格线设置为虚线
						},
					},
					axisTick: {
						show: false // 取消刻度
					},
					// axisLine: {
					// 	lineStyle: {
					// 	  color: '#fff' // 坐标轴颜色
					// 	}
					// },
				  },
				  series: [
				    {
				      type: 'custom',
				      renderItem: this.renderItem,
				      itemStyle: {
				        opacity: 0.8
				      },
				      encode: {
				        x: [1, 2],
				        y: 0
				      },
				      data: data
				    }
				  ]
				};
				this.$refs.chart.init(echarts, chart => {
				    chart.setOption(this.option);
				});
				//this.myChart.setOption(this.option);
			},
			openDateObjPickerPicker(){
				//this.$refs.dateObjPicker.open();
			},
			handleConfirm(e){
				this.dateStr = e.detail.value
				this.dateObj = new Date(e.detail.value)
				//this.dateStr = this.dateFormat("YYYY-mm-dd", this.dateObj)
				this.initData();
			},
			dateFormat(fmt, date) {
				let ret;
				const opt = {
					"Y+": date.getFullYear().toString(),        // 年
					"m+": (date.getMonth() + 1).toString(),     // 月
					"d+": date.getDate().toString(),            // 日
					"H+": date.getHours().toString(),           // 时
					"M+": date.getMinutes().toString(),         // 分
					"S+": date.getSeconds().toString()          // 秒
					// 有其他格式化字符需求可以继续添加，必须转化成字符串
				};
				for (let k in opt) {
					ret = new RegExp("(" + k + ")").exec(fmt);
					if (ret) {
						fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
					};
				};
				return fmt;
			},
			initData(){
				getSleepDataByDay(this.dateObj,this.uid).then(res => {
					//console.error(res.data == null);
					//alert(res.data.sleepLine);
					if(res.data == null){
						uni.showToast({
						  title: '无数据',
						  icon: 'none',
						  duration: 2000,
						})
						this.renderData("");
						this.sleepDown = ""
						this.sleepUp = ""
						this.allSleepTimeStr = ""
						return;
					}
					this.renderData(res.data.sleepLine);
					this.sleepDown = res.data.sleepDownTime
					this.sleepUp = res.data.sleepUpTime
					this.allSleepTimeStr = this.getDateTime(res.data.allSleepTime)
					
				}).catch(err => {
					uni.showToast({
					  title: err.msg,
					  icon: 'none',
					  duration: 2000,
					})
					console.log(err);
				})
				
				uni.stopPullDownRefresh();
				
			},
			getDateTime(time) {
				if (time >= 60 && time <= 3600) {
					//time = parseInt(time / 60) + "分" + time % 60 + "秒";
					time = parseInt(time / 60) + "分";
				}else {
					if (time > 3600) {
						//time = parseInt(time / 3600) + "小时" + parseInt(((time % 3600) / 60)) + "分" + time % 60 + "秒";
						time = parseInt(time / 3600) + "小时" + parseInt(((time % 3600) / 60)) + "分";
					}else {
						//time = time + "秒";
					}
				}
				return time;
			},
			getHealthArticleTop5(){
				getHealthArticleTop5().then(res => {
					if(res.data!=null){
						this.articleList = res.data
					}
				}).catch(err => {
					uni.showToast({
					  title: err.msg,
					  icon: 'none',
					  duration: 2000,
					})
					console.log(err);
				})
				uni.stopPullDownRefresh();
			},
			openArticle(id){
				//alert(id)
				this.$yrouter.push({
				  path: "/pages/health/articledetail",
				  query: { id: id }
				});
			},
			openArticleList(){
				this.$yrouter.push({
				  path: "/pages/health/articlelist"
				});
			},
			onLoad: function (options) {
				// setTimeout(function () {
				// 	console.log('start pulldown');
				// }, 1000);
				//uni.startPullDownRefresh();
			},
			onPullDownRefresh() {
				this.initData()
				this.getHealthArticleTop5()
			}
		},
		created() {
			
		},
		mounted() {
			this.uid = this.$yroute.query.id
			//let chartDom = document.getElementById('main');
			//this.myChart = echarts.init(chartDom);
			
			this.dateStr = this.dateFormat("YYYY-mm-dd", this.dateObj)
			
			this.initData()
			//this.renderData('9220000122009999992000002000220000011000000000000020002200111000000000000000000000000000000000000200000022222')
			
			this.getHealthArticleTop5()
		}
	}
</script>

<style scoped lang="less">
	.address-management.on {
	  background-color: #fff;
	  height: 100vh;
	}
	
	@import '/components/colorui/icon.css';
	@import '/components/colorui/main.css';
</style>
