import request from '@/router/axios';

export const save = (row) => {
  return request({
    url: '/api/ygj/duties/save',
    method: 'post',
    data: row
  })
}

export const update = (row) => {
  return request({
    url: '/api/ygj/duties/update',
    method: 'post',
    data: row
  })
}

export const getList = (current, size, params) => {
  return request({
    url: '/api/ygj/duties/page',
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
    url: '/api/ygj/duties/remove',
    method: 'post',
    params: {
      ids,
    }
  })
}


export const detail = (id) => {
  return request({
    url: '/api/ygj/duties/detail',
    method: 'get',
    params: {
      id,
    }
  })
}

