<template>
  <div class="index-page">
    <router-view></router-view>

    <van-tabbar :value="active" active-color="#07c160" inactive-color="#000" @change="handleTabChange">
      <van-tabbar-item icon="home-o" name="home" to="/home" replace>首页</van-tabbar-item>
      <van-tabbar-item icon="fire-o" name="rank" to="/rank" replace>排名</van-tabbar-item>
      <van-tabbar-item icon="search" name="search" to="/search" replace>搜索</van-tabbar-item>
      <van-tabbar-item icon="manager-o" name="my" to="/my" replace>我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  computed: {
    active () {
      return this.$route.path.slice(1)
    }
  },
  methods: {
    handleTabChange (active) {
      console.log(active)
    }
  },
  beforeEnter: (to, from, next) => {
    console.log(to, 23333333333)
  }
}
</script>

<style lang="scss" scoped>
.index-page {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding-bottom: 50px;;
}
</style>
