<template>
	
	<view class="address-management">
		
		<view class="item">
			<view class="address">
				<view class="consignee">
					<mt-field label="称呼" placeholder="请输入用户名" v-model="form.label"></mt-field>
					<mt-field label="手机号" placeholder="请输入手机号" type="tel" v-model="form.phone"></mt-field>
					<mt-field label="验证码" placeholder="请输入验证码" v-model="form.captcha"></mt-field>
				</view>
			</view>
			<view class="operation acea-row row-between-wrapper">
				<view>
				</view>
				<view class="acea-row row-middle">
					<tui-button height="68rpx" :size="30" type="warning" shape="" @click="sendSMS">发送验证码</tui-button>
				</view>
			</view>
	    </view>
		
		<view>
			<mt-button type="default" @click.native="setLabel('爸爸')">爸爸</mt-button>
			<mt-button type="default" @click.native="setLabel('妈妈')" >妈妈</mt-button>
			<mt-button type="default" @click.native="setLabel('妈妈')" >妈妈</mt-button>
			<mt-button type="default" @click.native="setLabel('爷爷')" >爷爷</mt-button>
			<mt-button type="default" @click.native="setLabel('奶奶')" >奶奶</mt-button>
			<mt-button type="default" @click.native="setLabel('外公')" >外公</mt-button>
			<mt-button type="default" @click.native="setLabel('外婆')" >外婆</mt-button>
			<mt-button type="default" @click.native="setLabel('叔叔')" >叔叔</mt-button>
			<mt-button type="default" @click.native="setLabel('阿姨')" >阿姨</mt-button>
			<mt-button type="default" @click.native="setLabel('婶婶')" >婶婶</mt-button>
			<mt-button type="default" @click.native="setLabel('姨妈')" >姨妈</mt-button>
			<mt-button type="default" @click.native="setLabel('岳父')" >岳父</mt-button>
			<mt-button type="default" @click.native="setLabel('岳母')" >岳母</mt-button>
		</view>	
			
			
	  
	    <view style="height:100rpx;"></view>
	  
		<view class="footer acea-row row-between-wrapper">
			<!-- <mt-button type="default" style="width:50%"  @click.native="goBack()" >取消</mt-button> -->
			<mt-button type="primary" @click.native="addFriend" style="width:100%">保存</mt-button>
		</view>
	
	</view>
	
	
</template>

<script>
	import { mapGetters} from 'vuex'
	import { getUserInfo} from '@/api/user'
	
	import{addFriend,sendSMS} from "@/api/systemsetting.js"
	import { Toast,PaletteButton,MessageBox,Button} from 'mint-ui';

	
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
					let instance = Toast("称呼不能为空");
					setTimeout(() => {
					  instance.close();
					}, 2000);
					return
				}
				
				if(this.form.phone == null){
					let instance = Toast("手机号不能为空");
					setTimeout(() => {
					  instance.close();
					}, 2000);
					return
				}
				
				if(this.form.captcha == null){
					let instance = Toast("验证码不能为空");
					setTimeout(() => {
					  instance.close();
					}, 2000);
					return
				}
				
				addFriend(this.form).then(res => {
					//Toast({message: '设置成功',iconClass: 'icon icon-success'});
					//this.$router.back()
					Toast({message: res.msg,iconClass: 'icon icon-success'});
					setTimeout(() => this.$router.back(), 300);
					//setTimeout(() => this.$router.push('/pages/friends/index'), 300);
				}).catch(err => {
					let instance = Toast(err.msg);
					setTimeout(() => {
					  instance.close();
					}, 2000);
					console.log(err);
				})
			},
			sendSMS(){
				
				if(this.form.label == null){
					let instance = Toast("称呼不能为空");
					setTimeout(() => {
					  instance.close();
					}, 2000);
					return
				}
				
				if(this.form.phone == null){
					let instance = Toast("手机号不能为空");
					setTimeout(() => {
					  instance.close();
					}, 2000);
					return
				}
				
				
				sendSMS(this.form).then(res => {
					Toast({message: res.msg,iconClass: 'icon icon-success'});
					//this.$router.back()
					//setTimeout(() => this.$router.back(), 300);
				}).catch(err => {
					let instance = Toast(err.msg);
					setTimeout(() => {
					  instance.close();
					}, 2000);
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
</style>
