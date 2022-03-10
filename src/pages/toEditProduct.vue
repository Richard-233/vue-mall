<template>
  <div>
    <el-form ref="form" :model="form" label-width="100px">
      <el-form-item label="商品id">
        <el-input placeholder="商品id无法更改"></el-input>
      </el-form-item>
      <el-form-item label="所属商铺id">
        <el-input placeholder="所属商铺id无法更改"></el-input>
      </el-form-item>
      <el-form-item label="商品名称">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
<!--      <el-form-item label="商品图片">-->
<!--        <el-input v-model="form.image"></el-input>-->
<!--      </el-form-item>-->
      <el-form-item label="商铺图片">
        <template slot-scope="scope">
          <img :src="src" width="60" height="60" class="head_pic"/>
        </template>
      </el-form-item>

      <el-form-item label="上传商铺图片">
        <el-upload
                class="avatar-uploader"
                action="/api/product/upload/file"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
          <img v-if="src" :src="src" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="商品详情">
        <el-input v-model="form.detail"></el-input>
      </el-form-item>

      <el-form-item label="商品目录">
        <el-select v-model="form.catalogId" placeholder="请选择商品种类">
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

      <el-form-item label="商品单价">
        <el-input v-model="form.price"></el-input>
      </el-form-item>

      <el-form-item label="商品库存">
        <el-input v-model="form.stock"></el-input>
      </el-form-item>
      <el-form-item label="商品状态">
        <el-select v-model="form.status" placeholder="请选择商品状态">
          <el-option label="下架" value="0"></el-option>
          <el-option label="上架" value="1"></el-option>
          <el-option label="推荐" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品创建时间">
        <el-input placeholder="商品创建时间无需更改"></el-input>
      </el-form-item>

      <el-form-item label="商品更新时间">
        <el-input placeholder="商品更新时间无需更改"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="success" @click="onSubmit">立即更改</el-button>
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
import {_updateProductById} from './../api/product'
// import {row} from 'element-ui'
// import {_addNewProduct} from '@/api/product'
export default {
  name: 'toEditProduct',
  data () {
    return {
      form: {
        id: this.$route.params.id,
        shopId: this.$route.params.shopId,
        name: this.$route.params.name,
        image: this.$route.params.image,
        detail: this.$route.params.detail,
        catalogId: this.$route.params.catalogId,
        price: this.$route.params.price,
        stock: this.$route.params.stock,
        status: this.$route.params.status,
        createTime: this.$route.params.createTime,
        updateTime: this.$route.params.updateTime
      },
      src: ''
    }
  },
  methods: {
    onSubmit () {
      // console.info(this.form.id)
      // console.info(this.form.status)
      // console.log('submit!')
      let newProduct = { id: this.form.id,
        name: this.form.name,
        shopId: this.form.shopId,
        image: this.src,
        detail: this.form.detail,
        catalogId: this.form.catalogId,
        price: this.form.price,
        stock: this.form.stock,
        status: this.form.status,
        createTime: '',
        updateTime: ''}
      // console.info(newProduct)
      _updateProductById(newProduct).then(
        // console.info(11123456)
        res => { this.refuse() }
      )
      // console.info(this.price)
      // this.refuse()
      // _updateProductById(newProduct).then(this.$router.push({path: 'ProductManagement'}))
      // this.$router.push({path: 'ProductManagement'})
      // this.$router.push({path: 'ProductManagement'}).then(res => { _updateProductById(newProduct) })
    },
    refuse () {
      this.$router.push({path: 'ProductManagement'})
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
