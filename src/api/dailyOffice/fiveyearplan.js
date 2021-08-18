import request from '@/router/axios';

export const save = (row) => {
  return request({
    url: '/api/ygj/plan/save',
    method: 'post',
    data: row
  })
}
export const remove = (ids) => {
  return request({
    url: '/api/ygj/plan/remove',
    method: 'post',
    params: {
      ids,
    }
  })
}
export const update = (row) => {
  return request({
    url: '/api/ygj/plan/update',
    method: 'post',
    data: row
  })
}

export const getList = (current, size, params) => {
  return request({
    url: '/api/ygj/plan/page',
    method: 'get',
    params: {
      ...params,
      current,
      size,
    }
  })
}
export const detail = (id) => {
  return request({
    url: '/api/ygj/plan/detail',
    method: 'get',
    params: {
      id,
    }
  })
}
