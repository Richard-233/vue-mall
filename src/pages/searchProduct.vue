<template>
  <div class="product-box">
    <h2>你可能想找？</h2>
    <div class="wrapper">
      <div class="list-box">
        <div class="list" v-for="(arr,i) in itemList" v-bind:key="i">
          <div class="item" v-for="(item,j) in arr" v-bind:key="j" @click="checkProduct(item.id)">
            <div class="item-img">
              <img v-lazy="item.image" alt="" >
            </div>
            <div class="item-info">
              <h3>{{item.name}}</h3>
              <p>{{item.detail}}</p>
              <p class="price">￥{{item.price/100.00}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "searchProduct",
  data(){
    return {
      input: this.$route.params.input,
      itemList: []
    }
  },
  mounted() {
    this.searchP()
  },
  methods: {
    searchP: function () {
      this.axios.get('/api/product/name?name='+this.input).then((res)=>{
        // let length = res.list.length
        // let foot = length % 5
        // for(let i=0;i<length;i=i+5){
        //   if(i+5>length){
        //     this.itemList.add(res.list.slice(i,i+foot))
        //   }
        //   else{
        //     this.itemList.add(res.list.slice(i,i+5))
        //   }
        // }
        console.log(res)
        this.itemList=[res.slice(0,5),res.slice(5,10),res.slice(10,15),res.slice(15,20),res.slice(20,25),res.slice(25,30),res.slice(30,35),res.slice(35,40),res.slice(40,45),res.slice(45,50),res.slice(50,55),res.slice(55,60),res.slice(60,65),res.slice(65,70),res.slice(70,75),res.slice(75,80)]
        console.log(this.itemList)
      })
    },
    checkProduct: function (id) {
      this.$router.push('/detail/'+id);
    }
  }
}
</script>

<style scoped>

</style>
