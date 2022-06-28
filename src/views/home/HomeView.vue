<template>
  <div id="homeContainer">
    <HeaderComponent />
    <CarritoComponent />
    <div>
      <h3>GALERIA DE PRODUCTOS</h3>
      <div class="productsContainer">
        <div v-for="(product, i) in getProducts" :key="i">
          <ProductCard :product="product" />
        </div>
      </div>
    </div>
    <FooterComponent />
  </div>
</template>

<script>
import HeaderComponent from "../../components/HeaderComponent.vue";
import ProductCard from "../../components/ProductCard.vue";
import CarritoComponent from "../../components/CarritoComponent.vue";
import FooterComponent from "../../components/FooterComponent.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "HomeView",
  components: {
    HeaderComponent,
    CarritoComponent,
    ProductCard,
    FooterComponent,
  },
  created() {
    this.setProducts();
  },
  methods: {
    ...mapActions("products", ["setProducts"]),
  },
  computed: {
    ...mapGetters("products", ["getProducts"]),
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
