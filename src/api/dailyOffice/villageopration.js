import request from '@/router/axios';

export const villageBoard = (type) => {
  return request({
    url: '/api/ygj/healthy/villageBoard',
    method: 'get',
    params: {
      type
    }
  })
}
