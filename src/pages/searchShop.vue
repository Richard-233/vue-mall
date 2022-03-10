<template>
  <div class="product-box">
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
              <h4>{{ item.address }}</h4>
              <p>{{ item.intro }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "searchShop",
  data() {
    return {
      input: this.$route.params.input,
      itemList: []
    }
  },
  mounted() {
    this.searchP()
  },
  methods: {
    searchP: function () {
      this.axios.get('/api/shop/name?name=' + this.input).then((res) => {
        // let length = res.list.length
        // let foot = length % 5
        // for(let i=0;i<length;i=i+5){
        //   if(i+5>length){
        //     this.itemList.add(res.slice(i,i+foot))
        //   }
        //   else{
        //     this.itemList.add(res.slice(i,i+5))
        //   }
        // }
        // console.log(res)
        this.itemList = [res.slice(0, 5), res.slice(5, 10), res.slice(10, 15), res.slice(15, 20), res.slice(20, 25), res.slice(25, 30), res.slice(30, 35), res.slice(35, 40), res.slice(40, 45), res.slice(45, 50), res.slice(50, 55), res.slice(55, 60), res.slice(60, 65), res.slice(65, 70), res.slice(70, 75), res.slice(75, 80)]
        // console.log(this.itemList)
      })
    },
    checkProduct: function (id) {
      this.$router.push('/shopDetail/' + id);
    }
  }
}
</script>

<style lang="scss">
@import './../assets/scss/mixin.scss';

.product-box {
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

          span {
            display: inline-block;
            width: 67px;
            height: 24px;
            font-size: 14px;
            line-height: 24px;
            color: #ffffff;

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
              width: 100%;
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


          }
        }
      }
    }
  }
}

</style>
