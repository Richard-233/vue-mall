<template>
  <div class="container">
    <div class="menu">
      <a href="javascript:" @click="goToCart">我的购物车</a>
      <a href="javascript:" @click="myOrder">我的订单</a>
      <a href="javascript:">我的收货地址</a>
      <a href="" v-if="user.role===1" @click="goToShop">我的店铺</a>
      <a href="" v-if="user.role===0" @click="addShop">注册店铺</a>
    </div>
    <div class="main">
      <div class="mainInfo">
        <img v-lazy="user.image" alt="">
        <h2>{{ user.nickname }}  ({{ user.username }})</h2>
        <el-button type="text" @click="dialogFormVisible = true">修改个人信息</el-button>
      </div>
      <el-dialog title="修改" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="修改昵称" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="上传图片">
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
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="changeU">确 定</el-button>
        </div>
      </el-dialog>
      <div class="otherInfo">
        <span>注册时间： <em>{{ date }}</em></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "userInfo",
  data() {
    return {
      user: {},
      date: '',
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        name: '',
      },
      src: "123",
      formLabelWidth: '120px'
    }
  },
  mounted() {
    this.getUserInfo()
  },
  methods: {
    getUserInfo() {
      this.axios.get('/api/user/loginUserInfo').then((res) => {
        this.user = res
        let date1 = res.createTime.split('T')
        this.date = date1[0]
      })
    },
    myOrder: function () {
      this.$router.push('/userOrderList');
    },
    goToCart() {
      this.$router.push('/cart');
    },
    changeU() {
      this.dialogFormVisible = false
      let newUser = {userNickname: this.form.name, userImage: this.src}
      this.axios.get('/api/user/updateInfo', {
        params: newUser
      })
    },
    handleAvatarSuccess(res) {
      this.src = res.data
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt5M = file.size / 1024 / 1024 < 5
      if (!isJPG) {
        this.$message.error('上传图片只能是 JPG 格式!')
      }
      if (!isLt5M) {
        this.$message.error('上传图片大小不能超过 5MB!')
      }
      return isJPG && isLt5M
    },
    goToShop(){
      this.$router.push('/ShopManagement')
    },
    addShop() {
      // console.info(this.src)
      this.$router.push({name: 'toAddNewShop'})
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  width: 1226px;
  position: relative;
  margin: 27px auto;
  display: flex;
  justify-content: center;

  .menu {
    display: grid;
    align-content: center;

    a {
      display: block;
      width: 192px;
      text-align: left;
      font-size: 19px;
      height: fit-content;
      color: #333333;
      margin-bottom: 54px;

      &:hover {
        color: #e4291e;
      }
    }
  }

  .main {
    display: flex;
    background-color: #F5F8FA;
    border: 2px solid #ebf0f3;
    width: 1034px;
    height: 272px;

    .mainInfo {
      display: flex;
      width: 797px;
      color: #546d7e;

      img {
        width: 150px;
        height: 150px;
        margin: 16px 60px;
      }

      h2 {
        margin: 16px;
      }

      button {
        display: block;
        font-size: 14px;
        text-align: right;
        width: fit-content;
        height: fit-content;
        margin-top: 18px;
        margin-left: 153px;
        color: #546d7e;

        &:hover {
          color: #e4291e;
        }
      }
    }

    .otherInfo {
      font-size: 19px;
      color: #546d7e;
      border-left: 3px solid #ebf0f3;
      width: 259px;
      padding-left: 48px;

      span {
        position: relative;
        top: 50px;
      }
    }
  }
}

  .avatar-uploader {
    .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
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
