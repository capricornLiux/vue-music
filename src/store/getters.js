/**
 * Created by liuxin on 2017/8/8.
 */
export const singer = state => state.singer
export const playing = playing => state.playing
export const fullScreen = fullScreen => state.fullScreen
export const playList = playList => state.playList
export const sequenceList = sequenceList => state.sequenceList
export const mode = mode => state.mode
export const currentIndex = mode => state.currentIndex
// 当前歌曲
export const currentSong = (state) => {
  return state.playList[state.currentIndex] || {}
}

