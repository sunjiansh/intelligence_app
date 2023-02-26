<template>
	<view>
		<view>
			<mt-field label="ID" v-if="false" v-model="form.id"></mt-field>
			<mt-field label="用户名" placeholder="请输入用户名" v-if="false" v-model="form.memberId"></mt-field>
			<mt-field label="用户名" placeholder="请输入用户名" v-if="false" v-model="form.memberName"></mt-field>
			<mt-field label="围栏名称" placeholder="请输入围栏名称" v-model="form.name"></mt-field>
			<mt-field label="地址" placeholder="请输入地址" v-model="form.address"></mt-field>
			<mt-field label="纬度" placeholder="请输入数字" :disabled="true" type="number" v-model="form.lat"></mt-field>
			<mt-field label="经度" placeholder="请输入数字" :disabled="true" type="number" v-model="form.lon"></mt-field>
			<mt-field label="半径(单位:米)" placeholder="请输入数字" type="number" v-model="form.regionRange"></mt-field>
		</view>
		<view>
			
               <mt-field v-model="searchAddress" placeholder="请输入检索地址" />
			   <mt-button type="primary" @click.native="search" style="width:100%">搜索地址</mt-button>
        </view>
		<view id="map" style="height: 400px;">
		
		</view>
		
		<view style="height:100rpx;"></view>
		
		<view class="footer acea-row row-between-wrapper">
			<mt-button type="default" style="width:50%">取消</mt-button>
			<mt-button type="primary" @click.native="save" style="width:50%">保存</mt-button>
		</view>
	</view>
	
</template>

