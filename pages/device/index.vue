<template>
	<view>
		<!-- <button type="default" size="large" @click="goPageByPath('/pages/systemsetting/watch/temperaturelist')">体温测量设置</button>
		<button type="default" size="large" @click="goPageByPath('/pages/systemsetting/watch/hartratelist')">心率上传设置</button>
		<button type="default" size="large" @click="goPageByPath('/pages/systemsetting/watch/contactslist')">通讯录设置</button>
		<button type="default" size="large" @click="goPageByPath('/pages/systemsetting/watch/soslist')">SOS设置</button>
		<button type="default" size="large" @click="goPageByPath('/pages/systemsetting/watch/sleeplist')">睡眠设置</button>
		<button type="default" size="large" @click="goPageByPath('/pages/systemsetting/watch/locationlist')">定位设置</button>
		<button type="default" size="large" @click="goPageByPath('/pages/systemsetting/watch/maprecord')">查看足迹</button>
		<button type="default" size="large" @click="goPageByPath('/pages/systemsetting/watch/geographylist')">电子围栏</button>
		<button type="default" size="large" @click="goPageByPath('/pages/systemsetting/tumble/tumblelist')">跌倒报警器设置</button> -->
		
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				<text class="cuIcon-titles text-orange"></text> 设备参数设置
			</view>
		</view>
		
		<view class="cu-list menu sm-border">
		    <view class="cu-item arrow" @click="goPageByPath('/pages/systemsetting/watch/temperaturelist')">
				<view class="content">
					<text class="cuIcon-btn text-green"></text>
					<text class="text-grey">体温测量设置</text>
				</view>
			</view>
		</view>
		
		<view class="cu-list menu sm-border">
		    <view class="cu-item arrow" @click="goPageByPath('/pages/systemsetting/watch/hartratelist')">
				<view class="content">
					<text class="cuIcon-btn text-green"></text>
					<text class="text-grey">心率上传设置</text>
				</view>
			</view>
		</view>
		
		<view class="cu-list menu sm-border">
		    <view class="cu-item arrow" @click="goPageByPath('/pages/systemsetting/watch/contactslist')">
				<view class="content">
					<text class="cuIcon-btn text-green"></text>
					<text class="text-grey">通讯录设置</text>
				</view>
			</view>
		</view>
		
		<view class="cu-list menu sm-border">
		    <view class="cu-item arrow" @click="goPageByPath('/pages/systemsetting/watch/soslist')">
				<view class="content">
					<text class="cuIcon-btn text-green"></text>
					<text class="text-grey">SOS设置</text>
				</view>
			</view>
		</view>
		
		<view class="cu-list menu sm-border">
		    <view class="cu-item arrow" @click="goPageByPath('/pages/systemsetting/watch/sleeplist')">
				<view class="content">
					<text class="cuIcon-btn text-green"></text>
					<text class="text-grey">睡眠设置</text>
				</view>
			</view>
		</view>
		
		<view class="cu-list menu sm-border">
		    <view class="cu-item arrow" @click="goPageByPath('/pages/systemsetting/watch/locationlist')">
				<view class="content">
					<text class="cuIcon-btn text-green"></text>
					<text class="text-grey">定位设置</text>
				</view>
			</view>
		</view>
		
		<view class="cu-list menu sm-border">
		    <view class="cu-item arrow" @click="goPageByPath('/pages/systemsetting/watch/maprecord')">
				<view class="content">
					<text class="cuIcon-btn text-green"></text>
					<text class="text-grey">查看足迹</text>
				</view>
			</view>
		</view>
		
		<view class="cu-list menu sm-border">
		    <view class="cu-item arrow" @click="goPageByPath('/pages/systemsetting/watch/geographylist')">
				<view class="content">
					<text class="cuIcon-btn text-green"></text>
					<text class="text-grey">电子围栏</text>
				</view>
			</view>
		</view>
		
		<view class="cu-list menu sm-border">
		    <view class="cu-item arrow" @click="goPageByPath('/pages/systemsetting/tumble/tumblelist')">
				<view class="content">
					<text class="cuIcon-btn text-green"></text>
					<text class="text-grey">跌倒报警器设置</text>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			goPageByPath(path){
				this.$yrouter.push({
				  path: path,
				})
			},
		}
	}
</script>

<style lang="less">
@import '/components/colorui/icon.css';
@import '/components/colorui/main.css';
</style>
