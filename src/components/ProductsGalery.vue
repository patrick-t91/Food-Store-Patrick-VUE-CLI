<template>
  <div class="tableContainer">
    <h3 class="tiendaTitle">{{ store.name }}</h3>
    <table class="table" :style="styles">
      <thead>
        <tr>
          <th v-for="(info, i) in productsinfo" :key="i" scope="col">
            {{ info }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(product, i) in store.products" :key="i">
          <th>
            {{ product.name }}
          </th>
          <th>
            {{ product.price }}
          </th>
          <th>
            <img :src="getImgUrl(product.imgSrc)" width="100" height="100" />
          </th>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "ProductsGalery",
  props: {
    productsinfo: {
      type: Array,
      required: true,
    },
    store: {
      type: Object,
      required: true,
    },
    styles: {
      type: String,
      required: true,
    },
  },
  methods: {
    getImgUrl(imgUrl) {
      return require(`@/assets/images/products/${imgUrl}`)
    }
  }
};
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
