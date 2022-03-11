<template>
  <div class="detail">
    <product-param v-bind:title="product.name"></product-param>
    <div class="wrapper">
      <div class="container clearfix">
        <div class="swiper">
          <swiper :options="swiperOption">
            <swiper-slide><img v-lazy="product.image" alt=""></swiper-slide>
            <!-- Optional controls -->
            <div class="swiper-pagination"  slot="pagination"></div>
          </swiper>
        </div>
        <div class="content">
          <h2 class="item-title">{{product.name}}</h2>
          <p class="item-info">{{product.detail}}</p>
          <div class="delivery" @click="toShopDetail">{{product.shopName}}</div>
          <div class="item-price">{{product.price/100.00}}元</div>
          <div class="line"></div>
          <div class="item-addr">
            <i class="icon-loc"></i>
            <div class="addr">四川 成都市 郫都区 优易数据大厦</div>
            <div class="stock">有现货</div>
          </div>
          <div class="item-version clearfix">
            <h2>配送</h2>
            <div class="stock">快递包邮  48小时内发货</div>
          </div>
          <div class="item-version clearfix">
            <h2>数量</h2>
            <el-input-number v-model="num" :min="1" :max="10" label="描述文字"></el-input-number>
          </div>
          <div class="item-total">
            <div class="phone-info clearfix">
              <div class="fl">{{product.name}}</div>
              <div class="fr">{{product.price/100.00}}元</div>
            </div>
            <div class="phone-total">总计：{{product.price/100.00}}元</div>
          </div>
          <div class="btn-group">
            <a href="javascript:;" class="btn btn-huge fl" @click="addCart">加入购物车</a>
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
  name:'detail',
  data(){
    return {
      // id:1,//获取商品ID
      id:this.$route.params.id,//获取商品ID
      err:'',
      version:1,//商品版本切换
      product:{},//商品信息
      swiperOption:{
        autoplay:true,
        pagination: {
          el: '.swiper-pagination',
          clickable :true,
        }
      },
      num: 1,
      cart: {
        productId:0,
        userId:0,
        quantity:0
      }
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
    this.getProductInfo();
  },
  methods:{
    getProductInfo(){
      this.axios.get('/api/product/id?id='+this.id).then((res)=>{
        this.product = res[0];
        // console.log(JSON.stringify(this.product.shopName))
      })
    },
    addCart(){
      this.cart.productId = this.id
      this.cart.userId = this.user_id
      this.cart.quantity = this.num
      console.log(this.cart)
      this.axios.post('/api/cart/addToCart',this.cart).then(()=>{
        this.$message({
          showClose: true,
          message: '添加成功',
          type: 'success'
        })
      })
    },
    toShopDetail(){
      this.$router.push('/shopDetail/' + this.product.shopId)
    }
  }
}
</script>
<style lang="scss">
@import './../assets/scss/config.scss';
@import './../assets/scss/mixin.scss';
.detail{
  .wrapper{
    .swiper{
      --swiper-theme-color: #e4291e;
      float:left;
      width:642px;
      height:617px;
      margin-top:5px;
      img{
        width:100%;
        height:100%;
      }
    }
    .content{
      float:right;
      width:584px;
      height:826px;
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
      .delivery{
        font-size:16px;
        color:#333333;
        margin-top:26px;
        margin-bottom:14px;
        height: 15px;
        &:hover{
          cursor: pointer;
          color: #E4291E;
        }
      }
      .item-price{
        font-size:20px;
        color:#e4291e;
        height: 19px;
        .del{
          font-size:16px;
          color:#999999;
          margin-left:10px;
          text-decoration:line-through;
        }
      }
      .line{
        height:0;
        margin-top:25px;
        margin-bottom:28px;
        border-top:1px solid #E5E5E5;
      }
      .item-addr{
        height:108px;
        background-color:#FAFAFA;
        border:1px solid #E5E5E5;
        box-sizing:border-box;
        padding-top:31px;
        padding-left:64px;
        font-size:14px;
        line-height:14px;
        position:relative;
        .icon-loc{
          position: absolute;
          top: 27px;
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
