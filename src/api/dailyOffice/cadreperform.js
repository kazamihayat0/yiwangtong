import request from '@/router/axios';

export const healthBoard = (type) => {
  return request({
    url: '/api/ygj/healthy/healthBoard',
    method: 'get',
    params: {
      type
    }
  })
}
