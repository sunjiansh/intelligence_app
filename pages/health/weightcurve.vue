<template>
		<view class="address-management">
			<view class="item">
				<view class="cu-bar bg-white solid-bottom">
					<view class="action">
						<text class="cuIcon-titles text-yellow"></text> 体重
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
				<view class="address">
					<view class="consignee">
						<!-- <view id="main" class="echarts" style="height: 250px;width: 100%;"></view> -->
						<view class="echarts" style="height: 250px;width: 100%;"><l-echart ref="chart" @finished="initData"></l-echart></view>
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
	import{getWeightByDay,getHealthArticleTop5} from "@/api/systemsetting.js"
	
	export default {
		
		data() {
			return {
				uid:null,
				option:null,
				myChart:null,
				dateStr:'',
				dateObj:new Date(),
				articleList:[]
			}
		},
		methods: {
			renderItem(params, api) {
			  
			},
			renderData(res){
				let xArr = []
				let bodyWeightArr = []
				let bodyBmiArr = []
				
				if(res!=null){
					for(let i=0;i<res.length;i++){
						let data = res[i]
						xArr[i] = data.hourMinutes
						bodyWeightArr[i] = data.bodyWeight
						bodyBmiArr[i] = data.bodyBmi
					}
				}
				
				let labelOption = {
				  show: true,
				  align: 'left',
				   rotate: 90,
				  //formatter: '{c}  {name|{a}}',
				  fontSize: 16,
				  rich: {
				    name: {}
				  }
				}
				
				this.option = {
				  tooltip: {
					trigger: 'axis',
					axisPointer: {
					  type: 'shadow'
					}
				  },
				  legend: {
					data: ['体重(kg)', 'BMI(kg/m^2)']
				  },
				  xAxis: [
					{
					  type: 'category',
					  axisTick: { show: false },
					  data: xArr
					}
				  ],
				  yAxis: [
					{
					  type: 'value'
					}
				  ],
				  series: [
					{
					  name: '体重(kg)',
					  type: 'bar',
					  barGap: 0,
					  label: labelOption,
					  emphasis: {
						focus: 'series'
					  },
					  data: bodyWeightArr
					},
					{
					  name: 'BMI(kg/m^2)',
					  type: 'bar',
					  label: labelOption,
					  emphasis: {
						focus: 'series'
					  },
					  data: bodyBmiArr
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
				getWeightByDay(this.dateObj,this.uid).then(res => {
					if(res.data==null || res.data.length==0){
						uni.showToast({
						  title: '无数据',
						  icon: 'none',
						  duration: 2000,
						})
						this.renderData([]);
						return;
					}
					this.renderData(res.data);
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
