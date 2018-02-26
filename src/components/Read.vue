<template>
	<div class="read">
		<Top :title="title"></Top>
		<div class="content" :night="bg_night" :bg="bg_color" ref="fz_size">
			<h2>{{ chapter }}</h2>
			<div>
				<p v-for="p in content">{{ p }}</p>
			</div>
			<div class="jump">
				<div class="prev" @click="prev(curChapter)">上一章</div>
				<div class="next" @click="next(curChapter)">下一章</div>
			</div>
		</div>
		<Cover :class="{hide:!list_panel}"></Cover>
		<Clist :class="{show:list_panel}"></Clist>
		<Set></Set>
		<Bottom :bid="bookid"></Bottom>
		<div class="mid" @click="clickBar()"></div>
	</div>
</template>

<script type="text/javascript">
	import Top from './common/readtop.vue'
	import Bottom from './common/readbottom.vue'
	import Set from './common/Set.vue'
	import Clist from './common/Chapterlist.vue'
	import Cover from './common/Cover.vue'
	import { mapState } from 'vuex'
	import localEvent from '@/utils/local'

	export default{
		name: 'bookchapter',
		data() {
			return {
				title: '',
				bookid: '',
				chapter: '',
				content: [],
        		booksReadInfo: {}
			}
		},
	    components: {
			Top,
			Bottom,
			Set,
			Clist,
			Cover
	    },
	    created() {
	    	if (localEvent.StorageGetter('fz_size')) {
	        	this.$store.state.fz_size = localEvent.StorageGetter('fz_size');
	     	}
	     	if (localEvent.StorageGetter('bg_color')) {
	        	this.$store.state.bg_color = localEvent.StorageGetter('bg_color');
	     	}
			const localBookReaderInfo = localEvent.StorageGetter('bookreaderinfo');
			let id = this.$route.params.bid;
			this.bookid = this.$route.params.bid;
			if (localBookReaderInfo && localBookReaderInfo[id]) {
				this.booksReadInfo = localEvent.StorageGetter('bookreaderinfo');
		        this.fetchchapter(id, this.booksReadInfo[id].nums);
		        this.$store.state.curChapter = this.booksReadInfo[id].nums;
			} else {
				if (localBookReaderInfo) {
					this.booksReadInfo = localBookReaderInfo;
			        this.fetchchapter(id, 1);
			        this.$store.state.curChapter = 1;
				} else {
				    this.booksReadInfo[id] = {
					    book: id,
				    	nums: 1
					}
			        this.fetchchapter(id, 1);
			        this.$store.state.curChapter = 1;
				}
			}
	    },
	    mounted(){
	    	this.$refs.fz_size.style.fontSize = this.fz_size + 'px';
	    },
	    methods: {
	    	fetchchapter: async function(bid,nums){
	    		let url = this.api.bookchapter;
	    		let params = {
			        bid: bid,
			        nums: nums
			    }
			    document.body.scrollTop = 0;
				document.documentElement.scrollTop = 0;
			    const res = await this.$http.get(url, params);
			    console.log(res)
		        this.$store.state.curChapter = nums;
			    this.title = res.data.content.title;
			    this.chapter = res.data.content.chapter;
			    this.content = res.data.content.content.split('<br><br>');
			    this.$store.state.Clist = res.data.chapter;
	    	},
	    	clickBar() {
		        this.$store.dispatch('toggleBar');
        		this.$store.state.font_panel = false;
		    },
	        saveBooksInfo(nums) {
		        this.booksReadInfo[this.bookid] = {
	        		book: this.bookid,
	        		nums: nums
		        }
		        localEvent.StorageSetter('bookreaderinfo', this.booksReadInfo);
	    	},
	    	prev: function(curChapter){
	    		this.$store.state.curChapter = curChapter - 1;
	    	},
	    	next: function(curChapter){
	    		this.$store.state.curChapter = curChapter + 1;
	    	}
	    },
	    computed: mapState([
			'bg_night','fz_size','font_panel','bg_color','list_panel', 'curChapter'
		]),
		watch:{
			fz_size(val){
		        this.$refs.fz_size.style.fontSize = val + 'px';
		        localEvent.StorageSetter('fz_size', val);
			},
			curChapter(val){
				this.fetchchapter(this.bookid, val);
				this.saveBooksInfo(val);
			}
		}
	}
</script>

<style type="text/css" lang="scss" scoped>
	.read{
		height: 100%;
	}
	.content{
		background-color: #e9dfc7;
		padding: 15px;
		min-height: 100%;
		color: #555;
	}
	.content[night="true"]{
		background-color: #0f1410;
	}
	.content[bg="0"]{
		background-color: #e9dfc7;
	}
	.content[bg="1"]{
		background-color: #e7eee5;
	}
	.content[bg="2"]{
		background-color: #a4a4a4;
	}
	.content[bg="3"]{
		background-color: #cdefcd;
	}
	.content[bg="4"]{
		background-color: #283548;
	}
	p{
		padding: 5px 0;
	}
	p:nth-child(1){
		margin-top: 20px;
		padding: 0;
	}
	.mid{
		position: fixed;
		top: 100px;
	    left: 50px;
	    bottom: 100px;
	    right: 50px;
	}
	.jump{
		width: 100%;
		margin-top: 10px;
		margin-bottom: 10px;
		display: flex;
	    align-items: center;
    	justify-content: space-around;
		.prev, .next{
			width: 40%;
			height: 30px;
			background-color: #555555;
			color: #ffffff;
			font-size: 16px;
			border-radius: 5px;
			text-align: center;
			line-height: 30px;
		}
	}
</style>