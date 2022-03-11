<template>
  <div class="order-confirm">
    <order-header title="订单确认">
      <template v-slot:tip>
        <span>请认真填写收货地址</span>
      </template>
    </order-header>
    <div class="wrapper">
      <div class="container">
        <div class="order-box">
          <div>
            <el-select v-model="value" placeholder="请选择收货地址" style="width: 400px">
              <el-option
                  v-for="item in addressList"
                  :key="item.id"
                  :label="'地址:'+item.receiverAddress + '             收货人:' + item.receiverName + '             电话:' + item.receiverMobile"
                  :value="item.id">
              </el-option>
            </el-select>
          </div>
          <div class="item-good">
            <h2>商品</h2>
            <ul class="cart-item-list">
              <li class="cart-shop" v-for="(shop,index1) in cartList" v-bind:key="index1">
                <div class="shop">
                  <span>{{ shop.shopName }}</span>
                  <ul class="cart-item-head">
                    <li class="col-3">商品名称</li>
                    <li class="col-1">单价</li>
                    <li class="col-1">数量</li>
                    <li class="col-2">小计</li>
                    <!--            <li class="col-1">操作</li>-->
                  </ul>
                </div>
                <ul>
                  <li class="info" v-for="(item,index) in shop.shopCartInfoList" :key="index">
                    <div class="good-name">
                      <img v-lazy="item.productImg" alt="">
                      <span>{{ item.productName }}</span>
                    </div>
                    <div class="good-price">{{ item.price / 100 }}元</div>
                    <div class="good-quantity">{{ item.quantity }}</div>
                    <div class="good-total">{{ item.price / 100 * item.quantity }}元</div>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          <div class="item-shipping">
            <h2>配送方式</h2>
            <span>包邮</span>
          </div>
          <div class="item-invoice">
            <h2>发票</h2>
            <a href="javascript:;">电子发票</a>
            <a href="javascript:;">个人</a>
          </div>
          <div class="detail">
            <div class="item">
              <span class="item-name">商品件数：</span>
              <span class="item-val">{{ count }}件</span>
            </div>
            <div class="item">
              <span class="item-name">商品总价：</span>
              <span class="item-val">{{ cartTotalPrice/100 }}元</span>
            </div>
            <div class="item">
              <span class="item-name">优惠活动：</span>
              <span class="item-val">0元</span>
            </div>
            <div class="item">
              <span class="item-name">运费：</span>
              <span class="item-val">0元</span>
            </div>
            <div class="item-total">
              <span class="item-name">应付总额：</span>
              <span class="item-val">{{ cartTotalPrice/100 }}元</span>
            </div>
          </div>
          <div class="btn-group">
            <a href="/#/cart" class="btn btn-default btn-large">返回购物车</a>
            <a href="javascript:;" class="btn btn-large" @click="orderSubmit">去结算</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import OrderHeader from './../components/OrderHeader'
// import Modal from './../components/Modal'

