<template>
  <div id="app">
    <router-view />
    <HeaderComponent />
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
import HeaderComponent from "./components/HeaderComponent.vue";
import ProductInfo from "./components/ProductInfo.vue";
import CarritoComponent from "./components/CarritoComponent.vue";
import FooterComponent from "./components/FooterComponent.vue";

export default {
  name: "App",
  components: {
    HeaderComponent,
    CarritoComponent,
    ProductInfo,
    FooterComponent,
  },
  data() {
    return {
      productsInfo: ["Producto", "Precio", "Imagen del producto"],
      products: [
        {
          id: 1,
          name: "CheeseBurger",
          price: 700,
          quantity: 0,
          discount: false,
          discountAmount: 0,
          imgSrc: "cheeseburger.jpg",
        },
        {
          id: 2,
          name: "DoubleCheeseBurger",
          price: 900,
          quantity: 0,
          discount: false,
          discountAmount: 0,
          imgSrc: "doblecheeseburger.jpg",
        },
        {
          id: 3,
          name: "Papas fritas",
          price: 450,
          quantity: 0,
          discount: false,
          discountAmount: 0,
          imgSrc: "papasfritas.jpg",
        },
        {
          id: 4,
          name: "Mexican Burger",
          price: 800,
          quantity: 0,
          discount: false,
          discountAmount: 0,
          imgSrc: "mexicanburger.jpg",
        },
        {
          id: 5,
          name: "Bacon and Cheese Burger",
          price: 900,
          quantity: 0,
          discount: false,
          discountAmount: 0,
          imgSrc: "baconandcheeseburger.jpg",
        },
        {
          id: 6,
          name: "Doble Bacon and Cheese Burger",
          price: 1200,
          quantity: 0,
          discount: false,
          discountAmount: 0,
          imgSrc: "doblebaconandcheeseburger.jpg",
        },
        {
          id: 7,
          name: "Veggie Burger",
          price: 900,
          quantity: 0,
          discount: false,
          discountAmount: 0,
          imgSrc: "veggieburger.jpg",
        },
        {
          id: 8,
          name: "Sundae",
          price: 500,
          quantity: 0,
          discount: false,
          discountAmount: 0,
          imgSrc: "sundae.png",
        },
        {
          id: 9,
          name: "Coca-Cola",
          price: 150,
          quantity: 0,
          discount: false,
          discountAmount: 0,
          imgSrc: "cocacola.jpg",
        },
        {
          id: 10,
          name: "Sprite",
          price: 150,
          quantity: 0,
          discount: false,
          discountAmount: 0,
          imgSrc: "sprite.jpg",
        },
      ],
      productsInCart: [],
      totalCartPrice: 0,
    };
  },
  methods: {
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
      console.log(product.quantityInCart)
    },
    clearCart() {
      let cleanedCart = this.productsInCart.slice(
        -1, 0
      );
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
/* /* Styles: { estilosHamburguesas: "color: white; background-color: red",
estilosPizzas: "color: black; background-color: yellow", estilosEmpanadas:
"color: white; background-color: blue", }, typeOfProducts: [ "Hamburguesas",
"Pizzas", "Empanadas", "Argentina", "Pastas", "Sushi", "Comida arabe", "Comida
india", "Comida china", "Milanesas", "Caseras", "Pescados", "Picadas",
"Desayunos y meriendas", "Panaderias", "Helados", "Chocolates", ], stores: [ {
id: 1, name: "Hamburguesas Power", shown: false, products: [ { id: 1, name:
"CheeseBurger", price: 700, discount: false, discountAmount: 0, imgSrc:
"cheeseburger.jpg", }, { id: 2, name: "DoubleCheeseBurger", price: 900,
discount: false, discountAmount: 0, imgSrc: "doblecheeseburger.jpg", }, { id: 3,
name: "Papas fritas", price: 450, discount: false, discountAmount: 0, imgSrc:
"papasfritas.jpg", }, { id: 4, name: "Mexican Burger", price: 800, discount:
false, discountAmount: 0, imgSrc: "mexicanburger.jpg", }, { id: 5, name: "Bacon
and Cheese Burger", price: 900, discount: false, discountAmount: 0, imgSrc:
"baconandcheeseburger.jpg", }, { id: 6, name: "Doble Bacon and Cheese Burger",
price: 1200, discount: false, discountAmount: 0, imgSrc:
"doblebaconandcheeseburger.jpg", }, { id: 7, name: "Veggie Burger", price: 900,
discount: false, discountAmount: 0, imgSrc: "veggieburger.jpg", }, { id: 8,
name: "Sundae", price: 500, discount: false, discountAmount: 0, imgSrc:
"sundae.png", }, { id: 9, name: "Coca-Cola", price: 150, discount: false,
discountAmount: 0, imgSrc: "cocacola.jpg", }, { id: 10, name: "Sprite", price:
150, discount: false, discountAmount: 0, imgSrc: "sprite.jpg", }, ], }, { id: 2,
name: "Pizzeria QueQueso", shown: false, products: [ { id: 1, name: "Pizza
muzzarella", price: 700, discount: false, discountAmount: 0, imgSrc:
"muzzarella.jpg", }, { id: 2, name: "Pizza fugazzeta", price: 900, discount:
false, discountAmount: 0, imgSrc: "fugazzeta.jpg", }, { id: 3, name: "Pizza
napolitana", price: 700, discount: false, discountAmount: 0, imgSrc:
"pizzanapolitana.jpg", }, { id: 4, name: "Pizza jamon y morrones", price: 800,
discount: false, discountAmount: 0, imgSrc: "pizzajamonymorrones.jpg", }, { id:
5, name: "Pizza calabresa", price: 900, discount: false, discountAmount: 0,
imgSrc: "pizzacalabresa.jpg", }, { id: 6, name: "Pizza de cancha", price: 600,
discount: false, discountAmount: 0, imgSrc: "pizzadecancha.jpg", }, { id: 7,
name: "Faina", price: 300, discount: false, discountAmount: 0, imgSrc:
"faina.jpg", }, { id: 8, name: "Empanada", price: 280, discount: false,
discountAmount: 0, imgSrc: "empanada.jpg", }, { id: 9, name: "Coca-Cola", price:
150, discount: false, discountAmount: 0, imgSrc: "cocacola.jpg", }, { id: 10,
name: "Sprite", price: 150, discount: false, discountAmount: 0, imgSrc:
"sprite.jpg", }, ], }, { id: 3, name: "Empanadas Repulgarcito", shown: false,
products: [ { id: 1, name: "Empanada carne", price: 200, discount: false,
discountAmount: 0, imgSrc: "empanada.jpg", }, { id: 2, name: "Empanada pollo",
price: 200, discount: false, discountAmount: 0, imgSrc: "empanada.jpg", }, { id:
3, name: "Empanada jamon y queso", price: 200, discount: false, discountAmount:
0, imgSrc: "empanada.jpg", }, { id: 4, name: "Empanada panceta y cebolla",
price: 200, discount: false, discountAmount: 0, imgSrc: "empanada.jpg", }, { id:
5, name: "Empanada verdura", price: 200, discount: false, discountAmount: 0,
imgSrc: "empanada.jpg", }, { id: 6, name: "Empanada capresse", price: 200,
discount: false, discountAmount: 0, imgSrc: "empanada.jpg", }, { id: 7, name:
"Empanada atun", price: 200, discount: false, discountAmount: 0, imgSrc:
"empanada.jpg", }, { id: 8, name: "Empanada queso y cebolla", price: 200,
discount: false, discountAmount: 0, imgSrc: "empanada.jpg", }, { id: 9, name:
"Coca-Cola", price: 150, discount: false, discountAmount: 0, imgSrc:
"cocacola.jpg", }, { id: 10, name: "Sprite", price: 150, discount: false,
discountAmount: 0, imgSrc: "sprite.jpg", }, ], }, ], */ /* chooseStore(stores) {
let chosenStore = this.stores.find(store => store.id == stores.store.id )
chosenStore.shown = true; console.log("La store es:", chosenStore)
console.log(this.stores[0].id) }, */ */
