import axios from '@/router/axios'

/**
 * @name:查询村级组织个数
 * @msg:
 * @param {*} code:区域编码
 * @return {*}
 */
export const countVillage = (code) => {
  return axios({
    url: '/api/area/countVillage',
    method: 'get',
    params: {
      code: code
    }
  })
}

/**
 * @name:查询村书记个数
 * @msg:
 * @param {*} code:区域编码
 * @return {*}
 */
export const countSecretary = (code) => {
  return axios({
    url: '/api/blade-user/countSecretary',
    method: 'get',
    params: {
      code: code
    }
  })
}

/**
 * @name:查询其他干部个数
 * @msg:
 * @param {*} code:区域编码
 * @return {*}
 */
export const countOther = (code) => {
  return axios({
    url: '/api/blade-user/countOther',
    method: 'get',
    params: {
      code: code
    }
  })
}

/**
 * @name:查询村书记类别
 * @msg:
 * @param {*} code:区域编码
 * @return {*}
 */
export const secretaryType = (code) => {
  return axios({
    url: '/api/blade-user/secretaryType',
    method: 'get',
    params: {
      code: code
    }
  })
}

/**
 * @name:查询年龄结构
 * @msg:
 * @param {*} code:区域编码
 * @return {*}
 */
export const ageStruct = (code) => {
  return axios({
    url: '/api/blade-user/ageStruct',
    method: 'get',
    params: {
      code: code
    }
  })
}

/**
 * @name:查询历结构
 * @msg:
 * @param {*} code:区域编码
 * @return {*}
 */
export const eduStruct = (code) => {
  return axios({
    url: '/api/blade-user/eduStruct',
    method: 'get',
    params: {
      code: code
    }
  })
}

/**
 * @name:履职指数统计
 * @msg:
 * @param {*} code:区域编码
 * @return {*}
 */
export const cadreStatic = (code) => {
  return axios({
    url: '/api/ygj/unqualifiedcadre/cadreStatic',
    method: 'get',
    params: {
      code: code
    }
  })
}


/**
 * @name:查询街道/村信息
 * @return {*}
 */
export const areaInfo = (code) => {
  return axios({
    url: '/api/area/areaInfo',
    method: 'get',
    params: {
      code: code
    }
  })
}

/**
 * @name:查询地图健康指数
 * @return {*}
 */
export const villageHealth = (code) => {
  return axios({
    url: '/api/ygj/healthy/villageHealth',
    method: 'get',
    params: {
      code: code
    }
  })
}
/**
 * @name: 17.	重点工作榜-综合
 * @msg:
 * @param {*} code:区域编码
 * @return {*}
 */
export const dutiesCompreList = (code) => {
    return axios({
      url: '/api/ygj/dutiescompre/dutiesCompreList',
      method: 'get',
      params: {
        code: code
      }
    })
  }
/**
 * @name: 五年规划
 * @msg:
 * @param {*} code:区域编码
 * @return {*}
 */
export const fiveJobList = (code) => {
  return axios({
    url: '/api/ygj/plan/planSort',
    method: 'get',
    params: {
      code: code
    }
  })
}
/**
 * @name: 17.	重点工作榜-单项
 * @msg:
 * @param {*} code:区域编码
 * @return {*}
 */
export const dutiesSort = (code) => {
  return axios({
    url: '/api/ygj/duties/dutiesSort',
    method: 'get',
    params: {
      code: code
    }
  })
}
/**
 * @name: 20.	首页-健康村分布
 * @msg:
 * @param {*} code:区域编码
 * @return {*}
 */
export const healthyGender = (code) => {
  return axios({
    url: '/api/ygj/healthy/healthyGender',
    method: 'get',
    params: {
      code: code
    }
  })
}

/**
 * @name: 市首页-履职指数不合格村干部
 * @msg:
 * @return {*}
 */
export const unHealthPeople = () => {
  return axios({
    url: '/api/ygj/healthy/unHealthPeople',
    method: 'get',
  })
}

/**
 * @name: 市首页-履职指数不合格村干部
 * @msg:
 * @return {*}
 */
export const getUsrInfo = () => {
  return axios({
    url: '/api/blade-user/getUsrInfo',
    method: 'get',
  })
}

/**
 * @name: 市首页-获取地图数据
 * @msg: 1.村，2.镇
 * @return {*}
 */
export const getMapData = (type,code) => {
  return axios({
    url: '/api/ygj/pos/getData',
    method: 'get',
    params: {
      type: type,
      code:code
    }
  })
}
