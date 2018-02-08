<template>
	<div class="bottom" v-show="readbar">
		<ul>
			<li @click="showListPanel()">
				<i class="fa fa-list-ul"></i>
				目录
			</li>
			<li @click="fontCancl()">
				<i class="fa fa-cog fa-fw"></i>
				设置
			</li>
			<li @click="swithNight()">
				<i class="fa fa-moon-o"></i>
				夜间
			</li>
		</ul>
	</div>
</template>

<script type="text/javascript">
	import { mapState } from 'vuex'

	export default{
		data() {
	    	return {
	    		
	    	}
	    },
	    props: ['bid'],
	    methods: {
	    	back() {
		        this.$router.go(-1);
		    },
		    swithNight() {
		       this.$store.dispatch('switchNight');
		    },
		    fontCancl() {
		       this.$store.dispatch('showFontPanel');
		    },
		    showListPanel() {
		        this.$store.dispatch('showListPanel');
		        this.$store.state.font_panel = false;
		    }
	    },
	    computed: mapState([
			'readbar'
		])
	}
</script>

<style type="text/css" lang="scss" scoped>
	.bottom{
		width: 100%;
		height: 65px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 18px;
		position: relative;
		background-color: #000000;
		position: fixed;
		bottom: 0;
		left: 0;
		ul{
			width: 100%;
			height: 100%;
			display: flex;
			li{
				flex: 1;
				color: #ffffff;
				list-style: none;
				font-size: 14px;
				display: flex;
			    flex-direction: column;
			    align-items: center;
			    justify-content: center;
			    i{
			    	font-size: 20px;
			    	margin-bottom: 4px;
			    }
			}
		}
	}
</style>