<template>
  <div>
<!--    <el-card class="crumbs-card">-->
<!--      <div class="crumbs">-->
<!--        <el-breadcrumb separator="/">-->
<!--          <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>-->
<!--          <el-breadcrumb-item :to="{ path: '/ShopList' }">店铺</el-breadcrumb-item>-->
<!--          <span>商城管理员系统</span>-->
<!--        </el-breadcrumb>-->
<!--      </div>-->
<!--    </el-card>-->
    <el-card class="crumbs-card">
      <div class="crumbs">
        <el-breadcrumb separator="/" style="font-size: x-large">
          <!--          <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>-->
          <!--          <el-breadcrumb-item :to="{ path: '/ShopList' }">店铺</el-breadcrumb-item>-->
          <!--          <el-breadcrumb-item :to="{ path: '/adminAddress' }">地址</el-breadcrumb-item>-->
          <span>商城管理员系统</span>
        </el-breadcrumb>
      </div>
    </el-card>
    <el-row style="display: grid;float: left;margin-right: 40px; width: 15%; ">
      <el-col >
        <!--        <div class="tachead" style="height: 60px;width:200px">-->
        <!--          <img src="static/images/leftico.png" alt="">-->
        <!--          <span style="font-size: x-large">  商城管理员系统</span>-->
        <!--        </div>-->
        <el-menu
            default-active="$route.path"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            background-color="#fff"
            text-color="black"
            active-text-color="black"
            router="true"
            default-openeds="['1']"
        >
          <el-submenu  index="1" >
            <template slot="title">
              <i class="el-icon-s-home" ></i>
              <span >返回</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/index"  >返回商城</el-menu-item>
              <!--              <el-menu-item index="1-2">用户管理</el-menu-item>-->
              <el-menu-item index="/sellerLogin">退出管理员系统</el-menu-item>
            </el-menu-item-group>

          </el-submenu>
          <el-menu-item index="/ShopList"  > <template slot="title">
            <i class="el-icon-shopping-bag-1" ></i>
            <span>店铺管理</span>
          </template></el-menu-item>

          <el-menu-item index="/adminAddress"  > <template slot="title">
            <i class="el-icon-location" ></i>
            <span>地址管理</span>
          </template></el-menu-item>
          <!--            <el-menu-item-group>-->
          <!--              <el-menu-item index="1-1">首页</el-menu-item>-->
          <!--              <el-menu-item index="1-2">用户管理</el-menu-item>-->
          <!--              <el-menu-item index="1-3">退出</el-menu-item>-->
          <!--            </el-menu-item-group>-->


          <!--          <el-submenu index="3" :to="{ path: '/adminAddress' }">-->
          <!--            <template slot="title">-->

          <!--              <i class="el-icon-location" ></i>-->
          <!--              <span>地址管理</span>-->
          <!--            </template>-->
          <!--            <el-menu-item-group>-->
          <!--              <el-menu-item index="1-1">首页</el-menu-item>-->
          <!--              <el-menu-item index="1-2">用户管理</el-menu-item>-->
          <!--              <el-menu-item index="1-3">退出</el-menu-item>-->
          <!--            </el-menu-item-group>-->

          <!--          </el-submenu>-->
        </el-menu>
      </el-col>
    </el-row>
    <div style="width: 1500px">
    <el-row  style="margin-left: 300px">
      <el-col :span="16"><el-input placeholder="请输入商品id" v-model="inputId"  ></el-input></el-col>
      <el-col :span="8"> <el-button @click="getProductById" type="success">搜索</el-button></el-col>
      <el-col :span="16" style="margin-top: 10px"><el-input v-model="inputName" placeholder="请输入商品名称" ></el-input></el-col>
      <el-col :span="8" style="margin-top: 10px"> <el-button @click="getProductsByName" type="success">搜索</el-button></el-col>
      <el-col :span="8" style="margin-top: 10px;margin-bottom: 10px"> <el-button @click="addNewProduct" type="primary">上架新商品</el-button></el-col>
      <el-col :span="10" style="margin-top: 10px;margin-bottom: 10px"> <el-button @click="getProductsAll" type="success">搜索所有商品</el-button></el-col>
      <el-table
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
        <el-table-column
            prop="image"
            label="商品图片"
            width="120">
        </el-table-column>

        <el-table-column label="商品图片">
          <template slot-scope="scope">
            <img :src="scope.row.image" width="60" height="60" class="head_pic"/>
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
                @click="deleteRow(scope.row)"
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
<!--    <el-row :gutter="20">1</el-row>-->
<!--    <el-row :gutter="20"  style="margin-left: 300px">-->
<!--      <el-col :span="16"><el-input v-model="inputName" placeholder="请输入商品名称" ></el-input></el-col>-->
<!--      <el-col :span="8"> <el-button @click="getProductsByName" type="success">搜索</el-button></el-col>-->
<!--    </el-row>-->
<!--    <el-row :gutter="20">1</el-row>-->
<!--    <el-row :gutter="20"  style="margin-left: 300px">-->
<!--      <el-col :span="8"> <el-button @click="addNewProduct" type="primary">上架新商品</el-button></el-col>-->
<!--      <el-col :span="10"> <el-button @click="getProductsAll" type="success">搜索所有商品</el-button></el-col>-->
<!--    </el-row>-->
<!--    <el-row :gutter="20">1</el-row>-->
<!--    <el-row :gutter="20"  style="margin-left: 300px"> <el-table-->
<!--            :data="products"-->
<!--            border-->
<!--            style="width: 100%">-->
<!--      <el-table-column-->
<!--              prop="id"-->
<!--              label="商品id"-->
<!--              width="100">-->
<!--      </el-table-column>-->
<!--      <el-table-column-->
<!--              prop="shopId"-->
<!--              label="所属商铺id"-->
<!--              width="120">-->
<!--      </el-table-column>-->
<!--      <el-table-column-->
<!--              prop="name"-->
<!--              label="商品名称"-->
<!--              width="120">-->
<!--      </el-table-column>-->
<!--      <el-table-column-->
<!--              prop="image"-->
<!--              label="商品图片"-->
<!--              width="120">-->
<!--      </el-table-column>-->

