<template>
  <div class="cont">
      <div class="home-head">
            <el-container>
                <div class="head-boxo">
                    <div class="pain">
                        <img src="../assets/logo21.png" alt="">
                    </div>
                    <h3>后台管理系统</h3>
                </div>
                <!-- <el-header type="info" @click="Back"><i class="el-icon-unlock"></i> 退出</el-header> -->
                <button @click="Back"><i class="el-icon-unlock"></i> 退出</button>
            </el-container>

            <div class="home-body">
                <el-aside :width="state?'64px':'200px'">
                <!-- 折叠标签 -->
                <div class="close" @click="Tgell">
                    <i :class="state?'el-icon-s-unfold':'el-icon-s-fold'"></i>
                </div>
                    <el-menu
                        :router="true"
                        :default-active="this.$store.state.ActivePath"
                        text-color="#ffffff"
                        :unique-opened='true'
                        :collapse="state"
                        :collapse-transition="false"
                        @open="Open"
                        ref="Menu"
                    >
                        <el-submenu
                            :index="item.id+''"
                            v-for="item in list" 
                            :key="item.id"
                        >
                            <template slot="title">
                                <i :class="IconObj[item.id]"></i>
                                <span>{{item.authName}}</span>
                            </template>
                            <el-menu-item-group v-for="items in item.children" :key="items.id">
                                <el-menu-item :index="items.path" @click="Active(items.path)"><i class="el-icon-menu"></i>{{items.authName}}</el-menu-item>
                            </el-menu-item-group>
                        </el-submenu>
                    </el-menu>
                </el-aside>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </div>
      </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            list:[],
            IconObj:{
                1:'el-icon-user-solid',
                2:'el-icon-s-help',
                3:'el-icon-s-shop',
                4:'el-icon-s-order',
                5:'el-icon-s-data',
            },
            
            state:false
        }
    },
    mounted() {
        this.$store.state.ActivePath=sessionStorage.getItem('path')
        this.ListDate()
    },

    watch:{

    },


    methods: {
        Back(){
            sessionStorage.clear();
            this.$router.push('/login')
        },

        async ListDate(){
            // const list=await this.$http.get('/api/menus');
            // console.log(list)
            const {data:res}=await this.$http.get('/api/menus');
            // console.log(res);
            if(res.meta.status!==200) return this.$message.error(res.meta.message);
            this.list=res.data;
        },

        Active(ActivePath){
            // consloe.log(ActivePath);
            sessionStorage.setItem('path',ActivePath);
            this.$store.commit('Tage',ActivePath)
            // this.ActivePath=v;
        },

        Tgell(){
            // console.log(1111)
            this.state=!this.state;
        },

        // 点击打开后保存当前元素索引，并向router传值
        Open(index){
            // console.log(this.$refs.Menu)
            this.$store.state.obj=this.$refs.Menu;
            this.$store.state.index=index;
        },
    },
}
</script>

<style scoped>
.cont{
    /* vh:满屏状态 */
    height: 100vh;
    background-image: linear-gradient(70deg,#07aef0,#87ceeb,#9ee9f4);
}
.el-container{
    height: 12vh;
}
.home-body{
    height: 88vh;
    display: flex;
    flex-direction: row;
}

.close{
    height: 40px;
    background: #5bc2ebd3;
    text-align: center;
    line-height: 35px;
    color: white;
    font-size: 30px;
    border-radius: 5px;
}

.el-container,.is-vertical{
    border-bottom: 2px solid #20b1ea;
    padding: 10px 40px;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-content: center;
}
.head-boxo{
    display: flex;
    align-items: center;
    color: white;
}
.pain{
    width: 70px;
    height: 70px;
    border-radius: 50%;
    /* margin-right: 10px; */
    /* border: 2px solid white; */
    overflow: hidden;
}
.pain img{
    width: 100%;
    height: 100%;
    margin-top: 5px;
}

button{
    width: 100px;
    height: 50px;
    line-height:50px;
    margin-top: 8px;
    text-align: center;
    color: aliceblue;
    border-radius: 5px;
    background: #74bcf4;
    border: none;
}

/* 鼠标进过原样式背景颜色 */
::v-deep .el-submenu__title:hover{
    /* background-color: #333333; */
    background-color: #0ca0db;
}
.el-menu-item-group{
    background-color: #5ed2f2d3;
    /* background-color: #3e3d3d; */
}
.el-menu-item:focus, .el-menu-item:hover{
    /* background-color: #505050; */
    background-color: #74cdee;
}


/* 小图标颜色 */
.el-ico-location,.el-icon-menu{
    color: aliceblue;
}
/* 导航栏小箭头颜色 */
::v-deep .el-submenu__title i{
    color: white !important;
}
/* 列表栏边框 */
::v-deep .el-menu{
    /* 两种都可 */
    /* border: none; */
    border: 0!important;
    background-image: linear-gradient(90deg,#1ab3ef,#35b9ee)!important;
}
::v-deep .el-menu-item-group__title{
   padding: 0;
}


.el-main{
    padding: 0;
}
</style>