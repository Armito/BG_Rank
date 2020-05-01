<template>
  <van-row
    class="list-item"
    @click="handleToDetail(source.game_rank)">
    <van-col span="2" style="text-align: center">{{source.game_rank}}</van-col>
    <van-col span="6">
      <div style="text-align: center">
        <img :src="source.game_thumbnail" :alt="source.game_name">
      </div>
    </van-col>
    <van-col span="12">{{source.game_name}}</van-col>
    <van-col span="4" style="text-align: center">{{source.game_rating}}</van-col>
  </van-row>
</template>

<script>
export default {
  name: 'item-component',
  props: {
    index: { // index of current item
      type: Number
    },
    source: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  methods: {
    handleToDetail (rank) {
      this.$router.push('/detail/' + rank)
    }
  }
}
</script>

<style lang="scss" scoped>
.list-item {
  height: 60px;
  padding: 10px 4px;
  display: flex;
  align-items: center;
  font-size: 14px;
  border-bottom: 1px solid #eee;
}
</style>
