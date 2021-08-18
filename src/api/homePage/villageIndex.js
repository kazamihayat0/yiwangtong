import axios from '@/router/axios'

/**
 * @name: 村首页-村干部男女比例分析
 * @msg: 
 * @param {*}
 * @return {*}
 */
export const villageGender = (code) => {
  return axios({
    url: '/api/blade-user/villageGender',
    method: 'get',
    params: {
      code: code
    }
  })
}

/**
 * @name: 村首页-村干部信息
 * @msg: 
 * @param {*}
 * @return {*}
 */
export const villageUser = (cadreInfoCurrent, type, code) => {
  return axios({
    url: '/api/blade-user/getVillageUser',
    method: 'get',
    params: {
      current: cadreInfoCurrent,
      size: 9,
      type: type,
      code: code
    }
  })
}

/**
 * @name: 村首页-履职指数排行版
 * @msg: 
 * @param {*}
 * @return {*}
 */
export const healthBoardIndex = (code) => {
  return axios({
    url: '/api/ygj/healthy/healthBoardIndex',
    method: 'get',
    params: {
      code: code
    }
  })
}


/**
 * @name: 村首页-村级运行健康指数
 * @msg: 
 * @param {*}
 * @return {*}
 */
export const villageInfo = (code) => {
  return axios({
    url: '/api/ygj/villageinfo/villageInfo',
    method: 'get',
    params: {
      code: code
    }
  })
}

/**
 * @name: 村首页-综合榜
 * @msg: 
 * @param {*}
 * @return {*}
 */
export const dutiesCompreBoard = (code) => {
  return axios({
    url: '/api/ygj/dutiescompre/dutiesCompreBoard',
    method: 'get',
    params: {
      code: code
    }
  })
}

/**
 * @name: 村首页-单项榜
 * @msg: 
 * @param {*}
 * @return {*}
 */
export const dutiesBoard = (code) => {
  return axios({
    url: '/api/ygj/duties/dutiesBoard',
    method: 'get',
    params: {
      code: code
    }
  })
}

/**
 * @name: 村首页-健康指数
 * @msg: 
 * @param {*}
 * @return {*}
 */
export const villageHealthIndex = (code, type) => {
  return axios({
    url: '/api/ygj/healthy/villageHealthIndex',
    method: 'get',
    params: {
      code: code,
      type: type
    }
  })
}

/**
 * @name:  村首页-五年发展规划情况
 * @msg: 
 * @param {*}
 * @return {*}
 */
export const villagePlan = (code) => {
  return axios({
    url: '/api/ygj/plan/villagePlan',
    method: 'get',
    params: {
      code: code
    }
  })
}
