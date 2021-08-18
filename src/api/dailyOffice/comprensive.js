import request from '@/router/axios';

export const save = (row) => {
  return request({
    url: '/api/ygj/dutiescompre/save',
    method: 'post',
    data: row
  })
}

export const update = (row) => {
  return request({
    url: '/api/ygj/dutiescompre/update',
    method: 'post',
    data: row
  })
}

export const getList = (current, size, params) => {
  return request({
    url: '/api/ygj/dutiescompre/page',
    method: 'get',
    params: {
      ...params,
      current,
      size,
    }
  })
}

export const remove = (ids) => {
  return request({
    url: '/api/ygj/dutiescompre/remove',
    method: 'post',
    params: {
      ids,
    }
  })
}

export const detail = (id) => {
  return request({
    url: '/api/ygj/dutiescompre/detail',
    method: 'get',
    params: {
      id,
    }
  })
}

