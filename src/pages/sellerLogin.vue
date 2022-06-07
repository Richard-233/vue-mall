<template>
  <div class="login">
    <div class="container">
      <a href="/#/index"><img src="/imgs/login-logo.png" alt=""></a>
    </div>
    <div class="wrapper">
      <div class="container">
        <div class="login-form">
          <el-tabs class="el-tab" v-model="activeName" :stretch="true">
            <el-tab-pane class="tab-pane" label="卖家登录" name="first">
              <div class="input">
                <el-input v-model="username" placeholder="请输入用户名"></el-input>
              </div>
              <div class="input">
                <el-input v-model="password" placeholder="请输入密码" type="password"></el-input>
              </div>
              <div class="btn-box">
                <a href="javascript:;" class="btn" @click="login">登录
                  <!--                  <el-button type="danger" round @click="login">登录</el-button>-->
                </a>
              </div>
              <div class="tips">
                <div class="reg">忘记密码？</div>
              </div>
            </el-tab-pane>
            <!--            <el-tab-pane class="tab-pane" label="注册" name="second">-->
            <!--              <div class="input">-->
            <!--                <el-input v-model="username" placeholder="请输入用户名" type="text"></el-input>-->
            <!--                &lt;!&ndash;                <input type="text" placeholder="请输入帐号" v-model="username">&ndash;&gt;-->
            <!--              </div>-->
            <!--              <div class="input">-->
            <!--                <el-input v-model="password" placeholder="请输入密码" type="text"></el-input>-->
            <!--                &lt;!&ndash;                <input type="password" placeholder="请输入密码" v-model="password">&ndash;&gt;-->
            <!--              </div>-->
            <!--              <div class="btn-box">-->
            <!--                <a href="javascript:;" class="btn" @click="register">注册</a>-->
            <!--              </div>-->
            <!--              <div class="tips">-->
            <!--                <div class="sms">手机短信登录/注册</div>-->
            <!--              </div>-->
            <!--            </el-tab-pane>-->
          </el-tabs>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="footer-link">
        <a href="https://www.pinduoduo.com/">拼多多首页</a><span>|</span>
        <a href="https://careers.pinduoduo.com/campus/">校园招聘</a><span>|</span>
        <a href="https://careers.pinduoduo.com/jobs">社会招聘</a><span>|</span>
        <a href="https://www.pinduoduo.com/home/about/">关于我们</a>
      </div>
      <p class="copyright">Copyright ©2022 TEAM10 All Rights Reserved.</p>
    </div>
  </div>
</template>
<script>
// import { mapActions } from 'vuex';
export default {
  name: 'sellerLogin',
  data() {
    return {
      username: '',
      password: '',
      userId: '',
      activeName: 'first',
      res: {},
      user: {}
    }
  },
  methods: {
    login() {
      this.user.username = this.username
      this.user.password = this.password
      if (this.user.username !== 'admin') {
        this.axios.post('/api/user/sellerLogin', this.user).then((res) => {
          this.$cookie.set('userId', res.id, {expires: '1M'});
          this.$store.dispatch('saveUserInfo', {
            nickname: res.nickname,
            image: res.image
          });
          this.$router.push('/ShopManagement');
        })
      } else {
        this.axios.post('/api/user/adminLogin', this.user).then((res) => {
          this.$cookie.set('userId', res.id, {expires: '1M'});
          this.$store.dispatch('saveUserInfo', {
            nickname: res.nickname,
            image: res.image
          });
          this.$router.push('/ShopList');
        })
      }
    }
  }
}
</script>
<style lang="scss">
@import './../assets/scss/button.scss';

.login {
  & > .container {
    height: 113px;

    img {
      width: auto;
      height: 100%;
      margin-top: 30px;
    }
  }

  .wrapper {
    background: url('/imgs/login-bg.png') no-repeat center;

    .container {
      height: 576px;

      .login-form {
        box-sizing: border-box;
        padding-left: 31px;
        padding-right: 31px;
        width: 410px;
        height: 324px;
        background-color: #ffffff;
        position: relative;
        bottom: -148px;
        right: -887px;

        .el-tab {
          .el-tabs__nav-scroll {
            margin-top: 21px;

            .el-tabs__item.is-top.is-active {
              font-size: 18px;
            }
          }

          .input {
            display: inline-block;
            width: 348px;
            height: 50px;
            //border:1px solid #E5E5E5;
            //margin-bottom:20px;
            input {
              width: 100%;
              height: 100%;
              //border: none;
              padding: 15px;
            }
          }

          .btn {
            width: 100%;
            line-height: 50px;
            margin-top: 10px;
            font-size: 16px;
          }

          .tips {
            margin-top: 14px;
            display: flex;
            justify-content: space-between;
            font-size: 14px;
            cursor: pointer;

            .sms {
              color: #e4291e;
            }

            .reg {
              color: #999999;

              span {
                margin: 0 7px;
              }
            }
          }
        }
      }
    }
  }

  .footer {
    height: 100px;
    padding-top: 60px;
    color: #999999;
    font-size: 16px;
    text-align: center;

    .footer-link {
      a {
        color: #999999;
        display: inline-block;
      }

      span {
        margin: 0 10px;
      }
    }

    .copyright {
      margin-top: 13px;
    }
  }
}
</style>
