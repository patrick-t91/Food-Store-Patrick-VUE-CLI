<template>
  <div id="app">
    <HeaderComponent />
    <FormComponent />
  </div>
</template>

<script>
import HeaderComponent from "./components/HeaderComponent.vue";
import FormComponent from "./components/FormComponent.vue";


export default {
  name: "App",
  components: {
    HeaderComponent,
    FormComponent
  },
  data() {
    return {
    }
  },
  methods: {
  
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
#app .productsContainer {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
#app h3 {
  text-align: center;
  background-color: #7e0a0a;
  color: #ffffff;
  padding: 20px;
  font-size: 25px;
}
</style>
