<template>
  <div v-if="productsInCart.length > 0" id="CartContainer">
    <div @click="toggleCartDropdown" id="CartImgContainer">
      <img src="../assets/images/cart.jpg" alt="" />
      <p>{{ productsInCart.length }}</p>
    </div>
    <div v-if="cartDropdown" id="SubCartContainer">
      <div v-for="(product, i) in productsInCart" :key="i">
        <div class="productInfoContainer">
          <img
            :src="getImgUrl(product.imgSrc)"
            alt=""
            width="100"
            height="100"
          />
          <div class="productMainInfoContainer">
            <p>{{ product.name }}</p>
            <p>{{ product.quantityInCart }} unidades</p>
          </div>
          <button @click="RemoveProductFromCart(product)">-</button>
          <div class="totalProductPrice">
            $ {{ product.price * product.quantityInCart }}
          </div>
        </div>
      </div>
      <div id="totalCartInfo">
        <div>
          <p>Cantidad de productos: {{ productsInCart.length }}</p>
          <p>Total de tu compra: ${{ totalCartPrice }}</p>
        </div>
        <div>
          <img
            src="../assets/images/removeProductFromCart.png"
            alt="removeProductFromCart"
            height="30"
            width="30"
            @click="clearCart"
          />
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
    totalCartPrice: {
      type: Number,
      required: true,
    },
  },
  methods: {
    toggleCartDropdown() {
      this.cartDropdown = !this.cartDropdown;
    },
    getImgUrl(imgUrl) {
      return require(`@/assets/images/products/${imgUrl}`);
    },
    clearCart() {
      this.$emit("clear-cart", this.productsInCart);
    },
  },
};
</script>

<style scoped>
#CartContainer #CartImgContainer {
  position: fixed;
  top: 0;
  right: 0;
  display: flex;
  cursor: pointer;
}
#CartContainer #CartImgContainer img {
  width: 60px;
  height: 60px;
  position: absolute;
  top: 0;
  right: 0;
}
#CartContainer #CartImgContainer p {
  color: #ffffff;
  background-color: #7e0a0a;
  width: 20px;
  z-index: 1;
  position: fixed;
  top: 44px;
  right: 0;
  border: 1px solid #ffffff;
  text-align: center;
}
#CartContainer #SubCartContainer {
  z-index: 2;
  color: #7e0a0a;
  font-size: 16px;
  font-weight: 700;
  position: fixed;
  top: 50px;
  right: 0;
  background: white;
  width: 60%;
  padding: 20px;
  margin: auto;
  border: 3px solid #7e0a0a;
  border-radius: 30px;
}
.productInfoContainer {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 5%;
  margin-bottom: 10px;
}
.productInfoContainer button {
  cursor: pointer;
  color: #ffffff;
  background-color: #7e0a0a;
  border: 1px solid #ffffff;
  border-radius: 20px;
  width: 30px;
  height: 30px;
  font-size: 20px;
}
.productMainInfoContainer {
  width: 35%;
}
#totalCartInfo {
  margin-top: 20px;
  margin-bottom: 0;
  border-top: 1px solid #7e0a0a;
  text-align: center;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
#totalCartInfo img {
  cursor: pointer;
}
</style>
