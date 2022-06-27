<template>
  <div class="content">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/welcome' }" class="el-item"
        >首页</el-breadcrumb-item
      >
      <el-breadcrumb-item class="el-item">权限管理</el-breadcrumb-item>
      <el-breadcrumb-item class="el-item">角色列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-table :data="list" border style="width: 100%">
        <el-table-column prop="id" label=" " width="50"> </el-table-column>
        <el-table-column prop="name" label="字段名" width="100"> </el-table-column>
        <el-table-column prop="field" label="字段说明" width="100"> </el-table-column>
        <el-table-column prop="describe" label="字段描述"> </el-table-column>
        <el-table-column prop="type" label="类型" width="80"> </el-table-column>
        <el-table-column prop="length" label="长度" width="50"> </el-table-column>
        <el-table-column prop="required" label="必填" width="50"> </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list:[
        {id:1,name:'id',field:'自增ID',describe:'',type:'int',length:11,required:'是'},
        {id:2,name:'username',field:'用户名',describe:'',type:'char',length:20,required:'是'},
        {id:3,name:'email',field:'邮箱',describe:'',type:'varchar',length:50,required:'是'},
        {id:4,name:'phone',field:'电话',describe:'',type:'varchar',length:24,required:'是'},
        {id:5,name:'r_name',field:'角色',describe:'',type:'varchar',length:11,required:'是'},
        {id:6,name:'isno',field:'状态',describe:'0：未选状态 1：选中状态',type:'tinyint',length:4,required:'是'},
      ]
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
  margin: 10px;
}

</style>