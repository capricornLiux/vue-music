<template>
  <div class="search">

    <!--搜索框-->
    <div class="search-box-wrapper">
      <search-box ref="searchBox" @queryChange="onSearchBoxChange"></search-box>
    </div>
    <!--搜索框结束-->

    <!--热门搜索关键词-->
    <div class="shortcut-wrapper" v-show="!query.length">
      <div class="shortcut">
        <div class="hot-key">
          <h1 class="title">热门搜索</h1>
          <ul>
            <li class="item" v-for="item in hotKey" @click="clickHotKeyItem(item)">
              <span>{{item.k}}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!--热门搜索关键词结束-->

    <suggest :query="this.query" v-show="query.length"></suggest>



  </div>

</template>

<script type="text/ecmascript-6">
  import SearchBox from 'base/search-box/search-box'
  import {getHotKey} from 'api/search'
  import {ERR_OK} from 'api/config'
  import Suggest from 'components/suggest/suggest'
  export default {
    components: {
      SearchBox,
      Suggest
    },
    data () {
      return {
        // 关键词结果集
        hotKey: [],
        query: ''
      }
    },
    created () {
      this._getHotKey()
    },
    methods: {
      _getHotKey () {
        getHotKey().then((res) => {
          if (res.code === ERR_OK) {
            console.log(res)
            this.hotKey = res.data.hotkey.slice(0, 10)
          }
        })
      },
      clickHotKeyItem (item) {
        this.$refs.searchBox.setQuery(item.k)
      },
      onSearchBoxChange (newValue) {
//        console.log(newValue)
        this.query = newValue
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .search
    .search-box-wrapper
      margin: 20px
    .shortcut-wrapper
      position: fixed
      top: 178px
      bottom: 0
      width: 100%
      .shortcut
        height: 100%
        overflow: hidden
        .hot-key
          margin: 0 20px 20px 20px
          .title
            margin-bottom: 20px
            font-size: $font-size-medium
            color: $color-text-l
          .item
            display: inline-block
            padding: 5px 10px
            margin: 0 20px 10px 0
            border-radius: 6px
            background: $color-highlight-background
            font-size: $font-size-medium
            color: $color-text-d
        .search-history
          position: relative
          margin: 0 20px
          .title
            display: flex
            align-items: center
            height: 40px
            font-size: $font-size-medium
            color: $color-text-l
            .text
              flex: 1
            .clear
              extend-click()
              .icon-clear
                font-size: $font-size-medium
                color: $color-text-d
    .search-result
      position: fixed
      width: 100%
      top: 178px
      bottom: 0
</style>
