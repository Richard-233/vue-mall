<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="16"><el-input placeholder="请输入商品id" v-model="inputId"  ></el-input></el-col>
      <el-col :span="8"> <el-button @click="getProductById" type="success">搜索</el-button></el-col>
    </el-row>
    <el-row :gutter="20">1</el-row>
    <el-row :gutter="20">
      <el-col :span="16"><el-input v-model="inputName" placeholder="请输入商品名称" ></el-input></el-col>
      <el-col :span="8"> <el-button @click="getProductsByName" type="success">搜索</el-button></el-col>
    </el-row>
    <el-row :gutter="20">1</el-row>
    <el-row :gutter="20">
      <el-col :span="8"> <el-button @click="addNewProduct" type="primary">上架新商品</el-button></el-col>
      <el-col :span="10"> <el-button @click="getProductsAll" type="success">搜索所有商品</el-button></el-col>
    </el-row>
    <el-row :gutter="20">1</el-row>
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
</template>

<script>
import {_getProductsAll, _getProductById, _getProductsByName, _deleteProductById} from './../api/product'
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
      let page = {pageNum: this.pageNo, pageSize: this.pSize}
      // let page = {pageNum: this.pageNo, pageSize: this.pSize}
      _getProductsAll(page).then(res => {
        this.products = res.data.list
        this.totals = res.data.total
      })
    },
    deleteRow (index, row) {
      // console.info(row.id)
      let productToBeDeleted = {id: row.id}
      // console.info(productToBeDeleted)
      _deleteProductById(productToBeDeleted)
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
      _getProductById(shopId).then(res => {
        this.products = res.data
        // this.totals = res.data.total
      })
    },
    getProductsByName () {
      let shopName = {name: this.inputName}
      this.pageNo = 1
      this.pSize = 1000
      _getProductsByName(shopName).then(res => {
        this.products = res.data
        // this.totals = res.data.total
      })
    }

  },
  created () {
    this.getProductsAll()
  }
}
</script>
