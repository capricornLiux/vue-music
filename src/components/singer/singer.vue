<template>
  <div>singer</div>
</template>

<script type="text/ecmascript-6">
  import {getSingerList} from 'api/singer'
  import {ERR_OK} from 'api/config'

  const HOT_NAME = '热门'
  const HOT_SINGER_LEN = 10

  export default {
    data () {
      return {
        singerList: []
      }
    },
    created () {
      this._getSingerList()
    },

    methods: {
      // 获取歌手列表
      _getSingerList () {
        getSingerList().then(res => {
          if (res.code === ERR_OK) {
            this.singerList = res.data.list
            console.log(this.singerList)
            console.log(this._normalizeSinger(this.singerList))
          }
        })
      },

      /**
       * 序列化歌手数据
       * @param list
       * @private
       */
      _normalizeSinger (list) {
        // 遍历list, 热门数据和findex聚合数据
        // 创建对象
        let map = {
          // 热门数据
          hot: {
            title: HOT_NAME,
            items: []
          }
        }

        // 遍历list
        list.forEach((item, index) => {
          if (index < HOT_SINGER_LEN) {
            // 将歌手列表的前十条数据添加到热门数据中
            map.hot.items.push({
              id: item.Fsinger_mid,
              name: item.Fsinger_name,
              avatar: `https://y.gtimg.cn/music/photo_new/T001R150x150M000${item.Fsinger_mid}.jpg?max_age=2592000`
            })
          }
          const key = item.Findex
          if (!map[key]) {
            map[key] = {
              title: key,
              items: []
            }
          }
          map[key].items.push({
            id: item.Fsinger_mid,
            name: item.Fsinger_name,
            avatar: `https://y.gtimg.cn/music/photo_new/T001R150x150M000${item.Fsinger_mid}.jpg?max_age=2592000`
          })
        })

//        return map
        // 为了得到有序列表, 需要对map进行排序处理
        let hot = []
        let ret = []
        for (let key in map) {
          let val = map[key]
          if (val.title.match(/[a-zA-Z]/)) {
            ret.push(val)
          } else if (val.title === HOT_NAME) {
            hot.push(val)
          }
        }
        // 排序ret
        ret.sort((a, b) => {
          return a.title.charCodeAt(0) - b.title.charCodeAt(0)
        })
        return hot.concat(ret)
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus"></style>
