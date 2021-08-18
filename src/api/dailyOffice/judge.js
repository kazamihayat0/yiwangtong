import request from '@/router/axios';

export const getJudgeList = (current, size, params) => {
  return request({
    url: '/api/ygj/villagejudges/page',
    method: 'get',
    params: {
      ...params,
      current,
      size,
    }
  })
}
export const getList = (current, size, params) => {
  return request({
    url: '/api/ygj/judges/page',
    method: 'get',
    params: {
      ...params,
      current,
      size,
    }
  })
}

export  const getVillageList=()=>{
  return request({
    url: '/api/ygj/villagejudges/getVillageList',
    method: 'get',

  })
}
export  const getUserList=()=>{
  return request({
    url: '/api/ygj/judgesuser/getUserList',
    method: 'get',

  })
}

export const save = (row) => {
  return request({
    url: '/api/ygj/judges/save',
    method: 'post',
    data: row
  })
}
export const villageDetail = (id) => {
  return request({
    url: '/api/ygj/villagejudges/detail',
    method: 'get',
    params: {
      id,
    }
  })
}
export const detail = (id) => {
  return request({
    url: '/api/ygj/judges/detail',
    method: 'get',
    params: {
      id,
    }
  })
}

export const update = (row) => {
  return request({
    url: '/api/ygj/judges/update',
    method: 'post',
    data: row
  })
}

export const saveVillage = (row) => {
  return request({
    url: '/api/ygj/villagejudges/save',
    method: 'post',
    data: row
  })
}
