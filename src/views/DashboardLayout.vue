<template>
  <h4 class="text-center">後台頁面</h4>
  <div class="d-flex justify-content-center">
    <router-link to="/admin/products" class="px-1">產品列表</router-link> |
    <router-link to="/admin/orders" class="px-1">訂單列表</router-link> |
    <router-link to="/" class="px-1">返回前台</router-link> |
    <a href="#" @click.prevent="logout" class="px-1">登出</a>
  </div>
  <RouterView></RouterView>
</template>

<script>
import { RouterView } from 'vue-router'
const { VITE_APP_URL } = import.meta.env

export default {
  components: {
    RouterView
  },
  methods: {
    logout () {
      // 清除 cookie
      document.cookie = `loginToken=; expires=${new Date()}, 31 Dec 9999 23:59:59 GMT;`
      alert('已成功登出')
      this.$router.push('/login')
    },
    checkAdmin () {
      // 取出 token
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)loginToken\s*=\s*([^;]*).*$)|^.*$/, '$1')
      this.$http.defaults.headers.common.Authorization = token
      this.$http.post(`${VITE_APP_URL}/v2/api/user/check`)
        .then((res) => {
          if (!res.data.success) {
            this.$router.push('/login')
          }
        })
        .catch((err) => {
          alert(err.response.data.message)
          this.$router.push('/login')
        })
    }
  },
  mounted () {
    this.checkAdmin()
  }
}
</script>
