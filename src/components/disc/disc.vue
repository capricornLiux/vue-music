<template>
  <transition name="slide">
    <music-list :title="title" :bgImage="bgImage"></music-list>
  </transition>
</template>

<script type="text/ecmascript-6">
  import MusicList from 'components/music-list/music-list'
  import {mapGetters} from 'vuex'

  export default {
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
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .slide-enter-active, .slide-leave-active
    transition: all 0.5s
  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>
