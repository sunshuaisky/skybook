<template>
	<div>
		<Top :title="type | type"></Top>
		<ul v-infinite-scroll="loadMore"
  			infinite-scroll-disabled="loading"
			infinite-scroll-distance="38">
	      <li v-for="book in bookList">
        		<router-link :to="{ path: '/mainbook/' + book.bid}">
			        <img :src="'http://www.37zw.net'+book.imgUrl">
			        <div class="right">
			          <h3>{{ book.title }}</h3>
			          <p class="main">{{ book.main }}</p>
			          <div class="author">
			            <i class="fa fa-user-o"></i>
			            {{ book.author }}
			          </div>
			        </div>
	    		</router-link>
	      </li>
	    </ul>
		<mt-spinner :type="2" v-show="loading" color="#FF4500"></mt-spinner>
	</div>
</template>

<script type="text/javascript">
	import Top from './common/topnav.vue'

	export default{
		name: 'mainbook',
		data() {
			return {
				type: this.$route.params.type,
				bookList: [],
				scrolled: false,
				page: 1,
				loading: false
			}
		},
	    components: {
			Top
	    },
	    filters: {
			type(value) {
				switch (value) {
					case '0':
						return '玄幻魔法'
						break
					case '1':
						return '武侠修真'
						break
					case '2':
						return '都市言情'
						break
					case '3':
						return '历史军事'
						break
					case '4':
						return '网游竞技'
						break
					case '5':
						return '异灵科幻'
						break
					default:
						break
				}
			}
	    },
		mounted: function () {
		    
		},
	    methods: {
	    	fetchList: async function(page){
	    		let url = this.api.booklist;
			    let params = {
			        type: this.type,
			        page: page
			    };
			    const res = await this.$http.get(url, params);
			    console.log(res)
			    for(let i = 0; i < res.data.books.length; i++){
			    	this.bookList.push(res.data.books[i]);
			    }
			    this.$nextTick(function(){
			    	this.page ++;
			    })
	    	},
	    	loadMore() {
	    		this.loading = true;
				setTimeout(() => {
					this.fetchList(this.page);
					this.loading = false;
				}, 2500);
			}
	    }
	}
</script>

<style type="text/css" lang="scss" scoped>
	ul{
		margin-top: 60px;
		padding: 0 15px;
      li {
        display: flex;
        padding-bottom: 10px;
        margin-bottom: 14px;
        border-bottom: 1px solid #ddd;
	    a{
	    	display: flex;
	    	text-decoration: none;
	    	img{
	          width: 80px;
	          height: 100px;
	        }
	        .right{
	        	flex: 1;
	          margin-left: 20px;
	          h3{
	            margin-bottom: 6px;
	            color: #000000;
	          }
	          .main{
	            height: 40px;
	            font-size: 14px;
	            color: #969ba3;
	            text-overflow:ellipsis;
	            display:-webkit-box;
	            -webkit-box-orient:vertical;
	            -webkit-line-clamp:2;
	            overflow: hidden;
	          }
	          .author{
	            margin-top: 4px;
	            color: #969ba3;
	            i{
	              font-size: 14px;
	              font-weight: bold;
	            }
	          }
	        }
	    }
      }
    }
</style>

<style type="text/css" lang="scss">
    .mint-spinner-triple-bounce{
    	text-align: center;
    	margin-bottom: 10px;
    }
</style>