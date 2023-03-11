<template>
		<view class="address-management">
			<view class="item">
				<view class="cu-bar bg-white solid-bottom">
					<view class="action">
						<text class="cuIcon-titles text-pink"></text> 跌倒
					</view>
				</view>
				<view class="operation acea-row row-between-wrapper">
					<view class="acea-row row-middle">
						<view></view>
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
				<!-- <view class="address">
					<view class="consignee"> -->
						<!-- <view id="main" class="echarts" style="height: 250px;width: 100%;"></view> -->
						<!-- <view class="echarts" style="height: 250px;width: 100%;"><l-echart ref="chart" @finished="initData"></l-echart></view> -->
					<!-- </view>
				</view> -->
				
				<view v-if="fallDownList.length == 0" style="height: 250px;width: 100%;text-align: center;">
					当日无跌倒数据
				</view>
				
				
				<view v-for="(item, index) in fallDownList"  class="address">
					<view class="consignee">
						跌倒一次
						<view style="float: right;">
							{{item.hourMinutes}}
						</view>
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
	import{getFallDownByDay,getHealthArticleTop5} from "@/api/systemsetting.js"
	
	export default {
		
		data() {
			return {
				uid:null,
				option:null,
				myChart:null,
				dateStr:'',
				dateObj:new Date(),
				articleList:[],
				fallDownList:[]
			}
		},
		methods: {
			renderItem(params, api) {
			  
			},
			renderData(res){
				let xArr = []
				let yArr = []
				let total = 0
				if(res!=null){
					for(let i=0;i<res.length;i++){
						let data = res[i]
						xArr[i] = data.hourMinutes
						yArr[i] = 1
						total += 1
					}
				}
				this.option ={
					  title: {
						text: "当日跌倒次数："+total+"次",
						left: '1%'
					  },
					  grid: {
						right: '5%',
						height:150
					  },
					  xAxis: {
						type: 'category',
						boundaryGap: false,
						//data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
						data: xArr
					  },
					  yAxis: {
						type: 'value',
						// axisLabel: {
						//   formatter: '{value} °C'
						// }
					  },
					  series: [
						{
						  name: '跌倒次数',
						  type: 'bar',
						  //data: [10, 11, 13, 11, 12, 12, 9],
						  data: yArr,
						  markPoint: {
							  data: [
								{ type: 'max', name: '最大' },
							  ]
							}
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
				//this.dateStr = this.dateFormat("YYYY-mm-dd", this.dateObj)
				//先清空
				this.fallDownList = []
				
				getFallDownByDay(this.dateObj,this.uid).then(res => {
					if(res.data==null || res.data.length==0){
						uni.showToast({
						  title: '无数据',
						  icon: 'none',
						  duration: 2000,
						})
						//this.renderData([]);
						return;
					}
					
					this.fallDownList = res.data
					//this.renderData(res.data);
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
