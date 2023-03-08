<template>
	<view>
			<!-- <mt-field label="ID" v-if="false" v-model="form.id"></mt-field>
			<mt-field label="用户名" placeholder="请输入用户名" v-if="false" v-model="form.memberId"></mt-field>
			<mt-field label="用户名" placeholder="请输入用户名" v-if="false" v-model="form.memberName"></mt-field>
			<mt-field label="围栏名称" placeholder="请输入围栏名称" v-model="form.name"></mt-field>
			<mt-field label="地址" placeholder="请输入地址" v-model="form.address"></mt-field>
			<mt-field label="纬度" placeholder="请输入数字" :disabled="true" type="number" v-model="form.lat"></mt-field>
			<mt-field label="经度" placeholder="请输入数字" :disabled="true" type="number" v-model="form.lon"></mt-field>
			<mt-field label="半径(单位:米)" placeholder="请输入数字" type="number" v-model="form.regionRange"></mt-field> -->
			
			<input  name="input" v-if="false"   v-model="form.id" placeholder="" />
			<input  name="input" v-if="false" v-model="form.memberId" placeholder="" />
			<input  name="input" v-if="false" v-model="form.memberName" placeholder="" />
			
			<view class="cu-form-group margin-top">
				<view class="title">围栏名称</view>
				<input placeholder="围栏名称"  v-model="form.name"  name="input"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">地址</view>
				<input placeholder="地址"  v-model="form.address" name="input"></input>
				<text class='cuIcon-locationfill text-orange'></text>
			</view>
			<view class="cu-form-group">
				<view class="title">纬度</view>
				<input placeholder="" :disabled="true" v-model="form.lat" name="input"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">经度</view>
				<input placeholder="" :disabled="true"  v-model="form.lon"name="input"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">半径(单位:米)</view>
				<input placeholder="半径" type="number" v-model="form.regionRange"   name="input"></input>
			</view>
		
			<view class="cu-form-group">
				   <input class="uni-input" name="input"  v-model="searchAddress" placeholder="请输入地址关键字" />
			</view>
			<view class="cu-form-group">
				   <tui-button height="100rpx" :size="26" type="primary" shape="" @click.native="search">根据搜索地址</tui-button>
			</view>
		<!-- <view id="map" style="height: 400px;">
		
		</view> -->
			<map
				id="myMap"
				:latitude="latitude"
				:longitude="longitude"
				:circles="circles"
				style="width: 100%; height:400px;">
			</map>
		
		
			<view style="height:100rpx;"></view>
			
			<view class="footer acea-row row-between-wrapper">
				<tui-button height="100rpx" :size="26" type="warning" shape="circle" @click.native="save">保存</tui-button>
			</view>
	</view>
	
</template>

<script>
	
	import { getUserInfo} from '@/api/user'
	import{addGeography,editGeography,getAddressByLatLng,getLatLngByAddress,getSGeographyById} from "@/api/systemsetting.js"
	//import { Toast } from 'mint-ui';
	//import {initMap} from "@/utils/TMap"

	
	export default {
		data() {
			return {
				//TXMap:null,
				//tMap:null,
				point:null,
				circle:null,
				
				searchAddress:null,
				circles:[],
				latitude:39.997761,
				longitude:116.478935,
					
				
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
					
					//加载地图上的围栏数据
					this.initCircle(res.data)
					
				}).catch(err => {
					console.log(err);
				})
			 }		
			this.addMapEvent()
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
				
				if(this.form.name == null || this.form.name.trim == ''){
					uni.showToast({
					  title: '围栏名称不能为空',
					  icon: 'none',
					  duration: 2000,
					})
					return;
				}
				
				if(this.form.address == null || this.form.address.trim == ''){
					uni.showToast({
					  title: '围栏地址不能为空',
					  icon: 'none',
					  duration: 2000,
					})
					return;
				}
				
				if(this.form.lat == null || this.form.lon == null){
					uni.showToast({
					  title: '经纬度不能为空',
					  icon: 'none',
					  duration: 2000,
					})
					return;
				}
				
				if(this.form.regionRange == null){
					uni.showToast({
					  title: '围栏半径不能为空',
					  icon: 'none',
					  duration: 2000,
					})
					return;
				}
				
				
				if(this.form.id == null){
					//add
					addGeography(this.form).then(res => {
						//Toast({message: '添加成功',iconClass: 'icon icon-success'});
						//this.$yrouter.push({path: "/pages/systemsetting/watch/geographylist"});
						uni.showToast({
						  title: "添加成功",
						  icon: 'success',
						  duration: 2000,
						})
						//setTimeout(() => this.$router.back(), 300);
						this.goBack()
					}).catch(err => {
						uni.showToast({
						  title: err.msg,
						  icon: 'none',
						  duration: 2000,
						})
						console.log(err);
					})
				}else{
					//update
					editGeography(this.form).then(res => {
						//Toast({message: '修改成功',iconClass: 'icon icon-success'});
						uni.showToast({
						  title: "修改成功",
						  icon: 'success',
						  duration: 2000,
						})
						this.goBack()
						//setTimeout(() => this.$router.back(), 300);
						//this.$yrouter.push({path: "/pages/systemsetting/watch/geographylist"});
					}).catch(err => {
						console.log(err);
					})
				}
			},
			addCircle(point){
			  //let radius = Number(this.form.regionRange)
			  this.form.lat=point.latitude
			  this.form.lon=point.longitude
			  this.circles = [
				  {
					  latitude:point.latitude,
					  longitude:point.longitude,
					  radius:this.form.regionRange,
					  fillColor:'#3366cc5A',
					  color:'#3333cc',
				  }
			  ]	
			},
			initCircle(data){
				let point = {latitude:data.lat,longitude:data.lon}
				this.setCenter([data.lat,data.lon])
				this.addCircle(point)
			},
			setCenter(arr) {
				this.longitude = arr[1]
				this.latitude = arr[0]
			  //this.tMap.setCenter(new window.TMap.LatLng(arr[0], arr[1]))
			},
			addMapEvent() {
				let that = this
				var maps = uni.createMapContext("myMap", this).$getAppMap()
				maps.onclick = function(point) {
					that.longitude = point.longitude
					that.latitude = point.latitude
					
					that.addCircle(point)
					that.getAddressByPoint(point)
				}
			},
			search(){
				getLatLngByAddress(this.searchAddress).then(res => {
					if(res.data.result != null){
						 this.setCenter([res.data.result.location.lat,res.data.result.location.lng])
					}
				  //this.form.address = res.result.address
				}).catch(err => {
					console.error(err);
			  })
			},
			getAddressByPoint(point) {
			  getAddressByLatLng(point.latitude,point.longitude)
				.then(res => {
				  this.form.address = res.data.result.address
			  }).catch(err => {
				console.log(err);
			  })
			},
			goBack(){
				setTimeout(() => uni.navigateBack(), 300);
				//setTimeout(() => this.$router.back(), 300);
			}
		}
	}
</script>

<style lang="less">
@import '/components/colorui/animation.css';
@import '/components/colorui/icon.css';
@import '/components/colorui/main.css';
</style>
