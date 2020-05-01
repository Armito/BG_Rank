<template>
  <div class="rank-page">
    <!-- 排名页头部 -->
    <div class="rank-page-header">
      <p class="rank-page-header-update">
        <i>更新于 {{dataTime}}</i>
        <van-button type="default" size="mini" class="update-btn" @click="handleUpdate">重新拉取</van-button>
      </p>
      <van-row class="rank-page-header-title">
        <van-col span="2" style="text-align: center">#</van-col>
        <van-col span="8"></van-col>
        <van-col span="9">Title</van-col>
        <van-col span="5" style="text-align: center">Rating</van-col>
      </van-row>
    </div>

    <!-- 排名页列表 -->
    <virtual-list
      class="rank-page-list"
      :data-key="'game_img'"
      :data-sources="items"
      :data-component="itemComponent"
    />
  </div>
</template>

<script>
import Vue from 'vue'
import { Toast } from 'vant'
// 导入长列表组件和列表项组件
import Item from '../components/Item'
import VirtualList from 'vue-virtual-scroll-list'

Vue.use(Toast)

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
      this.items = res.data
      this.dataTime = this.$moment(res.create_time).format('YYYY-MM-DD')
    },
    async handleUpdate () {
      Toast({
        message: '请移步Reptile.js使用Node运行获取',
        duration: 5000
      })
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
      font-size: 12px;
      .update-btn {
        float: right;
        .van-button__text {
          color: #999;
        }
      }
    }
    &-title {
      padding: 8px 2px;
      font-size: 14px;
      color: red
    }
  }
  &-list {
    height: 100%;
    overflow-y: auto;
  }
}
</style>
