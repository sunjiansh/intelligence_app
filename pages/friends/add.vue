<template>
	
	<view class="address-management">
		
		<view class="item">
			<view class="address">
				<!-- <view class="consignee">
					<input class="uni-input" name="input" placeholder="这是一个输入框" />
					<mt-field label="称呼" placeholder="请输入用户名" v-model="form.label"></mt-field>
					<mt-field label="手机号" placeholder="请输入手机号" type="tel" v-model="form.phone"></mt-field>
					<mt-field label="验证码" placeholder="请输入验证码" v-model="form.captcha"></mt-field>
				</view> -->
				<view class="uni-form-item uni-column">
					<view class="title">称呼</view>
					<input class="uni-input" name="input"  v-model="form.label" placeholder="请输入称呼" />
				</view>
				<view class="uni-form-item uni-column">
					<view class="title">手机号</view>
					<input class="uni-input" name="input"  v-model="form.phone" placeholder="请输入手机号" />
				</view>
				<view class="uni-form-item uni-column">
					<view class="title">验证码</view>
					<input class="uni-input" name="input"  v-model="form.captcha" placeholder="请输入验证码" />
				</view>
			</view>
			<view class="operation acea-row row-between-wrapper">
				<view>
				</view>
				<view class="acea-row row-middle">
					<tui-button height="70rpx" :size="30" type="warning" shape="" @click.native="sendSMS">发送验证码</tui-button>
				</view>
			</view>
	    </view>
		
		<view>
			<button class="mini-btn" type="default" size="mini" @click="setLabel('妈妈')">妈妈</button>
			<button class="mini-btn" type="default" size="mini" @click="setLabel('爸爸')">爸爸</button>
			<button class="mini-btn" type="default" size="mini" @click="setLabel('爷爷')">爷爷</button>
			<button class="mini-btn" type="default" size="mini" @click="setLabel('奶奶')">奶奶</button>
			<button class="mini-btn" type="default" size="mini" @click="setLabel('外公')">外公</button>
			<button class="mini-btn" type="default" size="mini" @click="setLabel('外婆')">外婆</button>
			<button class="mini-btn" type="default" size="mini" @click="setLabel('叔叔')">叔叔</button>
			<button class="mini-btn" type="default" size="mini" @click="setLabel('阿姨')">阿姨</button>
			<button class="mini-btn" type="default" size="mini" @click="setLabel('婶婶')">婶婶</button>
			<button class="mini-btn" type="default" size="mini" @click="setLabel('姨妈')">姨妈</button>
			<button class="mini-btn" type="default" size="mini" @click="setLabel('岳父')">岳父</button>
			<button class="mini-btn" type="default" size="mini" @click="setLabel('岳母')">岳母</button>
		</view>	
			
			
	  
	    <view style="height:100rpx;"></view>
	  
		<view class="footer acea-row row-between-wrapper">
			<tui-button height="100rpx" :size="26" type="warning" shape="circle" @click.native="addFriend">
			    保存
			</tui-button>
		</view>
	
	</view>
	
	
</template>

<script>
	import { mapGetters} from 'vuex'
	import { getUserInfo} from '@/api/user'
	
	import{addFriend,sendSMS} from "@/api/systemsetting.js"
	//import { Toast,PaletteButton,MessageBox,Button} from 'mint-ui';

	
	export default {
		data() {
			return {
				form:{
					id:null,
					label:null,
					mainUid:null,
					friendUid:null,
					phone:null,
					captcha:null
				}
			}
		},
		mounted() {
			this.form.mainUid = this.userInfo.uid
		},
		computed: mapGetters(['userInfo']),
		methods: {
			getUserInfo: function() {
			  let that = this
			  getUserInfo().then(res => {
				//alert(res.data.imei)
				//that.yphone = res.data.phone
			    //that.phone = that.yphone.replace(reg, '$1****$2')
			  })
			},
			addItem(){
				
			},
			addFriend(){
				if(this.form.label == null){
					uni.showToast({
					  title: '称呼不能为空',
					  icon: 'none',
					  duration: 2000,
					})
					return
				}
				
				if(this.form.phone == null){
					uni.showToast({
					  title: '手机号不能为空',
					  icon: 'none',
					  duration: 2000,
					})
					return
				}
				
				if(this.form.captcha == null){
					uni.showToast({
					  title: '验证码不能为空',
					  icon: 'none',
					  duration: 2000,
					})
					return
				}
				
				addFriend(this.form).then(res => {
					//Toast({message: '设置成功',iconClass: 'icon icon-success'});
					//this.$router.back()
					uni.showToast({
					  title: res.msg,
					  icon: 'success',
					  duration: 2000,
					})
					setTimeout(() => this.$router.back(), 300);
					//setTimeout(() => this.$router.push('/pages/friends/index'), 300);
				}).catch(err => {
					// let instance = Toast(err.msg);
					// setTimeout(() => {
					//   instance.close();
					// }, 2000);
					// console.log(err);
					uni.showToast({
					  title: err.msg,
					  icon: 'none',
					  duration: 2000,
					})
				})
			},
			sendSMS(){
				
				// if(this.form.label == null){
				// 	uni.showToast({
				// 	  title: '称呼不能为空',
				// 	  icon: 'none',
				// 	  duration: 2000,
				// 	})
				// 	return
				// }
				
				if(this.form.phone == null){
					uni.showToast({
					  title: '手机号不能为空',
					  icon: 'none',
					  duration: 2000,
					})
					return
				}
				
				
				sendSMS(this.form).then(res => {
					uni.showToast({
					  title:  res.msg,
					  icon: 'success',
					  duration: 2000,
					})
					//this.$router.back()
					//setTimeout(() => this.$router.back(), 300);
				}).catch(err => {
					// let instance = Toast(err.msg);
					// setTimeout(() => {
					//   instance.close();
					// }, 2000);
					uni.showToast({
					  title: err.msg,
					  icon: 'none',
					  duration: 2000,
					})
					console.log(err);
				})
			},
			setLabel(label){
				this.form.label = label
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
	.uni-form-item .title {
		padding: 20rpx 0;
		font-size: 18px;
	}
</style>
