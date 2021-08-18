import request from '@/router/axios';

//
export const getList1 = (current, size, params) => {
  return request({
    url: '/api/ygj/villagejudge/page',
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
    url: '/api/ygj/villagejudge/save',
    method: 'post',
    data: row
  })
}
export const remove = (ids) => {
  return request({
    url: '/api/ygj/villagejudge/remove',
    method: 'post',
    params: {
      ids,
    }
  })
}
export const update = (row) => {
  return request({
    url: '/api/ygj/villagejudge/update',
    method: 'post',
    data: row
  })
}
//值坐班打卡页面查询
export const getList = (current, size, params) => {
  return request({
    url: '/api/ygj/clockrecord/page',
    method: 'get',
    params: {
      ...params,
      current,
      size,
    }
  })
}
// 查看签到日期详情
export const getSignInfo = (params) => {
  return request({
    url: '/api/ygj/clockrecord/getInfo',
    method: 'post',
    data: {
      ...params,
    }
  })
}

export const detail = (id) => {
  return request({
    url: '/api/ygj/villagejudge/detail',
    method: 'get',
    params: {
      id,
    }
  })
}
