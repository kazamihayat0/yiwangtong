import request from '@/router/axios';

/**
 * @name: 党组织会议列表查询
 * @msg:
 * @param {*} current:当前页
 * @param {*} size：每页条数
 * @param {*} params：查询条件
 * @return {*}
 */
export const getOrgMeet = (current, size, params) => {
  return request({
    url: '/api/ygj/orgmeet/page',
    method: 'get',
    params: {
      ...params,
      current,
      size,
    }
  })
}
export const importOrgMeet = () => {
  return request({
    url: '/api//ygj/orgmeet/importOrgMeet',
    method: 'post',
  })
}

export const remove = (ids) => {
  return request({
    url: '/api/blade-desk/notice/remove',
    method: 'post',
    params: {
      ids,
    }
  })
}

export const add = (row) => {
  return request({
    url: '/api/blade-desk/notice/submit',
    method: 'post',
    data: row
  })
}

export const update = (row) => {
  return request({
    url: '/api/blade-desk/notice/submit',
    method: 'post',
    data: row
  })
}

export const getNotice = (id) => {
  return request({
    url: '/api/blade-desk/notice/detail',
    method: 'get',
    params: {
      id
    }
  })
}

/**
 * @name: 发起会议获取区域内的干部
 * @msg:
 * @param {*}
 * @return {*}
 */
export const getUser = (type, code) => {
  return request({
    url: '/api/blade-user/getUser',
    method: 'get',
    params: {
      type: type,
      code: code
    }
  })
}

/**
 * @name: 发起会议新增
 * @msg:
 * @param {*}
 * @return {*}
 */
export const addMeeting = (meetingForm) => {
  return request({
    url: '/api/ygj/meeting/save',
    method: 'post',
    data: {
      ...meetingForm
    }
  })
}

/**
 * @name: 发起会议编辑
 * @msg:
 * @param {*}
 * @return {*}
 */
export const editMeeting = (meetingForm) => {
  return request({
    url: '/api/ygj/meeting/uploadMeet',
    method: 'post',
    data: {
      ...meetingForm
    }
  })
}

/**
 * @name: 发起会议详情
 * @msg:
 * @param {*}
 * @return {*}
 */
export const meetingDetail = (id) => {
  return request({
    url: '/api/ygj/meeting/meetingDetail',
    method: 'get',
    params: {
      id,
    }
  })
}
/**
 * @name: 会议纪要确认
 * @msg:
 * @param {*}
 * @return {*}
 */
export const checkMeet = (id) => {
  return request({
    url: '/api/ygj/meeting/checkMeet',
    method: 'post',
    data: {
      id,
    }
  })
}

/**
 * @name: 发起会议取消
 * @msg:
 * @param {*}
 * @return {*}
 */
export const cancelMeeting = (id) => {
  return request({
    url: '/api/ygj/meeting/cancel',
    method: 'get',
    params: {
      id,
    }
  })
}

/**
 * @name: 发起会议查询
 * @msg:
 * @param {*}
 * @return {*}
 */
export const selMeeting = (page) => {
  return request({
    url: '/api/ygj/meeting/page',
    method: 'get',
    params: {
      ...page
    }
  })
}

/**
 * @name: 手机端获取签到会议列表
 * @msg:
 * @param {*}
 * @return {*}
 */
export const meetingList = () => {
  return request({
    url: '/api/ygj/meeting/listByUserId',
    method: 'get',
  })
}

/**
 * @name: 手机端获取已签到会议信息
 * @msg:
 * @param {*}
 * @return {*}
 */
export const signedMeetingList = () => {
  return request({
    url: '/api/ygj/meeting/signHistory',
    method: 'get',
  })
}

/**
 * @name: 手机端获取已签到会议信息
 * @msg:
 * @param {*}
 * @return {*}
 */
export const saveSignedMeeting = (id) => {
  return request({
    url: '/api/ygj/meeting/signMeet',
    method: 'post',
    data: {
      id: id
    }

  })
}

/**
 * @name: 模糊搜索村务联席会议
 * @msg:
 * @param {*}
 * @return {*}
 */
export const getMeetingList = (meetTitle) => {
  return request({
    url: '/api/ygj/meeting/getList',
    method: 'get',
    params: {
      meetTitle: meetTitle
    }

  })
}

/**
 * @name: 会议纪要保存
 * @msg:
 * @param {*}
 * @return {*}
 */
export const saveForm1 = (params) => {
  return request({
    url: '/api/ygj/meetingjy/save',
    method: 'post',
    data: params

  })
}

/**
 * @name: 会议纪要保存
 * @msg:
 * @param {*}
 * @return {*}
 */
export const getByMeetId = (meetId) => {
  return request({
    url: '/api/ygj/meetingjy/getByMeetId',
    method: 'get',
    params: {
      meetId,
    }
  })
}