export default {
  name: 'order-confirm',
  data() {
    return {
      value: '',
      addressList: [],//收货地址列表
      cartList: [],//购物车中需要结算的商品列表
      cartTotalPrice: 0,//商品总金额
      count: 0,//商品结算数量
      checkIndex: 0,//当前收货地址选中索引
      orderInfoVO: {
        'orderInfoList':[]
      },
      orderInfo:{
        'cartId': 0,
        'userId': 0,
        'productId': 0,
        'quantity': 0,
        'postage': 0,
        'receiverAddress': '',
        'receiverName': '',
        'receiverMobile': ''
      }
    }
  },
  components: {
    // OrderHeader
    // Modal
  },
  computed:{
    user_id(){
      return this.$store.state.user_id;
    }
  },
  mounted() {
    this.getAddressList();
    this.getCartList();
  },
  methods: {
    getAddressList() {
      this.axios.get('/api/userAddress/getByUserId').then((res) => {
        this.addressList = res;
        for(let i=0;i<this.addressList.length;i++){
          if(this.addressList[i].status===4){
            this.value=this.addressList[i].id
          }
        }
      })
    },
    getCartList() {
      this.axios.get('/api/cart/searchOrderConfirm?userId='+this.user_id).then(res => {
        // console.log(res.selectedAll)
        this.cartList = res.cartInfoList
        // console.log(this.cartList)
        this.cartTotalPrice = res.cartTotalPrice
        this.count = res.cartSelectedTotalQuantity
      })
    },
    // 订单提交
    orderSubmit() {
      let item
      for(let i=0;i<this.addressList.length;i++){
        if(this.addressList[i].id===this.value){
          item=this.addressList[i]
        }
      }
      // let item = this.list[this.checkIndex];
      if (!item) {
        this.$message.error('请选择一个收货地址');
        return;
      }
      this.$confirm('支付后提交订单', '提示', {
        confirmButtonText: '支付完成',
        cancelButtonText: '取消支付',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '支付成功，已提交订单!'
        })
        this.orderInfoVO.orderInfoList = []

        for(let i=0;i<this.cartList.length;i++){
          let shop = this.cartList[i]
          for(let j=0;j<shop.shopCartInfoList.length;j++){
            let cart = shop.shopCartInfoList[j]
            // console.log(cart)
            this.orderInfo = {}
            // console.log(this.orderInfo)
            this.orderInfo.cartId = cart.cartId
            this.orderInfo.userId = cart.userId
            this.orderInfo.productId = cart.productId
            this.orderInfo.postage = 0
            this.orderInfo.quantity = cart.quantity
            this.orderInfo.receiverName = item.receiverName
            this.orderInfo.receiverAddress = item.receiverAddress
            this.orderInfo.receiverMobile = item.receiverMobile
            // this.orderInfo.receiverName = 'yyy'
            // this.orderInfo.receiverAddress = 'ysr家'
            // this.orderInfo.receiverMobile = '15883406150'
            // console.log(this.orderInfo)

            this.orderInfoVO.orderInfoList[this.orderInfoVO.orderInfoList.length] = this.orderInfo
            // console.log(this.orderInfoList)
          }
        }
        // console.log(this.orderInfoVO.orderInfoList)

        this.axios.post('/api/cart/createOrder',this.orderInfoVO)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '支付已取消'
        })
      })
    }

  }
}
</script>
<style lang="scss">
.order-confirm {
  .wrapper {
    background-color: #F5F5F5;
    padding-top: 30px;
    padding-bottom: 84px;

    .order-box {
      background-color: #ffffff;
      background-color: #ffffff;
      padding-left: 40px;
      padding-right: 40px;
      padding-bottom: 40px;
      .addr-title {
        font-size: 20px;
        color: #333333;
        font-weight: 200;
        margin-bottom: 21px;
      }

      .item-address {
        padding-top: 38px;

        .addr-list {
          .addr-info, .addr-add {
            box-sizing: border-box;
            float: left;
            width: 271px;
            height: 180px;
            border: 1px solid #E5E5E5;
            margin-right: 15px;
            padding: 15px 24px;
            font-size: 14px;
            color: #757575;
          }

          .addr-info {
            cursor: pointer;

            h2 {
              height: 27px;
              font-size: 18px;
              font-weight: 300;
              color: #333;
              margin-bottom: 10px;
            }

            .street {
              height: 50px;
            }

            .action {
              height: 50px;
              line-height: 50px;

              .icon {
                width: 20px;
                height: 20px;
                fill: #666666;
                vertical-align: middle;

                &:hover {
                  fill: #e4291e;
                }
              }
            }

            &.checked {
              border: 1px solid #e4291e;
            }
          }

          .addr-add {
            text-align: center;
            color: #999999;
            cursor: pointer;

            .icon-add {
              width: 30px;
              height: 30px;
              border-radius: 50%;
              background: url('/imgs/icon-add.png') #E0E0E0 no-repeat center;
              background-size: 14px;
              margin: 0 auto;
              margin-top: 45px;
              margin-bottom: 10px;
            }
          }
        }
      }

      .item-good {
        h2{
          display: inline-block;
          margin-bottom: 8px;
          font-size: 20px;
          width: 80px;
        }
        .cart-item-list {
          font-size: 14px;

          .cart-shop {

            .shop {
              display: flex;
              background-color: #f2f2f2;
              height: 45px;
              align-items: center;
              border-bottom: 2px solid #e4291e;

              span {
                text-align: center;
                color: #e4291e;
                font-weight: bold;
                margin-left: 37px;
                width: 97px;
              }

              .cart-item-head {
                display: flex;
                height: 20px;
                width: 1000px;

                .col-1 {
                  flex: 1;
                  margin-left: 200px;
                }

                .col-2 {
                  flex: 1;
                  margin-left: 235px;
                  text-align: right;
                }

                .col-3 {
                  flex: 1;
                  margin-left: 140px;
                }
              }
            }

            .info {
              display: flex;
              height: 125px;
              align-items: center;
              border-bottom: 1px solid #f2f2f2;
              width: 1226px;
              font-size: 16px;

              .good-name {
                width: 495px;
                display: flex;
                align-items: center;
                flex: 3;
                margin-left: 80px;

                img {
                  width: 100px;
                  height: 100px;
                }

                span {
                  vertical-align: middle;
                  margin-left: 45px;
                  width: 154px;
                  display: block;
                  text-align: center;
                }
              }

              .good-price {
                width: 153px;
                display: block;
                text-align: center;
                margin-left: -99px;
              }

              .good-quantity {
                width: 153px;
                display: block;
                text-align: center;
                margin-left: 105px;
              }

              .good-total {
                margin-left: 192px;
                margin-right: 55px;
                width: 100px;
                color: #e4291e;
                text-align: center;
              }
            }
          }
        }
      }
      .item-shipping, .item-invoice {
        margin-top: 31px;
        line-height: 20px;

        h2 {
          display: inline-block;
          margin-right: 71px;
          font-size: 20px;
          width: 80px;
        }

        span, a {
          font-size: 16px;
          color: #e4291e;
          margin-right: 23px;
        }
      }

      .detail {
        padding: 50px 44px 33px 0;
        border-bottom: 1px solid #f5f5f5;
        text-align: right;
        font-size: 16px;
        color: #666666;

        .item-val {
          color: #e4291e;
          display: inline-block;
          width: 157px;
        }

        .item {
          line-height: 15px;
          margin-bottom: 12px;
        }
        .item-total {
          .item-val {
            font-size: 28px;
          }
        }
      }

      .btn-group {
        margin-top: 37px;
        text-align: right;
      }
    }

    .edit-wrap {
      font-size: 14px;

      .item {
        margin-bottom: 15px;

        .input {
          display: inline-block;
          width: 283px;
          height: 40px;
          line-height: 40px;
          padding-left: 15px;
          border: 1px solid #E5E5E5;

          & + .input {
            margin-left: 14px;
          }
        }

        select {
          height: 40px;
          line-height: 40px;
          border: 1px solid #E5E5E5;
          margin-right: 15px;
        }

        textarea {
          height: 62px;
          width: 100%;
          padding: 13px 15px;
          box-sizing: border-box;
          border: 1px solid #E5E5E5;
        }
      }
    }
  }
}
</style>
