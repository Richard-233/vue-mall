<template>
  <div class="cart">
    <order-header title="我的购物车">
      <template v-slot:tip>
        <span>令人喜爱的商品即是成交了一半</span>
      </template>
    </order-header>
    <div class="wrapper">
      <div class="container">
        <div class="cart-box">
          <ul class="cart-item-head">
            <li class="col-1"><span class="checkbox" v-bind:class="{'checked':allChecked}" @click="toggleAll"></span>全选</li>
            <li class="col-3">商品名称</li>
            <li class="col-1">单价</li>
            <li class="col-2">数量</li>
            <li class="col-1">小计</li>
<!--            <li class="col-1">操作</li>-->
          </ul>
          <ul class="cart-item-list">
            <li class="cart-shop" v-for="(shop,index1) in list" v-bind:key="index1">
              <div class="shop">
              <div class="shop-check">
                <span class="checkbox" v-bind:class="{'checked':shop.shopSelectedAll}"  @click="selectShopAll(shop)"></span>
              </div>
              <div class="shop-name">
                <span>{{shop.shopName}}</span>
              </div>
              </div>
              <ul>
                <li class="cart-item" v-for="(item,index) in shop.shopCartInfoList" v-bind:key="index">
                  <div class="item-check">
                    <span class="checkbox" v-bind:class="{'checked':item.selected}"  @click="selectProduct(item)"></span>
                  </div>
                  <div class="item-name">
                    <img v-lazy="item.productImg" alt="">
                    <span>{{item.productName}}</span>
                  </div>
                  <div class="item-price">{{item.price/100}}</div>
                  <div class="item-num">
                    <div class="num-box">
                      <a href="javascript:;" @click="sub(item)">-</a>
                      <span>{{item.quantity}}</span>
                      <a href="javascript:;"  @click="add(item)">+</a>
                    </div>
                  </div>
                  <div class="item-total">{{item.price/100 * item.quantity}}</div>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <div class="order-wrap clearfix">
          <div class="cart-tip fl">
            <a href="/#/index">继续购物</a>
            共<span>{{cartTotalQuantity}}</span>件商品，已选择<span>{{checkedNum}}</span>件
          </div>
          <div class="total fr">
            合计：<span>{{cartTotalPrice/100}}</span>元
            <a href="javascript:;" class="btn" @click="order">去结算</a>
          </div>
        </div>
      </div>
    </div>
    <service-bar></service-bar>
    <nav-footer></nav-footer>
  </div>
</template>
<script>
  import OrderHeader from './../components/OrderHeader'
  import ServiceBar from './../components/ServiceBar'
  import NavFooter from './../components/NavFooter'
  export default{
    name:'index',
    components:{
      OrderHeader,
      ServiceBar,
      NavFooter
    },
    data(){
      return {
        list:[],//商品列表
        allChecked:false,//是否全选
        cartTotalPrice:0,//商品总金额
        checkedNum:0,//选中商品数量
        cartTotalQuantity:0,
        cart:{
          'id': 0,
          'userId': 0,
          'productId': 0,
          'quantity': 0,
          'selected': false
        }
      }
    },
    computed:{
      user_id(){
        return this.$store.state.user_id;
      }
    },
    mounted(){
      this.getCartList();
    },
    methods:{
      // 获取购物车列表
      getCartList: function () {
        this.axios.get('/api/cart/searchCart?userId='+this.user_id).then(res => {
          // console.log(res.selectedAll)
          this.list = res.cartInfoList
          this.allChecked = res.selectedAll
          this.cartTotalPrice = res.cartTotalPrice
          this.checkedNum = res.cartSelectedTotalQuantity
          this.cartTotalQuantity = res.cartTotalQuantity
        })
      },
      add: function (item) {
        // console.log(pIndex, sIndex, row)
        this.cart.id = item.cartId
        this.cart.userId = item.userId
        this.cart.productId = item.productId
        this.cart.quantity = item.quantity
        this.cart.selected = item.selected
        // console.log(this.cart)
        this.axios.post('api/cart/addCartProducts', this.cart).then(() => {
          this.getCartList()
        })
      },
      sub: function (item) {
        // console.log(pIndex, sIndex, row)
        this.cart.id = item.cartId
        this.cart.userId = item.userId
        this.cart.productId = item.productId
        this.cart.quantity = item.quantity
        this.cart.selected = item.selected
        // console.log(this.cart)
        this.axios.post('api/cart/subCartProducts', this.cart).then(() => {
          this.getCartList()
        })
      },
      selectProduct: function (item){
        this.cart.id = item.cartId
        this.cart.userId = item.userId
        this.cart.productId = item.productId
        this.cart.quantity = item.quantity
        this.cart.selected = item.selected
        // console.log(this.cart)
        this.axios.post('api/cart/selectCartProducts', this.cart).then(() => {
          this.getCartList()
        })
      },
      // 控制全选功能
      toggleAll: function (){
        let url = this.allChecked?'api/cart/unSelectAll':'api/cart/selectAll';
        this.axios.get(url+'?userId='+this.user_id).then(()=>{
          this.getCartList()
        })
      },
      // 商铺全选
      selectShopAll: function (shop){
        // console.log(shop.shopSelectedAll)
        let url = shop.shopSelectedAll?'api/cart/unSelectShopAll':'api/cart/selectShopAll';
        this.axios.get(url+'?userId='+this.user_id+'&shopId='+shop.shopId).then(()=>{
          this.getCartList()
        })
      },
      // 购物车下单
      order(){
        let isCheck = this.list.every(item=>{
          if(item.shopSelectedAll){
            return false
          }
          else {
            return  item.shopCartInfoList.every(cart=>{
              if(cart.selected){
                return false
              }
              return true
            })
          }

        });
        if(isCheck){
          this.$message.warning('请选择一件商品');
        }else{
          this.$router.push('/order/confirm');
        }
      }
    }
  }
