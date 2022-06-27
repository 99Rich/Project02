<template>
  <div class="box">
      <div class="top">
        <div class="left">
          <div class="one">
            <div class="one-top">
              <span>集群个数</span>
              <span>2022-5-13</span>
            </div>
            <div class="one-bottom">
              <div>剩余<br><strong>233</strong>G</div>
              <div class="main"><div id="main" style="width:100%;height:100%;"></div></div>
            </div>
          </div>
          <div class="two">
            <div class="two-top">
              <span>集群个数</span>
              <span>2022-5-13</span>
            </div>
            <div class="one-bottom">
              <div>桌面<br><strong>25</strong>个</div>
              <div class="list">
                <span>密集桌面</span>
                <span>非密：0</span>
                <span>秘密：2</span>
                <span>绝密：4</span>
              </div>
            </div>
          </div>
          <div class="three">
            <div class="three-top">
              <span>集群个数</span>
              <span>2022-5-13</span>
            </div>
            <div class="one-bottom">
              <div>终端<br><strong>12</strong>个</div>
              <div class="list">
                <span>密集桌面</span>
                <span>非密：0</span>
                <span>秘密：2</span>
                <span>绝密：4</span>
              </div>
            </div>
          </div>
        </div>

        <div class="right">
          <div id="Right-main"></div>
          <div id="Right-maino"></div>
        </div>
      </div>
      <div class="bottom">
        <div class="botto">
          <h2>消费排名</h2>
          <div class="pm"><p>护肤类</p><el-progress :text-inside="true" :stroke-width="26" :percentage="89.2"></el-progress></div>
          <div class="pm"><p>美妆类</p><el-progress :text-inside="true" :stroke-width="26" :percentage="50" status="success"></el-progress></div>
          <div class="pm"><p>彩妆类</p><el-progress :text-inside="true" :stroke-width="26" :percentage="65" status="warning"></el-progress></div>
          <div class="pm"><p>面膜类</p><el-progress :text-inside="true" :stroke-width="26" :percentage="99.5" status="exception"></el-progress></div>
        </div>
        <div class="bottt">
          <el-table :data="tableData">
            <el-table-column prop="id" label="排名" ></el-table-column>
            <el-table-column prop="name" label="商家名称"></el-table-column>
            <el-table-column prop="kinds" label="商品种类"></el-table-column>
            <el-table-column  prop="ratio" label="消费占比"></el-table-column>
          </el-table>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  mounted(){
    // 点击首页进入Welcome页面
    this.$store.state.ActivePath='';
    // 清空保存的路径
    sessionStorage.setItem('path','');

    // 获取列表传给router内的index值
    const index=this.$store.state.index;
    // 并将获取的index值存入sessionStorage
    if(this.$store.state.obj){
      this.$store.state.obj.closeMenu(index);
    }



    // earchs引入图

    // 
    var myChart = this.$echarts.init(document.getElementById('main'));
    var option;

    option = {
      xAxis: {
        type: 'category',
        // data: ['Mon', 'Tue', 'Wed', 'Thu'],
        show:false,
      },
      yAxis: {
        type: 'value',
        // 纵坐标内容不显示
        show:false,
      },
      series: [
        {
          data: [80, 70, 110, 130],
          type: 'bar'
        }
      ]
    };
    myChart.setOption(option);



    // Right-main部分
    var myChart=this.$echarts.init(document.getElementById('Right-main'));
    var option;

    option = {
      tooltip: {
        trigger: 'item'
      },
      legend: {
        top: '5%',
        left: 'center'
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: 'center'
          },
          // emphasis: {
          //   label: {
          //     show: true,
          //     fontSize: '40',
          //     fontWeight: 'bold'
          //   }
          // },
          labelLine: {
            show: false,
          },
          data: [
            { value: 1048, name: '珂拉琪' },
            { value: 735, name: '珂润' },
            { value: 580, name: 'AHC' },
            { value: 484, name: '3CE' },
          ]
        }
      ]
    };
    myChart.setOption(option);


    // Right-maino部分
    var myChart=this.$echarts.init(document.getElementById('Right-maino'));
    var option;
    setTimeout(function () {
        option = {
          legend: {},
          tooltip: {
            trigger: 'axis',
            showContent: false
          },
          dataset: {
            source: [
              ['product', '2012', '2013', '2014', '2015', '2016', '2017'],
              ['珂拉琪', 56.5, 82.1, 88.7, 70.1, 53.4, 85.1],
              ['珂润', 51.1, 51.4, 55.1, 53.3, 73.8, 68.7],
              ['AHC', 40.1, 62.2, 69.5, 36.4, 45.2, 32.5],
              ['3CE', 25.2, 37.1, 41.2, 18, 33.9, 49.1]
            ]
          },
          xAxis: { 
            type: 'category',
            // 坐标轴颜色
            axisLine:{
              lineStyle:{
                type:'solid',
                color:'#ffffff'
              }
            }
          },
          yAxis: { 
            gridIndex: 0,
            axisLine:{
              lineStyle:{
                type:'solid',
                color:'#ffffff'
              }
            }
          },
          grid: { top: '55%' },
          series: [
            {
              type: 'line',
              textStyle:{
                color:'#ffffff',
              },
              smooth: true,
              seriesLayoutBy: 'row',
              emphasis: { focus: 'series' }
            },
            {
              type: 'line',
              smooth: true,
              seriesLayoutBy: 'row',
              emphasis: { focus: 'series' }
            },
            {
              type: 'line',
              smooth: true,
              seriesLayoutBy: 'row',
              emphasis: { focus: 'series' }
            },
            {
              type: 'line',
              smooth: true,
              seriesLayoutBy: 'row',
              emphasis: { focus: 'series' }
            },
            {
              type: 'pie',
              id: 'pie',
              radius: '30%',
              center: ['50%', '25%'],
              emphasis: {
                focus: 'self'
              },
              label: {
                formatter: '{b}: {@2012} ({d}%)',
              },
              encode: {
                itemName: 'product',
                value: '2012',
                tooltip: '2012'
              }
            }
          ]
        };
        myChart.on('updateAxisPointer', function (event) {
          const xAxisInfo = event.axesInfo[0];
          if (xAxisInfo) {
            const dimension = xAxisInfo.value + 1;
            myChart.setOption({
              series: {
                id: 'pie',
                label: {
                  formatter: '{b}: {@[' + dimension + ']} ({d}%)',
                },
                encode: {
                  value: dimension,
                  // tooltip: dimension
                }
              }
            });
          }
        });
          myChart.setOption(option);
      });


  },


  


  methods: {
      tableRowClassName({row, rowIndex}) {
        if (rowIndex === 1) {
          return 'warning-row';
        } else if (rowIndex === 3) {
          return 'success-row';
        }
        return '';
      }
    },
    data() {
      return {
        tableData: [
          {
            id: '1',
            name: 'AHC',
            kinds: '护肤品',
            ratio:'45.2%'
          },
          {
            id: '2',
            name: '珂拉琪',
            kinds: '美妆类',
            ratio:'53,4%'
          },
          {
            id: '3',
            name: '珂润',
            kinds: '护肤品',
            ratio:'73.8%'
          },
          {
            id: '4',
            name: '3CE',
            kinds: '彩妆类',
            ratio:'33.9%'
          },
        ]
      }
    }
}
</script>

