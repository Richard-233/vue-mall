<template>
  <div class="header">
    <div class="nav-topbar">
      <div class="container">
        <div class="topbar-menu">
          <a href="javascript:">拼夕夕网上商城</a>
          <a href="javascript:">拼着买，才便宜</a>
          <a href="javascript:">联系客服</a>
          <a href="javascript:">协议规则</a>
        </div>
        <div class="topbar-user">
          <a href="javascript:" v-if="user_nickname" @click="goToUserInfo">
            <a href="javascript:" >
            <img v-lazy="user_image" alt="" style="width: 25px;height: 25px;vertical-align: middle;">
          </a>
            <a href="javascript:">{{user_nickname}}</a>
          </a>
          <a href="javascript:" v-if="!user_nickname" @click="login">登录/注册</a>
          <a href="javascript:" v-if="user_nickname" @click="logout">登出</a>
          <a href="javascript:" v-if="user_nickname" @click="myOrder">我的订单</a>
          <a href="javascript:" class="my-cart" @click="goToCart"><span class="icon-cart"></span> 购物车</a>
        </div>
      </div>
    </div>
    <div class="nav-header">
      <div class="container">
        <div class="header-logo">
          <a href="/#/index"></a>
        </div>
        <div class="header-title">
            <span>拼夕夕网上商城</span>
        </div>
        <div class="header-search">
          <div class="wrapper">
            <div>
              <el-radio v-model="radio" label="1" style="margin-bottom:4px;">商品</el-radio>
              <el-radio v-model="radio" label="2" style="margin-top:4px;">店铺</el-radio>
            </div>
            <el-input name="keyword"
                 :placeholder="holder"
                v-model="input">
            </el-input>
            <el-button type="primary" icon="el-icon-search" href="javascript:;" size="medium" round @click="toSearch">搜索</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'nav-header',
  data(){
    return{
      holder:'',
      productList:[],
      input:this.$route.params.input,
      radio:'1'
    }
  },
  computed:{
    user_nickname(){
      return this.$store.state.nickname;
    },
    user_image(){
      return this.$store.state.user_image;
    }
  },
  mounted(){
    this.radio=this.$cookie.get("radio")
  },
  watch:{
    radio: function () {
      if (this.radio==='1'){
        this.holder='西瓜'
      }
      else{
        this.holder='成都'
      }
    }
  },
  methods:{
    login(){
      this.$router.push('/login');
    },
    logout(){
      this.axios.post('/api/user/logout').then(()=>{
        // this.$message.success('退出成功');
        this.$cookie.set('userId','',{expires:'-1'});
        this.$store.dispatch('saveUserInfo', {
          nickname:'',
          image:''
        });
      })
    },
    goToCart(){
      console.log('用户昵称是'+this.user_nickname)
      if(this.user_nickname===''){
        this.login()
      }
      else this.$router.push('/cart');
    },
    toSearch: function () {
      if(this.radio === '1'){
        // this.$cookie.set("radio",this.radio,{expires:new Date(new Date().getTime()+60*1000)});
        this.$cookie.set("radio",this.radio,{expires:'1M'});
        if(this.input===undefined){
          this.input=this.holder;
          console.log('input:'+this.input)
          this.$router.push('/searchProduct/'+this.input);
        }
        else this.$router.push('/searchProduct/'+this.input);
        this.$router.go(0);
      }
      else if(this.radio === '2'){
        // this.$cookie.set("radio",this.radio,{expires:new Date(new Date().getTime()+60*1000)});
        this.$cookie.set("radio",this.radio,{expires:'1M'});
        if(this.input===undefined){
          this.input=this.holder;
          this.$router.push('/searchShop/'+this.input);
        }
        else this.$router.push('/searchShop/'+this.input);
        this.$router.go(0);
      }
    },
    myOrder: function () {
      this.$router.push('/userOrderList');
    },
    goToUserInfo:function(){
      this.$router.push('/userInfo');
    }
  }
}
</script>

<style lang="scss">
    @import './../assets/scss/base.scss';
    @import './../assets/scss/element-variables.scss';
    @import './../assets/scss/mixin.scss';
    .header {
      .nav-topbar {
        border-bottom:2px solid #E4291E;
        height: 39px;
        line-height: 39px;
        background-color: #F2F2F2;
        //color: #FFFFFF;
        .container {
          @include flex();
          a{
            display:inline-block;
            color:#6C6C6C;
            //color:#E4291E;
            margin-right: 17px;
          }
          .my-cart{
            width:110px;
            background-color: #E4291E;
            text-align:center;
            color:#FFFFFF;
            .icon-cart{
              display: inline-block;
              width:16px;
              height:12px;
              background: url('../../public/imgs/icon-cart-checked.png') no-repeat center;
              background-size: contain;
              margin-right: 4px;
          }
          }
        }
      }
    }
    .nav-header{
      .container{
        height:112px;
        @include flex();
        .header-logo{
          display:inline-block;
          width:55px;
          height: 55px;
          background: url('../../public/imgs/pdd_logo_backgroud.png') no-repeat center;
          background-size:55px;
          a{
            display: inline-block;
            width:110px;
            height:55px;
            &:before{
              content:'';
              display:inline-block;
              width:55px;
              height:55px;
              background: url('../../public/imgs/pdd_small_logo.png') no-repeat center;
              background-size: 55px;
              transition:margin .2s;
            }
            &:after{
              content:'';
              display:inline-block;
              width:55px;
              height:55px;
              background: url('../../public/imgs/mi-home.png') no-repeat center;
              background-size: 69px;
            }
            &:hover:before{
              margin-left: -55px;
              transition:margin .2s;
            }
          }
        }
      }
      .header-title {
        display: inline-block;
        width:126px;
        color: #E4291E;
        font-weight: bold;
        font-size: 18px;
        line-height: 112px;
        margin-right: 33px;
      }
      .header-search{
        width:900px;
        .wrapper{
          height: 50px;
          //border:1px solid #E0E0E0;
          display: flex;
          align-items: center;
          width: 705px;
          .el-radio{
            margin-right: 0px;
          }
          input{
            //border-right: 1px solid #E0E0E0;
            box-sizing: border-box;
            width: 500px;
            height: 50px;
            padding-left: 14px;
            font-size: 18px;
          }
          button{
            display: inline-block;
            width:104px;
            height: 40px;
            margin-left:10px;
          }
        }
      }
    }
</style>
