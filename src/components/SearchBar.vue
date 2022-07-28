<template>
  <input
    type="text"
    placeholder="Busca tus productos!"
    v-model="filteredResult"
    @keyup="filterResult(filteredResult)"
  />
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      filteredResult: "",
      none: "",
    };
  },
  methods: {
    ...mapActions("products", [
      "setFilteredResult",
      "setProducts",
      "setCategory",
    ]),
    filterResult(filteredResult) {
      this.setCategory(this.none);
      this.setFilteredResult(filteredResult);
      this.setProducts();
    },
  },
  computed: {
    ...mapGetters("products", ["getProducts"]),
  },
};
</script>

<style scoped>
input {
  border: 1px solid #fff;
  height: 30px;
  text-align: center;
  border-radius: 20px;
  margin: 0 25px;
}
input:focus {
  color: #7e0a0a;
  font-weight: bold;
  border: 1px solid #7e0a0a;
}
@media screen and (max-width: 360px) {
  input {
    height: 16px;
    width: 130px
  }
}
</style>
