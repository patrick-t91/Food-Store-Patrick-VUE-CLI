<template>
  <div id="homeContainer">
    <HeaderComponent
      :userLoggedHeader="userLoggedHome"
      @validate-username="validateUsername"
      @validate-password="validatePassword"
      @login-user="loginUser"
      @register-user="registerUser"
      @close-user-session="closeUserSession"
    />
    <CarritoComponent
      :cart="cart"
      :totalCartPrice="totalCartPrice"
      @clear-cart="clearCart"
      @toggle-product-in-cart="toggleProductInCart"
    />
    <div>
      <h3>GALERIA DE PRODUCTOS</h3>
      <div class="productsContainer">
        <div v-for="(product, i) in products" :key="i">
          <ProductInfo :product="product"  @add-to-cart="addProductToCart" />
        </div>
      </div>
    </div>
    <FooterComponent />
  </div>
</template>

<script>
import HeaderComponent from "../../components/HeaderComponent.vue";
import ProductInfo from "../../components/ProductInfo.vue";
import CarritoComponent from "../../components/CarritoComponent.vue";
import FooterComponent from "../../components/FooterComponent.vue";

export default {
  name: "HomeView",
  components: {
    HeaderComponent,
    CarritoComponent,
    ProductInfo,
    FooterComponent,
  },
  data() {
    return {
      productsInfo: ["Producto", "Precio", "Imagen del producto"],
      cart: [],
      totalCartPrice: 0,
    };
  },
  props: {
    userLoggedHome: { type: Object },
    products: { type: Array, required: true },
  },
  created() {
    if (this.cartFromStorage) this.cart = this.cartFromStorage;
    if (this.totalCartPriceFromStorage) this.totalCartPrice = this.totalCartPriceFromStorage;
  },
  methods: {
    validateUsername(loginData) {
      this.$emit("validate-username", loginData);
    },
    validatePassword(loginData) {
      this.$emit("validate-password", loginData)
    },
    loginUser(loginData) {
      this.$emit("login-user", loginData);
    },
    registerUser(loginData) {
      this.$emit("register-user", loginData);
    },
    closeUserSession(loginData) {
      this.$emit("close-user-session", loginData);
    },
    addProductToCart(product, quantity) {
      if (quantity == 0) return;
      if (this.userLoggedHome && this.userLoggedHome.isAdmin) {
        alert("No puedes agregar productos en el modo administrador");
        return;
      }
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
    toggleProductInCart(product, action) {
      let productIsInCart = this.cart.find((item) => item.id == product.id);
      if (productIsInCart && action == "remove" && product.quantity > 0) {
        product.quantity -= 1;
        this.totalCartPrice -= product.price;
        if (product.quantity == 0) {
          let filteredArray = this.cart.filter(item => item.id != product.id);
          this.cart = filteredArray;
        }
        localStorage.setItem("Carrito Pendiente", JSON.stringify(this.cart));
        localStorage.setItem(
          "Precio Total Carrito",
          JSON.stringify(this.totalCartPrice)
        );
      } else if (productIsInCart && action == "add") {
        product.quantity += 1;
        this.totalCartPrice += product.price;
        localStorage.setItem("Carrito Pendiente", JSON.stringify(this.cart));
        localStorage.setItem(
          "Precio Total Carrito",
          JSON.stringify(this.totalCartPrice)
        );
      } else {
        return;
      }
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