<!--      <el-table-column label="商品图片">-->
<!--        <template slot-scope="scope">-->
<!--          <img :src="scope.row.image" width="60" height="60" class="head_pic"/>-->
<!--        </template>-->
<!--      </el-table-column>-->

<!--      <el-table-column-->
<!--              prop="detail"-->
<!--              label="商品详情"-->
<!--              width="150">-->
<!--      </el-table-column>-->
<!--      <el-table-column-->
<!--              prop="catalogId"-->
<!--              label="商品目录"-->
<!--              width="100">-->
<!--      </el-table-column>-->
<!--      <el-table-column-->
<!--              prop="price"-->
<!--              label="商品单价"-->
<!--              width="90">-->
<!--      </el-table-column>-->
<!--      <el-table-column-->
<!--              prop="stock"-->
<!--              label="商品库存"-->
<!--              width="90">-->
<!--      </el-table-column>-->
<!--      <el-table-column-->
<!--              prop="status"-->
<!--              label="商品状态"-->
<!--              width="100">-->
<!--      </el-table-column>-->
<!--      <el-table-column-->
<!--              prop="createTime"-->
<!--              label="创建时间"-->
<!--              width="100">-->
<!--      </el-table-column>-->
<!--      <el-table-column-->
<!--              prop="updateTime"-->
<!--              label="更新时间"-->
<!--              width="100">-->
<!--      </el-table-column>-->
<!--      <el-table-column-->
<!--              fixed="right"-->
<!--              label="操作"-->
<!--              width="160">-->
<!--        <template slot-scope="scope">-->
<!--          <el-button-->
<!--                @click="deleteRow(scope.row)"-->
<!--                type="danger"-->
<!--                size="small">-->
<!--          移除-->
<!--        </el-button>-->
<!--          <el-button-->
<!--                  @click="editRow(scope.row)"-->
<!--                  type="success"-->
<!--                  size="small">-->
<!--            编辑-->
<!--          </el-button>-->
<!--        </template>-->
<!--      </el-table-column>-->
<!--    </el-table></el-row>-->
      <div class="paginationClass" style="position: fixed;
    bottom: 40px;
    height: 60px;
    width: 100%;
    text-align: center;">
    <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageNo"
            :page-sizes="[3, 20, 30, 40]"
            :page-size="pSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totals"
            text-align="center"

    >
    </el-pagination>

      </div>
  </div>
  </div>
</template>

<script>
// import {_getProductsAll, _getProductById, _getProductsByName, _deleteProductById} from '@/api/product'
// import {pp} from '@/api/api'
// import api from '../../../../api/api'
// import {row} from 'element-ui'
export default {
  name: 'shopProduct',
  data () {
    return {
      // 调试好之后，记得把inputId改成0 inputName改成''
      inputId: '',
      inputName: '',
      products: [],
      pageNo: 1,
      pSize: 3,
      totals: 0,
      aa: this.$route.params.shopId
    }
  },
  methods: {
    getProductsAll: function () {
      let page = {pageNum: this.pageNo, pageSize: this.pSize, shopId: this.aa}
      // let page = {pageNum: this.pageNo, pageSize: this.pSize}
      console.info(page)
      this.axios.get('/api/product/admin/see', {
        params:
        page
      }).then(res => {
        console.info(res)
            this.products = res.list
            this.totals = res.total
          }
      )



      // pp(page).then(res => {
      //   this.products = res.data.list
      //   this.totals = res.data.total
      // })
    },
    deleteRow (row) {
      console.info(row.id)
      // let productToBeDeleted = {id: row.id}
      // console.info(productToBeDeleted)
      // _deleteProductById(productToBeDeleted)
      // this.products.splice(index, 1)

      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        type: 'warning'
      }).then(() => {
            this.axios.delete('/api/product/admin/delete', {
              params: {
                id:row.id
              }
            }).then(() => {
              this.$message.success('成功!')
              this.getProductsAll()
            }).catch(() => {
              this.$message.error('失败!')
            }).catch(() => {
              this.$message.info('已取消操作!')
            })
          }
      ).catch(() => {
        this.$message.info('已取消操作!')
      })

      // api._removeProduct(row).then(() => {
      //   this.$message.success('成功删除了地址!')
      //   this.getProductsAll()
      // })
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
      this.$router.push({name: 'toAddNewProduct'})
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
      // console.info(this.inputId)
      // console.info(999)
      this.axios.get('/api/product/admin/id',{
        params: shopId
      }).then(res => {
        console.info(res)
        this.products = res
       // this.totals = res.total
      })
    },
    getProductsByName () {
      let shopName = {name: this.inputName}
      this.pageNo = 1
      this.pSize = 1000
      this.axios.get('/api/product/admin/name',{
        params: shopName
      }).then(res => {
        this.products = res
        // this.totals = res.data.total
      })
    }

  },
  created () {
    this.getProductsAll()
  }
}
</script>
