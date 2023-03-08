<template>
  <div>
    後台頁面
    <router-link to="/admin/products">產品列表</router-link> |
    <router-link to="/admin/orders">訂單列表</router-link>
  </div>
  <RouterView></RouterView>
</template>

<script>
import { RouterView } from 'vue-router'

export default {
  components: {
    RouterView
  }
}
</script>
