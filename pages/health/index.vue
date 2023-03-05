<template>
	<view class="my-promotion">
	  <view class="header user">
		<!--  <view v-if="$store.getters.token || userInfo.uid">
				22
		  </view> -->
		  <view class="header bg-color-red acea-row row-between-wrapper">
		    <view class="picTxt acea-row row-between-wrapper">
		      <view class="pictrue">
		        <image :src="userInfo.avatar" />
		      </view>
		      <view class="text">
		        <view class="acea-row row-middle">
		          <view class="name line1">{{ userInfo.realName }}</view>
		          <view class="member acea-row row-middle" v-if="userInfo.vip">
		            <image :src="userInfo.vipIcon" />
		            <text>{{ userInfo.vipName }}</text>
		          </view>
		        </view>
		        <view @click="" class="id" v-if="userInfo.phone">
		          <!-- <text>ID：{{ userInfo.uid || 0 }}</text> -->
				  <text>{{userInfo.phone}}</text>
		         <!-- <text class="iconfont icon-bianji1"></text> -->
		        </view>
				<view >
				  <text>健康状态：良好</text>
				</view>
				
		        <!-- #ifdef MP-WEIXIN -->
		        <!-- <button open-type="getPhoneNumber" @getphonenumber="getPhoneNumber" class="binding" v-else>
		          <text>绑定手机号</text>
		        </button> -->
		        <!-- #endif -->
		  
		        <!-- #ifndef MP-WEIXIN -->
		        <!-- <button class="binding" @click="goBindPhone()" v-else>
		          <text>绑定手机号</text>
		        </button> -->
		        <!-- #endif -->
		      </view>
		    </view>
		  </view>
	  </view>
	  
	  
	  <view class="list acea-row row-between-wrapper">
	    <view class="item acea-row row-center-wrapper row-column" @click="goPageByPath('/pages/health/boldpressurecurve')">
	      <text class="iconfont icon-erweima"></text>
	      <view>血压</view>
	    </view>
	    <view class="item acea-row row-center-wrapper row-column" @click="goPageByPath('/pages/health/heartratecurve')">
	      <text class="iconfont icon-tongji"></text>
	      <view>心率</view>
	    </view>
	    <view class="item acea-row row-center-wrapper row-column"  @click="goPageByPath('/pages/health/bloodsugarcurve')">
	      <text class="iconfont icon-qiandai"></text>
	      <view>血糖</view>
	    </view>
		<view class="item acea-row row-center-wrapper row-column" @click="goPageByPath('/pages/health/uricacidcurve')">
		  <text class="iconfont icon-dingdan"></text>
		  <view>尿酸</view>
		</view>
		<view class="item acea-row row-center-wrapper row-column" @click="goPageByPath('/pages/health/falldowncurve')">
		  <text class="iconfont icon-dingdan"></text>
		  <view>跌倒</view>
		</view>
	    <view class="item acea-row row-center-wrapper row-column" @click="">
	      <text class="iconfont icon-dingdan"></text>
	      <view>血脂</view>
	    </view>
	    <view class="item acea-row row-center-wrapper row-column"  @click="goPageByPath('/pages/health/boldoxygeon')">
	      <text class="iconfont icon-chongzhi"></text>
	      <view>血氧</view>
	    </view>
		<view class="item acea-row row-center-wrapper row-column"  @click="goPageByPath('/pages/health/sleepcurve')">
		  <text class="iconfont icon-chongzhi"></text>
		  <view>睡眠</view>
		</view>
		<view class="item acea-row row-center-wrapper row-column" @click="goPageByPath('/pages/health/pulseratecurve')">
		  <text class="iconfont icon-chongzhi"></text>
		  <view>脉搏</view>
		</view>
		<view class="item acea-row row-center-wrapper row-column"  @click="goPageByPath('/pages/health/temperaturecurve')">
		  <text class="iconfont icon-chongzhi"></text>
		  <view>体温</view>
		</view>
		<view class="item acea-row row-center-wrapper row-column" @click="goPageByPath('/pages/health/weightcurve')">
		  <text class="iconfont icon-chongzhi"></text>
		  <view>体重</view>
		</view>
		<view class="item acea-row row-center-wrapper row-column"  @click="goPageByPath('/pages/health/ecgcurve')">
		  <text class="iconfont icon-chongzhi"></text>
		  <view>心电图</view>
		</view>
	  </view>
	   <view style="height:100rpx;"></view>
	</view>
</template>

<script>
	import { mapState, mapGetters } from 'vuex'
	import { getUserInfo, wxappAuth, wxappBindingPhone, wxappGetUserInfo } from '@/api/user'
	
	//import { Indicator } from 'mint-ui';
	//import { Range } from 'mint-ui';
	//import { DatetimePicker } from 'mint-ui';
	
	export default {
		components: {
			
		},
		
		
		data() {
			return {
				
				
			}
		},
		computed: mapGetters(['userInfo']),
		methods: {
			goPageByPath(path){
				let uid = this.userInfo.uid;
				this.$yrouter.push({
				  path: path,
				  query:{id:uid}
				})
			}
		},
		mounted() {
			// this.$toast('Hello world!')
			
			//Indicator.open();
			//alert(mui)
			
			//this.$refs.picker.open();
			
		}
	}
</script>

<style lang="less">
</style>

