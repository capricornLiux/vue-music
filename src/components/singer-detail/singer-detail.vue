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

  import {createSong} from 'common/js/song'

  import {ERR_OK} from 'api/config'

  export default {
    data () {
      return {
        // 歌手的所有歌曲
        songs: []
      }
    },
    computed: {
      ...mapGetters([
        'singer'
      ])
    },

    created () {
      this._getDetail()
    },

    methods: {
      /**
       * 发送网络请求, 获取歌手信息
       * @private
       */
      _getDetail () {
        // vuex的数据没有的时候返回上一页
        if (!this.singer.id) {
          this.$router.push('/singer')
          return
        }

        getSingerDetail(this.singer.id).then((res) => {
          if (res.code === ERR_OK) {
            this.songs = this._normalizeSongs(res.data.list)
          }
        })
      },

      /**
       * 构造歌曲数据
       * @param list 歌手信息数据
       * @private
       */
      _normalizeSongs (list) {
        let ret = []
        list.forEach((item, index) => {
          // 解构赋值
          /*
          *
           let obj = {
              a: 10,
              b: {
                name: 'zs',
                age : 10
              }
           }

           let {b} = obj;
           console.log(b.name)
          * */

          /*
           $traceurRuntime.ModuleStore.getAnonymousModule(function() {
            "use strict";
            var obj = {
              a: 10,
              b: {
                name: 'zs',
                age: 10
              }
            };
            var b = obj.b;
            console.log(b.name);
            return {};
           });
           //# sourceURL=traceured.js
          */
          let {musicData} = item

          // songid 和 albummid是必须的
          if (musicData.songid && musicData.albummid) {
            // 使用工厂方法创建实例
            ret.push(createSong(musicData))
          }
        })
        return ret
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
