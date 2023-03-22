<template>
  <div class="my-5 row justify-content-center">
    <h1 class="text-center mb-4">前台產品列表</h1>
    <table class="table">
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <td>{{ product.title }}</td>
          <td><img :src="product.imageUrl" width="150" alt=""></td>
          <td>
            <RouterLink :to="`/product/${product.id}`" class="btn btn-outline-primary">商品細節</RouterLink>
            <button type="button" class="btn btn-outline-success" @click="addToCart(product.id)">加入購物車</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { RouterLink } from 'vue-router'
// 取得環境變數
const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env

export default {
  data () {
    return {
      products: [],
      loadingItem: ''
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
    },
    addToCart (id, qty = 1) {
      const data = {
        product_id: id,
        qty
      }
      this.loadingItem = id
      this.$http.post(`${VITE_APP_URL}/api/${VITE_APP_PATH}/cart`, { data })
        .then((res) => {
          alert(res.data.message)
          this.loadingItem = ''
        })
        .catch((err) => {
          alert(err.data.message)
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
