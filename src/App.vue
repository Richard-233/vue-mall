<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
// import storage from './storage'
export default {
  name: 'app',
  components: {
  },
  data(){
    return{

    }
  },
  mounted(){
    this.getUser();
  },
  methods:{
    getUser(){
      this.axios.get('/api/user/loginUserInfo').then((res)=>{
        this.$store.dispatch('saveUserInfo', {
          nickname:res.nickname,
          image:res.image
        });
      })
    },
    getCartCount(){

    }
  }
}
</script>

<style>
@import './assets/scss/reset.scss'
</style>
