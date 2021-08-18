import request from '@/router/axios';


export const getStatistics = (current, size, params) => {
  return request({
    url: '/api/ygj/satisfaction/getStatistics',
    method: 'get',
    params: {
      ...params,
      current,
      size,
    }
  })
}
export const getList = (page) => {
  return request({
    url: '/api/ygj/satisfaction/page',
    method: 'get',
    params: {
      ...page
    }
  })
}
export  const  getCode=(corpId)=>{
  return request({
    url:'/api/area/getCodeByCorpId',
    method: 'get',
    params: {
      corpId
    }
  })
}

export const getUser = (page) => {
  return request({
    url: '/api/blade-user/getUser',
    method: 'get',
    params: {
      ...page
    }
  })
}

export const save = (row) => {
  return request({
    url: '/api/ygj/satisfaction/save',
    method: 'post',
    data: row
  })
}

export const detail = (id,mobile) => {
  return request({
    url: '/api/ygj/satisfaction/detail',
    method: 'get',
    params: {
      id,
      mobile
    }
  })
}

export const getMobile = (requestAuthCode,corpId) => request({
  url: '/api/blade-auth/oauth/getMobile',
  method: 'get',
  params: {
    requestAuthCode,
    corpId
  }
});

export const saveScore = (row) => {
  return request({
    url: '/api/ygj/satisfaction/saveScore',
    method: 'post',
    data: row
  })
}
