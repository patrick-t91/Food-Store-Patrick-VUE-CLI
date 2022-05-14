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
  },
  data() {
    return {
      productsInfo: ["Producto", "Precio", "Imagen del producto"],
      Styles: {
        estilosHamburguesas: "color: white; background-color: red",
        estilosPizzas: "color: black; background-color: yellow",
        estilosEmpanadas: "color: white; background-color: blue",
      },
      hamburguesasPower: {
        id: 1,
        name: "Hamburguesas Power",
        products: [
          {
            id: 1,
            name: "CheeseBurger",
            price: 700,
            quantity: 0,
            discount: false,
            discountAmount: 0,
            imgSrc: "./assets/images/products/cheeseburger.jpg",
          },
          {
            id: 2,
            name: "DoubleCheeseBurger",
            price: 900,
            quantity: 0,
            discount: false,
            discountAmount: 0,
            imgSrc: "./assets/images/products/doblecheeseburger.jpg",
          },
          {
            id: 3,
            name: "Papas fritas",
            price: 450,
            quantity: 0,
            discount: false,
            discountAmount: 0,
            imgSrc: "./assets/images/products/papasfritascheeseburger.jpg",
          },
          {
            id: 4,
            name: "Mexican Burger",
            price: 800,
            quantity: 0,
            discount: false,
            discountAmount: 0,
            imgSrc: "./assets/images/products/mexicanburger.jpg",
          },
          {
            id: 5,
            name: "Bacon and Cheese Burger",
            price: 900,
            quantity: 0,
            discount: false,
            discountAmount: 0,
            imgSrc: "./assets/images/products/baconandcheeseburger.jpg",
          },
          {
            id: 6,
            name: "Doble Bacon and Cheese Burger",
            price: 1200,
            quantity: 0,
            discount: false,
            discountAmount: 0,
            imgSrc: "./assets/images/products/doblebaconandcheeseburger.jpg",
          },
          {
            id: 7,
            name: "Veggie Burger",
            price: 900,
            quantity: 0,
            discount: false,
            discountAmount: 0,
            imgSrc: "./assets/images/products/veggieburger.jpg",
          },
          {
            id: 8,
            name: "Sundae",
            price: 500,
            quantity: 0,
            discount: false,
            discountAmount: 0,
            imgSrc: "./assets/images/products/sundae.png",
          },
          {
            id: 9,
            name: "Coca-Cola",
            price: 150,
            quantity: 0,
            discount: false,
            discountAmount: 0,
            imgSrc: "./assets/images/products/cocacola.jpg",
          },
          {
            id: 10,
            name: "Sprite",
            price: 150,
            quantity: 0,
            discount: false,
            discountAmount: 0,
            imgSrc: "./assets/images/products/sprite.jpg",
          },
        ],
      },
      pizzeriaQueQueso: {
        id: 2,
        name: "Pizzeria QueQueso",
        products: [
          {
            id: 1,
            name: "Pizza muzzarella",
            price: 700,
            quantity: 0,
            discount: false,
            discountAmount: 0,
            imgSrc: "./assets/images/products/muzzarella.jpg",
          },
          {
            id: 2,
            name: "Pizza fugazzeta",
            price: 900,
            quantity: 0,
            discount: false,
            discountAmount: 0,
            imgSrc: "./assets/images/products/fugazzeta.jpg",
          },
          {
            id: 3,
            name: "Pizza napolitana",
            price: 700,
            quantity: 0,
            discount: false,
            discountAmount: 0,
            imgSrc: "./assets/images/products/pizzanapolitana.jpg",
          },
          {
            id: 4,
            name: "Pizza jamon y morrones",
            price: 800,
            quantity: 0,
            discount: false,
            discountAmount: 0,
            imgSrc: "./assets/images/products/pizzajamonymorrones.jpg",
          },
          {
            id: 5,
            name: "Pizza calabresa",
            price: 900,
            quantity: 0,
            discount: false,
            discountAmount: 0,
            imgSrc: "./assets/images/products/pizzacalabresa.jpg",
          },
          {
            id: 6,
            name: "Pizza de cancha",
            price: 600,
            quantity: 0,
            discount: false,
            discountAmount: 0,
            imgSrc: "./assets/images/products/pizzadecancha.jpg",
          },
          {
            id: 7,
            name: "Faina",
            price: 300,
            quantity: 0,
            discount: false,
            discountAmount: 0,
            imgSrc: "./assets/images/products/faina.jpg",
          },
          {
            id: 8,
            name: "Empanada",
            price: 280,
            quantity: 0,
            discount: false,
            discountAmount: 0,
            imgSrc: "./assets/images/products/empanada.png",
          },
          {
            id: 9,
            name: "Coca-Cola",
            price: 150,
            quantity: 0,
            discount: false,
            discountAmount: 0,
            imgSrc: "./assets/images/products/cocacola.jpg",
          },
          {
            id: 10,
            name: "Sprite",
            price: 150,
            quantity: 0,
            discount: false,
            discountAmount: 0,
            imgSrc: "./assets/images/products/sprite.jpg",
          },
        ],
      },
      empanadasRepulgarcito: {
        id: 3,
        name: "Empanadas Repulgarcito",
        products: [
          {
            id: 1,
            name: "Empanada carne",
            price: 200,
            quantity: 0,
            discount: false,
            discountAmount: 0,
            imgSrc: "./assets/images/products/cheeseburger.jpg",
          },
          {
            id: 2,
            name: "Empanada pollo",
            price: 200,
            quantity: 0,
            discount: false,
            discountAmount: 0,
            imgSrc: "./assets/images/products/doblecheeseburger.jpg",
          },
          {
            id: 3,
            name: "Empanada jamon y queso",
            price: 200,
            quantity: 0,
            discount: false,
            discountAmount: 0,
            imgSrc: "./assets/images/products/papasfritascheeseburger.jpg",
          },
          {
            id: 4,
            name: "Empanada panceta y cebolla",
            price: 200,
            quantity: 0,
            discount: false,
            discountAmount: 0,
            imgSrc: "./assets/images/products/mexicanburger.jpg",
          },
          {
            id: 5,
            name: "Empanada verdura",
            price: 200,
            quantity: 0,
            discount: false,
            discountAmount: 0,
            imgSrc: "./assets/images/products/baconandcheeseburger.jpg",
          },
          {
            id: 6,
            name: "Empanada capresse",
            price: 200,
            quantity: 0,
            discount: false,
            discountAmount: 0,
            imgSrc: "./assets/images/products/doblebaconandcheeseburger.jpg",
          },
          {
            id: 7,
            name: "Empanada atun",
            price: 200,
            quantity: 0,
            discount: false,
            discountAmount: 0,
            imgSrc: "./assets/images/products/veggieburger.jpg",
          },
          {
            id: 8,
            name: "Empanada queso y cebolla",
            price: 200,
            quantity: 0,
            discount: false,
            discountAmount: 0,
            imgSrc: "./assets/images/products/sundae.png",
          },
          {
            id: 9,
            name: "Coca-Cola",
            price: 150,
            quantity: 0,
            discount: false,
            discountAmount: 0,
            imgSrc: "./assets/images/products/cocacola.jpg",
          },
          {
            id: 10,
            name: "Sprite",
            price: 150,
            quantity: 0,
            discount: false,
            discountAmount: 0,
            imgSrc: "./assets/images/products/sprite.jpg",
          },
        ],
      },
    };
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
