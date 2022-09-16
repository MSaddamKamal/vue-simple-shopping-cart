<template>
  <div>
    <Checkout/>
  </div>
</template>

<script>


import Checkout from "@/Checkout";
export default {
  components: {Checkout}
}
</script>

<style lang="scss">
@import '../node_modules/h8k-design/dist/index.css';
.flex-70 {
  flex: 0 0 70%;
  width: 70%;

}

.flex-30 {
  flex: 0 0 30%;
  width: 30%;
}
</style>
