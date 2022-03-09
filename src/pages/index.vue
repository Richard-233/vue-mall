<template>
  <div class="index">
    <div class="container">
      <div class="swiper-box">
        <div class="nav-menu">
          <ul class="menu-wrap">
            <li class="menu-item">
              <a href="javascript:;">手机 电话卡</a>
              <div class="children">
                <ul v-for="(item,i) in menuList" v-bind:key="i">
                  <li v-for="(sub,j) in item" v-bind:key="j">
                    <a v-bind:href="sub?'/#/product/'+sub.id:''">
                      <img v-bind:src="sub?sub.img:'/imgs/item-box-1.png'" alt="">
                      {{ sub ? sub.name : '小米9' }}
                    </a>
                  </li>
                </ul>
              </div>
            </li>
            <li class="menu-item">
              <a href="javascript:;">电视 盒子</a>
            </li>
            <li class="menu-item">
              <a href="javascript:;">笔记本 平板</a>
            </li>
            <li class="menu-item">
              <a href="javascript:;">家电 插线板</a>
            </li>
            <li class="menu-item">
              <a href="javascript:;">出行 穿戴</a>
            </li>
            <li class="menu-item">
              <a href="javascript:;">智能 路由器</a>
            </li>
            <li class="menu-item">
              <a href="javascript:;">电源 配件</a>
            </li>
            <li class="menu-item">
              <a href="javascript:;">生活 箱包</a>
            </li>
          </ul>
        </div>
        <swiper v-bind:options="swiperOption">
          <swiper-slide v-for="(item,index) in slideList" v-bind:key="index">
            <a v-bind:href="'/#/product/'+item.id"><img v-bind:src="item.img"></a>
          </swiper-slide>
          <!-- Optional controls -->
          <div class="swiper-pagination" slot="pagination"></div>
          <div class="swiper-button-prev" slot="button-prev"></div>
          <div class="swiper-button-next" slot="button-next"></div>
        </swiper>
      </div>
      <div class="ads-box">
        <a v-bind:href="'/#/product/'+item.id" v-for="(item,index) in adsList" v-bind:key="index">
          <img v-lazy="item.img" alt="">
        </a>
      </div>
      <div class="banner">
        <img v-lazy="'/imgs/banner-1.gif'" alt="">
      </div>
      <div class="product-box">
          <h2>好物推荐</h2>
          <div class="wrapper">
            <div class="list-box">
              <div class="list" v-for="(arr,i) in itemList" v-bind:key="i">
                <div class="item" v-for="(item,j) in arr" v-bind:key="j" @click="checkProduct(item.id)">
                  <span v-bind:class="{'new-pro':j%2===0}">新品</span>
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
    </div>
  </div>
</template>
<script>
import {Swiper, SwiperSlide} from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'

export default {
  name: 'index',
  components: {
    Swiper,
    SwiperSlide
  },
  mounted(){
    this.init()
  },
  data() {
    return {
      swiperOption: {
        autoplay: {
          autoplay: true,
          delay: 3000,
          waitForTransition: true,
        },
        loop: true,
        effect: 'fade',
        fadeEffect: {
          crossFade: true,
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }
      },
      slideList: [
        {
          id: '42',
          img: '/imgs/slider/slide-1.jpg'
        },
        {
          id: '45',
          img: '/imgs/slider/slide-2.jpg'
        },
        {
          id: '46',
          img: '/imgs/slider/slide-3.jpg'
        },
        {
          id: '',
          img: '/imgs/slider/slide-4.jpg'
        },
        {
          id: '',
          img: '/imgs/slider/slide-1.jpg'
        }
      ],
      menuList: [
        [{
          id: 30,
          img: '/imgs/item-box-1.png',
          name: '小米CC',
        }, {
          id: 31,
          img: '/imgs/item-box-2.png',
          name: '小米8CC',
        }, {
          id: 32,
          img: '/imgs/item-box-3.jpg',
          name: 'red米CC',
        }, {
          id: 33,
          img: '/imgs/item-box-4.jpg',
          name: '小米CC',
        }],
        [], [], [], [], []
      ],
      adsList: [
        {
          id: 33,
          img: '/imgs/ads/ads-1.png'
        }, {
          id: 48,
          img: '/imgs/ads/ads-2.png'
        }, {
          id: 45,
          img: '/imgs/ads/ads-3.png'
        }, {
          id: 47,
          img: '/imgs/ads/ads-4.png'
        }
      ],
      itemList: []
    }
  },
  methods: {
    init() {
      this.axios.get('/api/product/list', {
        params: {
          pageNum: 1,
          pageSize: 80
        }
      }).then((res) => {
        this.itemList=[res.list.slice(0,5),res.list.slice(5,10),res.list.slice(10,15),res.list.slice(15,20),res.list.slice(20,25),res.list.slice(25,30),res.list.slice(30,35),res.list.slice(35,40),res.list.slice(40,45),res.list.slice(45,50),res.list.slice(50,55),res.list.slice(55,60),res.list.slice(60,65),res.list.slice(65,70),res.list.slice(70,75),res.list.slice(75,80)]
      })
    },
    checkProduct: function (id) {
      this.$router.push('/detail/'+id);
    }
  }
}
</script>

<style lang="scss">
@import './../assets/scss/mixin.scss';

.index {
  .swiper-box {
    .nav-menu {
      position: absolute;
      width: 264px;
      height: 451px;
      z-index: 9;
      padding: 26px 0;
      background-color: #55585a7a;
      box-sizing: border-box;

      .menu-wrap {
        .menu-item {
          height: 50px;
          line-height: 50px;

          a {
            position: relative;
            display: block;
            font-size: 18px;
            color: #FFFFFF;
            padding-left: 30px;
            font-weight: bold;

            &:after {
              position: absolute;
              right: 30px;
              top: 17.5px;
              content: '';
              @include bgImg(10px, 15px, '/imgs/icon-arrow.png')
            }
          }

          &:hover {
            background-color: #E4291E;

            .children {
              display: block;
            }
          }

          .children {
            display: none;
            width: 962px;
            height: 451px;
            background-color: #FFFFFF;
            position: absolute;
            top: 0;
            left: 264px;
            border: 1px solid #E4291E;

            ul {
              display: flex;
              justify-content: space-between;
              height: 75px;

              li {
                height: 75px;
                line-height: 75px;
                width: 241px;
                flex: 1;
                padding-left: 23px;
              }

              a {
                color: #333333;
                font-size: 14px;
              }

              img {
                width: 42px;
                height: 35px;
                vertical-align: middle;
                margin-right: 15px;
              }
            }
          }
        }
      }
    }

    .swiper-container {
      --swiper-theme-color: #e4291e;
      height: 451px;

      .swiper-button-prev {
        left: 274px;
      }

      img {
        width: 100%;
        height: 100%;
        transition: all 5s;
      }
    }
  }

  .ads-box {
    @include flex();
    margin-top: 14px;
    margin-bottom: 15px;

    a {
      width: 296px;
      height: 116px;
    }
  }

  .banner {
    margin-bottom: 50px;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .product-box {
    padding: 30px 0 50px;

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
                background-color:#E82626;
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
}
</style>
