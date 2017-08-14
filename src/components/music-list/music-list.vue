<template>
  <div class="music-list">
    <!--返回按钮-->
    <div class="back">
      <i class="icon-back"></i>
    </div>
    <!--返回按钮结束-->

    <!--歌手名-->
    <h1 class="title" v-html="title"></h1>
    <!--歌手名结束-->

    <!--歌手头图-->
    <div class="bg-image" :style="bgStyle" ref="bgImage">
      <div class="filter" ref="filter"></div>
    </div>
    <!--歌手头图结束-->

    <!--带着歌曲列表上滑的层-->
    <div class="bg-layer" ref="layer"></div>

    <!--使用scroll包装歌曲列表组件-->
    <scroll :data="songs" class="list" ref="list" :probe-type="probeType" :listen-scroll="listenScroll" @scroll="scroll">
      <div class="song-list-wrapper">
        <song-list :songs="songs"></song-list>
      </div>
    </scroll>
    <!--使用scroll包装歌曲列表组件结束-->
  </div>
</template>

<script type="text/ecmascript-6">
  import Scroll from 'base/scroll/scroll'
  import SongList from 'base/song-list/song-list'

  // 使用vender prefix前缀函数
  import {prefixStyle} from 'common/js/dom.js'

  const transform = prefixStyle('transform')
  const backdrop = prefixStyle('backdrop-filter')

  // 预留title的位置高度
  const RESERVED_HEIGHT = 40

  export default {
    components: {
      Scroll,
      SongList
    },
    props: {
      bgImage: {
        type: String,
        default: ''
      },
      songs: {
        type: Array,
        default: []
      },
      title: {
        type: String,
        default: ''
      }
    },
    computed: {
      bgStyle () {
        return `background-image:url(${this.bgImage})`
      }
    },
    created () {
      this.probeType = 3
      this.listenScroll = true
    },
    mounted () {
      // 缓存图片高度
      this.imageHeight = this.$refs.bgImage.clientHeight
      this.minTranslateY = -this.imageHeight + RESERVED_HEIGHT
      this.$refs.list.$el.style.top = this.$refs.bgImage.clientHeight + 'px'
    },
    methods: {
      // 滚动的时候调用
      scroll (pos) {
        this.scrollY = pos.y
      }
    },
    data () {
      return {
        scrollY: 0
      }
    },
    watch: {
      // 滚动的时候调用
      scrollY (newY) {
        let zIndex = 0

        // 控制歌手头图的大小
        let scale = 1

        // 模糊度
        let blur = 0

        // layer层的滚动距离限制
        let maxScrollY = Math.max(this.minTranslateY, newY)

        // 滚动占图片高度的比值
        const percent = Math.abs(newY / this.imageHeight)

        if (newY > 0) {
          scale = 1 + percent
          zIndex = 10
        } else {
          blur = Math.min(20 * percent, 20)
        }
        this.$refs.layer.style[transform] = `translate3d(0,${maxScrollY}px,0)`
        this.$refs.filter.style[backdrop] = `blur(${blur}px)`
        this.$refs.bgImage.style[transform] = `scale(${scale})`

        if (newY < this.minTranslateY) {
          // 图片遮盖滚动菜单
          this.$refs.bgImage.style.height = `${RESERVED_HEIGHT}px`
          this.$refs.bgImage.style.paddingTop = 0
          zIndex = 10
        } else {
          this.$refs.bgImage.style.height = 0
          this.$refs.bgImage.style.paddingTop = '70%'
        }
        this.$refs.bgImage.style.zIndex = zIndex
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .music-list
    position: fixed
    z-index: 100
    top: 0
    left: 0
    bottom: 0
    right: 0
    background: $color-background
    .back
      position absolute
      top: 0
      left: 6px
      z-index: 50
      .icon-back
        display: block
        padding: 10px
        font-size: $font-size-large-x
        color: $color-theme
    .title
      position: absolute
      top: 0
      left: 10%
      z-index: 40
      width: 80%
      no-wrap()
      text-align: center
      line-height: 40px
      font-size: $font-size-large
      color: $color-text
    .bg-image
      position: relative
      width: 100%
      height: 0
      padding-top: 70%
      transform-origin: top
      background-size: cover
      .play-wrapper
        position: absolute
        bottom: 20px
        z-index: 50
        width: 100%
        .play
          box-sizing: border-box
          width: 135px
          padding: 7px 0
          margin: 0 auto
          text-align: center
          border: 1px solid $color-theme
          color: $color-theme
          border-radius: 100px
          font-size: 0
          .icon-play
            display: inline-block
            vertical-align: middle
            margin-right: 6px
            font-size: $font-size-medium-x
          .text
            display: inline-block
            vertical-align: middle
            font-size: $font-size-small
      .filter
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
        background: rgba(7, 17, 27, 0.4)
    .bg-layer
      position: relative
      height: 100%
      background: $color-background
    .list
      position: fixed
      top: 0
      bottom: 0
      width: 100%
      background: $color-background
      .song-list-wrapper
        padding: 20px 30px
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>
