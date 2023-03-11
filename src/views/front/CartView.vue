<template>
  <div>
    前台購物車
  </div>
  <table class="table align-middle">
    <thead>
      <tr>
        <th></th>
        <th>品名</th>
        <th style="width: 150px">數量/單位</th>
        <th>單價</th>
      </tr>
    </thead>
    <tbody>
      <template v-if="cart.carts">
        <tr v-for="cartItem in cart.carts" :key="cartItem.id">
          <td>
            <button type="button" class="btn btn-outline-danger btn-sm" @click="delCartItem(cartItem.id)"
              :disabled="cartItem.id === loadingItem">
              <i class="fas fa-spinner fa-pulse" v-if="cartItem.id === loadingItem"></i>
              x
            </button>
          </td>
          <td>
            {{ cartItem.product.title }}
            <div class="text-success">已套用優惠券</div>
          </td>
          <td>
            <div class="input-group input-group-sm">
              <select name="quantity" id="" class="form-select" v-model="cartItem.qty" @change="editCartItem(cartItem)"
                :disabled="cartItem.id === loadingItem">
                <option :value="i" v-for="i in 10" :key="`${i}0123`">{{ i }}</option>
              </select>
              <span class="input-group-text" id="basic-addon2">
                {{ cartItem.product.unit }}
              </span>
            </div>
          </td>
          <td class="text-end">
            <small class="text-success">折扣價：</small>
            {{ cartItem.final_total }}
          </td>
        </tr>
      </template>
      <tr :class="{ 'd-none': haveProduct !== 0 }">
        <td colspan="4" class="text-center py-5 text-secondary">您的購物車未有商品</td>
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <td colspan="3" class="text-end">總計</td>
        <td class="text-end">{{ cart.total }}</td>
      </tr>
      <tr>
        <td colspan="3" class="text-end text-success">折扣價</td>
        <td class="text-end text-success">{{ cart.final_total }}</td>
      </tr>
    </tfoot>
  </table>
</template>

<script>
const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env

export default {
  data () {
    return {
      products: [],
      product: {},
      cart: {},
      haveProduct: 0,
      loadingItem: ''
    }
  },
  methods: {
    getProduct (id) {
      this.loadingItem = id
      this.$http.get(`${VITE_APP_URL}/api/${VITE_APP_PATH}/product/${id}`)
        .then((res) => {
          this.product = res.data.product
          this.$refs.productModal.openModal()
          this.loadingItem = ''
        })
        .catch((err) => {
          alert(err.data.message)
        })
    },
    getCarts () {
      this.$http.get(`${VITE_APP_URL}/api/${VITE_APP_PATH}/cart`)
        .then((res) => {
          this.cart = res.data.data
          this.haveProduct = this.cart.carts.length
        })
        .catch((err) => {
          alert(err.data.message)
        })
    },
    editCartItem (cartItem) {
      const data = {
        product_id: cartItem.product_id,
        qty: cartItem.qty
      }
      this.loadingItem = cartItem.id
      this.$http.put(`${VITE_APP_URL}/api/${VITE_APP_PATH}/cart/${cartItem.id}`, { data })
        .then((res) => {
          alert(res.data.message)
          this.getCarts()
          this.loadingItem = ''
        })
        .catch((err) => {
          alert(err.data.message)
        })
    },
    delCartItem (cartId) {
      this.loadingItem = cartId
      this.$http.delete(`${VITE_APP_URL}/api/${VITE_APP_PATH}/cart/${cartId}`)
        .then((res) => {
          alert(res.data.message)
          this.getCarts()
          this.loadingItem = ''
        })
        .catch((err) => {
          alert(err.data.message)
        })
    },
    delCarts () {
      this.$http.delete(`${VITE_APP_URL}/api/${VITE_APP_PATH}/carts`)
        .then((res) => {
          alert(res.data.message)
          this.getCarts()
        })
        .catch((err) => {
          alert(err.data.message)
        })
    },
    createOrder () {
      const data = this.form
      this.$http.post(`${VITE_APP_URL}/api/${VITE_APP_PATH}/order`, { data })
        .then((res) => {
          alert(res.data.message)
          this.$refs.form.resetForm()
          this.form.message = ''
          this.getCarts()
        })
        .catch((err) => {
          alert(err.data.message)
        })
    }
  },
  mounted () {
    this.getCarts()
  }
}
</script>
