<template>
  <div class="my-5 row justify-content-center">
    <h1 class="text-center mb-4">前台購物車</h1>
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
    <h4 class="text-center my-4">填寫訂單資料</h4>
    <v-form ref="form" class="col-md-6" v-slot="{ errors }" @submit="createOrder">
      <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <v-field id="email" name="email" type="email" class="form-control" :class="{ 'is-invalid': errors['email'] }"
          placeholder="請輸入 Email" rules="required|email" v-model="form.user.email"></v-field>
        <error-message name="email" class="invalid-feedback"></error-message>
      </div>

      <div class="mb-3">
        <label for="name" class="form-label">收件人姓名</label>
        <v-field id="name" name="姓名" type="text" class="form-control" :class="{ 'is-invalid': errors['姓名'] }"
          placeholder="請輸入姓名" rules="required" v-model="form.user.name"></v-field>
        <error-message name="姓名" class="invalid-feedback"></error-message>
      </div>

      <div class="mb-3">
        <label for="tel" class="form-label">收件人電話</label>
        <v-field id="tel" name="電話" type="text" class="form-control" :class="{ 'is-invalid': errors['電話'] }"
          placeholder="請輸入電話" rules="required|min:8|max:10" v-model="form.user.tel"></v-field>
        <error-message name="電話" class="invalid-feedback"></error-message>
      </div>

      <div class="mb-3">
        <label for="address" class="form-label">收件人地址</label>
        <v-field id="address" name="地址" type="text" class="form-control" :class="{ 'is-invalid': errors['地址'] }"
          placeholder="請輸入地址" rules="required" v-model="form.user.address"></v-field>
        <error-message name="地址" class="invalid-feedback"></error-message>
      </div>

      <div class="mb-3">
        <label for="message" class="form-label">留言</label>
        <textarea id="message" class="form-control" cols="30" rows="10" v-model="form.message"></textarea>
      </div>
      <div class="text-end">
        <button type="submit" class="btn btn-danger">送出訂單</button>
      </div>
    </v-form>
  </div>
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
      loadingItem: '',
      form: { // 儲存訂單資料
        user: {
          name: '',
          email: '',
          tel: '',
          address: ''
        },
        message: ''
      }
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
