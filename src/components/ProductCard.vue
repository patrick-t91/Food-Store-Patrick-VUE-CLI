<template>
  <div class="productContainer">
    <img :src="product.imgSrc" alt="" height="100" />
    <div class="productCardContainer">
      <div class="productMainInfoContainer">
        <p>{{ product.productName }}</p>
        <p>$ {{ product.price }}</p>
      </div>
      <div class="quantityContainer">
        <button @click="increaseQuantity">+</button>
        <p>Cantidad: {{ quantity }}</p>
        <button @click="decreaseQuantity">-</button>
      </div>
      <button id="addToCart" @click="addToCart({product, quantity})">
        Agregar al carrito
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "ProductCard",
  data() {
    return {
      quantity: 0,
    };
  },
  props: {
    product: {
      type: Object,
      required: true,
    }
  },
  methods: {
    ...mapActions("cart", ["addToCart"]),
    increaseQuantity() {
      this.quantity += 1;
    },
    decreaseQuantity() {
      if (this.quantity == 0) return;
      this.quantity -= 1;
    }
  }
};
</script>

<style scoped>
.productContainer {
  background-color: #656565;
  color: #ffffff;
  width: 180px;
  margin: 10px;
}
.productContainer img {
  width: 100%;
}
.productCardContainer {
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
.productCardContainer p {
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
