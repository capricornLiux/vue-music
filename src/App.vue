<template>
  <div id="app">
    <m-header></m-header>
    <tab></tab>
    <!--使用keep-alive进行缓存-->
    <keep-alive>
      <router-view></router-view>
    </keep-alive>

  </div>
</template>

<script type="text/ecmascript-6">
  import MHeader from 'components/m-header/m-header.vue'
  import Tab from 'components/tab/tab'
  export default {
    components: {
      MHeader,
      Tab
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">


</style>
