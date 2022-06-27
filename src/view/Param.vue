<template>
  <div class="content">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/welcome' }" class="el-item"
        >首页</el-breadcrumb-item
      >
      <el-breadcrumb-item class="el-item">商品管理</el-breadcrumb-item>
      <el-breadcrumb-item class="el-item">分类参数</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-table :data="list" border style="width: 50%">
        <el-table-column prop="id" label="#" width="100"> </el-table-column>
        <el-table-column prop="name" label="属性名"> </el-table-column>
        <el-table-column prop="operation" label="操作">
            <template slot-scope="scope">
            <div>
              <el-button
                v-model="scope.row.isno"
                @click="Delete(scope.row)"
                type="danger"
                icon="el-icon-delete"
              ></el-button>
            </div>
          </template>
        </el-table-column>
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
        {id:1,name:'主体-商品名'},
        {id:2,name:'保湿-功效'},
        {id:3,name:'氨基酸-成分'},
        {id:4,name:'旗舰店-店铺'},
      ],
    }
  },
  methods: {
    // Search(){
    //     // console.log(this.query);
    //     const value=this.query;
        
    // },
     async Delete(value) {
      this.$messagebox
        .confirm("此操作将永久删除该文件, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
        .then(async () => {
          let index = this.list.findIndex((data) => {
            return value.id == data.id;
          });
          // console.log(index);
          this.list.splice(index, 1);

          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
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