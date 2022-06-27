<template>
  <div id="app">
     <!-- <el-button type="primary">主要按钮</el-button> -->
     <router-link to="/login"></router-link>
     <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  },
  // 钩子函数
  // mounted() {
  //   console.log(this)
  // },
}
</script>

<style>

</style>
