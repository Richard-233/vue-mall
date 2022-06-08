<template>
  <div class="data_analysis">
    <order-header title="数据仓库">
      <template v-slot:tip>
      </template>
    </order-header>
    <div class="container">
      <div class="chart_list1">
        <div id="myChart" :style="{width: '306px', height: '300px'}"></div>
        <div id="myChart1" :style="{width: '306px', height: '300px'}"></div>
        <div id="myChart3" :style="{width: '306px', height: '300px'}"></div>
        <div id="myChart4" :style="{width: '306px', height: '300px'}"></div>
      </div>
      <div class="chart_list2">
        <div id="myChart2" :style="{width: '306px', height: '300px'}"></div>
        <div id="myChart5" :style="{width: '306px', height: '300px'}"></div>
        <div id="myChart6" :style="{width: '306px', height: '300px'}"></div>
        <div id="myChart7" :style="{width: '306px', height: '300px'}"></div>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import OrderHeader from './../components/OrderHeader'

export default {
  name: 'hello',
  components: {
    OrderHeader,
  },
  data() {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  mounted() {
    this.drawLine();
    this.drawLine1();
    this.drawLine3();
    this.drawLine4();
    this.drawLine2();
    this.drawLine5();
    this.drawLine6();
    this.drawLine7();
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById('myChart'))
      // 绘制图表
      myChart.setOption({
        title: {text: '用户数量'},
        tooltip: {},
        color:'#e4291e',
        xAxis: {
          type: 'category',
          axisTick: {
            alignWithLabel: true
          },
          data: ['6.3','6.4','6.5','6.6','6.7', '6.8', '6.9']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [5, 5, 7,7,8,10,11],
            type: 'line'
          }
        ]
      });
    },
    drawLine1() {
      // 基于准备好的dom，初始化echarts实例
      let myChart1 = echarts.init(document.getElementById('myChart1'))
      // 绘制图表
      myChart1.setOption({
        title: {text: '订单统计'},
        tooltip: {},
        xAxis: {
          type: 'category',
          axisTick: {
            alignWithLabel: true
          },
          data: ['6.3','6.4','6.5','6.6','6.7', '6.8', '6.9']
        },
        yAxis: {},
        series: [
          {
            data: [5,8,12,18,18,27,28],
            type: 'bar',
            stack: 'x',
            name:'待发货'
          },
          {
            data: [4,8,5,7,7,9,10],
            type: 'bar',
            stack: 'x',
            name:'待收货'
          },
          {
            data: [3,3,6,6,8,9,9],
            type: 'bar',
            stack: 'x',
            name:'已收货'
          },
          {
            data: [1,1,2,2,1,1,1],
            type: 'bar',
            stack: 'x',
            name:'待退款'
          },
          {
            data: [2,2,2,2,3,3,3],
            type: 'bar',
            stack: 'x',
            name:'已退款'
          }
        ]
      });
    },
    drawLine3() {
      // 基于准备好的dom，初始化echarts实例
      let myChart3 = echarts.init(document.getElementById('myChart3'))
      // 绘制图表
      myChart3.setOption({
        title: {text: '用户购物时间统计'},
        tooltip: {},
        series: [
          {
            type: 'pie',
            data: [
              {
                value: 8,
                name: '上午'
              },
              {
                value: 19,
                name: '下午'
              },
              {
                value: 24,
                name: '晚上'
              }
            ]
          }
        ]
      });
    },
    drawLine4() {
      // 基于准备好的dom，初始化echarts实例
      let myChart4 = echarts.init(document.getElementById('myChart4'))
      // 绘制图表
      myChart4.setOption({
        title: {text: '热销商品'},
        color:'#e41e74',
        tooltip: {},
        yAxis: {
          data: ["雪花啤酒", "普通茅台", "猕猴桃", "小型可控核聚变", "酱香型茅台"]
        },
        xAxis: {},
        series: [{
          name: '销量',
          type: 'bar',
          data: [3, 3, 5, 9, 11, 25]
        }]
      });
    },
    drawLine2() {
      // 基于准备好的dom，初始化echarts实例
      let myChart2 = echarts.init(document.getElementById('myChart2'))
      // 绘制图表
      myChart2.setOption({
        title: {text: '热销分类'},
        color:'#1ecde4',
        tooltip: {},
        yAxis: {
          data: ["空调", "男装", "水果", "母婴/玩具", "酒水"]
        },
        xAxis: {},
        series: [{
          name: '销量',
          type: 'bar',
          data: [1, 2, 9, 11, 33]
        }]
      });
    },
    drawLine5() {
      // 基于准备好的dom，初始化echarts实例
      let myChart5 = echarts.init(document.getElementById('myChart5'))
      // 绘制图表
      myChart5.setOption({
        title: {text: '点击量最高商品'},
        tooltip: {},
        color:'#92e41e',
        yAxis: {
          data: ["亡者的板甲", "格力空调1.5匹", "猕猴桃", "酱香型茅台", "小型可控核聚变"]
        },
        xAxis: {},
        series: [{
          name: '销量',
          type: 'bar',
          data: [24, 28, 31, 37, 43]
        }]
      });
    },
    drawLine6() {
      // 基于准备好的dom，初始化echarts实例
      let myChart6 = echarts.init(document.getElementById('myChart6'))
      // 绘制图表
      myChart6.setOption({
        title: {text: '点击量最高分类'},
        tooltip: {},
        color:'#e4b31e',
        yAxis: {
          data: ["空调", "生鲜", "水果", "母婴/玩具", "酒水"]
        },
        xAxis: {},
        series: [{
          name: '销量',
          type: 'bar',
          data: [ 13, 17, 31, 43, 55]
        }]
      });
    },
    drawLine7() {
      // 基于准备好的dom，初始化echarts实例
      let myChart7 = echarts.init(document.getElementById('myChart7'))
      // 绘制图表
      myChart7.setOption({
        title: {text: '用户活跃度'},
        tooltip: {},
        color:'#e4291e',
        xAxis: {
          data: ['6.3','6.4','6.5','6.6','6.7', '6.8', '6.9']

    },
        yAxis: {},
        series: [
          {
            data: [24, 0, 2,0,15, 23, 42],
            type: 'line',
            smooth: true,
            areaStyle: {
              color: '#ec8484',
              opacity: 0.5
            }
          }
        ]
      });
    }
  }

}
</script>

<style lang="scss">
.data_analysis{
  .order-header{
    margin-bottom: 49px;
  }
  .container{
    .chart_list1{
      display: flex;
    }
    .chart_list2{
      display: flex;
    }
  }
}
</style>
