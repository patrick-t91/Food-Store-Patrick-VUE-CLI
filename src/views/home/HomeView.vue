<template>
  <div id="homeContainer">
    <HeaderComponent />
    <CartComponent />
    <div>
      <h3>GALERIA DE PRODUCTOS</h3>
      <div id="categoryIndicator">
        Categoria: {{ getCategory ? getCategory : "Todos" }}
      </div>
      <div class="productsContainer">
        <div v-for="(product, i) in getProducts" :key="i">
          <ProductCard :product="product" />
        </div>
      </div>
    </div>
    <div id="banner">
      <img src="../../assets/images/foodBanner.jpg" alt="food banner" />
    </div>
    <FooterComponent />
  </div>
</template>

<script>
import HeaderComponent from "../../components/HeaderComponent.vue";
import ProductCard from "../../components/ProductCard.vue";
import CartComponent from "../../components/CartComponent.vue";
import FooterComponent from "../../components/FooterComponent.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "HomeView",
  components: {
    HeaderComponent,
    CartComponent,
    ProductCard,
    FooterComponent,
  },
  created() {
    this.setProducts();
  },
  methods: {
    ...mapActions("products", ["setProducts", "setCategory"]),
  },
  computed: {
    ...mapGetters("products", ["getProducts", "getCategory"]),
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
  padding: 12px;
  font-size: 25px;
  max-width: 400px;
  margin: auto;
  box-shadow: 6px 6px 2px 2px rgb(172, 168, 168);
}
#homeContainer #categoryIndicator {
  margin-top: 40px;
  margin-left: 32px;
  font-weight: bold;
}
#app #homeContainer #banner {
  margin-top: 40px;
}
#app #homeContainer #banner img {
  width: 100%;
  height: 600px
}

</style>
