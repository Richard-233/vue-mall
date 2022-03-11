<template>
  <div>
    <el-form ref="form" :model="form" label-width="100px">
      <el-form-item label="商铺id">
        <el-input placeholder="商铺id无法更改"></el-input>
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

<!--      <el-form-item label="商铺图片地址">-->
<!--        <el-input v-model="form.image"></el-input>-->
<!--      </el-form-item>-->

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
        <el-input placeholder="商铺评分无法更改"></el-input>
      </el-form-item>
      <el-form-item label="商铺状态">
        <el-select v-model="form.offline" placeholder="请选择商铺状态">
          <el-option label="下架" value="1"></el-option>
          <el-option label="上架" value="0"></el-option>
        </el-select>
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
//import {_updateShopById} from './../api/shop'
// import {row} from 'element-ui'
// import {_addNewProduct} from '@/api/product'
export default {
  name: 'toEditShop',
  data () {
    return {
      form: {
        id: this.$route.params.id,
        name: this.$route.params.name,
        userId: this.$route.params.userId,
        intro: this.$route.params.intro,
        address: this.$route.params.address,
        phone: this.$route.params.phone,
        catalogId: this.$route.params.catalogId,
        image: this.$route.params.image,
        score: this.$route.params.score,
        offline: this.$route.params.offline
      },
      src: ''
      // src: this.image

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
      // console.info(this.src)
      this.axios.get('/api/shop/update', {
        params: newShop
      }).then(
              // console.info(11123456)
              () => { this.refuse() }
      )

      // _updateShopById(newShop).then(
      //   // console.info(11123456)
      //   () => { this.refuse() }
      // )
      // console.info(this.price)
      // this.refuse()
      // _updateProductById(newProduct).then(this.$router.push({path: 'ProductManagement'}))
      // this.$router.push({path: 'ProductManagement'})
      // this.$router.push({path: 'ProductManagement'}).then(res => { _updateProductById(newProduct) })
    },
    refuse () {
      this.$router.push({path: 'ShopManagement'})
    },
    handleAvatarSuccess (res) {
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
