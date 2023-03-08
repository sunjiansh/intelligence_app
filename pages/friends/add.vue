<template>
	
	<view>
		
			<view class="cu-form-group">
				<view class="title">称呼</view>
				<input placeholder="输入称呼"  v-model="form.label" name="input"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">手机号码</view>
				<input placeholder="输入对方手机号"  v-model="form.phone"  name="input"></input>
				<view class="cu-capsule radius">
					<view class='cu-tag bg-blue '>
						+86
					</view>
					<view class="cu-tag line-blue">
						中国大陆
					</view>
				</view>
			</view>
			<view class="cu-form-group">
				<view class="title">验证码</view>
				<input placeholder="输入验证码" v-model="form.captcha" name="input"></input>
				<button class='cu-btn bg-green shadow'  @click="sendSMS" >验证码</button>
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
					this.goBack()
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
