<template>
  <div class="card my-16 mr-25 pr-20 outlined">
    <section class="layout-row align-items-center justify-content-center px-16">
      <h4>Your Cart</h4>
    </section>
    <div class="divider"></div>
    <section>
      <table>
        <thead>
        <tr>
          <th>Item</th>
          <th>Quantity</th>
          <th class="numeric">Price</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(cartItem, index) in cart.items" :key="index" :data-testid="'cart-item-' + index">
          <td data-testid="cart-item-name">{{ cartItem.item }}</td>
          <td data-testid="cart-item-quantity">{{ cartItem.quantity }}</td>
          <td class="numeric" data-testid="cart-item-price">${{ cartItem.price }}</td>
        </tr>
        </tbody>
      </table>

      <div class="layout-row justify-content-between align-items-center px-8 mx-12">
        <h5>Select Coupon</h5>
        <select data-testid="cart-coupon"
                class="coupon-select" v-model="coupon">
          <option :value="0">None</option>
          <option :value="10">OFF10</option>
          <option :value="20">OFF20</option>
        </select>
      </div>
      <ul class="bordered inset ma-0 px-8 mt-30">
        <li class="layout-row justify-content-between py-12 caption font-weight-light">
          <span>Subtotal</span>
          <span data-testid="cart-subtotal">${{ cart.subTotal }}</span>
        </li>
        <li class="layout-row justify-content-between py-12 caption font-weight-light">
          <span>Discount (-)</span>
          <span class="discount" data-testid="cart-discount">${{ cart.discount }}</span>
        </li>
        <li class="layout-row justify-content-between py-12 font-weight-bold">
          <span>Total</span>
          <span data-testid="cart-total">${{ cart.totalPrice }}</span>
        </li>
      </ul>

    </section>
  </div>

</template>

<script>
export default {
  name: "Cart",
  props: {
    cart: Object
  },
  data() {
    return {
      coupon : 0
    }
  },
  methods : {
    
  },
  watch: {
    coupon(val){
      this.$emit('coupon-changed',val)
    }
  }
}
</script>

<style scoped>

</style>
