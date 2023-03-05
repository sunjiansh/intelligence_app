<template>
	
	<view style="height: 100%;">
		<view>
			<!-- <tui-button height="68rpx" :size="26" type="warning" shape="" @click="openDateObjPickerPicker">选择日期</tui-button>
			<text style="align-items: center;flex-direction: column;display: flex;">{{this.dateStr}}</text> -->
			
			<picker style="align-items: center;flex-direction: column;display: flex;" 
			mode="date" :value="dateStr" fields="day" @change="setDateStr">
			
				<view class="uni-input">{{dateStr}}</view>
			</picker>
			
		</view>
		<view id="map" style="height: 100%;">
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
	
	
	import { getUserInfo} from '@/api/user'
	import{getMyHistoryTrace} from "@/api/systemsetting.js"
	//import { Toast,Range,DatetimePicker  } from 'mint-ui';
	import {initMap} from "@/utils/TMap"
	
	
	
	export default {
		data() {
			return {
				TXMap:null,
				tMap:null,
				dateObj:new Date(),
				dateStr:'',
				path: [
				  // new TMap.LatLng(39.98481500648338, 116.30571126937866),
				  // new TMap.LatLng(39.982266575222155, 116.30596876144409),
				  // new TMap.LatLng(39.982348784165886, 116.3111400604248),
				  // new TMap.LatLng(39.978813710266024, 116.3111400604248),
				  // new TMap.LatLng(39.978813710266024, 116.31699800491333),
				  // new TMap.LatLng(39.988813710266024, 116.31699800491333),
				  // new TMap.LatLng(39.989813710266024, 116.31699800491333),
				  // new TMap.LatLng(39.990813710266024, 116.31699800491333),
				  // new TMap.LatLng(39.98481500648338, 116.30571126937866),
				],
				polylineLayer: null,
				marker: null
			}
		},
		methods: {
			initLine(){
				//this.dateStr = this.dateFormat("YYYY-mm-dd", this.dateObj)
				//后台获取数据
				getMyHistoryTrace(this.dateObj).then(res => {
					//this.form = res.data
					//console.error(res.data)
					
					//this.marker.setGeometries([]);
					this.marker.remove(["start","end"])
					this.polylineLayer.remove("erasePath")
					
					if(res.data != null && res.data.length > 0){
						this.path = []
						for(let i=0;i<res.data.length;i++){
							let lat = res.data[i].lat
							let lon = res.data[i].lon
							this.path.push(new TMap.LatLng(lat, lon))
						}
						
						this.marker.setGeometries([
							// {
							//   id: 'car',
							//   styleId: 'car-down',
							//   position: this.path[this.path.length-1],
							// },
							{
							  id: 'start',
							  styleId: 'start',
							  position: this.path[this.path.length-1],
							},
							{
							  id: 'end',
							  styleId: 'end',
							  position: this.path[0],
							}
						]);
						this.polylineLayer.add([
							{
							  id: 'erasePath',
							  styleId: 'style_blue',
							  paths: this.path,
							}
						])
						this.selfAdaptionMarker();
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
					console.log(err);
				})
				
				
			},
			openDateObjPickerPicker(){
				//this.$refs.dateObjPicker.open();
			},
			setDateStr(e){
				this.dateStr = e.detail.value
				this.dateObj = new Date(e.detail.value)
				//this.dateStr = this.dateFormat("YYYY-mm-dd HH:MM:SS", this.dateObj)
				this.initLine();
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
			initPolylineLayer(){
				this.polylineLayer = new TMap.MultiPolyline({
				  map:this.tMap, // 绘制到目标地图
				  // 折线样式定义
				  styles: {
					style_blue: new TMap.PolylineStyle({
					  color: '#1169EE', // 线填充色
					  width: 4, // 折线宽度
					  borderWidth: 2, // 边线宽度
					  borderColor: '#FFF', // 边线颜色
					  lineCap: 'round', // 线端头方式
					  eraseColor: 'rgb(172,172,172)',//擦除路径的颜色
					}),
				  },
				  geometries: [],
				});
			},
			 initMarker(){
				 this.marker = new TMap.MultiMarker({
				   map:this.tMap, // 绘制到目标地图
				   styles: {
					 'car-down': new TMap.MarkerStyle({
					   width: 40,
					   height: 40,
					   anchor: {
						 x: 20,
						 y: 20,
					   },
					   faceTo: 'map',
					   rotate: 180,
					   src: 'https://mapapi.qq.com/web/lbs/javascriptGL/demo/img/car.png',
					 }),
					 start: new TMap.MarkerStyle({
					   width: 25,
					   height: 35,
					   anchor: {x: 16, y: 32},
					   src: 'https://mapapi.qq.com/web/lbs/javascriptGL/demo/img/start.png',
					 }),
					 end: new TMap.MarkerStyle({
					   width: 25,
					   height: 35,
					   anchor: {x: 16, y: 32},
					   src: 'https://mapapi.qq.com/web/lbs/javascriptGL/demo/img/end.png',
					 }),
				   },
				   geometries: [],
				 });
			 },
		  // 设置自适应显示marker
		   selfAdaptionMarker() {
			  let markersArr = this.marker.geometries
			 let bounds = new TMap.LatLngBounds();
			 markersArr.forEach(item => {
			   if (bounds.isEmpty() || !bounds.contains(item.position)) {
				 bounds.extend(item.position);
			   }
			 })
			 //   设置地图可是范围
			 this.tMap.fitBounds(bounds, {
			   padding: 100 //自适应边距
			 })
		   },
		   init(){
			   initMap().then((TMap) => {
					this.TXMap = TMap;
					//let center = new TMap.LatLng(30, 119)
					 let center = new TMap.LatLng(39.984104, 116.307503);
					this.tMap = new TMap.Map("map", {
					  center: center, //设置地图中心点坐标
					  zoom: 12, //设置地图缩放级别
					  //viewMode: "2D",
					});
					//取消显示缩放控件、旋转控件、比例尺控件
					this.tMap.removeControl(TMap.constants.DEFAULT_CONTROL_ID.ZOOM)
					this.tMap.removeControl(TMap.constants.DEFAULT_CONTROL_ID.ROTATION)
					this.tMap.removeControl(TMap.constants.DEFAULT_CONTROL_ID.SCALE)
					
					//初始化地图上的轨迹数据
					this.initPolylineLayer();
					this.initMarker();
					this.initLine();
					
			   })
		   }
			
		},
		mounted() {
			this.dateStr = this.dateFormat("YYYY-mm-dd", this.dateObj)
			this.init()
		}
	}
</script>

<style scoped>
		.map{
			height: 100%;
			
		}
</style>
