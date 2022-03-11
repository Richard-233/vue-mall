import Vue from 'vue'
import Router from 'vue-router'
import Home from './pages/home'
import Index from './pages/index'
import Product from './pages/product'
import Detail from './pages/detail'
import Cart from './pages/cart'
import Order from './pages/order'
import OrderConfirm from './pages/orderConfirm'
import OrderList from './pages/orderList'
import OrderPay from './pages/orderPay'
import Alipay from './pages/alipay'
import Login from './pages/login'
import ProductList from './pages/productList'
import shopOrderList from "./pages/shopOrderList";
import searchProduct from "./pages/searchProduct"
import userOrderList from "./pages/userOrderList"
import searchShop from "./pages/searchShop"
import sellerLogin from "./pages/sellerLogin"
import shopDetail from "./pages/shopDetail"
import userInfo from "./pages/userInfo"

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
            redirect:'/index',
            children: [
                {
                    path: '/index',
                    name: 'index',
                    component: Index,
                }, {
                    path: '/product/:id',
                    name: 'product',
                    component: Product,
                }, {
                    path: '/detail/:id',
                    name: 'detail',
                    component: Detail,
                },
                {
                    path: '/shopDetail/:id',
                    name: 'shopDetail',
                    component: shopDetail,
                },{
                    path: '/productList',
                    name: 'productList',
                    component: ProductList,
                }, {
                    path: '/searchProduct/:input',
                    name: 'searchProduct',
                    component: searchProduct,
                }, {
                    path: '/searchShop/:input',
                    name: 'searchShop',
                    component: searchShop,
                }
            ]
        },
        {
            path: '/shopMain',
            name: 'shopMain',
            component: () =>
                import(/* webpackChunkName: "Main" */ './pages/shopMain'),
            children: [
                {
                    path: '/ProductManagement',
                    name: 'ProductManagement',
                    component: () =>
                        import(
                            /* webpackChunkName: "Second" */ './pages/ProductManagement'
                            )
                },
                {
                    path: '/toEditProduct',
                    name: 'toEditProduct',
                    component: () =>
                        import(
                            /* webpackChunkName: "Second" */ './pages/toEditProduct'
                            )
                },
                {
                    path: '/toAddNewProduct',
                    name: 'toAddNewProduct',
                    component: () =>
                        import(
                            /* webpackChunkName: "Second" */ './pages/toAddNewProduct'
                            )
                },
                {
                    path: '/communicator',
                    name: 'communicator',
                    component: () =>
                        import(
                            /* webpackChunkName: "Second" */ './pages/communicator'
                            )
                },
                {
                    path: '/ShopManagement',
                    name: 'ShopManagement',
                    component: () =>
                        import(
                            /* webpackChunkName: "Second" */ './pages/ShopManagement'
                            )
                },
                {
                    path: '/toEditShop',
                    name: 'toEditShop',
                    component: () =>
                        import(
                            /* webpackChunkName: "Second" */ './pages/toEditShop'
                            )
                },
                {
                    path: '/toAddNewShop',
                    name: 'toAddNewShop',
                    component: () =>
                        import(
                            /* webpackChunkName: "Second" */ './pages/toAddNewShop'
                            )
                }
            ]
        },



        {
            path:'/login',
            name:'login',
            component: Login,
        }, {
            path: '/cart',
            name: 'cart',
            component: Cart,
        }, {
            path: '/sellerLogin',
            name: 'sellerLogin',
            component: sellerLogin,
        },{
            path: '/order',
            name: 'order',
            component: Order,
            children: [
                {
                    path: 'list',
                    name: 'order-list',
                    component: OrderList
                }, {
                    path: 'confirm',
                    name: 'order-confirm',
                    component: OrderConfirm
                }, {
                    path: 'pay',
                    name: 'order-pay',
                    component: OrderPay
                }, {
                    path: 'alipay',
                    name: 'alipay',
                    component: Alipay
                }, {
                    path: '/userOrderList',
                    name: 'userOrderList',
                    component: userOrderList,
                }, {
                    path: '/shopOrderList',
                    name: 'shopOrderList',
                    component: shopOrderList,
                }
            ]
        },{
            path: '/userInfo',
            name: 'userInfo',
            component: userInfo,
        }
    ]
})
