<template>
	<view class="address-management" ref="container">
		<mt-loadmore :top-method="loadTop"  ref="loadmore"> 
			<view class="item" v-for="(item, index) in list" >
				<view class="address">
					<view class="consignee">
						<mt-field label="称呼" placeholder="" :disabled="true" v-model="item.label"></mt-field>
					</view>
					<view>
						<mt-field label="手机号" placeholder="" type="tel" v-model="item.phone" :disabled="true"></mt-field>
					</view>
				</view>
				<view class="operation acea-row row-between-wrapper">
					<view></view>
					<view class="acea-row row-middle">
						<view @click="delItem(item.id)">
						  <text class="iconfont icon-shanchu"></text>删除
						</view>
					</view>
				</view>
			</view>
		</mt-loadmore>
		
		<view style="height:100rpx;"></view>
		
		<view class="footer acea-row row-between-wrapper">
			 <mt-palette-button content="+"
			   direction="rt" class="pb" :radius="80" ref="target_1" mainButtonStyle="color:#fff;background-color:#26a2ff;" 
						 style="left:30px;bottom: 60px;" @click.native="addItem">
						  <div class="my-icon-button"></div>
			 </mt-palette-button>
		</view>
	
	</view>
</template>

<script>
	
	import { getUserInfo} from '@/api/user'
	import{getFriendList,deleteFriendById} from "@/api/systemsetting.js"
	import { Toast,PaletteButton,MessageBox,Loadmore} from 'mint-ui';

	
	export default {
		data() {
			return {
				form:{
					id:null,
					label:null,
					mainUid:null,
					friendUid:null,
					phone:null
				},
				//list:[{'label':'xxxx','phone':'1112255'}]
				list:[]
			}
		},
		watch: {
		 
		},
		mounted() {
			this.queryList()
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
			addItem(){
				this.$yrouter.push({path: '/pages/friends/add'})
			},
			delItem(id){
				MessageBox.confirm('确定要删除?').then(action => {
				  deleteFriendById([id]).then(res => {
					Toast({message: '删除成功',iconClass: 'icon icon-success'});
				  	this.queryList()
				  }).catch(err => {
				  	console.log(err);
				  })
				});
			},
			queryList(){
				getFriendList().then(res => {
					this.$refs.loadmore.onTopLoaded()
					this.list = res.data
				}).catch(err => {
					console.log(err);
				})
				uni.stopPullDownRefresh();
			},
			loadTop() {
				this.queryList()
			},
			goBack(){
				setTimeout(() => this.$router.back(), 300);
			},
			onLoad: function (options) {
				// setTimeout(function () {
				// 	console.log('start pulldown');
				// }, 1000);
				//uni.startPullDownRefresh();
			},
			onPullDownRefresh() {
				this.queryList()
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
