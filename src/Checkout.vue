<template>
  <div class="layout-row">
    <ProductList class="flex-70" :products="products" @add="addToCart" @remove="removeFromCart" />
    <Cart class="flex-30" :cart="cart" @coupon-changed="couponChanged" />
  </div>
</template>

<script>
import ProductList from "@/components/ProductList";
import Cart from "@/components/Cart";


export default {
  name: "Checkout",
  components: {Cart, ProductList},
  data() {
    return {
      cart: {
        items: [],
        subTotal: 0,
        totalPrice: 0,
        discount: 0,
        selectedCoupon: 0
      },
      products: []
    }
  },
  created() {
    this.products = PRODUCTS.map((product, index) => {
      product.id = index + 1;
      product.image = `/images/items/${product.name.toLocaleLowerCase()}.png`;
      product.cartQuantity = 0;
      return product;
    });
  },
  methods: {
    couponChanged(val){
      this.selectedCoupon = val
      let tempCart = JSON.parse(JSON.stringify(this.cart))
      this.reCalulatePrice(tempCart) 
        
    },
     reCalulatePrice(tempCart){
       
      if (this.selectedCoupon) {
        tempCart.discount = tempCart.subTotal * (this.selectedCoupon / 100)
      } else {
        tempCart.discount = 0
      }
      tempCart.totalPrice = tempCart.subTotal - tempCart.discount
      this.cart = JSON.parse(JSON.stringify(tempCart))
    },
    addToCart(product) {
      const index = this.products.findIndex(p => p.id === product.id);
      this.products[index].cartQuantity = 1;
      let tempCart = JSON.parse(JSON.stringify(this.cart))
      tempCart.subTotal += this.products[index].price 
      tempCart.items.push({
        id: this.products[index].id,
        item: this.products[index].heading,
        price: this.products[index].price,
        quantity: 1
      });
      this.reCalulatePrice(tempCart) 
    },
    removeFromCart(product) {
      const index = this.products.findIndex(p => p.id === product.id);
      this.products[index].cartQuantity = 0;
      const cartIndex = this.cart.items.findIndex(c => c.id === product.id);
      let tempCart = JSON.parse(JSON.stringify(this.cart))
      tempCart.subTotal -= this.products[index].price 
      tempCart.items.splice(cartIndex, 1);
      this.reCalulatePrice(tempCart) 
    },
  }
}
export const PRODUCTS = [
  {
    heading: "Cap - $10",
    name: "Cap",
    price: 10
  },
  {
    heading: "Hand Bag - $30",
    name: "HandBag",
    price: 30
  },
  {
    heading: "Shirt - $30",
    name: "Shirt",
    price: 30
  },
  {
    heading: "Shoes - $50",
    name: "Shoe",
    price: 50
  },
  {
    heading: "Pant - $40",
    name: "Pant",
    price: 40
  },
  {
    heading: "Slipper - $20",
    name: "Slipper",
    price: 20
  }
]

</script>

<style scoped>

</style>
