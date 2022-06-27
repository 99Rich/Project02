<template>
  <div class="rights">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/welcome' }" class="el-item"
        >首页</el-breadcrumb-item
      >
      <el-breadcrumb-item class="el-item">权限管理</el-breadcrumb-item>
      <el-breadcrumb-item class="el-item">权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    
    <el-card>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="id" label="ID"></el-table-column>
        <el-table-column prop="authName" label="权限名称"></el-table-column>
        <el-table-column label="路径"></el-table-column>
        <el-table-column prop="level" label="权限等级">
          <template slot-scope="scope">
            <div>
              <el-tag v-if="scope.row.level=='0'">一级</el-tag>
              <el-tag v-else-if="scope.row.level=='1'" type="success">二级</el-tag>
              <el-tag v-else-if="scope.row.level=='2'" type="warning">三级</el-tag>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
      return {
        tableData: [],
        type:'list',
      }
  },
  mounted() {
    this.getRights();

    
  },
  methods:{
    async getRights(){
      const {data:res}=await this.$http.get('/api/rights/'+this.type);
      // console.log(res.data);
      this.tableData=res.data;
    },
  }
}
</script>

<style scoped>
.rights{
  padding: 20px;
  color: white;
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
  border-radius: 5px;
}
</style>