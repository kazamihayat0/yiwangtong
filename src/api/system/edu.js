import request from '@/router/axios';

export const eduList = ()=>{
  return request({
    url:'/api/edu/list',
    method:'get',
  })
}
