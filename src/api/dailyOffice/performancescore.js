import request from '@/router/axios';

export const save = (row) => {
  return request({
    url: '/api/ygj/judge/save',
    method: 'post',
    data: row
  })
}
export const remove = (ids) => {
  return request({
    url: '/api/ygj/judge/remove',
    method: 'post',
    params: {
      ids,
    }
  })
}
export const update = (row) => {
  return request({
    url: '/api/ygj/judge/update',
    method: 'post',
    data: row
  })
}

export const getList = (current, size, params) => {
  return request({
    url: '/api/ygj/judge/page',
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
    url: '/api/ygj/judge/detail',
    method: 'get',
    params: {
      id,
    }
  })
}
