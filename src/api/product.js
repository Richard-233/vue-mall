import http from './../tools/http/http'
export const _getProductsAll = (obj1) => http.GET('/api/product/seller/product/list', obj1)
// export const _getProductsAll = () => http.GET('/api/product/selectall')
export const _getProductById = (obj1) => http.GET('/api/product/id', obj1)
export const _getProductsByName = (obj1) => http.GET('/api/product/name', obj1)
export const _deleteProductById = (obj1) => http.GET('/api/product/delete', obj1)
export const _updateProductById = (obj1) => http.GET('/api/product/update', obj1)
export const _addNewProduct = (obj1) => http.GET('/api/product/add', obj1)
