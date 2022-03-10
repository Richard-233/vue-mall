<template>
  <div class="shop-detail">
    <product-param v-bind:title="shop.name"></product-param>
    <div class="wrapper">
      <div class="container clearfix">
        <div class="swiper">
          <swiper :options="swiperOption">
            <swiper-slide><img v-lazy="shop.image" alt=""></swiper-slide>
            <!-- Optional controls -->
            <div class="swiper-pagination"  slot="pagination"></div>
          </swiper>
        </div>
        <div class="content">
          <h2 class="item-title">{{shop.name}}</h2>
          <p class="item-info">{{shop.intro}}</p>
          <div class="item-addr">
            <i class="icon-loc"></i>
            <div class="addr">{{shop.address}}</div>
          </div>
          <el-rate
              v-model="value"
              disabled
              show-score
              text-color="#ff9900"
              score-template="{value}">
          </el-rate>
          <div class="item-price">联系电话：{{shop.phone}}</div>
          <div class="line"></div>
        </div>
      </div>
    </div>
    <div class="shop-product-box-list">
      <h2>店铺商品</h2>
      <div class="wrapper">
        <div class="list-box">
          <div class="list" v-for="(arr,i) in itemList" v-bind:key="i">
            <div class="item" v-for="(item,j) in arr" v-bind:key="j" @click="checkProduct(item.id)">
              <div class="item-img">
                <img v-lazy="item.image" alt="" >
              </div>
              <div class="item-info">
                <h3>{{item.name}}</h3>
                <p>{{item.detail}}</p>
                <p class="price">￥{{item.price/100.00}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="price-info">
      <div class="container">
        <h2>价格说明</h2>
        <div class="desc">
          <img src="/imgs/detail/item-price.jpg" alt="">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import ProductParam from './../components/ProductParam';
export default{
  name:'shopDetail',
  data(){
    return {
      // id:1,//获取商品ID
      id:this.$route.params.id,//获取商品ID
      err:'',
      shop:{},//商品信息
      swiperOption:{
        autoplay:true,
        pagination: {
          el: '.swiper-pagination',
          clickable :true,
        }
      },
      num: 1,
      value:'0',
      itemList: []
    }
  },
  components:{
    Swiper,
    SwiperSlide,
    ProductParam
  },
  computed:{
    user_id(){
      return this.$store.state.user_id;
    }
  },
  mounted(){
    this.getShopInfo();
    this.getShopProduct()
  },
  methods:{
    getShopInfo(){
      this.axios.get('/api/shop/'+this.id).then((res)=>{
        this.shop = res;
        this.value=this.shop.score;
        // console.log(JSON.stringify(this.shop.shopName))
      })
    },
    getShopProduct: function () {
      this.axios.get('/api/product/name?name='+'茅台').then((res)=>{
        let size = res.length
        let foot = size % 5
        for(let i=0;i<size;i=i+5){
          if(i+5>size){
            this.itemList.push(res.slice(i,i+foot))
          }
          else{
            this.itemList.push(res.slice(i,i+5))
          }
        }
      })
    }
  }
}
</script>
<style lang="scss">
@import './../assets/scss/config.scss';
@import './../assets/scss/mixin.scss';
.shop-detail{
  position: relative;
  width: 1226px;
  margin-right: auto;
  margin-left: auto;
  .wrapper{
    .swiper{
      --swiper-theme-color: #e4291e;
      float:left;
      width:300px;
      height:300px;
      margin-top:5px;
      margin-left: 153px;
      img{
        width:300px;
        height:300px;
      }
    }
    .content{
      float:right;
      width:584px;
      height:347px;
      .item-title{
        font-size:28px;
        padding-top:30px;
        padding-bottom:16px;
        height: 26px;
      }
      .item-info{
        font-size:14px;
        height: 36px;
      }
      .item-price{
        font-size:20px;
        height: 19px;
      }
      .line{
        height:0;
        margin-top:25px;
        margin-bottom:28px;
        border-top:1px solid #E5E5E5;
      }
      .item-addr{
        height:53px;
        background-color:#FAFAFA;
        border:1px solid #E5E5E5;
        box-sizing:border-box;
        padding-top:20px;
        padding-left:64px;
        font-size:14px;
        line-height:14px;
        position:relative;
        .icon-loc{
          position: absolute;
          top: 15px;
          left: 34px;
          @include bgImg(20px,20px,'/imgs/detail/icon-loc.png');
        }
        .addr{
          color:#666666;
        }
        .stock{
          margin-top:15px;
          color:#E4291E;
        }
      }
      .el-rate{
        margin: 18px 0 32px;
        .el-rate__item{
          .el-rate__icon.el-icon-star-on{
            font-size: 40px;
          }
        }
        .el-rate__text{
          font-size: 40px;
        }
      }
      .item-version,.item-color{
        margin-top:30px;
        h2{
          font-size:18px;
          margin-bottom:20px;
        }
      }
      .item-version,.item-color{
        .stock{
          margin-top:-10px;
          color:#E4291E;
          font-size: 14px;
        }
        .phone{
          width:287px;
          height:50px;
          line-height:50px;
          font-size:16px;
          color:#333333;
          border:1px solid #E5E5E5;
          box-sizing: border-box;
          text-align:center;
          cursor:pointer;
          span{
            color:#666666;
            margin-left:15px;
          }
          .color{
            display:inline-block;
            width:14px;
            height:14px;
            background-color:#666666;
          }
          &.checked{
            border:1px solid #E4291E;
            color:#E4291E;
          }
        }
      }
      .item-total{
        height: 108px;
        background: #FAFAFA;
        padding: 24px 33px 29px 30px;
        font-size: 14px;
        margin-top:50px;
        margin-bottom:30px;
        box-sizing: border-box;
        .phone-total{
          font-size: 24px;
          color: #E4291E;
          margin-top: 18px;
        }
      }
    }
  }
  .shop-product-box-list {
    padding: 30px 0 50px;
    width: 1226px;
    h2 {
      font-size: 22px;
      height: 21px;
      line-height: 21px;
      color: #333333;
      margin-bottom: 20px;
    }

    .wrapper {
      display: flex;

      .list-box {
        .list {
          @include flex();
          margin-bottom: 14px;

          &:last-child {
            margin-bottom: 0;
          }

          .item {
            justify-content: center;
            width: 236px;
            height: 312px;
            background-color: #ffffff;
            text-align: center;
            margin-left: 10px;
            cursor: pointer;
            span{
              display:inline-block;
              width:67px;
              height:24px;
              font-size:14px;
              line-height:24px;
              color:#ffffff;
              &.new-pro{
                background-color:#7ECF68;
              }
              &.kill-pro{
                background-color:#E4291E;
              }
            }
            .item-img {
              img {
                height: 195px;
                width:100%;
              }
            }

            .item-info {
              h3 {
                font-size: 14px;
                color: #333333;
                line-height: 14px;
                font-weight: bold;
              }

              p {
                color: #999999;
                line-height: 13px;
                margin: 6px auto 13px;
              }

              .price {
                color: #F20A0A;
                font-size: 14px;
                font-weight: bold;
                cursor: pointer;

              }
            }
          }
        }
      }
    }
  }
  .price-info{
    height:340px;
    h2{
      font-size:24px;
      color:#333333;
      margin-bottom: 20px;
    }
  }
}
</style>
