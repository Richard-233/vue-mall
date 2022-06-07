<template>
  <div class="index">
    <div class="container">
      <div class="swiper-box">
        <div class="nav-menu">
          <ul class="menu-wrap">
            <li v-for="(item1,i) in catalogList" v-bind:key="i" class="menu-item">
              <a href="javascript:;">{{ item1.name }}</a>
              <div class="children">
                <ul v-for="(item,i) in item1.childCatalog" v-bind:key="i">
                  <a v-bind:href="'/#/searchCatalog/'+item.id+'/'+item.name">
                    {{ item.name }}
                  </a>
                </ul>
              </div>
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
      <div class="box">
        <div class="ads-box">
          <div class="ads-box1">
            <a v-bind:href="'/#/product/'+item.id" v-for="(item,index) in adsList1" v-bind:key="index">
            <img v-lazy="item.img" alt=""></a>
          </div>
          <div class="ads-box2">
            <a v-bind:href="'/#/product/'+item.id" v-for="(item,index) in adsList2" v-bind:key="index">
            <img v-lazy="item.img" alt=""></a>
          </div>
        </div>
        <div class="banner">
          <img v-lazy="'/imgs/banner-1.gif'" alt="">
        </div>
      </div>
      <div class="product-box">
        <h2>好物推荐</h2>
        <div class="wrapper">
          <div class="list-box">
            <div class="list" v-for="(arr,i) in itemList" v-bind:key="i">
              <div class="item" v-for="(item,j) in arr" v-bind:key="j" @click="checkProduct(item.id)">
                <span v-bind:class="{'kill-pro':item.status===2}">商家推荐</span>
                <div class="item-img">
                  <img v-lazy="item.image" alt="">
                </div>
                <div class="item-info">
                  <h3>{{ item.name }}</h3>
                  <p>{{ item.detail }}</p>
                  <p class="price">￥{{ item.price / 100.00 }}</p>
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
  mounted() {
    this.init()
    this.getCatalog()
    this.reload()
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
      adsList1: [
        {
          id: 33,
          img: '/imgs/ads/ads-1.png'
        }, {
          id: 48,
          img: '/imgs/ads/ads-2.png'
        }
      ],
      adsList2: [
        {
          id: 45,
          img: '/imgs/ads/ads-3.png'
        }, {
          id: 47,
          img: '/imgs/ads/ads-4.png'
        }
      ],
      itemList: [],
      catalogList: []
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
        let size = res.list.length
        let foot = size % 5
        for (let i = 0; i < size; i = i + 5) {
          if (i + 5 > size) {
            this.itemList.push(res.list.slice(i, i + foot))
          } else {
            this.itemList.push(res.list.slice(i, i + 5))
          }
        }
      })
    },
    checkProduct: function (id) {
      this.$router.push('/detail/' + id);
    },
    getCatalog: function () {
      this.axios.post('/api/catalog/custom/list').then((res1) => {
        this.catalogList = res1
        // console.log(JSON.stringify(this.catalogList))
      })
    },
    reload: function () {
      if (location.href.indexOf("#reloaded") === -1) {
        location.href = location.href + "#reloaded";
        location.reload();
      }
    },
  }
}
</script>

<style lang="scss">
@import './../assets/scss/mixin.scss';

.index {
  .swiper-box {
    border-radius: 20px;
    .nav-menu {
      position: absolute;
      width: 264px;
      height: 451px;
      z-index: 9;
      padding: 26px 0;
      background-color: #55585a7a;
      box-sizing: border-box;
      border-radius:33px 0 0 33px;
      .menu-wrap {
        .menu-item {
          height: 50px;
          line-height: 50px;
          transition: all 0.3s;
          a {
            position: relative;
            display: block;
            font-size: 18px;
            color: #FFFFFF;
            padding-left: 30px;
            font-weight: bold;
            border-radius: 0px 20px 20px 0px;
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
            width: 130px;
            height: 449px;
            background-color: #FFFFFF00;
            position: absolute;
            top: 0;
            left: 264px;

            ul {
              justify-content: space-between;
              height: 55px;
              width: 130px;
              vertical-align: center;
              display: inline-block;

              a {
                color: #ffffff;
                font-size: 14px;
                height: fit-content;
                background-color: #E4291E;
                width: 100px;
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
      border-radius: 33px;

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

  .box {
    display: flex;
    margin-top: 14px;
    margin-bottom: 15px;
    height:359.65px;
    .ads-box{
      display: inline-flex;
      margin-right: 10px;
      height:309.65px;
      width:608px;
      .ads-box1 {
        width: 305px;
        height: 154px;
        margin-right: 7px;
        img{
          border-radius: 33px;
        }
      }
      .ads-box2 {
        width: 305px;
        height: 154px;
        img{
          border-radius: 33px;
        }
      }
    }

    .banner {
      margin-bottom: 50px;

      img {
        width: 608px;
        height: 100%;
        border-radius: 20px;
      }
    }
  }



  .product-box {
    padding: 30px 0 50px;
    margin-left: 0px;

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
          width:1226px;
          &:last-child {
            margin-bottom: 0;
            float: left;
            display:flex;
            justify-content: flex-start;
            .item{
              width: 233.8px;
              height: 315.98px;
              margin-left: 8px;
            }
          }
          .item {
            justify-content: center;
            width: 236px;
            height: 312px;
            background-color: #f7f9fa;
            text-align: center;
            cursor: pointer;
            border: 2px solid #ffffff;
            border-radius: 20px;
            transition: all 0.3s;
            &:hover{
              border: 2px solid #e4291e;
              background-color: #ffffff;
            }

            span {
              display: inline-block;
              width: 67px;
              height: 24px;
              font-size: 14px;
              line-height: 24px;
              color: #f7f9fa;
              border-radius:7px;
              margin: 2px 0 2px;
              &.new-pro {
                background-color: #7ECF68;
              }

              &.kill-pro {
                background-color: #E4291E;
              }
            }

            .item-img {
              img {
                height: 195px;
                width: 90%;
                border-radius: 33px;
                padding: 0 10px 0;
                margin-bottom: 16px;
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