</script>
<style lang="scss">
  .h2{
    margin-left: 10px;
  }
  .cart{
    .wrapper{
      background-color:#F5F5F5;
      padding-top:30px;
      padding-bottom:114px;
      .cart-box{
        background-color:#fff;
        font-size:14px;
        color:#999999;
        text-align:center;
        .checkbox{
          display: inline-block;
          width: 22px;
          height: 22px;
          border: 1px solid #E5E5E5;
          vertical-align: middle;
          margin-right: 17px;
          cursor:pointer;
          &.checked{
            background:url('/imgs/icon-gou.png') #e4291e no-repeat center;
            background-size:16px 12px;
            border:none;
          }
        }
        .cart-item-head{
          display:flex;
          height: 79px;
          line-height: 79px;
          .col-1{
            flex:1;
          }
          .col-2{
            flex:2;
          }
          .col-3{
            flex:3;
          }
        }
        .cart-item-list{
          .cart-shop{
            .shop{
              display: flex;
              background-color: #f2f2f2;
              height:45px;
              border-bottom: 2px solid #e4291e;
              align-items: center;
              .checkbox{
                margin-left: 56px;
                width: 22px;
                height: 22px;
              }
              span{
                font-size: 16px;
                font-weight: bold;
                color: #e4291e;
              }
            }
          }
          .cart-item{
            display:flex;
            align-items:center;
            height:125px;
            border-top:1px solid #E5E5E5;
            font-size:16px;
            .item-check{
              flex:1;
            }
            .item-name{
              flex:3;
              font-size: 18px;
              color: #333333;
              display: flex;
              align-items: center;
              img{
                width:80px;
                height:80px;
                vertical-align:middle;
              }
              span{
                margin-left: 30px;
                text-align: center;
                width: 248px;
              }
            }
            .item-price{
              flex:1;
              color:#333333;
            }
            .item-num{
              flex:2;
              .num-box{
                display:inline-block;
                width:150px;
                height:40px;
                line-height:40px;
                border:1px solid #E5E5E5;
                font-size:14px;
                a{
                  display:inline-block;
                  width:50px;
                  color:#333333;
                }
                span{
                  display:inline-block;
                  width:50px;
                  color:#333333;
                }
              }
            }
            .item-total{
              flex:1;
              color:#e4291e;
            }
            .item-del{
              flex:1;
              width:14px;
              height:12px;
              background:url('/imgs/icon-close.png') no-repeat center;
              background-size:contain;
              cursor:pointer;
            }
          }
        }
      }
      .order-wrap{
        font-size:14px;
        color: #666666;
        margin-top: 20px;
        height: 50px;
        line-height: 50px;
        .cart-tip{
          margin-left: 29px;
          a{
            color: #666666;
            margin-right:37px;
          }
          span{
            color:#e4291e;
            margin:0 5px;
          }
        }
        .total{
          font-size:14px;
          color:#e4291e;
          span{
            font-size:24px;
          }
          a{
            width:202px;
            height:50px;
            line-height:50px;
            font-size:18px;
            margin-left:37px;
          }
        }
      }
    }
  }
</style>
