import request from '@/router/axios';


/**
 * @name: 获取市镇村
 * @msg: 
 * @param {*}
 * @return {*}
 */
export const getAreaTree = () => {
  return request({
    url: '/api/area/areaList',
    method: 'get',
  })
}

/**
 * @name: 文件上传
 * @msg: 
 * @param {*}
 * @return {*}
 */
export const uploadFile = (file) => {
  let formData = new FormData();
  formData.append('file', file)
  const headers = {
    "Content-Type": "multipart/form-data;boundary=" + new Date().getTime()
  }
  return request({
    url: "/api/blade-resource/oss/endpoint/put-file",
    method: 'post',
    headers: headers,
    data: formData
  })
}
