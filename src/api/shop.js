import http from './../tools/http/http'
export const _getShop = () => http.GET('/api/shop/selectByUserId')
export const _deleteShopById = (obj) => http.GET('/api/shop/delete', obj)
export const _updateShopById = (obj) => http.GET('/api/shop/update', obj)
export const _addNewShop = (obj) => http.GET('/api/shop/add', obj)
