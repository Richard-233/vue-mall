<template>
  <div>
    <router-view></router-view>
    <service-bar></service-bar>
    <nav-footer></nav-footer>
  </div>
</template>

<script>
import NavFooter from "@/components/NavFooter";
import ServiceBar from "@/components/ServiceBar";

export default {
  name: 'order',
  components: {
    ServiceBar,
    NavFooter
  },
  data() {
    return {
      title: '',
      tip: ''
    }
  },
  mounted() {
    let path = this.$route.path;
    if (path === '/userOrderList') {
      this.title = '订单列表'
      this.tip = '拼着买 才便宜'
    }
  }
}
</script>

<style scoped>

</style>
