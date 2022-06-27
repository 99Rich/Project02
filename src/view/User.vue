<template>
  <div class="box">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/welcome' }" class="el-item"
        >首页</el-breadcrumb-item
      >
      <el-breadcrumb-item class="el-item">用户管理</el-breadcrumb-item>
      <el-breadcrumb-item class="el-item">用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card class="box-card">
      <el-row :getter="20">
        <el-col :span="7">
          <el-input
            placeholder="请搜索用户名"
            v-model="query"
            clearable
            @clear="Clear"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="Search"
            ></el-button>
          </el-input>
        </el-col>

        <el-col :span="4">
          <el-button type="primary" @click="Sent">添加用户</el-button>
        </el-col>
      </el-row>

      <el-table :data="userList" border style="width: 100%">
        <el-table-column type="index" label="ID"></el-table-column>
        <el-table-column prop="username" label="姓名"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="phone" label="电话"></el-table-column>
        <el-table-column prop="r_name" label="角色"></el-table-column>
        <el-table-column prop="isno" label="状态">
          <template slot-scope="scope">
            <!-- <div type="primary" @click="getAdmin($event)"> -->
            <div type="primary">
              <el-switch v-model="scope.row.isno" @change="Change(scope.row)"></el-switch>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <div>
              <el-button
                type="primary"
                size="mini"
                icon="el-icon-edit"
                @click="UpdataFun(scope.row.id)"
              ></el-button>

              <el-button
                type="warning"
                size="mini"
                icon="el-icon-delete"
                @click="dataDele(scope.row.id)"
              ></el-button>

              <el-tooltip
                class="item"
                effect="dark"
                content="分配角色"
                placement="top"
                :enterable="false"
              >
                <el-button
                  type="danger"
                  size="mini"
                  icon="el-icon-s-tools"
                ></el-button>
              </el-tooltip>
            </div>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagenum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>

    <el-dialog title="添加用户信息" :visible.sync="dialogVisible" width="50%">
      <el-form ref="addform" label-width="70px" :rules="rules" :model="FormDia">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="FormDia.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="FormDia.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="FormDia.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="FormDia.phone"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="AddForm">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="修改用户" :visible.sync="updateinfo" width="50%">
      <el-form
        ref="ruleForm"
        :model="updateDate"
        :rules="upRules"
        label-width="70px"
      >
        <el-form-item label="用户名" prop="name">
          <el-input disabled v-model="updateDate.username"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="updateDate.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="updateDate.phone"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="updateinfo = false">取 消</el-button>
        <el-button type="primary" @click="Updates(updateDate.id)">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    // 邮箱验证规则
    var checkEmail = (rule, value, callback) => {
      // 对传过来的值进行验证
      var email = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      if (email.test(value)) {
        return callback();
      }
      callback(new Error("请输入正确的邮箱格式"));
    };
    // 手机号验证规则
    var checkPhone = (rule, value, callback) => {
      var phone =/^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/
      if (phone.test(value)) {
        return callback();
      }
      callback(new Error("请输入正确的手机号格式"));
    };

    return {
      userList: [],
      query: "",
      total: 0,
      pagenum: 1,
      pagesize: 2,
      dialogVisible: false,
      updateinfo:false,
      FormDia: {
        username: "",
        password: "",
        email: "",
        phone: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名称", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 ~ 10 个字符", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 12, message: "长度在 6 ~ 12 个字符", trigger: "blur" },
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { validator: checkEmail, trigger: "blur" },
        ],
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { validator: checkPhone, trigger: "blur" },
        ],
      },

      updateDate:{},
      upRules:{
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { validator: checkEmail, trigger: "blur" },
        ],
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { validator: checkPhone, trigger: "blur" },
        ],
      }
    };
  },
  mounted() {
    this.getUsers();
  },

  methods: {
    // 获取用户列表
    async getUsers() {
      // const res=await this.$http.get('/api/users',{
      const { data: res } = await this.$http.get("/api/users", {
        params: {
          query: this.query,
          page: this.pagenum,
          size: this.pagesize,
        },
      });
      // console.log(res)
      if (res.msg.status != 200) return this.$message.error("数据查询失败！");
      // 成功(可以不提示)
      // this.$message.success(res.msg.message);

      // 将拿到的数据存入数组
      this.userList = res.data;

      // 展示后台当前页数据的个数
      this.total = res.msg.total;
    },

    // 改变管理员状态
    async Change(datas){
      // console.log(datas)
      const {data:res}=await this.$http.get("/api/change",{
        params:{
          status:datas.isno,
          id:datas.id
        }
      })
      if(res.status!==200)  return this.$message.error('修改失败')
      this.$message.success('修改成功')
    },
    // async getAdmin(event) {
    //   // console.log(event.target.parentNode.parentNode.parentNode.parentNode.parentNode.firstElementChild.firstElementChild.firstElementChild.innerHTML)
    //   const indexNum =
    //     event.target.parentNode.parentNode.parentNode.parentNode.parentNode
    //       .firstElementChild.firstElementChild.firstElementChild.innerHTML;
    //   const iNum = indexNum - 1;
    //   const { data: res } = await this.$http.get("/api/change", {
    //     params: {
    //       status: this.userList[iNum].isno,
    //       id: indexNum,
    //     },
    //   });
    //   // console.log(res)

    //   // 修改加载
    //   const loading = this.$loading({
    //     lock: true,
    //     text: "Loading",
    //     spinner: "el-icon-loading",
    //     background: "rgba(0,0,0,0.8)",
    //   });
    //   // 修改成功后，关闭loading页面，提示修改成功信息
    //   setTimeout(() => {
    //     loading.close();
    //     this.$message.success("修改成功");
    //   }, 1500);
    // },

    // 接受多少条数据每个页码
    handleSizeChange(newsize) {
      // console.log(newsize);
      this.pagesize = newsize;
      this.getUsers();
    },

    // 当前展示的页
    handleCurrentChange(newPage) {
      // console.log(newPage)
      this.pagenum = newPage;
      this.getUsers();
    },

    Search() {
      this.getUsers();
    },

    Clear() {
      this.getUsers();
    },

    Sent() {
      this.dialogVisible = true;
    },

    // 预校验
    AddForm() {
      this.$refs.addform.validate(async (vali) =>{
        if (!vali) return;
        const {data:res}=await this.$http.post("/api/register", {
          ...this.FormDia,
        });
        // console.log(res)
        // console.log(data);
        if (res.status !== 200) return this.$message.error("用户添加失败");
        this.$message.success("新用户添加成功");
        // 对话框关闭
        this.dialogVisible = false;
        // 表单重置
        this.$refs.addform.resetFields();
        // 刷新列表
        this.getUsers();
      });
    },

    async UpdataFun(id){
      const {data:res}=await this.$http.get('/api/users/'+id)
      // console.log(res);
      if (res.msg.status !== 200) return this.$message.error("数据获取失败");
      this.updateDate=res.data
      this.updateinfo=true;
    },

    async Updates(id){
      const {data:res}=await this.$http.post('/api/upuser',{
        id,
        email:this.updateDate.email,
        phone:this.updateDate.phone,
      })
      // console.log(res);
      if(res.status!==200) return this.$message.error('修改失败')
      this.$message.success('修改成功')
      this.getUsers()
      this.updateinfo=false
    },

    async dataDele(id){
      this.$messagebox.confirm('此操作将永久删除该条数据，是否继续？','提示',{
        confirmButtonText:'确定',
        cancelButtonText:'取消'
      }).then(async()=>{
        const res= await this.$http.delete('/api/users/'+id)
        // console.log(res);
        this.$message({
          type:'success',
          message:'删除成功'
        })
        this.getUsers()
      }).catch(()=>{
        this.$message({
          type:'info',
          message:'已取消删除'
        })
      })
    }

  },
};
</script>

<style scoped>
.box {
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
  margin-top: 15px;
}
.el-col{
    margin-right: 20px;
}
.el-pagination {
  margin-top: 15px;
}
</style>