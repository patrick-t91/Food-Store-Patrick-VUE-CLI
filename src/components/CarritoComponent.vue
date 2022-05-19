<template>
  <div id="chartContainer" @click="showCartDropdown">
    <div id="chartImgContainer" v-if="productsInCart.length > 0">
      <img src="../assets/images/cart.jpg" alt="" />
      <p>{{ productsInCart.length }}</p>
    </div>
    <div v-if="cartDropdown">
      <div v-for="(product, i) in productsInCart" :key="i">
        <div class="productInfoContainer">
          <div class="productMainInfoContainer">
            <p>{{ product.name }}</p>
            <p>$ {{ product.price }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cartDropdown: false,
    };
  },
  props: {
    productsInCart: {
      type: Array,
      required: true,
    },
  },
  methods: {
    showCartDropdown() {
      this.cartDropdown = true;
    },
  },
};
</script>

<style>
#chartContainer #chartImgContainer {
  position: fixed;
  top: 0;
  right: 0;
  display: flex;
}
#chartContainer #chartImgContainer img {
  width: 60px;
  height: 60px;
  position: absolute;
  top: 0;
  right: 0;
}
#chartContainer #chartImgContainer p {
  color: #ffffff;
  background-color: #7e0a0a;
  width: 20px;
  z-index: 10;
}
</style>
