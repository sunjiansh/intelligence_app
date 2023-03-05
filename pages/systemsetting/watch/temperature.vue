<template>
	<view class="address-management">
		<view class="item">
			<view class="address">
				<view class="consignee">
				测量间隔：
					<text style="float: right;">{{form.wdstart / 60}}分钟</text>
				</view>
				<view>
					<!-- <mt-range
					  v-model="form.wdstart"
					  :min="300"
					  :max="6000"
					  :step="30"
					  :bar-height="5"
					  >
					</mt-range> -->
					<slider :value="form.wdstart" :min="300" :max="6000" step="30"  @change="setWdstart" />
				</view>
			</view>
			<view class="operation acea-row row-between-wrapper">
				<view class="acea-row row-middle">
					可设置范围：{{300/60}} - {{6000/60}} 分钟
				</view>
			</view>
	    </view>
		
		
		<view class="item">
			<view class="address">
				<view class="consignee">
				高温预警值：
					<text style="float: right;">{{form.temperatureHeight/10}}℃</text>
				</view>
				<view>
					<!-- <mt-range
					  v-model="form.temperatureHeight"
					  :min="350"
					  :max="420"
					  :step="1"
					  :bar-height="5"
					  >
					</mt-range> -->
					<slider :value="form.temperatureHeight" :min="350" :max="420" step="1"  @change="setTemperatureHeight" />
				</view>
			</view>
			<view class="operation acea-row row-between-wrapper">
				<view class="acea-row row-middle">
					可设置范围：35 - 42 ℃
				</view>
			</view>
		</view>
		
		<view class="item">
			<view class="address">
				<view class="consignee">
				高低预警值：
					<text style="float: right;">{{form.temperatureLow/10}}℃</text>
				</view>
				<view>
					<!-- <mt-range
					  v-model="form.temperatureLow"
					  :min="350"
					  :max="420"
					  :step="1"
					  :bar-height="5"
					  >
					</mt-range> -->
					<slider :value="form.temperatureLow" :min="350" :max="420" step="1"  @change="setTemperatureLow" />
				</view>
			</view>
			<view class="operation acea-row row-between-wrapper">
				<view class="acea-row row-middle">
					可设置范围：35 - 42 ℃
				</view>
			</view>
		</view>
	  
	  
	    <view style="height:100rpx;"></view>
	  
		<view class="footer acea-row row-between-wrapper">
		<!-- 	<mt-button type="default" style="width:50%"  @click.native="goBack()" >取消</mt-button> -->
			<tui-button height="100rpx" :size="26" type="warning" shape="circle" @click.native="configTemperature">保存</tui-button>
		</view>
	
	</view>
	
	
</template>

<script>
	
	import { getUserInfo} from '@/api/user'
	import{configTemperature,configHr,getDWatchById} from "@/api/systemsetting.js"
	//import { Toast,Range } from 'mint-ui';

	
	export default {
		data() {
			return {
				form:{
					id:null,
					imei:null,
					wdstart:5,
					temperatureHeight:null,
					temperatureLow:null
				}
			}
		},
		mounted() {
			 let id = this.$yroute.query.id
			 if(id){
				 getDWatchById(id).then(res => {
					this.form = res.data
				}).catch(err => {
					console.log(err);
				})
			 }		
		},
		methods: {
			getUserInfo: function() {
			  let that = this
			  getUserInfo().then(res => {
				//alert(res.data.imei)
				//that.yphone = res.data.phone
			    //that.phone = that.yphone.replace(reg, '$1****$2')
			  })
			},
			configTemperature(){
				//update
				if(this.form.temperatureHight <= this.form.temperatureLow){
					uni.showToast({
					  title:'最高温度要大于最低温度',
					  icon: 'none',
					  duration: 2000,
					})
					return;
				}
				
				configTemperature(this.form).then(res => {
					//Toast({message: '设置成功',iconClass: 'icon icon-success'});
					//this.$router.back()
					uni.showToast({
					  title:'设置成功',
					  icon: 'success',
					  duration: 2000,
					})
					setTimeout(() => this.$router.back(), 300);
				}).catch(err => {
					uni.showToast({
					  title:err.msg,
					  icon: 'none',
					  duration: 2000,
					})
					console.log(err);
				})
			},
			setWdstart(e){
				this.form.wdstart = e.detail.value
			},
			setTemperatureHeight(e){
				this.form.temperatureHeight = e.detail.value
			},
			setTemperatureLow(e){
				this.form.temperatureLow = e.detail.value
			},
			
			
			goBack(){
				setTimeout(() => this.$router.back(), 300);
			}
		}
	}
</script>

<style scoped lang="less">
	.address-management.on {
	  background-color: #fff;
	  height: 100vh;
	}
</style>
