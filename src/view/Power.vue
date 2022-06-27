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
      <el-row :getter="20">
        <el-col :span="4">
          <el-button type="primary" @click="Sent">添加商品</el-button>
        </el-col>
      </el-row>

      <el-table :data="list" border style="width: 75%">
        <el-table-column type="index" width="50"> </el-table-column>
        <el-table-column prop="name" label="商品名" width="400">
        </el-table-column>
        <el-table-column prop="money" label="商品价格（元）" width="150">
        </el-table-column>
        <el-table-column prop="weight" label="商品重量" width="150">
        </el-table-column>
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

    <el-dialog title="添加商品信息" :visible.sync="dialogVisible" width="50%">
      <el-form ref="addformbox" label-width="70px" :rules="rules"  :model="NewData">
        <el-form-item label="商品名" prop="name">
          <el-input v-model="NewData.name"></el-input>
        </el-form-item>
        <el-form-item label="价格" prop="money">
          <el-input v-model="NewData.money"></el-input>
        </el-form-item>
        <el-form-item label="重量" prop="weight">
          <el-input v-model="NewData.weight"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="Additem">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  mounted() {
    var time = new Date()
    // console.log(time);
    
  },
  data() {
    return {
      dialogVisible: false,
      list: [
        {
          id: 1,
          name: "珂润保湿补水温和面霜2瓶套装【保税仓发货】",
          money: 326,
          weight: "40g",
          time: "",
        },
        {
          id: 2,
          name: "curel珂润水乳套装化妆水乳春夏敏感肌保湿补水",
          money: 300,
          weight: "150ml+120ml",
          time: "",
        },
        {
          id: 3,
          name: "AHC官方旗舰店蓝啵啵B5水乳套装玻尿酸滋润补水保湿护肤",
          money: 246,
          weight: "150ml+150ml",
          time: "",
        },
        {
          id: 4,
          name: "欧莱雅注白瓶淡斑美白精华面部精华液提亮保湿水杨酸377烟酰胺",
          money: 449,
          weight: "37.6ml",
          time: "",
        },
        {
          id: 5,
          name: "珀莱雅双抗精华2.0抗初老抗氧化抗糖虾青素提亮肤色补水保湿减黄",
          money: 259,
          weight: "30ml",
          time: "",
        },
      ],
      NewData: {
        id: "",
        name: "",
        money: "",
        weight: "",
      },
      rules: {
        name: [
          { required: true, message: "请输入商品名称", trigger: "blur" },
          { min: 2, max: 10, message: "长度在 2 ~ 10 个字符", trigger: "blur" },
        ],
        money: [
          { required: true, message: "请输入价格", trigger: "blur" },
          { min: 1, max: 5, message: "长度在 1 ~ 5个字符", trigger: "blur" },
        ],
        weight: [
          { required: true, message: "请输入重量", trigger: "blur" },
          // { validator: checkEmail, trigger: "blur" },
        ],
      },
    };
  },
  methods: {

    Sent() {
      this.dialogVisible = true;
    },
    Additem() {
      // console.log(this.NewData);
      this.list.push(this.NewData);
      this.NewData={},
      this.dialogVisible = false;
    },
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
};
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

.el-table {
  margin-top: 20px;
}

.el-col {
  margin-right: 20px;
}
</style>