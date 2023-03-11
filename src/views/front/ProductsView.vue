<template>
  <div>
    前台產品列表
  </div>
  <table class="table">
    <tbody>
      <tr v-for="product in products" :key="product.id">
      <td>{{ product.title }}</td>
      <td><img :src="product.imageUrl" width="150" alt=""></td>
      <td>
        <RouterLink :to="`/product/${product.id}`">商品細節</RouterLink>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
import { RouterLink } from 'vue-router'
// 取得環境變數
const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env

export default {
  data () {
    return {
      products: []
    }
  },
  methods: {
    getProdcuts () {
      // 插件方式：取得遠端資料
      this.$http.get(`${VITE_APP_URL}/v2/api/${VITE_APP_PATH}/products`)
        .then((res) => {
          this.products = res.data.products
        })
        .catch((err) => {
          alert(err.response.data.message)
        })
    }
  },
  mounted () {
    this.getProdcuts()
  },
  components: {
    RouterLink
  }
}
</script>
