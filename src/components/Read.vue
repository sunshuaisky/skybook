<template>
	<div class="read">
		<Top :title="title"></Top>
		<div class="content" :night="bg_night" :bg="bg_color" ref="fz_size">
			<h2>{{ chapter }}</h2>
			<div>
				<p v-for="p in content">{{ p }}</p>
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
		        this.fetchchapter(this.booksReadInfo[id].chapter);
		        this.$store.state.curChapter = this.booksReadInfo[id].chapter;
			} else {
				if (localBookReaderInfo) {
					this.booksReadInfo = localBookReaderInfo;
			        this.fetchchapter(this.$route.params.cid);
			        this.$store.state.curChapter = this.$route.params.cid;
				} else {
				    this.booksReadInfo[id] = {
					    book: id,
				    	chapter: this.$route.params.cid
					}
			        this.fetchchapter(this.$route.params.cid);
			        this.$store.state.curChapter = this.$route.params.cid;
				}
			}
	    },
	    mounted(){
	    	this.$refs.fz_size.style.fontSize = this.fz_size + 'px';
	    	this.fetchClist(this.$route.params.bid);
	    },
	    methods: {
	    	fetchchapter: async function(cid){
	    		let url = this.api.bookchapter;
	    		let params = {
			        cid: cid
			    }
			    document.body.scrollTop = 0;
				document.documentElement.scrollTop = 0;
			    const res = await this.$http.get(url, params);
		        this.$store.state.curChapter = cid;
			    this.title = res.data.chapter.title;
			    this.chapter = res.data.chapter.chapter;
			    this.content = res.data.chapter.content.split('<br><br>');
	    	},
	    	clickBar() {
		        this.$store.dispatch('toggleBar');
        		this.$store.state.font_panel = false;
		    },
	        saveBooksInfo() {
		        let cid = this.curChapter;
		        this.booksReadInfo[this.bookid] = {
	        		book: this.$route.params.bid,
	        		chapter: cid
		        }
		        localEvent.StorageSetter('bookreaderinfo', this.booksReadInfo);
	    	},
			fetchClist: async function(bid){
	    		let url = this.api.Clist;
	    		let params = {
			        bid: bid
			    }
			    const res = await this.$http.get(url, params);
			    this.$store.state.Clist = res.data.chapter;
	    	},
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
				this.fetchchapter(val);
				this.saveBooksInfo();
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
		height: 100%;
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
</style>