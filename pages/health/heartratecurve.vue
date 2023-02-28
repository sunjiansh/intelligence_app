<template>
		<view class="address-management">
			<view class="item">
				<view class="address">
					<view class="consignee">
						心率
						<text style="float: right;"></text>
					</view>
				</view>
				<view class="operation acea-row row-between-wrapper">
					<view class="acea-row row-middle">
						<view></view>
					</view>
					<view class="acea-row row-middle">
						<text style="align-items: center;flex-direction: column;display: flex;" @click.native="openDateObjPickerPicker">
						{{this.dateStr}}
						</text>
					</view>
				</view>
				<view class="address">
					<view class="consignee">
						<view id="main" class="echarts" style="height: 250px;width: 100%;"></view>
					</view>
				</view>
		    </view>
			
			
			<view class="item">
				<view class="address">
					<view class="consignee">
						养生百科
						<text style="float: right;"></text>
					</view>
				</view>
				<view class="operation acea-row row-between-wrapper">
					<view class="acea-row row-middle">
						<view></view>
					</view>
					<view class="acea-row row-middle">
						<text style="align-items: center;flex-direction: column;display: flex;" @click.native="">
						更多
						</text>
					</view>
				</view>
				
				<view v-for="(item, index) in articleList"  class="address">
					<view class="consignee" @click.native="openArticle(item.id)">
						{{item.title}}
					</view>
				</view>
			</view>
			
			<template>
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
			</template>
		</view>
</template>

<script>
	import * as echarts from 'echarts';
	import { Toast,Range,DatetimePicker  } from 'mint-ui';
	import{getHeartRateByDay,getHealthArticleTop5} from "@/api/systemsetting.js"
	
	export default {
		
		data() {
			return {
				uid:null,
				option:null,
				myChart:null,
				dateStr:'',
				dateObj:new Date(),
				allSleepTimeStr:'',
				articleList:[]
			}
		},
		methods: {
			renderItem(params, api) {
			  
			},
			renderData(res){
				let xArr = []
				let yArr = []
				let average = 0
				if(res!=null){
					for(let i=0;i<res.length;i++){
						let data = res[i]
						xArr[i] = data.hourMinutes
						yArr[i] = data.heartRate
						average += data.heartRate
					}
				}
				
				let x = (average/res.length).toFixed(0);
				
				this.option ={
					  title: {
						text: x+"次/分钟（平均）",
						left: '1%'
					  },
					  grid: {
						right: '5%',
						height:150
					  },
					  xAxis: {
						type: 'category',
						boundaryGap: false,
						data: xArr
					  },
					  yAxis: {
						type: 'value',
						//boundaryGap: [0, '100%']
					  },
					  series: [
						{
						  name: 'Fake Data',
						  type: 'line',
						  symbol: 'none',
						  sampling: 'lttb',
						  itemStyle: {
							color: 'rgb(255, 70, 131)'
						  },
						  areaStyle: {
							color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
							  {
								offset: 0,
								color: 'rgb(255, 158, 68)'
							  },
							  {
								offset: 1,
								color: 'rgb(255, 70, 131)'
							  }
							])
						  },
						  data: yArr
						}
					  ]
					};
				this.myChart.setOption(this.option);
			},
			openDateObjPickerPicker(){
				this.$refs.dateObjPicker.open();
			},
			handleConfirm(){
				this.dateStr = this.dateFormat("YYYY-mm-dd", this.dateObj)
				//this.initData();
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
				this.dateStr = this.dateFormat("YYYY-mm-dd", this.dateObj)
				getHeartRateByDay(this.dateObj,this.uid).then(res => {
					if(res.data==null){
						this.renderData(null);
						let instance = Toast("无数据");
						setTimeout(() => {
						  instance.close();
						}, 2000);
						return;
					}
					this.renderData(res.data);
				}).catch(err => {
					let instance = Toast(err.msg);
					setTimeout(() => {
					  instance.close();
					}, 2000);
					console.log(err);
				})
				
				uni.stopPullDownRefresh();
				
			},
			handleConfirm(){
				this.initData()
			},
			getHealthArticleTop5(){
				getHealthArticleTop5().then(res => {
					if(res.data!=null){
						this.articleList = res.data
					}
				}).catch(err => {
					let instance = Toast(err.msg);
					setTimeout(() => {
					  instance.close();
					}, 2000);
					console.log(err);
				})
				uni.stopPullDownRefresh();
			},
			openArticle(id){
				//alert(id)
				this.$yrouter.push({
				  path: "/pages/xxxx",
				  query: { id: id }
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
			let chartDom = document.getElementById('main');
			this.myChart = echarts.init(chartDom);
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
</style>