<style scoped>
.box{
  padding: 10px;
}
.top{
  height: 50vh;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.top>.left{
  width: 24%;
}
.top>.left>.one,.top>.left>.two,.top>.left>.three{
  width: 100%;
  height: 30%;
  border-radius: 5px;
  margin-bottom: 19px;
  color: white;
}

.top>.left>.one{
  background: #72b0c9;
}
.one-top,.two-top,.three-top{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 5px 10px;
}
.one-top{
  border-bottom: 2px solid #87ceeb;
}

.one-bottom{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-content: center;
  padding: 5px 10px;
}
.one-bottom>div>strong{
  font-size: 35px;
  margin-right: 10px;
}
.one-bottom>.list{
  display: flex;
  flex-direction: column;
  margin-right: 40px;
}
.one-bottom>.list>span{
  font-size: 13px;
}
.main{
  width: 40%;
  height: 100%;
}

.top>.left>.two{
  background: #67e1b9;
}
.two-top{
  border-bottom: 2px solid #72f6ca;
}


.top>.left>.three{
  background: #4b87b9;
}
.three-top{
  border-bottom: 2px solid #589fd9;
}

.top>.right{
  width: 74%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background: #589fd9a6;
  border-radius: 10px;
}
#Right-main,#Right-maino{
  width: 50%;
  height: 100%;
}

.bottom{
  width: 100%;
  box-sizing: border-box;
  background: #54b595b8;
  border-radius: 10px;
  margin-top: 10px;
  color: white;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.botto{
  width:40%;
  height: 100%;
  margin: 5px 10px;
}
.botto>.pm{
  display: flex;
  flex-direction: row;
}
.p{
  width: 20%;
}
.el-progress{
  width: 70%;
  margin: 12px 0 0 10px;
}

.bottt{
  width: 60%;
}
.el-table{
  width: 90%;
  margin: 10px;
  border-radius: 10px;
}
</style>