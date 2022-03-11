<template>
  <div class="container">
    <div class="menu">
      <a href="javascript:">我的购物车</a>
      <a href="javascript:">我的订单</a>
      <a href="javascript:">我的收货地址</a>
      <a href="" v-if="user.role===1">我的店铺</a>
      <a href="" v-if="user.role===0">注册店铺</a>
    </div>
    <div class="main">
      <div class="mainInfo">
        <img v-lazy="user.image" alt="">
        <h2>{{user.nickname}}({{user.username}})</h2>
        <a href="">修改个人信息</a>
      </div>
      <div class="otherInfo">
        <span>注册时间： <em>{{date}}</em></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "userInfo",
  data() {
    return {
      user:{},
      date:''
    }
  },
  mounted() {
    this.getUserInfo()
  },
  methods:{
    getUserInfo(){
      this.axios.get('/api/user/loginUserInfo').then((res)=>{
        this.user=res
        let date1=res.createTime.split('T')
        this.date=date1[0]
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  width: 1226px;
  position: relative;
  margin: auto;
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
      a{
        display: block;
        font-size: 14px;
        text-align: right;
        width: fit-content;
        height: fit-content;
        margin-top: 18px;
        margin-left: 153px;
        color: #546d7e;
        &:hover{
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
</style>
