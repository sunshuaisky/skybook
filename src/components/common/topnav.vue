<template>
	<div class="top" v-show="topnav">
		<i class="fa fa-chevron-left" aria-hidden="true" @click="back()"></i>
		<p>{{title}}</p>
	</div>
</template>

<script type="text/javascript">
	import { mapState } from 'vuex'

	export default{
		data() {
	    	return {
	    		
	    	}
	    },
	    props: ['title'],
	    methods: {
	    	back() {
		        this.$router.go(-1);
		      }
	    },
	    computed: mapState([
			'topnav'
		])
	}
</script>

<style type="text/css" lang="scss" scoped>
	.top{
		width: 100%;
		height: 45px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 20px;
		position: relative;
		background-color: #FF4500;
		position: fixed;
		top: 0;
		left: 0;
		i{
			position: absolute;
			left: 20px;
			top: 14px;
			color: #ffffff;
		}
		p{
			color: #ffffff;
		}
	}
</style>