import request from '@/router/axios';

export const getList = (current, size, params) => {
  return request({
    url: '/api/ygj/villageinfo/page',
    method: 'get',
    params: {
      ...params,
      current,
      size,
    }
  })
}

export const save = (row) => {
  return request({
    url: '/api/ygj/villageinfo/save',
    method: 'post',
    data: row
  })
}
export const remove = (ids) => {
  return request({
    url: '/api/ygj/villageinfo/remove',
    method: 'post',
    params: {
      ids,
    }
  })
}
export const update = (row) => {
  return request({
    url: '/api/ygj/villageinfo/update',
    method: 'post',
    data: row
  })
}

export const detail = (id) => {
  return request({
    url: '/api/ygj/villageinfo/detail',
    method: 'get',
    params: {
      id,
    }
  })
}
