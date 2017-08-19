<template>
  <transition name="slide">
    <music-list :title="title" :bgImage="bgImage" :songs="songs"></music-list>
  </transition>
</template>

<script type="text/ecmascript-6">
  import MusicList from 'components/music-list/music-list'
  import {mapGetters} from 'vuex'
  import {getDiscSongList} from 'api/recommend'
  import {ERR_OK} from 'api/config'

  export default {
    data () {
      return {
        songs: []
      }
    },
    components: {
      MusicList
    },
    computed: {
      ...mapGetters([
        'disc'
      ]),
      title () {
        return this.disc.dissname
      },
      bgImage () {
        return this.disc.imgurl
      }
    },
    created () {
      this._getDiscSongList()
    },
    methods: {
      _getDiscSongList () {
        console.log(123)
        getDiscSongList(this.disc.dissid).then((res) => {
          console.log(res)
          if (res.code === ERR_OK) {
            console.log(111)
            console.log(res.cdlist[0].songlist)
          }
//          console.log(res)
//          this.songs = res
        }).catch((error) => {
          console.log(error)
        })
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .slide-enter-active, .slide-leave-active
    transition: all 0.5s
  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>
