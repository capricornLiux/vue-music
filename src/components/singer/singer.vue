<template>
  <div>singer</div>
</template>

<script type="text/ecmascript-6">
  import {getSingerList} from 'api/singer'
  import {ERR_OK} from 'api/config'
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
          }
        })
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus"></style>
