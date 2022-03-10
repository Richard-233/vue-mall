import http from './../tools/http/http'
export const _getUserInfo = (errMsg) => http.GET('/api/user/userInfo', {}, errMsg)
