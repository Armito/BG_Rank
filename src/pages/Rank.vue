<template>
  <div class="rank-page">
    <!-- 排名页头部 -->
    <div class="rank-page-header">
      <p class="rank-page-header-update">
        <i>更新于 {{dataTime}}</i>
      </p>
      <van-row class="rank-page-header-title">
        <van-col span="2" style="text-align: center">#</van-col>
        <van-col span="6"></van-col>
        <van-col span="12">Title</van-col>
        <van-col span="4" style="text-align: center">Rating</van-col>
      </van-row>
    </div>

    <!-- 排名页列表 -->
    <virtual-list
      class="rank-page-list"
      :data-key="'game_link'"
      :data-sources="items"
      :data-component="itemComponent"
    />
  </div>
</template>

<script>
// 导入长列表组件和列表项组件
import Item from '../components/Item'
import VirtualList from 'vue-virtual-scroll-list'

export default {
  data () {
    return {
      itemComponent: Item,
      items: [],
      dataTime: ''
    }
  },
  components: { 'virtual-list': VirtualList },
  created () {
    this.getGameData()
  },
  methods: {
    async getGameData () {
      const { data: res } = await this.$http.get('/data/data.json')
      console.log(res[0])
      this.items = res[0].data
      this.dataTime = res[0].create_time
    }
  }
}
</script>

<style lang="scss" scoped>
.rank-page {
  box-sizing: border-box;
  height: 100%;
  padding-top: 56px;
  &-header {
    margin-top: -56px;
    &-update {
      padding: 4px 20px;
      color: #999;
      font-size: 12px
    }
    &-title {
      padding: 8px 4px;
      font-size: 14px;
      display: flex;
      align-items: center;
      color: red
    }
  }
  &-list {
    height: 100%;
    overflow-y: auto;
  }
}
</style>
