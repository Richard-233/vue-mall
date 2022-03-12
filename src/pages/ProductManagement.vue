<template>
  <div id="container">
    <div class="sidebar">
      <span><img src="/imgs/pdd_small_logo1.png" alt="">卖家管理系统</span>
      <a href="javascript:" @click="goToShop">商店管理</a>
      <a href="javascript:"   style="background-color: #e4291e">商品管理</a>
      <a href="javascript:" @click="goToOrder">订单管理</a>
    </div>
    <div class="main">
    <el-row :gutter="20" style="margin-bottom: 10px">
      <el-col :span="16"><el-input placeholder="请输入商品id" v-model="inputId" ></el-input></el-col>
      <el-col :span="8"> <el-button @click="getProductById" type="success">搜索</el-button></el-col>
    </el-row>
    <el-row :gutter="20" style="margin-bottom: 10px">
      <el-col :span="16"><el-input v-model="inputName" placeholder="请输入商品名称" ></el-input></el-col>
      <el-col :span="8"> <el-button @click="getProductsByName" type="success">搜索</el-button></el-col>
    </el-row>
    <el-row :gutter="20" style="margin-bottom: 10px">
      <el-col :span="8"> <el-button @click="addNewProduct" type="primary">上架新商品</el-button></el-col>
      <el-col :span="10"> <el-button @click="getProductsAll" type="success">搜索所有商品</el-button></el-col>
    </el-row>
    <el-row :gutter="20"> <el-table
        :data="products"
        border
        style="width: 100%">
      <el-table-column
          prop="id"
          label="商品id"
          width="100">
      </el-table-column>
      <el-table-column
          prop="shopId"
          label="所属商铺id"
          width="120">
      </el-table-column>
      <el-table-column
          prop="name"
          label="商品名称"
          width="120">
      </el-table-column>
      <!--      <el-table-column-->
      <!--              prop="image"-->
      <!--              label="商品图片"-->
      <!--              width="120">-->
      <!--      </el-table-column>-->

      <el-table-column label="商品图片">
        <template slot-scope="scope">
          <img :src="scope.row.image" width="60" height="60" />
        </template>
      </el-table-column>

      <el-table-column
          prop="detail"
          label="商品详情"
          width="150">
      </el-table-column>
      <el-table-column
          prop="catalogId"
          label="商品目录"
          width="100">
      </el-table-column>
      <el-table-column
          prop="price"
          label="商品单价"
          width="90">
      </el-table-column>
      <el-table-column
          prop="stock"
          label="商品库存"
          width="90">
      </el-table-column>
      <el-table-column
          prop="status"
          label="商品状态"
          width="100">
      </el-table-column>
      <el-table-column
          prop="createTime"
          label="创建时间"
          width="100">
      </el-table-column>
      <el-table-column
          prop="updateTime"
          label="更新时间"
          width="100">
      </el-table-column>
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
    </el-table></el-row>
    <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNo"
        :page-sizes="[3, 20, 30, 40]"
        :page-size="pSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totals">
    </el-pagination>
  </div>
  </div>
</template>

<script>
  // _getProductsAll,
//import { _getProductById, _getProductsByName, _deleteProductById} from './../api/product'
// import toEditProduct from './toEditProduct'
// import {row} from 'element-ui'
export default {
  name: 'ProductManagement',
  data () {
    return {
      // 调试好之后，记得把inputId改成0 inputName改成''
      inputId: '',
      inputName: '',
      products: [],
      pageNo: 1,
      pSize: 3,
      totals: 0
    }
  },
  methods: {
    getProductsAll: function () {
      // let page = {pageNum: this.pageNo, pageSize: this.pSize}
      // // let page = {pageNum: this.pageNo, pageSize: this.pSize}
      // _getProductsAll(page).then(res => {
      //   this.products = res.data.list
      //   this.totals = res.data.total
      // })
      this.axios.get('/api/product/seller/product/list', {
        params: {
          pageNum: this.pageNo,
          pageSize: this.pSize
        }
      }).then((res)=>{
        this.products = res.list;
        this.totals = res.total;
      })
      // console.info(this.products)
    },
    deleteRow (index, row) {
      // console.info(row.id)
      //let productToBeDeleted = {id: row.id}
      // console.info(productToBeDeleted)
      //_deleteProductById(productToBeDeleted)
      this.axios.get('/api/product/delete', {
        params: {
          id: row.id
        }
      })

      this.products.splice(index, 1)
    },
    editRow (row) {
      // console.info(row.status)
      this.$router.push({name: 'toEditProduct',
        params: {id: row.id,
          shopId: row.shopId,
          name: row.name,
          image: row.image,
          detail: row.detail,
          catalogId: row.catalogId,
          price: row.price,
          stock: row.stock,
          status: row.status,
          createTime: row.createTime,
          updateTime: row.updateTime}})
    },
    addNewProduct () {
      this.$router.push('/toAddNewProduct')
    },
    handleSizeChange (size) {
      this.pSize = size
      this.getProductsAll()
    },
    handleCurrentChange (no) {
      this.pageNo = no
      this.getProductsAll()
    },
    getProductById () {
      let shopId = {id: this.inputId}
      this.pageNo = 1
      this.pSize = 1000
      console.info(this.inputId)
      // console.info(999)
      this.axios.get('/api/product/id', {
        params: shopId
      }).then((res)=>{
        this.products = res;
      })

      // _getProductById(shopId).then(res => {
      //   this.products = res.data
      //   // this.totals = res.data.total
      // })
    },
    getProductsByName () {
      let shopName = {name: this.inputName}
      this.pageNo = 1
      this.pSize = 1000
      //console.info(shopName)
      this.axios.get('/api/product/name', {
        params: shopName
      }).then((res)=>{
        this.products = res;
        //console.info(this.products)
      })

      // _getProductsByName(shopName).then(res => {
      //   this.products = res.data
      //   // this.totals = res.data.total
      // })
    },
    goToShop(){
      this.$router.push('/ShopManagement')
    },
    goToOrder(){
      this.$router.push('/shopOrderList')
    }

  },
  created () {
    this.getProductsAll()
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
  .main{
    margin-top: 48px;
    width: 1225px;
  }
}
</style>
