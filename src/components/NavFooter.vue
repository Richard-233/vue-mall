<template>
 <div class="footer">
   <div class="footer-logo">
     <img src="../../public/imgs/pdd_small_logo1.png" alt="">
     <p>拼夕夕网上商城</p>
   </div>
   <div class="footer-link">
     <a href="">拼多多首页</a><span>|</span>
     <a href="">校园招聘</a><span>|</span>
     <a href="">社会招聘</a><span>|</span>
     <a href="">关于我们</a>
   </div>
   <div class="copyright">Copyright ©2022 TEAM07 All Rights Reserved.</div>
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
    }
  }
}

</style>
