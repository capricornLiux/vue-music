/**
 * Created by liuxin on 2017/8/9.
 */
import {getLyric} from 'api/song'
import {ERR_OK} from 'api/config'

export default class Song {
  constructor ({id, mid, singer, name, album, duration, image, url}) {
    this.id = id
    this.mid = mid
    this.singer = singer
    this.name = name
    this.album = album
    this.duration = duration
    this.image = image
    this.url = url
  }

  // 获取歌词
  getLyric () {
    getLyric(this.mid).then((res) => {
      if (res.retcode === ERR_OK) {
        console.log(res)
        this.lyric = res.lyric
      }
    })
  }
}

/**
 * 工厂方法 不提供new, 提供另一种方法创建实例
 * @param musicData
 * @returns {Song}
 */
export function createSong (musicData) {
  return new Song({
    id: musicData.songid,
    mid: musicData.songmid,
    singer: filtersinger(musicData.singer),
    name: musicData.songname,
    album: musicData.albumname,
    duration: musicData.interval,
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
    url: `http://ws.stream.qqmusic.qq.com/${musicData.songid}.m4a?fromtag=46`
  })
}

/**
 * 处理歌手
 * @param singer 歌手数组
 * @returns {string}
 */
function filtersinger (singer) {
  let ret = []

  // 边界处理
  if (!singer) {
    return ''
  }

  singer.forEach((item, index) => {
    ret.push(item.name)
  })
  return ret.join('/')
}
