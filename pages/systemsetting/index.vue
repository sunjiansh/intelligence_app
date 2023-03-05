<template>
	<view>
		<mt-button style="default" size="large" @click="goPageByPath('/pages/systemsetting/watch/temperaturelist')">体温测量设置</mt-button>
		<mt-button style="default" size="large" @click="goPageByPath('/pages/systemsetting/watch/hartratelist')">心率上传设置</mt-button>
		<mt-button style="default" size="large" @click="goPageByPath('/pages/systemsetting/watch/contactslist')">通讯录设置</mt-button>
		<mt-button style="default" size="large" @click="goPageByPath('/pages/systemsetting/watch/soslist')">SOS设置</mt-button>
		<mt-button style="default" size="large" @click="goPageByPath('/pages/systemsetting/watch/sleeplist')">睡眠设置</mt-button>
		<mt-button style="default" size="large" @click="goPageByPath('/pages/systemsetting/watch/locationlist')">定位设置</mt-button>
		<mt-button style="default" size="large" @click="goPageByPath('/pages/systemsetting/watch/maprecord')">查看足迹</mt-button>
		<mt-button style="default" size="large" @click="goPageByPath('/pages/systemsetting/watch/geographylist')">电子围栏</mt-button>
	
		<mt-button style="default" size="large" @click="goPageByPath('/pages/systemsetting/tumble/tumblelist')">跌倒报警器设置</mt-button>
		
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

<style>

</style>
