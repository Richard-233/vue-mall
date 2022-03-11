<template>
  <div>
    <el-form ref="form" :model="form" label-width="100px">
      <el-form-item label="商品id">
        <el-input placeholder="商品id无需输入"></el-input>
      </el-form-item>
      <el-form-item label="所属商铺id">
        <el-input placeholder="所属商铺id无需输入"></el-input>
      </el-form-item>
      <el-form-item label="商品名称">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
<!--      <el-form-item label="商品图片">-->
<!--        <el-input v-model="form.image"></el-input>-->
<!--      </el-form-item>-->
      <el-form-item label="商品图片">

          <img :src="src" width="60" height="60" class="head_pic"/>

      </el-form-item>

      <el-form-item label="上传商品图片">
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
      <el-form-item label="商品详情">
        <el-input v-model="form.detail"></el-input>
      </el-form-item>

      <el-form-item label="商品目录">
        <el-select v-model="form.catalogId" placeholder="请选择商品目录">
          <el-option label="服饰" value="1"></el-option>
          <el-option label="饮食" value="7"></el-option>
          <el-option label="美妆/护理" value="29"></el-option>
          <el-option label="电脑" value="25"></el-option>
          <el-option label="生鲜" value="13"></el-option>
          <el-option label="家用电器" value="20"></el-option>
          <el-option label="其他" value="19"></el-option>
          <el-option label="母婴/玩具" value="18"></el-option>
          <el-option label="内衣" value="42"></el-option>
          <el-option label="配饰" value="43"></el-option>
          <el-option label="童装" value="44"></el-option>
          <el-option label="男装" value="2"></el-option>
          <el-option label="女装" value="6"></el-option>
          <el-option label="主食" value="16"></el-option>
          <el-option label="酒水" value="8"></el-option>
          <el-option label="普通饮料" value="9"></el-option>
          <el-option label="零食" value="17"></el-option>
          <el-option label="海鲜水产" value="52"></el-option>
          <el-option label="精选肉类" value="51"></el-option>
          <el-option label="水果" value="14"></el-option>
          <el-option label="蔬菜" value="15"></el-option>
          <el-option label="玩具" value="37"></el-option>
          <el-option label="妈妈专区" value="50"></el-option>
          <el-option label="童车童床" value="49"></el-option>
          <el-option label="喂养用品" value="48"></el-option>
          <el-option label="营养辅食" value="47"></el-option>
          <el-option label="奶粉" value="35"></el-option>
          <el-option label="尿布湿巾" value="36"></el-option>
          <el-option label="旅游" value="57"></el-option>
          <el-option label="艺术" value="55"></el-option>
          <el-option label="图书" value="53"></el-option>
          <el-option label="医疗" value="56"></el-option>
          <el-option label="理财" value="54"></el-option>
          <el-option label="电视" value="21"></el-option>
          <el-option label="空调" value="22"></el-option>
          <el-option label="洗衣机" value="23"></el-option>
          <el-option label="冰箱" value="24"></el-option>
          <el-option label="服务产品" value="41"></el-option>
          <el-option label="电脑整机" value="26"></el-option>
          <el-option label="电脑配件" value="27"></el-option>
          <el-option label="电脑外设" value="28"></el-option>
          <el-option label="游戏设备" value="38"></el-option>
          <el-option label="网络产品" value="39"></el-option>
          <el-option label="办公设备" value="40"></el-option>
          <el-option label="男士护肤" value="32"></el-option>
          <el-option label="香水彩妆" value="31"></el-option>
          <el-option label="面部护肤" value="30"></el-option>
          <el-option label="洗发护发" value="33"></el-option>
          <el-option label="纸品清洁" value="46"></el-option>
          <el-option label="身体护理" value="45"></el-option>
          <el-option label="口腔护理" value="34"></el-option>
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
        <el-input placeholder="商品创建时间无需输入"></el-input>
      </el-form-item>

      <el-form-item label="商品更新时间">
        <el-input placeholder="商品更新时间无需输入"></el-input>
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
// import {_addNewProduct} from './../../src/api/product'
export default {
  name: 'toAddNewProduct',
  data () {
    return {
      form: {
        id: 1,
        shopId: 1,
        name: '',
        image: '',
        detail: '',
        catalogId: 11,
        price: 0,
        stock: 0,
        status: 1,
        createTime: '',
        updateTime: ''
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
      console.info(newProduct)
      // _addNewProduct(newProduct).then(() => {
      //   this.refuse()
      // })
      this.axios.get('/api/product/admin/add', {
        params: newProduct
      }).then(

              () => {
                console.info(11123456)
                this.refuse() }
      )


    },
    refuse () {
      this.$router.push({path: 'ProductManagement'})
    },
    handleAvatarSuccess (res) {
      //this.src = URL.createObjectURL(file.raw)
      this.src=res.data
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
