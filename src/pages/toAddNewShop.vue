<template>
  <div>
    <el-form ref="form" :model="form" label-width="100px">
      <el-form-item label="商铺id">
        <el-input placeholder="商铺id无需输入"></el-input>
      </el-form-item>
      <el-form-item label="商铺名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="店主id">
        <el-input v-model="form.userId"></el-input>
      </el-form-item>
      <el-form-item label="商铺简介">
        <el-input v-model="form.intro"></el-input>
      </el-form-item>
      <el-form-item label="商铺地址">
        <el-input v-model="form.address"></el-input>
      </el-form-item>
      <el-form-item label="商铺联系方式">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="商铺种类">
        <el-select v-model="form.catalogId" placeholder="请选择商铺种类">
          <el-option label="服饰" value="1"></el-option>
          <el-option label="饮食" value="7"></el-option>
          <el-option label="生鲜" value="13"></el-option>
          <el-option label="玩具" value="18"></el-option>
          <el-option label="其他" value="19"></el-option>
          <el-option label="男装" value="2"></el-option>
          <el-option label="女装" value="6"></el-option>
          <el-option label="普通饮料" value="9"></el-option>
          <el-option label="酒水" value="8"></el-option>
          <el-option label="主食" value="16"></el-option>
          <el-option label="零食" value="17"></el-option>
          <el-option label="水果" value="14"></el-option>
          <el-option label="蔬菜" value="15"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="商铺图片">

          <img :src="src" width="60" height="60" class="head_pic"/>

      </el-form-item>

      <el-form-item label="上传商铺图片">
        <el-upload
                class="avatar-uploader"
                action="/api/api/product/upload/file"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
          <img v-if="src" :src="src" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <el-form-item label="商铺评分">
        <el-input placeholder="商铺评分无需输入"></el-input>
      </el-form-item>
      <el-form-item label="商铺状态">
        <el-select v-model="form.offline" placeholder="请选择商铺状态">
          <el-option label="下架" value="1"></el-option>
          <el-option label="上架" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="success" @click="onSubmit">确认新增</el-button>
        <el-button type="danger" @click="refuse">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
<script>
// import {_getProductsAll, _getProductById, _getProductsByName, _deleteProductById} from '@/api/product'
// import {row} from 'element-ui'
// import {_updateProductById} from '@/api/product'
import {_addNewShop} from './../api/shop'
export default {
  name: 'toAddNewShop',
  data () {
    return {
      form: {
        id: '',
        name: '',
        userId: '',
        intro: '',
        address: '',
        phone: '',
        catalogId: '',
        image: '',
        score: 6,
        offline: ''
      },
      src: ''
    }
  },
  methods: {
    onSubmit () {
      // console.info(this.form.id)
      // console.info(this.form.status)
      // console.log('submit!')
      let newShop = { id: this.form.id,
        name: this.form.name,
        userId: this.form.userId,
        intro: this.form.intro,
        address: this.form.address,
        phone: this.form.phone,
        catalogId: this.form.catalogId,
        image: this.src,
        score: this.form.score,
        offline: this.form.offline}
      // console.info(newShop)
      _addNewShop(newShop).then(() => {
        this.refuse()
      })
    },
    refuse () {
      this.$router.push({path: 'ShopManagement'})
    },
    handleAvatarSuccess (res, file) {
      this.src = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt5M = file.size / 1024 / 1024 < 5

      if (!isJPG) {
        this.$message.error('上传图片只能是 JPG 格式!')
      }
      if (!isLt5M) {
        this.$message.error('上传图片大小不能超过 5MB!')
      }
      return isJPG && isLt5M
    }
  }
}
</script>
