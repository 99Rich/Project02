<template>
  <div class="content">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/welcome' }" class="el-item"
        >首页</el-breadcrumb-item
      >
      <el-breadcrumb-item class="el-item">商品管理</el-breadcrumb-item>
      <el-breadcrumb-item class="el-item">商品分类</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-table :data="list" border style="width: 100%">
        <el-table-column type="index" label=" " width="50"> </el-table-column>
        <el-table-column prop="name" label="用途" > </el-table-column>
        <el-table-column prop="type1" label="商品" > </el-table-column>
        <el-table-column prop="type2" label="季节" > </el-table-column>
        <el-table-column prop="type3" label="适用产品" > </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
    mounted() {
        
    },
  data() {
    return {
      query:'',
      list:[
        {name:'清洁类',type1:'卸妆油、洁面乳',type2:'春季',type3:'抗敏感和保湿护肤产品'},
        {name:'护肤类',type1:'化妆水、乳液、面霜、精华霜。防晒霜等',type2:'夏季',type3:'保湿清爽防晒产品'},
        {name:'粉饰类',type1:'彩妆蜜粉、眼影、粉底霜等',type2:'秋季',type3:'美白保湿产品'},
        {name:'治疗类',type1:'祛斑霜、粉刺露等',type2:'冬季',type3:'高效保湿抗皱产品'},
      ]
    }
  },
  methods: {
    Search(){
        // console.log(this.query);
        const value=this.query;
        
    }
  },
}
</script>

<style scoped>
.content{
    color: aliceblue;
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

.el-table{
  margin-top: 20px;
}

.el-col{
    margin-right: 20px;
}
</style>