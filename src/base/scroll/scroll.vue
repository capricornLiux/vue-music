<template>
  <div ref="wrapper">
    <!--使用插槽-->
    <slot></slot>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'

  export default {
    props: {
      // 监听滚动事件的类型
      probeType: {
        type: Number,
        default: 1
      },
      click: {
        type: Boolean,
        default: true
      },
      data: {
        type: Array,
        default: null
      }
    },

    // 生命周期hook
    mounted () {
      setTimeout(() => {
        this._initScroll()
      }, 20)
    },

    methods: {
      _initScroll () {
        if (!this.$refs.wrapper) {
          return
        }
        this.scroll = new BScroll(this.$refs.wrapper, {
          probeType: this.probeType,
          click: this.click
        })
      },

      // 方法代理
      enable () {
        // 启用better-scroll
        this.scroll && this.scroll.enable()
      },
      disable () {
        // 禁用better-scroll
        this.scroll && this.scroll.disable()
      },
      refresh () {
        this.scroll && this.scroll.refresh()
      }
    },

    watch: {
      // 如果data变化了, 刷新
      data () {
        setTimeout(() => {
          this.refresh()
        }, 20)
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
