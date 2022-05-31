<template>
  <div id="homeContainer">
    <router-view />
    <CarritoComponent
      :productsInCart="productsInCart"
      :totalCartPrice="totalCartPrice"
      @remove-product-from-cart="RemoveProductFromCart"
      @clear-cart="clearCart"
    />
    <div>
      <h3>GALERIA DE PRODUCTOS</h3>
      <div class="productsContainer">
        <div v-for="(product, i) in products" :key="i">
          <ProductInfo
            :product="product"
            @add-product="AddProduct"
            @remove-product="RemoveProduct"
            @add-to-cart="AddToCart"
            :quantityInCart="product.quantity"
          />
        </div>
      </div>
    </div>
    <FooterComponent />
  </div>
</template>

<script>
import apiServices from "../../services/api.services.js";
import ProductInfo from "../../components/ProductInfo.vue";
import CarritoComponent from "../../components/CarritoComponent.vue";
import FooterComponent from "../../components/FooterComponent.vue";

export default {
  name: "HomeComponent",
  components: {
    CarritoComponent,
    ProductInfo,
    FooterComponent,
  },
  created() {
    this.getProducts();
  },
  data() {
    return {
      productsInfo: ["Producto", "Precio", "Imagen del producto"],
      products: [],
      productsInCart: [],
      totalCartPrice: 0,
    };
  },
  methods: {
    async getProducts() {
      this.products = await apiServices.getProducts();
    },
    AddProduct(product) {
      product.quantity += 1;
    },
    RemoveProduct(product) {
      if (product.quantity == 0) return;
      product.quantity -= 1;
    },
    AddToCart(product) {
      let productIsInCart = this.productsInCart.find(
        (producto) => producto.id == product.id
      );
      if (productIsInCart) {
        product.quantityInCart += product.quantity;
        this.totalCartPrice += product.price * product.quantity;
        return;
      }
      if (product.quantity) {
        this.productsInCart.push(product);
      }
      product.quantityInCart = product.quantity;
      this.totalCartPrice += product.price * product.quantity;
    },
    RemoveProductFromCart(product) {
      product.quantityInCart -= 1;
    },
    clearCart() {
      let cleanedCart = this.productsInCart.slice(-1, 0);
      this.productsInCart = cleanedCart;
      this.totalCartPrice = 0;
      for (let product of this.productsInCart) {
        product.quantity = 0;
      }
    },
  },
};
</script>

<style>
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
