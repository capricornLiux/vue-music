/**
 * Created by liuxin on 2017/8/8.
 */
// 在一个动作中提交大量的mutation, 封装在actions中
import * as types from './mutation-types'
export const selectPlay = function ({commit, state}, {list, index}) {
  // 提交mutation
  commit(types.SET_SEQUENCELIST, list)
  commit(types.SET_PLAYLIST, list)
  commit(types.SET_CURRENTINDEX, index)
  commit(types.SET_FULLSCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
}
