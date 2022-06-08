<template>
  <div id="container">
    <div class="sidebar">
      <span><img src="/imgs/pdd_small_logo1.png" alt="">卖家管理系统</span>
      <a href="javascript:" style="background-color: #e4291e">商店管理</a>
      <a href="javascript:"  @click="goToProduct">商品管理</a>
      <a href="javascript:"  @click="goToOrder">订单管理</a>
    </div>
    <div>
      <el-row :gutter="20"></el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-button @click="addShop" type="success" style="margin: 40px 0 10px">新建商铺</el-button>
        </el-col>
      </el-row>
      <el-row :gutter="20"></el-row>
      <el-row :gutter="20">
        <el-table
            :data="shop"
            border
            style="width: 100%">
          <el-table-column
              prop="id"
              label="商铺id"
              width="100">
          </el-table-column>
          <el-table-column
              prop="name"
              label="商铺名称"
              width="120">
          </el-table-column>
          <el-table-column
              prop="userId"
              label="店主id"
              width="120">
          </el-table-column>
          <el-table-column
              prop="intro"
              label="商铺简介"
              width="100">
          </el-table-column>
          <el-table-column
              prop="address"
              label="商铺地址"
              width="150">
          </el-table-column>
          <el-table-column
              prop="phone"
              label="联系方式"
              width="100">
          </el-table-column>
          <el-table-column
              prop="catalogId"
              label="商铺种类"
              width="90">
          </el-table-column>

          <!--            <el-table-column-->
          <!--                    prop="image"-->
          <!--                    label="商铺图片src"-->
          <!--                    width="90">-->
          <!--            </el-table-column>-->
          <el-table-column label="商铺图片">
            <template>
              <img :src="src" width="80" height="80" class="head_pic"/>
            </template>
          </el-table-column>
          <el-table-column
              prop="score"
              label="商铺评分"
              width="100">
          </el-table-column>
<!--          <el-table-column-->
<!--              prop="offline"-->
<!--              label="商铺状态"-->
<!--              width="100">-->
<!--          </el-table-column>-->
          <el-table-column
              fixed="right"
              label="操作"
              width="160">
            <template slot-scope="scope">
              <el-button
                  @click="deleteRow(scope.$index,scope.row)"
                  type="danger"
                  size="small">
                移除
              </el-button>
              <el-button
                  @click="editRow(scope.row)"
                  type="success"
                  size="small">
                编辑
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
    </div>
  </div>
</template>

<script>
//import {_getShop, _deleteShopById} from './../api/shop'
// import toEditProduct from './toEditProduct'
// import {row} from 'element-ui'
export default {
  name: 'ShopManagement',
  data() {
    return {
      shop: [],
      src: ''
    }
  },
  methods: {
    getShop: function () {
      this.axios.get('/api/shop/selectByUserId').then((res) => {
        this.shop = res
        // 最后记得写上这一条
        this.src = this.shop[0].image
      })


      // _getShop().then(res => {
      //   this.shop = res.data
      //   // 最后记得写上这一条
      //   this.src = this.shop[0].image
      //   // console.info(this.shop[0].image)
      //   // console.info(res.data.)
      // })
    },
    deleteRow(index, row) {
      //console.info(row.id)
      this.axios.get('/api/shop/delete', {
        params: {
          id: row.id
        }
      })

      //let shopToBeDeleted = {id: row.id}

      // console.info(productToBeDeleted)
      //_deleteShopById(shopToBeDeleted)

      this.shop.splice(index, 1)
    },
    editRow(row) {
      // console.info(row.status)
      this.$router.push({
        name: 'toEditShop',
        params: {
          id: row.id,
          name: row.name,
          userId: row.userId,
          intro: row.intro,
          address: row.address,
          phone: row.phone,
          catalogId: row.catalogId,
          image: row.image,
          score: row.score,
          offline: row.offline
        }
      })
    },
    addShop() {
      // console.info(this.src)
      this.$router.push({name: 'toAddNewShop'})
    },
    goToProduct(){
      this.$router.push('/ProductManagement')
    },
    goToOrder(){
      this.$router.push('/shopOrderList')
    }
  },
  created() {
    this.getShop()
  }

}
</script>

<style lang="scss" scoped>
#container{
  display: flex;
  position: relative;
  margin-right: auto;
  margin-left: auto;
  .sidebar{
    width: 225px;
    background-color: #55585a7a;
    display: grid;
    margin-right: 57px;
    height: 320px;
    float: top;
    span{
      color: #ffffff;
      font-size: 19px;
      font-weight: bold;
      height: 80px;
      line-height: 80px;
      text-align: center;
      img{
        width: 44px;
        height: 44px;
        position: relative;
        top: 14px;
        margin-right: 5px;
      }
    }
    a{
      color: #ffffff;
      text-align: center;
      font-size: 19px;
      font-weight: bold;
      height: 80px;
      line-height: 80px;
      &:hover{
        background-color: #e4291e;
      }
    }
  }
}
</style>
