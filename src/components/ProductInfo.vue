<template>
  <div class="productContainer">
    <img :src="getImgUrl(product.imgSrc)" alt="" height="100" />
    <div class="productInfoContainer">
      <div class="productMainInfoContainer">
        <p>{{ product.name }}</p>
        <p>$ {{ product.price }}</p>
      </div>
      <div class="addProductContainer">
        <button @click="addProduct">+</button>
        <p>Cantidad en el carrito:</p>
        <button @click="removeProduct">-</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductInfo",
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  methods: {
    getImgUrl(imgUrl) {
      return require(`@/assets/images/products/${imgUrl}`);
    },
    addProduct() {
        this.$emit("add-to-cart", this.product)
    },
    removeProduct() {

    }
  },
};
</script>

<style>
.productContainer {
  background-color: #7e0a0a;
  color: #ffffff;
  width: 180px;
  margin: 10px;
}
.productContainer img {
  width: 100%;
}
.productInfoContainer {
  display: flex;
  justify-content: center;
  flex-direction: column;
}
.productMainInfoContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.productInfoContainer p {
  font-size: 12px;
  margin: 5px;
}
.addProductContainer {
    display: flex;
    justify-content: center;
    padding: 8px 0;
}
</style>
