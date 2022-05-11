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
            <img :src="product.imgSrc" width="100" height="100" />
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
            imgSrc: "../assets/images/Products/cheeseburger.jpg",
          },
          {
            id: 2,
            name: "DoubleCheeseBurger",
            price: 900,
            quantity: 0,
            discount: false,
            discountAmount: 0,
            imgSrc: "../assets/images/Products/doblecheeseburger.jpg",
          },
          {
            id: 3,
            name: "Papas fritas",
            price: 450,
            quantity: 0,
            discount: false,
            discountAmount: 0,
            imgSrc: "../assets/images/Products/papasfritascheeseburger.jpg",
          },
          {
            id: 4,
            name: "Mexican Burger",
            price: 800,
            quantity: 0,
            discount: false,
            discountAmount: 0,
            imgSrc: "../assets/images/Products/mexicanburger.jpg",
          },
          {
            id: 5,
            name: "Bacon and Cheese Burger",
            price: 900,
            quantity: 0,
            discount: false,
            discountAmount: 0,
            imgSrc: "../assets/images/Products/baconandcheeseburger.jpg",
          },
          {
            id: 6,
            name: "Doble Bacon and Cheese Burger",
            price: 1200,
            quantity: 0,
            discount: false,
            discountAmount: 0,
            imgSrc: "../assets/images/Products/doblebaconandcheeseburger.jpg",
          },
          {
            id: 7,
            name: "Veggie Burger",
            price: 900,
            quantity: 0,
            discount: false,
            discountAmount: 0,
            imgSrc: "../assets/images/Products/veggieburger.jpg",
          },
          {
            id: 8,
            name: "Sundae",
            price: 500,
            quantity: 0,
            discount: false,
            discountAmount: 0,
            imgSrc: "../assets/images/Products/sundae.png",
          },
          {
            id: 9,
            name: "Coca-Cola",
            price: 150,
            quantity: 0,
            discount: false,
            discountAmount: 0,
            imgSrc: "../assets/images/Products/cocacola.jpg",
          },
          {
            id: 10,
            name: "Sprite",
            price: 150,
            quantity: 0,
            discount: false,
            discountAmount: 0,
            imgSrc: "../assets/images/Products/sprite.jpg",
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
            imgSrc: "../assets/images/Products/muzzarella.jpg",
          },
          {
            id: 2,
            name: "Pizza fugazzeta",
            price: 900,
            quantity: 0,
            discount: false,
            discountAmount: 0,
            imgSrc: "../assets/images/Products/fugazzeta.jpg",
          },
          {
            id: 3,
            name: "Pizza napolitana",
            price: 700,
            quantity: 0,
            discount: false,
            discountAmount: 0,
            imgSrc: "../assets/images/Products/pizzanapolitana.jpg",
          },
          {
            id: 4,
            name: "Pizza jamon y morrones",
            price: 800,
            quantity: 0,
            discount: false,
            discountAmount: 0,
            imgSrc: "../assets/images/Products/pizzajamonymorrones.jpg",
          },
          {
            id: 5,
            name: "Pizza calabresa",
            price: 900,
            quantity: 0,
            discount: false,
            discountAmount: 0,
            imgSrc: "../assets/images/Products/pizzacalabresa.jpg",
          },
          {
            id: 6,
            name: "Pizza de cancha",
            price: 600,
            quantity: 0,
            discount: false,
            discountAmount: 0,
            imgSrc: "../assets/images/Products/pizzadecancha.jpg",
          },
          {
            id: 7,
            name: "Faina",
            price: 300,
            quantity: 0,
            discount: false,
            discountAmount: 0,
            imgSrc: "../assets/images/Products/faina.jpg",
          },
          {
            id: 8,
            name: "Empanada",
            price: 280,
            quantity: 0,
            discount: false,
            discountAmount: 0,
            imgSrc: "../assets/images/Products/empanada.png",
          },
          {
            id: 9,
            name: "Coca-Cola",
            price: 150,
            quantity: 0,
            discount: false,
            discountAmount: 0,
            imgSrc: "../assets/images/Products/cocacola.jpg",
          },
          {
            id: 10,
            name: "Sprite",
            price: 150,
            quantity: 0,
            discount: false,
            discountAmount: 0,
            imgSrc: "../assets/images/Products/sprite.jpg",
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
            imgSrc: "../assets/images/Products/cheeseburger.jpg",
          },
          {
            id: 2,
            name: "Empanada pollo",
            price: 200,
            quantity: 0,
            discount: false,
            discountAmount: 0,
            imgSrc: "../assets/images/Products/doblecheeseburger.jpg",
          },
          {
            id: 3,
            name: "Empanada jamon y queso",
            price: 200,
            quantity: 0,
            discount: false,
            discountAmount: 0,
            imgSrc: "../assets/images/Products/papasfritascheeseburger.jpg",
          },
          {
            id: 4,
            name: "Empanada panceta y cebolla",
            price: 200,
            quantity: 0,
            discount: false,
            discountAmount: 0,
            imgSrc: "../assets/images/Products/mexicanburger.jpg",
          },
          {
            id: 5,
            name: "Empanada verdura",
            price: 200,
            quantity: 0,
            discount: false,
            discountAmount: 0,
            imgSrc: "../assets/images/Products/baconandcheeseburger.jpg",
          },
          {
            id: 6,
            name: "Empanada capresse",
            price: 200,
            quantity: 0,
            discount: false,
            discountAmount: 0,
            imgSrc: "../assets/images/Products/doblebaconandcheeseburger.jpg",
          },
          {
            id: 7,
            name: "Empanada atun",
            price: 200,
            quantity: 0,
            discount: false,
            discountAmount: 0,
            imgSrc: "../assets/images/Products/veggieburger.jpg",
          },
          {
            id: 8,
            name: "Empanada queso y cebolla",
            price: 200,
            quantity: 0,
            discount: false,
            discountAmount: 0,
            imgSrc: "../assets/images/Products/sundae.png",
          },
          {
            id: 9,
            name: "Coca-Cola",
            price: 150,
            quantity: 0,
            discount: false,
            discountAmount: 0,
            imgSrc: "../assets/images/Products/cocacola.jpg",
          },
          {
            id: 10,
            name: "Sprite",
            price: 150,
            quantity: 0,
            discount: false,
            discountAmount: 0,
            imgSrc: "../assets/images/Products/sprite.jpg",
          },
        ],
      },
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
