<template>
	<div class="chapter">
		<div class="Ctop">
			<i class="fa fa-chevron-left" aria-hidden="true" @click="hideListPanel()"></i>
			<h3>目录</h3>
		</div>
		<div class="Clist">
			<ul>
				<li v-for="list in Clist" @click="goChapter(list.cid)">
						{{ list.chapter }}
				</li>
			</ul>
		</div>
	</div>
</template>

<script type="text/javascript">
	import { mapState } from 'vuex'

	export default {
		data() {
			return {
				
			}
		},
		mounted(){
			
		},
		methods: {
			hideListPanel() {
				this.$store.state.list_panel = false
			},
			goChapter(cid){
				this.hideListPanel();
				this.$store.state.readbar = false;
				this.$store.state.curChapter = cid;
			}
		},
	    computed: mapState([
			'Clist'
		]),
	}
</script>

<style type="text/css" lang="scss" scoped>
	.chapter{
		position: fixed;
	    transition: all .3s;
	    left: 0;
	    top: 0;
	    bottom: 0;
	    right: 50px;
	    z-index: 10;
	    overflow: auto;
	    transform: translateX(-100%);
	    background-color: #ffffff;
	    &.show {
	    	transform: translateX(0);
	    }
	    .Ctop{
	    	width: 100%;
	    	height: 45px;
	    	position: fixed;
	    	top: 0;
	    	left: 0;
			display: flex;
			align-items: center;
			justify-content: center;
			background-color: #FF4500;
	    	i{
				position: absolute;
				left: 20px;
				top: 14px;
				color: #ffffff;
			}
			h3{
				color: #ffffff;
			}
	    }
	    .Clist{
	    	margin-top: 50px;
	    	ul{
	    		li{
	    			list-style: none;
	    			font-size: 16px;
	    			text-indent: 20px;
	    			padding: 10px;
	    			padding-left: 0;
	    			padding-right: 0;
	    			margin: 0 15px;
          			border-bottom: 1px solid #ccc;
	    			color: #000000;
	    		}
	    	}
	    }
	}
</style>