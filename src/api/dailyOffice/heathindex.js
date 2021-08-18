import request from '@/router/axios';


export const getList = (current, size, params) => {
  return request({
    url: '/api/ygj/healthy/villagePage',
    method: 'get',
    params: {
      ...params,
      current,
      size,
    }
  })
}
