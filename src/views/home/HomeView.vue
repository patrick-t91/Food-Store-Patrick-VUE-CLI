<template>
  <div id="homeContainer">
    <router-view />
    <HeaderComponent />
    <CarritoComponent
      :cart="cart"
      :totalCartPrice="totalCartPrice"
      @clear-cart="clearCart"
    />
    <div>
      <h3>GALERIA DE PRODUCTOS</h3>
      <div class="productsContainer">
        <div v-for="(product, i) in products" :key="i">
          <ProductInfo :product="product" @add-to-cart="addProductToCart" />
        </div>
      </div>
    </div>
    <FooterComponent />
  </div>
</template>

<script>
import apiServices from "../../services/api.services.js";
import HeaderComponent from "../../components/HeaderComponent.vue";
import ProductInfo from "../../components/ProductInfo.vue";
import CarritoComponent from "../../components/CarritoComponent.vue";
import FooterComponent from "../../components/FooterComponent.vue";

export default {
  name: "HomeComponent",
  components: {
    HeaderComponent,
    CarritoComponent,
    ProductInfo,
    FooterComponent,
  },
  data() {
    return {
      productsInfo: ["Producto", "Precio", "Imagen del producto"],
      products: [],
      cart: [],
      totalCartPrice: 0,
    };
  },
  created() {
    this.getProducts();
    if (this.cartFromStorage == null && this.totalCartPriceFromStorage == null)
      return;
    this.cart = this.cartFromStorage;
    this.totalCartPrice = this.totalCartPriceFromStorage;
  },
  methods: {
    async getProducts() {
      this.products = await apiServices.getProducts();
    },
    addProductToCart(product, quantity) {
      if (quantity == 0) return;
      let productIsInCart = this.cart.find((item) => item.id == product.id);
      if (productIsInCart) {
        product.quantity += quantity;
        this.totalCartPrice += product.price * quantity;
      } else {
        product.quantity = quantity;
        this.cart.push(product);
        this.totalCartPrice += product.price * product.quantity;
      }
      localStorage.setItem("Carrito Pendiente", JSON.stringify(this.cart));
      localStorage.setItem(
        "Precio Total Carrito",
        JSON.stringify(this.totalCartPrice)
      );
    },
    clearCart() {
      let cleanedCart = this.cart.slice(-1, 0);
      this.cart = cleanedCart;
      this.totalCartPrice = 0;
      localStorage.removeItem("Carrito Pendiente");
      localStorage.removeItem("Precio Total Carrito");
    },
  },
};
</script>

<style scoped>
#homeContainer {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
#homeContainer .productsContainer {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
#homeContainer h3 {
  text-align: center;
  background-color: #7e0a0a;
  color: #ffffff;
  padding: 20px;
  font-size: 25px;
}
</style>
