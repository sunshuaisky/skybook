<template>
  <div class="book-list">
    <h2 class="title">{{title}}</h2>
    <ul>
      <li v-for="book in homeList">
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
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        typeArr: []
      }
    },
    props: ['title', 'homeList'],
  }
</script>

<style type="text/css" lang="less" scoped>
  .book-list {
    margin-top: 15px;
    padding: 15px;
    background-color: #fff;
    .title {
      margin-left: 0px;
      margin-bottom: 10px;
      border-left: 2px solid #ed424b;
      text-indent: 5px;
      font-size: 16px;
      line-height: 16px;
    }
    ul{
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
            margin-left: 20px;
            flex: 1;
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
  }
</style>

