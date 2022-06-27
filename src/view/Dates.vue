<template>
  
  <div class="content"> 
     <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/welcome' }" class="el-item"
        >首页</el-breadcrumb-item
      >
      <el-breadcrumb-item class="el-item">商品管理</el-breadcrumb-item>
      <el-breadcrumb-item class="el-item">商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <div id="cont" style="width:100%;height:500px;"></div>
    </el-card>
  </div>
</template>

<script>
export default {
  mounted() {
    

    var myChart = this.$echarts.init(document.getElementById('cont'));
    var option = {
        title: {
          text: '商品销量',
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {},
        toolbox: {
          show: true,
          feature: {
            dataZoom: {
              yAxisIndex: 'none'
            },
            dataView: { readOnly: false },
            magicType: { type: ['line', 'bar'] },
            restore: {},
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['January', 'February', 'March', 'April', 'May', 'June', 'July','August',
          'September','October','November','December']
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            formatter: '{value}/万件'
          }
        },
        series: [
          {
            name: 'Highest',
            type: 'line',
            data: [10, 11, 13, 11, 12, 12, 9,7,9,10,15,12],
            markPoint: {
              data: [
                { type: 'max', name: 'Max' },
                { type: 'min', name: 'Min' }
              ]
            },
            markLine: {
              data: [{ type: 'average', name: 'Avg' }]
            }
          },
          {
            name: 'Lowest',
            type: 'line',
            data: [1, 2, 2, 5, 3, 2, 4,2,4,2,5,6],
            markPoint: {
              data: [{ name: '周最低', value: 2, xAxis: 1, yAxis: 1.5 }]
            },
            markLine: {
              data: [
                { type: 'average', name: 'Avg' },
                [
                  {
                    symbol: 'none',
                    x: '90%',
                    yAxis: 'max'
                  },
                  {
                    symbol: 'circle',
                    label: {
                      position: 'start',
                      formatter: 'Max'
                    },
                    type: 'max',
                    name: '最高点'
                  }
                ]
              ]
            }
          }
        ]
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
  },
}
</script>

<style scoped>
.content {
  margin: 10px 30px;
}

.el-breadcrumb {
  height: 40px;
  line-height: 40px;
  margin-bottom: 0;
  padding: 0 10px;
  border-radius: 5px;
  background: #fff;
}

</style>