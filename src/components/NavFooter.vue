<template>
 <div class="footer">
   <div class="footer-logo">
     <img src="../../public/imgs/pdd_small_logo1.png" alt="">
     <p>拼夕夕网上商城</p>
   </div>
   <div class="footer-link">
     <a href="https://www.pinduoduo.com/">拼多多首页</a><span>|</span>
     <a href="https://careers.pinduoduo.com/campus/">校园招聘</a><span>|</span>
     <a href="https://careers.pinduoduo.com/jobs">社会招聘</a><span>|</span>
     <a href="https://www.pinduoduo.com/home/about/">关于我们</a>
   </div>
   <div class="copyright">Copyright ©2022 <span class="domain">TEAM07</span> All Rights Reserved.</div>
 </div>
</template>

<script>
export default {
  name: 'nav-footer'
}
</script>

<style lang="scss">
.footer{
  height:234px;
  border-top:4px solid #e4291e;
  background-color: #333333;
  color:#999999;
  font-size: 16px;
  text-align: center;
  .footer-logo{
    margin-top:46px;
    margin-bottom: 31px;
    img{
      width:53px;
      height:53px;
      margin-bottom: 13px;
    }
  }
  .footer-link{
    a{
      color:#999999;
      display: inline-block;
    }
    span{
      margin:0 10px;
    }
    margin-bottom: 13px;
  }
  .copyright{
    .domain{
      color: #e4291e;
    }
  }
}

</style>
