<template>
  <div class="detail-page">
    <van-nav-bar title="标题" left-text="返回" left-arrow fixed @click-left="onClickLeft">
      <template #right>
        <van-icon name="like-o" size="18" />
      </template>
    </van-nav-bar>
    <van-panel
      :title="gameDetailData.game_name"
      :desc="gameDetailData.game_publishYear"
      :status="'#' + gameDetailData.game_rank">
      <template>
        <div>
          <div style="text-align: center; padding: 15px">
            <van-image
              height="15rem"
              fit="contain"
              :src="gameDetailData.game_img"/>
          </div>
          <van-grid style="font-size: 14px">
            <van-grid-item icon="friends-o" :text="'人数: ' + gameDetailData.game_players" />
            <van-grid-item icon="clock-o" :text="'时长: ' + gameDetailData.game_lasting" />
            <van-grid-item icon="points" :text="'重度: ' + gameDetailData.game_weight + '/5'" />
            <van-grid-item icon="down" :text="'查看规则'" @click="handleReadRule(gameDetailData.game_rule)" />
          </van-grid>
          <div style="padding: 15px 5px 15px 15px; text-align: left; font-size: 14px; color: #666">
            <p><span style="color: #999">设计:</span> {{gameDetailData.game_designer}}</p>
            <p><span style="color: #999">美工:</span> {{gameDetailData.game_artist}}</p>
            <p><span style="color: #999">出版:</span> {{gameDetailData.game_publisher}}</p>
          </div>
          <div style="padding: 15px">
            <p>简介</p>
            <p style="font-size: 14px; color: #666; line-height: 1.8" v-html="gameDetailData.game_des"></p>
            <p class="bottom-line">- - - - 我是有底线的 - - - -</p>
          </div>
        </div>
      </template>
    </van-panel>
  </div>
</template>

<script>
export default {
  data () {
    return {
      gameDetailData: {}
    }
  },
  created () {
    this.getGameDetailData()
  },
  methods: {
    async getGameDetailData () {
      const { data: res } = await this.$http.get('/data/data.json')
      const targetGame = res.data.find(item => {
        return item.game_rank === +this.$route.params.rank
      })
      targetGame.game_players = targetGame.game_players.substring(0, targetGame.game_players.length - 8)
      targetGame.game_lasting = targetGame.game_lasting.split('-')[0].split(' ')[0] + 'min'
      targetGame.game_weight = targetGame.game_weight.replace(/\s*/g, '').split('(')[0]
      targetGame.game_publisher = targetGame.game_publisher.split('|')[0]
      targetGame.game_designer = targetGame.game_designer.split('|').join(' | ')
      targetGame.game_artist = targetGame.game_artist.split('|').join(' | ')
      this.gameDetailData = targetGame
    },
    handleReadRule (src) {
      if (src.length !== 0) {
        if (navigator.userAgent.includes('Windows')) {
          const anch = document.createElement('a')
          anch.href = src
          anch.target = '_blank'
          anch.click()
          return
        }
        this.$toast('请用PC查看规则!')
        return
      }
      this.$toast('规则暂缺!')
    },
    handleLikeToggle (rank) {
      const flag = this.$store.state.likes.some(item => {
        return item === rank
      })
      if (flag) {
        this.$store.commit('removeLike', rank)
        this.$toast('已取消我喜欢~')
      } else {
        this.$store.commit('addLike', rank)
        this.$toast('已加入我喜欢~')
      }
    },
    onClickLeft() {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
.detail-page {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding-top: 46px;
  z-index: 2;
  overflow-y: auto;
  ::v-deep .van-nav-bar__left .van-nav-bar__text,
  ::v-deep .van-nav-bar__left .van-icon {
    color: red;
  }
  .van-button {
    border: none;
  }
  .van-icon {
    color: red;
    font-size: 14px;
  }
  .bottom-line {
    margin: 20px 0;
    text-align: center;
    color: #ccc;
    font-size: 12px;
  }
}
</style>
