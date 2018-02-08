<template>
  <div class="recommend">
    <h2 class="title">{{title}}</h2>
    <div class="list">
      <ul class="list-ul">
        <li class="list-li" v-for="book in homeList">
          <router-link :to="{ path: '/mainbook/' + book.bid}">
            <img :src="'http://www.37zw.net'+book.imgUrl">
            <p>{{ book.title }}</p>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">

  export default {
    data() {
      return {}
    },
    props: ['title', 'homeList']
  }
</script>

<style type="text/css" lang="scss" scoped>
  .recommend {
    padding: 15px 0;
    margin-bottom: 15px;
    background-color: #fff;
    .title {
      margin-left: 15px;
      margin-bottom: 10px;
      border-left: 2px solid #ed424b;
      text-indent: 5px;
      font-size: 16px;
      line-height: 16px;
    }
    .list {
      .list-ul {
        position: relative;
        overflow-x: auto;
        overflow-y: hidden;
        white-space: nowrap;
        text-indent: 7px;
        .list-li {
          display: inline-block;
          margin-right: 12px;
          width: 100px;
          white-space: normal;
          a{
            display: block;
            color: #000000;
            text-decoration: none;
            img {
              width: 100%;
              height:125px;
            }
            p {
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              margin-left: 7px;
              text-align: center;
              margin-top: 4px;
            }
          }
        }
      }
    }
  }
</style>
