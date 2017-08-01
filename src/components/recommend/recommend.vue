<template>
  <div class="recommend">
    <div class="recommend-content">
      <!--轮播-->
      <div class="slider-wrapper"></div>
      <!--轮播结束-->

      <!--推荐列表-->
      <div class="recommend-list">
        <h1 class="list-title">热门歌单推荐</h1>
        <ul></ul>
      </div>
      <!--推荐列表结束-->
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getRecommend} from 'api/recommend.js'
  import {ERR_OK} from 'api/config.js'

  export default {
    // 声明周期钩子函数
    created () {
      this._getRecommend()
    },

    methods: {
      // 获取推荐数据
      _getRecommend () {
        getRecommend().then((res) => {
          if (res.code === ERR_OK) {
            console.log(res)
          }
        })
      }
    }

  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .recommend
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .recommend-content
      height: 100%
      overflow: hidden
      .slider-wrapper
        position: relative
        width: 100%
        overflow: hidden
      .recommend-list
        .list-title
          height: 65px
          line-height: 65px
          text-align: center
          font-size: $font-size-medium
          color: $color-theme
        .item
          display: flex
          box-sizing: border-box
          align-items: center
          padding: 0 20px 20px 20px
          .icon
            flex: 0 0 60px
            width: 60px
            padding-right: 20px
          .text
            display: flex
            flex-direction: column
            justify-content: center
            flex: 1
            line-height: 20px
            overflow: hidden
            font-size: $font-size-medium
            .name
              margin-bottom: 10px
              color: $color-text
            .desc
              color: $color-text-d
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>
