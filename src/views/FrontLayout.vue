<template>
  <h4 class="text-center">前台頁面</h4>
  <div  class="d-flex justify-content-center">
    <router-link to="/" class="px-1">首頁</router-link> |
    <router-link to="/about" class="px-1">關於我們</router-link> |
    <router-link to="/products" class="px-1">產品列表</router-link> |
    <router-link to="/cart" class="px-1">購物車</router-link> |
    <router-link to="/login" class="px-1">登入</router-link>
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
