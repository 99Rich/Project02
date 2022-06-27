<template>
  <div class="cont">
      <div class="cont-one">
        <div class="cont-left">
          <h2>Welcome</h2>
          <h2 style="margin-top:15px">后台管理系统</h2>
        </div>
        <div class="cont-right">
          <div class="port">
            <img src="../assets/logo2.png" alt="">
          </div>
          <el-form ref="LoginForm" :model="LoginForm" :rules="rules" label-width="0">
            <!-- 用户名 -->
            <el-form-item prop="username">
              <el-input
               prefix-icon="el-icon-user"
               v-model="LoginForm.username"
               ></el-input>
            </el-form-item>
            <!-- 密码 -->
            <el-form-item prop="password">
              <el-input type="password" 
                prefix-icon="el-icon-lock" 
                v-model="LoginForm.password"
                ></el-input>
            </el-form-item>
            <!-- 登陆按钮 -->
            <el-form-item>
              <el-button type="primary" @click="Login">登陆</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
  </div>
</template>

<script>
export default {
    name:'Login',
    data() {

      // 判断密码
      // var validatePass = (rule, value, callback) => {
      //   if (value === '') {
      //     callback(new Error('请输入密码'));
      //   } else {
      //     if (this.ruleForm.checkPass !== '') {
      //       this.$refs.ruleForm.validateField('checkPass');
      //     }
      //     callback();
      //   }
      // };


      return {
        LoginForm:{
          username:'',
          password:'',
        },
        rules:{
          // 用户名
          username:[
            {
              required:true,  //必填项
              message:"请输入用户名", //提示信息
              trigger:"blur"
            },
            {min:3,max:10,message:"长度在 3 到 10 个字符",trigger:"blur"}
          ],
          // 密码
          password:[
            {
              required:true,  //必填项
              message:"请输入用户名", //提示信息
              trigger:"blur"
            },
            {min:3,max:10,message:"长度在 3 到 10 个字符",trigger:"blur"}
          ],
          // password:[
          //   { 
          //     validator: validatePass, 
          //     trigger: 'blur' 
          //   }
          // ],
        },
      }
    },

    methods: {
      Login(){
        this.$refs.LoginForm.validate(async (v)=>{
          // console.log(v)
          if(!v) return;
          const {data:res}=await this.$http({
            method:"post",
            url:"/api/login",
            data:{
              username:this.LoginForm.username,
              password:this.LoginForm.password,
            },
          });
          // console.log(res)
          // 判断是否登陆成功
          if(res.status!==200){
            this.$message.error(res.message)
            return 
          }
          //登陆成功
          sessionStorage.setItem('token',res.token) //服务器返回的token
          // base64加密
          sessionStorage.setItem('key',window.btoa(res.token))   //加密之后再把token存进去
          this.$message.success(res.message)
          this.$router.push('/home')
        })
      }
    }
}
</script>

<style scoped>
.cont{
  /* background: skyblue; */
  background-image: linear-gradient(70deg,#07aef0,#87ceeb,#9ee9f4);
  height: 100%;
}
.cont-one{
  display: flex;
  width: 700px;
  height: 400px;
  background: white;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  box-shadow:  0 0 5px #ccc;
  border-radius: 5px;
  overflow: hidden;
}
.cont-left{
  width: 50%;
  height: 100%;
  /* background: darkcyan; */
  background-image:linear-gradient(70deg,#0096d1,#9ee9f4);
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  color: rgb(2, 120, 120);
}
.cont-right{
  width: 50%;
  height: 50%;
  padding: 20px;
}
.port{
  width: 200px;
  height: 80px;
  /* border-radius: 50%; */
  /* border: 3px solid skyblue; */
  overflow: hidden;
  margin-bottom: 20px;
  position: relative;
  top: 0;
  left: 20%;
}
.port img{
  width: 100%;
  height: 100%;
  margin-top: 6px;
}
.el-button{
  width: 100%;
  height: 40px;
  border: none;
  background: skyblue;
  border-radius: 5px;
}
.el-button:hover{
  background: rgb(112, 198, 232);
}
.el-button:focus{
  /* 去除原有获取焦点后颜色变化的样式 */
  display: none;
}
</style>