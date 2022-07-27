<template>
  <div class="productContainer">
    <div v-if="product.hasDiscount" class="productDiscount">
      - {{ product.discountPercentage }}%
    </div>
    <img :src="product.imgSrc" alt="" height="120" />
    <div class="productCardContainer">
      <div class="productMainInfoContainer">
        <p class="productName">{{ product.productName }}</p>
        <p v-if="!product.hasDiscount" class="productPrice">
          $ {{ product.price }}
        </p>
        <div v-if="product.hasDiscount" class="priceOfProductWithDiscount">
          <p class="priceOfProductWithDiscount--oldPrice">
            $ {{ product.price }}
          </p>
          <p class="priceOfProductWithDiscount--newPrice">
            $ {{ (product.price * (100 - product.discountPercentage)) / 100 }}
          </p>
        </div>
      </div>
      <div class="addToCartContainer">
        <div class="quantityContainer">
          <button @click="increaseQuantity">+</button>
          <p>Cantidad: {{ quantity }}</p>
          <button @click="decreaseQuantity">-</button>
        </div>
        <button id="addToCart" @click="addToCart({ product, quantity })">
          Agregar al carrito
        </button>
      </div>
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
    },
  },
  methods: {
    ...mapActions("cart", ["addToCart"]),
    increaseQuantity() {
      this.quantity += 1;
    },
    decreaseQuantity() {
      if (this.quantity == 0) return;
      this.quantity -= 1;
    },
  },
};
</script>

<style scoped>
.productContainer {
  background-color: #656565;
  color: #ffffff;
  width: 180px;
  margin: 10px;
  border: 1px solid #7e0a0a;
}
.productContainer img {
  width: 100%;
  margin-bottom: 20px;
}
.productContainer .productDiscount {
  color: #7e0a0a;
  background: #ffffff;
  position: absolute;
  padding: 10px;
  font-weight: bolder;
  border-left: 1px solid #000000;
  border-top: 1px solid #000000;
}
.productCardContainer {
  display: flex;
  justify-content: center;
  flex-direction: column;
  height: 180px;
}
.productMainInfoContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 130px;
}
.productCardContainer p {
  margin: 5px;
  text-align: center;
}
.productCardContainer .productMainInfoContainer p {
  font-size: 14px;
  font-weight: bold;
}
.productCardContainer .productMainInfoContainer .productName {
  height: 45px;
}
.productCardContainer .productMainInfoContainer .productPrice {
  height: 40px;
}
.productCardContainer .productMainInfoContainer .priceOfProductWithDiscount {
  height: 60px;
}
.addToCartContainer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.quantityContainer {
  display: flex;
  justify-content: center;
  font-size: 14px;
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
.productCardContainer .priceOfProductWithDiscount--oldPrice {
  text-decoration: line-through;
  opacity: 0.6;
  font-size: 14px;
}
@media screen and (max-width: 767px) {
  .productContainer img {
    height: 100px;
    margin-bottom: 0;
  }
  .productCardContainer .productMainInfoContainer .productName {
    height: 35px;
    margin-top: 15px;
  }
}
</style>
