const superagent = require('superagent')
const cheerio = require('cheerio')
const fs = require('fs')

class Reptile {
  constructor(pages) {
    this.Rank_Url = 'https://www.boardgamegeek.com/browse/boardgame/page/'
    this.Rank_Links = []
    this.JSON_path = '../../public/data/data.json'

    this.init(pages)
  }

  async init(pages) {
    await this.getRankLinks(pages)
    this.getDetailInfo()
  }

  // 生成爬取链接
  async getRankLinks(pages) {
    for (let i = 1; i <= pages; i++) {
      const HTML = await this.getHTMLInPage(this.Rank_Url + i)
      const links = this.getGameUID(HTML)
      this.Rank_Links = [...this.Rank_Links, ...links]
    }
    // console.log(this.Rank_Links)
  }

  // 获取指定页 HTML
  async getHTMLInPage(url) {
    const { text } = await superagent.get(url)
    return text
  }

  // 获取游戏爬取地址
  getGameUID(HTML) {
    const $ = cheerio.load(HTML)
    const game_info_boxs = $('#row_')
    const game_info_Array = []
    game_info_boxs.map((index, ele) => {
      const game_link = 'http://www.yihubg.com/game/' + $(ele).find('.collection_objectname a').attr('href').split('/')[2]
      game_info_Array.push({
        game_link
      })
    })
    return game_info_Array
  }

  // 
  async getDetailInfo() {
    const detailAll = []
    for (let i = 0; i < this.Rank_Links.length; i++) {
      const HTML = await this.getHTMLInPage(this.Rank_Links[i].game_link)
      const detail = this.getDetailsJson(HTML, i)
      detailAll.push(detail)
      console.log(i + ' Done')
    }

    this.writeJson({
      create_time: new Date().toString(),
      data: detailAll
    })
  }

  // 爬取详情页，形成 json
  getDetailsJson(html, i) {
    const $ = cheerio.load(html)
    const game_rank = i + 1
    const game_img = $('.lib-img-show').attr('src')
    const game_name = $('.box-shadow').children().eq(1).find('.lib-header-small').text().trim()
    const game_publishYear = $('.box-shadow').children().eq(2).find('.lib-header').text().trim()
    const game_rating = $('.box-shadow').children().eq(1).find('.lib-desc p').eq(7).find('span').text().trim()
    const game_players = $('.box-shadow').children().eq(1).find('.lib-desc p').eq(3).find('span').text().trim()
    const game_lasting = $('.box-shadow').children().eq(1).find('.lib-desc p').eq(4).find('span').text().trim()
    const game_weight = $('.box-shadow').children().eq(1).find('.lib-desc p').eq(5).find('span').text().trim()
    const game_designer = $('.box-shadow').children().eq(2).find('.lib-desc div').eq(1).find('p').eq(1).text().trim().substring(2).replace(/\s{2,}/g,"")
    const game_artist = $('.box-shadow').children().eq(2).find('.lib-desc div').eq(2).find('p').eq(1).text().trim().substring(2).replace(/\s{2,}/g,"")
    const game_publisher = $('.box-shadow').children().eq(2).find('.lib-desc div').eq(0).find('p').eq(1).text().trim().substring(2).replace(/\s{2,}/g,"")
    const game_des = $('.game-content').children().eq(0).find('p').text()
    const game_rule = $('#ruleFiles').find('li').eq(0).find('a').attr('href')
    return {
      game_rank,
      game_img,
      game_name,
      game_publishYear,
      game_rating,
      game_players,
      game_lasting,
      game_weight,
      game_designer,
      game_artist,
      game_publisher,
      game_des,
      game_rule: game_rule || ''
    }
  }

  // fs 写入数据
  writeJson(dataJson) {
    fs.writeFile(this.JSON_path, JSON.stringify(dataJson), err => {
      if (err) {
        console.log('数据生成失败')
        console.log(err)
      } else {
        console.log('数据生成成功')
      }
    });
  }
}

new Reptile(10)
