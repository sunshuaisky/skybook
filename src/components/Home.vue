<template>
	<div>
		<div class="header">
			SkyBook
			<i class="fa fa-search"></i>
		</div>
		<div class="banner">
			<mt-swipe :show-indicators="false">
			  <mt-swipe-item v-for="(banner, $index) in banners" :key="$index">
			  	<img :src="banner.imgURL">
			  </mt-swipe-item>
			</mt-swipe>
		</div>
		<div class="nav">
			<router-link
				class="nav-link"
				v-for="(nav, $index) in navs"
				:key="$index"
				:to="'/booklist/' + $index"
			>
				<div class="icon"></div>
				<h4>{{nav.title}}</h4>
			</router-link>
		</div>
		<div v-if="!loading">
			<recommend :homeList="homelists" title="热门小说"></recommend>
			<recommend :homeList="homelists" title="排行榜"></recommend>
			<rank :homeList="homelists" title="新书抢鲜"></rank>
			<rank :homeList="homelists"  title="畅销完本"></rank>
	    </div>
	    <loading v-show="loading"></loading>
	</div>
</template>

<script type="text/javascript">
	import Recommend from './common/Recommend.vue'
	import Rank from './common/Rank.vue'
	import Loading from './common/Loading.vue'
	export default {
		name: 'home',
		data() {
			return {
				banners:[
					{'imgURL': 'static/img/1.jpg'},
					{'imgURL': 'static/img/2.jpg'},
					{'imgURL': 'static/img/3.jpg'},
					{'imgURL': 'static/img/4.jpg'},
					{'imgURL': 'static/img/5.jpg'},
					{'imgURL': 'static/img/6.jpg'},
					{'imgURL': 'static/img/7.jpg'}
				],
				navs:[
					{'title': '玄幻魔法', 'value': '1'},
					{'title': '武侠修真', 'value': '2'},
					{'title': '都市言情', 'value': '3'},
					{'title': '历史军事', 'value': '4'},
					{'title': '网游竞技', 'value': '5'},
					{'title': '异灵科幻', 'value': '6'}
				],
        		loading: true,
        		homelists: []
			}
		},
	    components: {
			Recommend,
			Rank,
			Loading
	    },
		mounted: function () {
		    this.fetchList();
		},
	    methods: {
	    	fetchList: async function(){
	    		let url = this.api.homelist;
			    let params = {
			        
			    };
			    const res = await this.$http.get(url, params);
			    this.homelists = res.data.data;
			    this.$nextTick(function(){
			    	this.loading = false;
			    })
	    	}
	    }
	}
</script>

<style lang="scss" scoped>
	.header{
		width: 100%;
		height: 50px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 20px;
		position: relative;
		i{
			position: absolute;
			right: 20px;
			top: 14px;
		}
	}
	.banner{
		width: 100%;
		height: 190px;
		img{
			width: 100%;
			height: 100%;
		}
	}
	.nav{
		width: 100%;
		height: 115px;
	    padding: 10px 0;
		margin: 10px 0;
		.nav-link{
			width: 33%;
			float: left;
			color: #000000;
			text-decoration: none;
			display: flex;
			flex-direction: column;
			align-items: center;
			margin-top: 15px;
			h4{
				width: 100%;
				text-align: center;
			}
			.icon{
		        width: 28px;
		        height: 28px;
		        background-image: url(../assets/img/sprite.0.50.png);
		    }
		}
	    .nav-link:nth-child(1) {
			margin-top: 0;
	        .icon {
	          background-position: -59px -28px;
	        }
	    }
	    .nav-link:nth-child(2) {
			margin-top: 0;
	        .icon {
	          background-position: 0 0;
	        }
	    }
	    .nav-link:nth-child(3) {
			margin-top: 0;
	        .icon {
	          background-position: 0 -30px;
	        }
	    }
	    .nav-link:nth-child(4) {
	        .icon {
	          background-position: 0 -60px;
	        }
	    }
	    .nav-link:nth-child(5) {
	        .icon {
	          background-position: -30px -30px;
	        }
	    }
	    .nav-link:nth-child(6) {
	        .icon {
	          background-position: -59px -28px;
	        }
	    }
	}
</style>