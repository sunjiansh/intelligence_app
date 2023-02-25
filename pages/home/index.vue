<template>
	<view>
		<mt-header title="多个按钮">
		  <router-link to="/" slot="left">
		    <mt-button icon="back">返回</mt-button>
		    <mt-button @click="handleClose">关闭</mt-button>
		  </router-link>
		  <mt-button icon="more" slot="right"></mt-button>
		</mt-header>
		
		<mt-range
		  v-model="rangeValue"
		  :min="10"
		  :max="90"
		  :step="10"
		  :bar-height="5">
		</mt-range>
		
		<mt-datetime-picker
		    ref="picker"
		    type="datetime"
		    v-model="pickerValue">
		  </mt-datetime-picker>
		  
		  
		  
	</view>
</template>

<script>
	import { Indicator } from 'mint-ui';
	import { Range } from 'mint-ui';
	import { DatetimePicker } from 'mint-ui';
	
	export default {
		components: {
			
		},
		
		
		data() {
			return {
				rangeValue:10,
				pickerValue:null
			}
		},
		methods: {
			
		},
		mounted() {
			// this.$toast('Hello world!')
			
			//Indicator.open();
			//alert(mui)
			
			//this.$refs.picker.open();
			
		}
	}
</script>

<style>
	input, button, .mui-btn {
		margin-top: 10px;
		margin-left: 10px;
	}
	h5{
	    padding-top: 15px;
	}
			
	.field-contain label{
	    width: auto;
	    padding-right: 0;
	}
			
	.field-contain input[type='text']{
	    width: 40px;
	    height: 30px;
	    padding: 5px 0;
	    float: none;
	    text-align: center;
	}
</style>
