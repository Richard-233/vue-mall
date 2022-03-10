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
import searchProduct from "./pages/searchProduct";
import userOrderList from "./pages/userOrderList";
import searchShop from "./pages/searchShop";
import sellerLogin from "./pages/sellerLogin";

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
                }, {
                    path: '/productList',
                    name: 'productList',
                    component: ProductList,
                }, {
                    path: '/searchProduct/:input',
                    name: 'searchProduct',
                    component: searchProduct,
                }, {
                    path: '/userOrderList',
                    name: 'userOrderList',
                    component: userOrderList,
                }, {
                    path: '/searchShop/:input',
                    name: 'searchShop',
                    component: searchShop,
                }
            ]
        },{
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
                }
            ]
        }
    ]
})
