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

  // 导入api
  import {getSingerDetail} from 'api/singer'

  export default {
    computed: {
      ...mapGetters([
        'singer'
      ])
    },

    created () {
      this._getDetail()
    },

    methods: {
      _getDetail () {
        // vuex的数据没有的时候返回上一页
        if (!this.singer.id) {
          this.$router.push('/singer')
          return
        }

        getSingerDetail(this.singer.id).then((res) => {

        })
      }
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