<script>
	
	import { getUserInfo} from '@/api/user'
	import{addGeography,editGeography,getAddressByLatLng,getLatLngByAddress,getSGeographyById} from "@/api/systemsetting.js"
	import { Toast } from 'mint-ui';
	import {initMap} from "@/utils/TMap"

	
	export default {
		data() {
			return {
				TXMap:null,
				tMap:null,
				point:null,
				circle:null,
				searchAddress:null,
				form:{
					id:null,
					memberId:null,
					memberName:null,
					imei:null,
					name:null,
					lat:null,
					lon:null,
					address:null,
					regionRange:500,
				}
			}
		},
		mounted() {
			 let id = this.$yroute.query.id
			 if(id){
				 getSGeographyById(id).then(res => {
					this.form = res.data
				}).catch(err => {
					console.log(err);
				})
				//加载地图上的围栏数据
				this.initCircle()
			 }		
			
			//this.getUserInfo()
			initMap().then((TMap) => {
				this.TXMap = TMap;
				let arr = [30,119]
				let center = new TMap.LatLng(arr[0], arr[1])
				this.tMap = new TMap.Map("map", {
				  center: center, //设置地图中心点坐标
				  zoom: 12, //设置地图缩放级别
				  //viewMode: "2D",
				});
				//取消显示缩放控件、旋转控件、比例尺控件
				this.tMap.removeControl(TMap.constants.DEFAULT_CONTROL_ID.ZOOM)
				this.tMap.removeControl(TMap.constants.DEFAULT_CONTROL_ID.ROTATION)
				this.tMap.removeControl(TMap.constants.DEFAULT_CONTROL_ID.SCALE)
				
				this.tMap.on('click', (evt) => {
				  this.clickHandler(evt)
				  console.log(evt)
				  // 获取click事件返回的poi信息
				  const poi = evt.poi
				  if (poi) {
					// 拾取到POI
					//info.setContent(poi.name).setPosition(poi.latLng).open()
				  } else {
					// 没有拾取到POI
					//info.close()
				  }
				})
				// 自执行中心点方法
				//this.setCenter(this.tMap, arr)
				
				
			  })
		},
		methods: {
			getLocation(arr){
				if(navigator.geolocation){
				//判断是否有这个对象
					navigator.geolocation.getCurrentPosition(function(pos){
						alert()
						console.log("经度："+pos.coords.longitude+
						"纬度："+pos.coords.latitude)
					})
				}else{
					console.log("当前系统不支持GPS API")
				}
			},
			getUserInfo: function() {
			  let that = this
			  getUserInfo().then(res => {
				//alert(res.data.imei)
				//that.yphone = res.data.phone
			    //that.phone = that.yphone.replace(reg, '$1****$2')
			  })
			},
			save(){
				
				if(this.form.id == null){
					//add
					addGeography(this.form).then(res => {
						Toast({message: '添加成功',iconClass: 'icon icon-success'});
						//this.$yrouter.push({path: "/pages/systemsetting/watch/geographylist"});
						//setTimeout(() => this.$router.back(), 300);
						setTimeout(() => this.$router.back(), 300);
					}).catch(err => {
						console.log(err);
					})
				}else{
					//update
					editGeography(this.form).then(res => {
						Toast({message: '修改成功',iconClass: 'icon icon-success'});
						//this.$router.back()
						setTimeout(() => this.$router.back(), 300);
						//this.$yrouter.push({path: "/pages/systemsetting/watch/geographylist"});
					}).catch(err => {
						console.log(err);
					})
				}
			},
			// 地图点击事件
			clickHandler(evt) {
			  this.form.lat = evt.latLng.lat
			  this.form.lon = evt.latLng.lng
		
			  this.clearMarkers()
			  this.clearCircles()
			  this.addMarker(evt.latLng)
		
			  if(this.form.regionRange == null || this.form.regionRange < 0){
				Toast('请先设定半径大小')
				
				return
			  }
		
			  this.addCircle(evt.latLng,this.form.regionRange)
		
			  getAddressByLatLng(evt.latLng.lat,evt.latLng.lng)
				.then(res => {
				  this.form.address = res.data.result.address
			  }).catch(err => {
				console.log(err);
			  })
			},
			clearMarkers(){
			  if(this.point != null){
				this.point.setMap(null)
			  }
			},
			addMarker(latLng){
			  let maketLyer = new window.TMap.MultiMarker({
				map: this.tMap,
				style: {
				  myStyle: new window.TMap.MarkerStyle({
					width: 25, // 点标记样式宽度（像素）
					height: 35 // 点标记样式高度（像素）
				  })
				},
				geometries: [
				  {
					id: 'label-layer', // 点标记唯一标识，后续如果有删除、修改位置等操作，都需要此id
					styleId: 'myStyle', // 指定样式id
					position: new window.TMap.LatLng(latLng.lat, latLng.lng), // 点标记坐标位置
					properties: {
					  // 自定义属性
					  title: 'marker1'
					}
				  }
				]
			  })
			  this.point = maketLyer
			},
			clearCircles(){
			  if(this.circle != null){
				this.circle.setMap(null)
			  }
			},
			addCircle(latLng,radius){
			  radius = Number(radius)
			  var center=new window.TMap.LatLng(latLng.lat,latLng.lng);
			  let map = this.tMap
			  var circle = new TMap.MultiCircle({
				map,
				styles: { // 设置圆形样式
				  'circle': new TMap.CircleStyle({
					'color': 'rgba(41,91,255,0.16)',
					'showBorder': true,
					'borderColor': 'rgba(41,91,255,1)',
					'borderWidth': 2,
				  }),
				},
				geometries: [{
				  styleId: 'circle',
				  center: center, //圆形中心点坐标
				  radius: radius,	//半径（单位：米）
				}],
			  });
			  this.circle = circle
			},
			initCircle(){
				const timer = setInterval(() => {
				  if (this.tMap != null) {
					if(this.form.lat != null && this.form.lon != null && this.form.regionRange > 0){
					  this.clearMarkers()
					  this.clearCircles()
					  this.addMarker({'lat':this.form.lat,'lng':this.form.lon})
					  this.addCircle({'lat':this.form.lat,'lng':this.form.lon},this.form.regionRange)
					  this.setCenter(this.tMap,[this.form.lat,this.form.lon])
					}
					clearInterval(timer)
				  }
				}, 200)
			},
			setCenter(map, arr) {
			  this.tMap.setCenter(new window.TMap.LatLng(arr[0], arr[1]))
			},
			search(){
				getLatLngByAddress(this.searchAddress).then(res => {
					if(res.data.result != null){
						 this.setCenter(this.tMap,[res.data.result.location.lat,res.data.result.location.lng])
					}
				  //this.form.address = res.result.address
				}).catch(err => {
					console.error(err);
			  })
			}
		}
	}
</script>

<style>
	
	
</style>
