<template>
	<div>
		<Top :title="book.title"></Top>
		<div class="main">
			<div class="left">
				<img :src="imgUrl">
			</div>
			<div class="right">
				<h3>{{ book.title }}</h3>
				<h4>{{ book.author }}</h4>
				<h4>分&nbsp;&nbsp;&nbsp;&nbsp;类：{{ book.type | type }}</h4>
				<h5>{{ book.lastupdate }}</h5>
				<h5>最新章节：{{ book.lastBlank }}</h5>
			</div>
		</div>
		<div class="book_main">
			<h3>内容简介</h3>
			<p>{{ book.main }}</p>
		</div>
		<div class="read">
			<router-link :to="'/read/' + bid + '/' + cid">
				<mt-button type="danger" size="large">
					开始阅读
				</mt-button>
			</router-link>
		</div>
	</div>
</template>

<script type="text/javascript">
	import Top from './common/topnav.vue'

	export default{
		name: 'mainbook',
		data() {
			return {
				book: [],
				imgUrl: '',
				cid: '',
				bid: ''
			}
		},
	    components: {
			Top
	    },
	    filters: {
			type(value) {
				switch (value) {
					case '0':
						return '玄幻魔法';
						break;
					case '1':
						return '武侠修真';
						break;
					case '2':
						return '都市言情';
						break;
					case '3':
						return '历史军事';
						break;
					case '4':
						return '网游竞技';
						break;
					case '5':
						return '异灵科幻';
						break;
					default:
						break;
				}
			}
	    },
	    created(){
		    document.body.scrollTop = 0;
			document.documentElement.scrollTop = 0;
	    	this.bid = this.$route.params.bid;
	    	this.$store.state.bookid = this.$route.params.bid;
	    },
	    mounted(){
	    	this.fetchbook();
	    },
	    methods: {
	    	fetchbook: async function(){
	    		const bid = this.$route.params.bid;
	    		let url = this.api.fetchbook;
	    		let params = {
			        bid: bid
			    }
			    const res = await this.$http.get(url, params);
			    this.book = res.data.book;
			    this.cid = res.data.cid.cid;
			    this.imgUrl = 'http://www.37zw.net' + this.book.imgUrl;
	    	}
	    }
	}
</script>

<style type="text/css" lang="scss" scoped>
	.main{
		margin-top: 45px;
		padding: 25px 15px 15px;
		display: flex;
		.left{
			width: 110px;
			img{
				width: 100%;
			}
		}
		.right{
			flex: 1;
			margin-left: 20px;
			display: flex;
			flex-direction: column;
			h4{
				margin-top: 4px;
			}
			h5{
				margin-top: 5px;
			}
		}
	}
	.book_main{
		padding: 0 15px 15px;
		p{
			font-size: 14px;
			color: #555;
			margin-top: 10px;
			text-indent: 28px;
		}
	}
	.new_chapter{
		padding: 15px 15px;
		h3{
			margin-bottom: 6px;
		}
		ul{
			li{
				list-style: none;
				padding: 6px 0;
				a{
					color: #555;
					text-decoration: none;
					display: block;
				}
			}
		}
	}
	.read{
		padding: 15px 15px;
		a{
			display: block;
			text-decoration: none;
			color: #ffffff;
		}
	}
</style>