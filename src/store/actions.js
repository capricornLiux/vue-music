/**
 * Created by liuxin on 2017/8/8.
 */
// 在一个动作中提交大量的mutation, 封装在actions中
import * as types from './mutation-types'
import {playMode} from 'common/js/config'
import {shuffle} from 'common/js/util'

function findIndex (list, song) {
  return list.findIndex((currentSong) => {
    return currentSong.id === song.id
  })
}

/**
 * 歌手页面点击歌曲的action
 * @param commit
 * @param state
 * @param list
 * @param index
 */
export const selectPlay = function ({commit, state}, {list, index}) {
  // 提交mutation
  // 判断当前的播放状态
  if (state.mode === playMode.random) {
    // 改变当前的playlist和currentindex
    let randomList = shuffle(list)
    commit(types.SET_PLAYLIST, randomList)

    index = findIndex(randomList, list[index])
  } else {
    commit(types.SET_PLAYLIST, list)
  }
  commit(types.SET_CURRENTINDEX, index)
  commit(types.SET_SEQUENCELIST, list)
  commit(types.SET_FULLSCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
}

export const randomPlay = function ({commit}, {list}) {
  commit(types.SET_PLAYMODE, playMode.random)
  commit(types.SET_SEQUENCELIST, list)
  commit(types.SET_PLAYLIST, shuffle(list))
  commit(types.SET_CURRENTINDEX, 0)
  commit(types.SET_FULLSCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
}
