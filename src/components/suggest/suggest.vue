<template>
  <div class="suggest">
    <ul class="suggest-list">
      <li class="suggest-item" v-for="item in result">
        <!--歌曲或者歌手图标-->
        <div class="icon">
          <i :class="getIconClass(item)"></i>
        </div>

        <!--歌曲/歌手名-->
        <div class="name">
          <p class="text" v-html="getDisplayName(item)"></p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getSearchResult} from 'api/search'
  import {ERR_OK} from 'api/config'
  import {filtersinger} from 'common/js/song'

  const TYPE_SINGER = 'singer'

  export default {
    data () {
      return {
        // 搜索页码
        pageNum: 1,
        // 处理过的搜索结果
        result: []
      }
    },
    props: {
      // 外部组件提供的检索词
      query: {
        type: String,
        default: ''
      },
      // 是否在搜索结果中显示歌手
      isSearchSinger: {
        type: Boolean,
        default: true
      }
    },

    watch: {
      // 监测query检索词的变化
      query () {
        // 请求检索结果数据
        this.search()
      }
    },
    methods: {
      search () {
        // 请求服务端检索数据
        getSearchResult(this.query, this.pageNum, this.isSearchSinger).then((res) => {
          if (res.code === ERR_OK) {
            console.log(res)
            this.result = this._normalizeData(res.data)
          }
        }).catch((error) => {
          console.log(error)
        })
      },
      _normalizeData (data) {
        let ret = []
        if (data.zhida && data.zhida.singerid) {
          // 有歌手结果
          ret.push({...data.zhida, ...{type: TYPE_SINGER}})
        }
        if (data.song) {
          ret = ret.concat(data.song.list)
        }
//        console.log(ret)
        return ret
      },
      getIconClass (item) {
        if (item.type === TYPE_SINGER) {
          return 'icon-mine'
        } else {
          return 'icon-music'
        }
      },
      getDisplayName (item) {
        if (item.type === TYPE_SINGER) {
          return item.singername
        } else {
          return `${item.songname}-${filtersinger(item.singer)}`
        }
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .suggest
    height: 100%
    overflow: hidden
    .suggest-list
      padding: 0 30px
      .suggest-item
        display: flex
        align-items: center
        padding-bottom: 20px
      .icon
        flex: 0 0 30px
        width: 30px
        [class^="icon-"]
          font-size: 14px
          color: $color-text-d
      .name
        flex: 1
        font-size: $font-size-medium
        color: $color-text-d
        overflow: hidden
        .text
          no-wrap()
    .no-result-wrapper
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>
