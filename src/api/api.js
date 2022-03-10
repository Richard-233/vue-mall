import http from './../tools/http/http'
export const _getAll = (obj1) => http.GET('/api/communication/selectmessages', obj1)
export const _sendMessage = (obj1) => http.GET('/api/communication/add', obj1)
export const _selectAll = () => http.GET('/api/communication/selectall')
export const _windows = () => http.GET('/api/communication/windows')
export const _beRead = (obj1) => http.GET('/api/communication/beread', obj1)
