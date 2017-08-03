<template>
  <div class="recommend">
    <scroll class="recommend-content" :data="discList" ref="scroll">

      <!--better-scroll的子元素只有第一个才能滚动, 所以要将下面的两个子元素div合并为一个-->
      <div>

        <!--轮播-->
        <div class="slider-wrapper" v-if="recommends.length">

          <!--使用slider组件-->
          <slider>
            <!--放在插槽中的内容-->
            <div v-for="item in recommends">
              <!--遍历轮播图的数据-->
              <a href="item.linkUrl">
                <img :src="item.picUrl" alt="" @load="loadImg" class="needsclick">
              </a>
              <!--遍历轮播图的数据结束-->
            </div>
            <!--放在插槽中的内容结束-->

          </slider>
          <!--使用slider组件结束-->

        </div>
        <!--轮播结束-->

        <!--推荐列表-->
        <div class="recommend-list">
          <h1 class="list-title">热门歌单推荐</h1>
          <ul>
            <li v-for="item in discList" class="item">
              <div class="icon">
                <!--<img :src="item.imgurl" alt="" width="60" height="60">-->
                <img v-lazy="item.imgurl" alt="" width="60" height="60">
              </div>
              <div class="text">
                <!--<h2 class="name">{{item.creator.name}}</h2>-->
                <!--<p class="desc">{{item.dissname}}</p>-->

                <!--todo v-html的作用-->
                <h2 class="name" v-html="item.creator.name"></h2>
                <p class="desc" v-html="item.dissname"></p>
              </div>
            </li>
          </ul>
        </div>
        <!--推荐列表结束-->

      </div>
    </scroll>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getRecommend, getDiscList} from 'api/recommend.js'
  import {ERR_OK} from 'api/config.js'
  import Scroll from 'base/scroll/scroll.vue'

  // 引入slider组件
  import Slider from 'base/slider/slider.vue'
  // 这里有一个疑问? 为什么slider.vue没有export的情况下也可以使用呢?
  // todo

  export default {

    data () {
      return {
        recommends: [],

        // 推荐歌单list
        discList: []
      }
    },

    components: {
      Slider,
      Scroll
    },

    // 声明周期钩子函数
    created () {
      this._getRecommend()
      this._getDiscList()
    },

    methods: {
      // 获取推荐数据
      _getRecommend () {
        getRecommend().then((res) => {
          if (res.code === ERR_OK) {
            this.recommends = res.data.slider
          }
        })
      },

      _getDiscList () {
        getDiscList().then((res) => {
          if (res.code === ERR_OK) {
            this.discList = res.data.list
          }
        })
      },

      // 当图片加载的时候进行调用
      loadImg () {
        if (!this.checkloaded) {
          this.checkloaded = true
          this.$refs.scroll.refresh()
        }
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
