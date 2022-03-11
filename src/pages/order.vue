<template>
  <div>
    <order-header v-bind:title="title">
      <template v-slot:tip>
        <span>{{tip}}</span>
      </template>
    </order-header>
    <router-view></router-view>
    <nav-footer></nav-footer>
  </div>
</template>

<script>
import OrderHeader from "./../components/OrderHeader";
import NavFooter from "@/components/NavFooter";

export default {
  name: 'order',
  components: {
    OrderHeader,
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
