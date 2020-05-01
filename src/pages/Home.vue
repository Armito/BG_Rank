<template>
  <div class="home-page">
    <van-button plain type="warning" @click="handleToRank">查看排名</van-button>
    <van-button plain type="danger" @click="handleToMy">查看收藏</van-button>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  methods: {
    handleToRank () {
      this.$router.push('rank')
    },
    handleToMy () {
      this.$router.push('my')
    }
  }
}
</script>

<style lang="scss" scoped>
.home-page {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  .van-button {
    margin-bottom: 50px;
  }
}
</style>
