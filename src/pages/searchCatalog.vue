<template>
  <div class="product-box-list">
    <h2>你可能想找？</h2>
    <div class="wrapper">
      <div class="list-box">
        <div class="list" v-for="(arr,i) in itemList" v-bind:key="i">
          <div class="item" v-for="(item,j) in arr" v-bind:key="j" @click="checkProduct(item.id)">
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
</template>

<script>
export default {
  name: " searchCatalog",
  data() {
    return {
      input: this.$route.params.id,
      itemList: []
    }
  },
  mounted() {
    this.searchCatalog()
    this.reload()
  },
  methods: {
    searchCatalog: function () {
      this.axios.get('/api/product/selectByCatalog?id=' + this.input).then((res) => {
        let size = res.length
        let foot = size % 5
        for (let i = 0; i < size; i = i + 5) {
          if (i + 5 > size) {
            this.itemList.push(res.slice(i, i + foot))
          } else {
            this.itemList.push(res.slice(i, i + 5))
          }
        }
      })
    },
    checkProduct: function (id) {
      this.$router.push('/detail/' + id);
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

.product-box-list {
  padding: 30px 0 50px;
  position: relative;
  width: 1226px;
  margin-right: auto;
  margin-left: auto;

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
          .product-item{
            width: 233.8px;
            height: 315.98px;
            margin-left: 8px;
            background-color: #f7f9fa;
          }
        }
        .product-item {
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

</style>
