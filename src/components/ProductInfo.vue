<template>
  <div class="productContainer">
    <img :src="getImgUrl(product.imgSrc)" alt="" height="100" />
    <div class="productInfoContainer">
      <div class="productMainInfoContainer">
        <p>{{ product.name }}</p>
        <p>$ {{ product.price }}</p>
      </div>
      <div class="quantityContainer">
        <button @click="addProduct">+</button>
        <p>Cantidad: {{ product.quantity }}</p>
        <button @click="removeProduct">-</button>
      </div>
      <button id="addToCart" @click="addToCart">Agregar al carrito</button>
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
      this.$emit("add-product", this.product);
    },
    removeProduct() {
      this.$emit("remove-product", this.product);
    },
    addToCart() {
      this.$emit("add-to-cart", this.product);
    },
    removeProductFromCart() {
      this.$emit("remove-product-from-cart", this.product)
    }
  },
};
</script>

<style scoped>
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
  min-height: 160px;
}
.productMainInfoContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 70px;
}
.productInfoContainer p {
  margin: 5px;
  font-size: 14px;
  text-align: center;
}
.quantityContainer {
  display: flex;
  justify-content: center;
  padding: 8px 0;
}
.quantityContainer button {
  cursor: pointer;
  color: #ffffff;
  background-color: #7e0a0a;
  border: 1px solid #ffffff;
  border-radius: 20px;
  padding: 2px;
  width: 30px;
}
#addToCart {
  cursor: pointer;
  color: #ffffff;
  background-color: #7e0a0a;
  border: 1px solid #ffffff;
  border-radius: 10px;
  width: 60%;
  margin: 5px auto 10px;
}
#addToCart:hover {
  background-color: #ffffff;
  color: #7e0a0a;
}
</style>
