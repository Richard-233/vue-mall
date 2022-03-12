<template>
  <div>
    <el-card class="crumbs-card">
      <div class="crumbs">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/ShopList' }">店铺</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/adminAddress' }">地址</el-breadcrumb-item>
          <span>商城管理员系统</span>
        </el-breadcrumb>
      </div>
    </el-card>
    <el-card class="container">
<!--      <el-row :gutter="20">-->
<!--        <el-col :span="6"><div>-->
<!--          <el-input-->
<!--              placeholder="请输入店铺名称"-->
<!--              v-model="input"-->
<!--              size="medium"-->
<!--              suffix-icon="el-icon-search"-->
<!--              clearable>-->
<!--          </el-input>-->
<!--        </div></el-col>-->
<!--        <el-col :span="6"><div>-->
<!--          <el-button icon="el-icon-search" circle></el-button>-->
<!--        </div></el-col>-->
<!--      </el-row>-->
<!--      <div style="margin-top: 15px; width: 60%">-->
<!--          <el-input placeholder="请输入内容" v-model="input3" class="input-with-select">-->
<!--            <el-select v-model="select" slot="prepend" placeholder="请选择筛选条件">-->
<!--              <el-option label="无" value="1"></el-option>-->
<!--              <el-option label="店铺名称" value="2"></el-option>-->
<!--              <el-option label="店铺类别" value="3"></el-option>-->
<!--              <el-option label="店铺ID" value="4"></el-option>-->
<!--            </el-select>-->
<!--            <el-button slot="append" icon="el-icon-search" @click="getTheShop()"></el-button>-->
<!--          </el-input>-->
<!--        </div>-->
<!--      <div style="margin: 30px 0;"></div>-->
      <el-table
          :data="shops"
      border
      style="width: 100%">
        <el-table-column type="expand" label="店铺详情" width="78">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="店铺介绍">
                <span>{{ props.row.intro }}</span>
              </el-form-item>
              <el-form-item label="店铺地址">
                <span>{{ props.row.address }}</span>
              </el-form-item>
              <el-form-item label="联系方式">
                <span>{{ props.row.phone }}</span>
              </el-form-item>
              <el-form-item label="店铺类别">
                <span>{{ props.row.catalogId }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
            prop="url"
            label="店铺图片">
        </el-table-column>
        <el-table-column
            prop="name"
            label="店铺名称">
        </el-table-column>
        <el-table-column
            prop="score"
            label="评分">
          <template slot-scope="scope">
            <el-rate
                v-model="scope.row.score" :allow-half="true"
                disabled
                show-score
                text-color="#ff9900">
            </el-rate>
          </template>
        </el-table-column>
        <el-table-column
            width="120">
          <template slot-scope="scope">
            <el-button
                @click="d(scope.row)"
                type="danger"
                size="small">
              进入
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
    </div>
    </el-card>
  </div>
</template>
<script>
// import {shopList} from '@/api/api'
// eslint-disable-next-line import/no-duplicates
// import {theShop} from '@/api/api'

export default {

  name: 'ShopList',
  data: function () {
    return {
      input3: '',
      select: '',
      shops: []
      //      theshop: []
    }
  },
  methods: {
    // goo(r){
    //   console.info(r.id)
    //   this.$router.push({name: 'ProductManagement'}, <param name="shopId" value="r.id">)
    //     }

    getShops () {
      this.axios.get('/api/shop/selectall').then((res) => {
        this.shops = res
      })
    },
    d (r) {
      console.info(r.id)
      this.$router.push({name: 'shopProduct', params: {shopId: r.id}})
    }
  },

  created () {
    this.getShops()
    // this.getTheShop()
  }
}
</script>
<style>
.el-select .el-input {
  width: 180px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>
<!--<style>-->
<!--@import './../../../../assets/scss/element-variables.scss';-->
<!--</style>-->
