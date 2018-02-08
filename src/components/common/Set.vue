<template>
	<div class="set" v-show="font_panel">
		<ul>
			<li>
				字体
				<div class="little" @click="sub()">缩小</div>
				<div class="big" @click="add()">放大</div>
			</li>
			<li>
				背景
				<div class="bg_set" v-for="(n,$index) in 5" @click="changeColor($index)">
					<i v-if="$index == now_color" class="fa fa-check"></i>
				</div>
			</li>
		</ul>
	</div>
</template>

<script type="text/javascript">
	import {mapState} from 'vuex'
	import localEvent from '@/utils/local'

	export default{
		data() {
			return {
				now_color: 0
			}
	    },
	    computed: mapState([
	        'font_panel', 'bg_color'
	    ]),
	    mounted: function(){
	    	this.now_color = this.bg_color;
	    },
	    methods: {
	    	changeColor(index) {
		        this.now_color = index;
		        this.$store.state.bg_color = index;
		        localEvent.StorageSetter('bg_color', index);
	    	},
	    	add() {
	        	this.$store.dispatch('fzSizeAdd')
	    	},
	    	sub() {
	        	this.$store.dispatch('fzSizeSub')
	    	}
	    }
	}
</script>

<style type="text/css" lang="scss" scoped>
	.set{
		width: 100%;
		height: 110px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 18px;
		position: relative;
		background-color: #000000;
		position: fixed;
		bottom: 65px;
		left: 0;
		z-index: 10;
		ul{
			width: 100%;
			height: 100%;
			display: flex;
			flex-direction: column;
			li{
				list-style: none;
				flex: 1;
				color: #ffffff;
				text-indent: 20px;
				font-size: 16px;
				display: flex;
				align-items: center;
				.little, .big{
					width: 80px;
					height: 30px;
					border: 1px solid #ffffff;
					border-radius: 10px;
					text-align: center;
					line-height: 30px;
					text-indent: 0;
					margin-left: 35px;
				}
				.bg_set{
					height: 30px;
			        width: 30px;
			        border-radius: 15px;
			        margin-left: 15px;
			        display: flex;
					align-items: center;
					justify-content: center;
					i{
						text-indent: 0;
						color: orange;
					}
				}
				.choose_bg{
					border:1px solid orange;
				}
				.bg_set:nth-child(1){
					background-color: #e9dfc7;
					margin-left: 35px;
				}
				.bg_set:nth-child(2){
					background-color: #e7eee5;
				}
				.bg_set:nth-child(3){
					background-color: #a4a4a4;
				}
				.bg_set:nth-child(4){
					background-color: #cdefcd;
				}
				.bg_set:nth-child(5){
					background-color: #283548;
				}
			}
		}
	}
</style>