<template>
  <div id="app">
    <HeaderComponent />
    <ProductsGalery :productsinfo="productsInfo" :store="hamburguesasPower" :styles="Styles.estilosHamburguesas"/>
    <ProductsGalery :productsinfo="productsInfo" :store="pizzeriaQueQueso" :styles="Styles.estilosPizzas"/>
    <ProductsGalery :productsinfo="productsInfo" :store="empanadasRepulgarcito" :styles="Styles.estilosEmpanadas"/>
    <FooterComponent />
  </div>
</template>

<script>
import HeaderComponent from './components/HeaderComponent.vue';
import ProductsGalery from './components/ProductsGalery.vue';
import FooterComponent from './components/FooterComponent.vue';

export default {
  name: 'App',
  components: {
    HeaderComponent, ProductsGalery, FooterComponent
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
