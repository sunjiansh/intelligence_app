<template>
	<view class="address-management">
		<view class="item">
			<label style="font-size: 20px;">设置心率、血压、血氧上传频率</label>
				<br>
				<br>
			<view class="address">
				<view class="consignee">
				测量间隔：
					<text style="float: right;">{{form.bldstart / 60}}分钟</text>
				</view>
				<view>
					<!-- <mt-range
					  v-model="form.bldstart"
					  :min="300"
					  :max="6000"
					  :step="30"
					  :bar-height="5"
					  >
					</mt-range> -->
					<slider :value="form.bldstart" :min="300" :max="6000" step="30"  @change="setBldstart" />
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
				最高心率预警值：
					<text style="float: right;">{{form.hrHeight}}次/分</text>
				</view>
				<view>
					<!-- <mt-range
					  v-model="form.hrHeight"
					  :min="50"
					  :max="160"
					  :step="1"
					  :bar-height="5"
					  >
					</mt-range> -->
					<slider :value="form.hrHeight" :min="50" :max="160" step="1"  @change="setHrHeight" />
				</view>
			</view>
			<view class="operation acea-row row-between-wrapper">
				<view class="acea-row row-middle">
					可设置范围：50 - 160 次/分
				</view>
			</view>
		</view>
		
		<view class="item">
			<view class="address">
				<view class="consignee">
				最低心率预警值：
					<text style="float: right;">{{form.hrLow}}次/分</text>
				</view>
				<view>
					<!-- <mt-range
					  v-model="form.hrLow"
					  :min="50"
					  :max="160"
					  :step="1"
					  :bar-height="5"
					  >
					</mt-range> -->
					<slider :value="form.hrLow" :min="50" :max="160" step="1"  @change="setHrLow" />
				</view>
			</view>
			<view class="operation acea-row row-between-wrapper">
				<view class="acea-row row-middle">
					可设置范围：50 - 160 次/分
				</view>
			</view>
		</view>
		
	
	 <view class="item">
	  	<view class="address">
	  		<view class="consignee">
	  		高压预警值：
	  			<text style="float: right;">{{form.calibrateSbp}}mmHg</text>
	  		</view>
	  		<view>
	  			<!-- <mt-range
	  			  v-model="form.calibrateSbp"
	  			  :min="50"
	  			  :max="160"
	  			  :step="1"
	  			  :bar-height="5"
	  			  >
	  			</mt-range> -->
				<slider :value="form.calibrateSbp" :min="50" :max="160" step="1"  @change="setCalibrateSbp" />
	  		</view>
	  	</view>
	  	<view class="operation acea-row row-between-wrapper">
	  		<view class="acea-row row-middle">
	  			可设置范围：50 - 160 mmHg
	  		</view>
	  	</view>
	  </view>
	  
	  <view class="item">
	  	<view class="address">
	  		<view class="consignee">
	  		低压预警值：
	  			<text style="float: right;">{{form.calibrateDbp}}mmHg</text>
	  		</view>
	  		<view>
	  			<!-- <mt-range
	  			  v-model="form.calibrateDbp"
	  			  :min="50"
	  			  :max="160"
	  			  :step="1"
	  			  :bar-height="5"
	  			  >
	  			</mt-range> -->
				<slider :value="form.calibrateDbp" :min="50" :max="160" step="1"  @change="setCalibrateDbp" />
	  		</view>
	  	</view>
	  	<view class="operation acea-row row-between-wrapper">
	  		<view class="acea-row row-middle">
	  			可设置范围：50 - 160 mmHg
	  		</view>
	  	</view>
	  </view>
	  
	  
	    <view style="height:100rpx;"></view>
	  
		<view class="footer acea-row row-between-wrapper">
			<!-- <mt-button type="default" style="width:50%"  @click.native="goBack()" >取消</mt-button> -->
			<!-- <mt-button type="primary" @click.native="configHr" style="width:50%">保存</mt-button> -->
			<tui-button height="100rpx" :size="26" type="warning" shape="circle" @click.native="configHr">保存</tui-button>
		</view>
	
	</view>
	
	
</template>

<script>
	
	import { getUserInfo} from '@/api/user'
	import{configHr,getDWatchById} from "@/api/systemsetting.js"
	//import { Toast,Range } from 'mint-ui';

	
	export default {
		data() {
			return {
				form:{
					id:null,
					imei:null,
					bldstart:5,
					calibrateSbp:null,
					calibrateDbp:null,
					hrHeight:null,
					hrLow:null
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
			configHr(){
				//update
				// if(this.form.calibrateDbp == null || this.form.calibrateSbp == null){
				// 	return
				// }
				
				if(this.form.hrHeight <= this.form.hrLow){
					uni.showToast({
					  title:'最高心率要大于最低心率',
					  icon: 'none',
					  duration: 2000,
					})
					return;
				}
				
				configHr(this.form).then(res => {
					uni.showToast({
					  title:'设置成功',
					  icon: 'success',
					  duration: 2000,
					})
					
					this.goBack()
				}).catch(err => {
					uni.showToast({
					  title:err.msg,
					  icon: 'none',
					  duration: 2000,
					})
					console.log(err);
				})
			},
			setBldstart(e){
				this.form.bldstart = e.detail.value
			},
			setHrHeight(e){
				this.form.hrHeight = e.detail.value
			},
			setHrLow(e){
				this.form.hrLow = e.detail.value
			},
			setCalibrateSbp(e){
				this.form.calibrateSbp = e.detail.value
			},
			setCalibrateDbp(e){
				this.form.calibrateDbp = e.detail.value
			},
			goBack(){
				setTimeout(() => uni.navigateBack(), 300);
				//setTimeout(() => this.$router.back(), 300);
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
