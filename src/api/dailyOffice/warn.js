import request from '@/router/axios';

export const warnPage = (current, size, params) => {
  return request({
    url: '/api/ygj/warning/page',
    method: 'get',
    params: {
      ...params,
      current,
      size,
    }
  })
}


export const message = (id) => {
  return request({
    url: '/api/ygj/warning/sendMsg',
    method: 'post',
    params:{
      id
    }
  })
}
