<template>
  <div>
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

    <el-card class="container" style="width: 80%; margin-top: 20px">
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
      style="width: 100%; margin-top: 50px; margin-bottom: 50px">
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
    goToHome(){
      this.$router.push('/index')
    },
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
el-menu-item,.el-submenu__title{height:80px;line-height:50px;position:relative;-webkit-box-sizing:border-box;white-space:nowrap;list-style:none}


</style>
<!--<style>-->
<!--@import './../../../../assets/scss/element-variables.scss';-->
<!--</style>-->
