<template>
  <div>
    前台頁面
    <router-link to="/">首頁</router-link> |
    <router-link to="/about">關於我們</router-link> |
    <router-link to="/products">產品列表</router-link> |
    <router-link to="/cart">購物車</router-link> |
    <router-link to="/admin/login">管理者登入</router-link>
  </div>
  <RouterView></RouterView>
</template>

<!-- 載入 RouterView -->
<script>
import { RouterView } from 'vue-router'

export default {
  components: {
    RouterView
  }
}
</script>
