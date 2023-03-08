<template>
	
	<view style="height: 100%;">
		<view>
			<!-- <tui-button height="68rpx" :size="26" type="warning" shape="" @click="openDateObjPickerPicker">选择日期</tui-button>
			<text style="align-items: center;flex-direction: column;display: flex;">{{this.dateStr}}</text> -->
			
			<picker style="align-items: center;flex-direction: column;display: flex;height: 80rpx;" 
			mode="date" :value="dateStr" fields="day" @change="setDateStr">
				<view class="uni-input">{{dateStr}}</view>
			</picker>
		</view>
			<map
				id="myMap"
				:markers="markers"
				:polyline="polyline"
				:include-points="polyline[0].points"
				:latitude="polyline[0].points[0].latitude"
				:longitude="polyline[0].points[0].longitude"
				style="width: 100%; height:100%;"
			>
			</map>
		</view>
	</view>
	
</template>

<script>
	
	
	import { getUserInfo} from '@/api/user'
	import{getMyHistoryTrace} from "@/api/systemsetting.js"
	//import {initMap} from "@/utils/TMap"
	
	
	export default {
		data() {
			return {
				dateObj:new Date(),
				dateStr:'',
				mapContext: null,			//地图对象
				startMove: false,			//是否开始回放
				nextPointIndex: 1,		//下一个坐标点的索引
				durationTime: 1000,		//相邻两点动画持续时长默认1秒
				polyline: [
					{
						width: 15,
						points: [{latitude: 39.997761, longitude: 116.478935}],
						arrowLine: true,
						dottedLine:true,
						color: '#3591FC',
					}
				],
				markers: []
			}
		},
		methods: {
			initLine(){
				//this.dateStr = this.dateFormat("YYYY-mm-dd", this.dateObj)
				//后台获取数据
				getMyHistoryTrace(this.dateObj).then(res => {
					//this.form = res.data
					//console.error(res.data)
					
					
					this.polyline[0].points = []
					this.markers = []
					
					if(res.data != null && res.data.length > 0){
						for(let i=0;i<res.data.length;i++){
							let lat = res.data[i].lat
							let lon = res.data[i].lon
							this.polyline[0].points.push({latitude: lat, longitude: lon})
						}
						this.initMarkers()
					}else{
						uni.showToast({
						  title: "无轨迹数据",
						  icon: 'none',
						  duration: 2000,
						})
					}
				}).catch(err => {
					uni.showToast({
					  title: err.msg,
					  icon: 'none',
					  duration: 2000,
					})
					console.log(err)
				})
			},
			setDateStr(e){
				this.dateStr = e.detail.value
				this.dateObj = new Date(e.detail.value)
				//this.dateStr = this.dateFormat("YYYY-mm-dd HH:MM:SS", this.dateObj)
				this.initLine()
			},
			initMarkers() {
				//this.markers[0].latitude = this.polyline[0].points[0].latitude
				//this.markers[0].longitude = this.polyline[0].points[0].longitude
				console.error(this.polyline[0])
				if(this.polyline[0].points.length > 2){
					let index = this.polyline[0].points.length-1
					this.markers = [
						{
							id: 1,
							width: 140,
							height: 140,
							latitude:  this.polyline[0].points[0].latitude,
							longitude: this.polyline[0].points[0].longitude,
							iconPath: '/static/end.png',
							anchor: {x: 0.5, y: 1}
						},
						{
							id: 2,
							width: 140,
							height: 140,
							latitude:  this.polyline[0].points[index].latitude,
							longitude: this.polyline[0].points[index].longitude,
							iconPath: '/static/start.png',
							anchor: {x: 0.5, y: 1}
						}
					]
				}
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
		},
		mounted() {
			this.dateStr = this.dateFormat("YYYY-mm-dd", this.dateObj)
			this.initLine()
		}
	}
</script>

<style scoped>
		.map{
			height: 100%;
			
		}
</style>
