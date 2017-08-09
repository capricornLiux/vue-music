<template>
  <transition name="slide">
    <div class="singer-detail">
      7788
    </div>
  </transition>

</template>

<script type="text/ecmascript-6">
  // 路由依赖组件进行承载

  import {mapGetters} from 'vuex'

  export default {
    computed: {
      ...mapGetters([
        'singer'
      ])
    },

    created () {
      console.log('singer')
      console.log(this.singer)
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .singer-detail
    position: fixed
    top: 0
    right: 0
    bottom: 0
    left: 0
    z-index: 100
    background: $color-background
  .slide-enter-active
    transition: all .5s
  .slide-leave-active
    transition: all .5s
  .slide-enter, .slide-leave-to
    transform: translate3d(100%,0,0)
</style>
