<template>
  <div class="my-5 row justify-content-center">
    <h1 class="text-center mb-4">前台單一商品</h1>
    <h3>{{ product.title }}</h3>
    <img :src="product.imageUrl" class="img-fluid" alt="">
  </div>
</template>

<script>
const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env

export default {
  data () {
    return {
      product: {}
    }
  },
  methods: {
    getProduct () {
      const { id } = this.$route.params
      this.$http.get(`${VITE_APP_URL}/v2/api/${VITE_APP_PATH}/product/${id}`)
        .then((res) => {
          this.product = res.data.product
        })
        .catch((err) => {
          alert(err.response.data.message)
        })
    }
  },
  mounted () {
    this.getProduct()
  }
}
</script>
