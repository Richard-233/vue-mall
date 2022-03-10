import http from './../tools/http/http'
export const _getAll = (obj1) => http.GET('/api/communication/selectmessages', obj1)
export const _sendMessage = (obj1) => http.GET('/api/communication/add', obj1)
