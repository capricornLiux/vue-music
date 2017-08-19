/**
 * Created by liuxin on 2017/8/19.
 */
import jsonp from 'common/js/jsonp.js'

import {commonParams, options} from './config.js'

export function getTopList () {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg'

  const data = Object.assign({}, commonParams, {
    g_tk: 67232067,
    uin: 0,
    needNewCode: 1,
    platform: 'h5'
  })

  return jsonp(url, data, options)
}
