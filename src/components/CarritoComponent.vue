<template>
  <div id="CartContainer">
    <div
      v-if="getCart.products.length > 0"
      @click="toggleCartDropdown"
      id="CartImgContainer"
    >
      <img src="../assets/images/cart.jpg" alt="" />
      <p>{{ getCart.products.length }}</p>
    </div>
    <div v-if="cartDropdown" id="SubCartContainer">
      <div v-for="(product, i) in getCart.products" :key="i">
        <div class="productCardContainer">
          <img :src="product.imgSrc" alt="" width="100" height="100" />
          <div class="productMainInfoContainer">
            <p>{{ product.productName }}</p>
            <p>{{ product.quantity }} unidades</p>
          </div>
          <button @click="toggleProductInCart(product, cartActions.remove)">
            -
          </button>
          <button @click="toggleProductInCart(product, cartActions.add)">
            +
          </button>
          <div class="totalProductPrice">
            $ {{ product.price * product.quantity }}
          </div>
        </div>
      </div>
      <div v-if="!buyAlert" id="totalCartInfo">
        <div>
          <p>Cantidad de productos: {{ getCart.products.length }}</p>
          <p>Total de tu compra: $ {{ getCart.totalCartPrice }}</p>
        </div>
        <div>
          <img
            src="../assets/images/removeIcon.png"
            alt="ClearCart"
            height="30"
            width="30"
            @click="clearCart"
          />
        </div>
      </div>
      <div v-if="!buyAlert" id="confirmBuyContainer">
        <button @click="confirmBuy">Confirmar compra</button>
      </div>
      <div v-if="buyAlert" id="buyFinished">
        <h4>Gracias por tu compra!</h4>
        <button @click="toggleBuyAlert(false), toggleCartDropdown()">
          Volver a comprar
        </button>
      </div>
      <div v-if="userNotLogged" id="userNotLoggedContainer">
        <button @click="toggleCartDropdown">
          Debés estar loggeado para confirmar tu compra. Loggeate o registrate,
          y volvé que tu carrito estará esperando!
        </button>
      </div>
      <div v-if="getCart.products.length == 0 && !buyAlert" id="emptyCart">
        <button>
          El carrito está vacío, agrega productos para realizar tu compra!
        </button>
      </div>
      <div id="closeCartDropdownContainer">
        <img
          src="../assets/images/closeButton.png"
          alt="Cart dropdown close button"
          @click="toggleCartDropdown"
          width="40"
          height="40"
        />
      </div>
    </div>
  </div>
</template>

<script>
import apiServices from "../services/api.services.js";
import {mapGetters} from "vuex";

export default {
  data() {
    return {
      cartDropdown: false,
      buyAlert: false,
      userOrder: {
        cart: this.cart,
        totalCartPrice: this.totalCartPrice,
        date: new Date(),
      },
      cartActions: { remove: "remove", add: "add" },
    };
  },
  props: {
    cart: {
      type: Array,
    },
    totalCartPrice: {
      type: Number,
    },
  },
  methods: {
    toggleCartDropdown() {
      this.cartDropdown = !this.cartDropdown;
    },
    clearCart() {
      setTimeout(() => {
        this.toggleCartDropdown();
      }, 250);
      this.$emit("clear-cart", this.cart);
    },
    toggleProductInCart(product, action) {
      this.$emit("toggle-product-in-cart", product, action);
    },
    async confirmBuy() {
      this.userLogged = await this.getUserLoggedFromStorage();
      if (this.userLogged == null) {
        this.userNotLogged = true;
        return;
      }
      if (this.userLogged.isAdmin) {
        alert("No puedes comprar productos como administrador");
        return;
      }
      this.userOrder.totalCartPrice = this.totalCartPrice;
      apiServices.postUserOrder(this.userLogged.id, this.userOrder);
      this.toggleBuyAlert(true);
      localStorage.removeItem("Carrito");
      localStorage.removeItem("Precio Total Carrito");
      this.clearCart();
    },
    toggleBuyAlert(value) {
      this.buyAlert = value;
    },
  },
  computed: {
  ...mapGetters("cart", ["getCart"])
  }
};
</script>

<style scoped>
#CartContainer #CartImgContainer {
  position: fixed;
  top: 0;
  right: 0;
  display: flex;
  cursor: pointer;
}
#CartContainer #CartImgContainer img {
  width: 60px;
  height: 60px;
  position: absolute;
  top: 0;
  right: 0;
}
#CartContainer #CartImgContainer p {
  color: #ffffff;
  background-color: #7e0a0a;
  width: 20px;
  z-index: 1;
  position: fixed;
  top: 44px;
  right: 0;
  border: 1px solid #ffffff;
  text-align: center;
}
#CartContainer #SubCartContainer {
  z-index: 2;
  color: #7e0a0a;
  font-size: 16px;
  font-weight: 700;
  position: absolute;
  top: 132px;
  right: 0;
  background: white;
  width: 600px;
  max-width: 80%;
  padding: 20px;
  margin: auto;
  border: 3px solid #7e0a0a;
  border-radius: 30px;
}
.productCardContainer {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 5%;
  margin-bottom: 10px;
}
.productCardContainer button {
  cursor: pointer;
  color: #ffffff;
  background-color: #7e0a0a;
  border: 1px solid #ffffff;
  border-radius: 20px;
  width: 30px;
  height: 30px;
  font-size: 20px;
}
.productMainInfoContainer {
  width: 35%;
}
#totalCartInfo {
  margin-top: 20px;
  margin-bottom: 0;
  border-top: 1px solid #7e0a0a;
  text-align: center;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
#totalCartInfo img {
  cursor: pointer;
}
#confirmBuyContainer {
  text-align: center;
  margin-top: 10px;
}
#confirmBuyContainer button {
  border: 1px solid #7e0a0a;
  border-radius: 32px;
  color: #7e0a0a;
  background: #ffffff;
  font-weight: 600;
  cursor: pointer;
  padding: 10px;
}
#confirmBuyContainer button:hover {
  background: #7e0a0a;
  color: #ffffff;
  border: 1px solid #7e0a0a;
}
#userNotLoggedContainer {
  text-align: center;
}
#userNotLoggedContainer button {
  margin-top: 10px;
  background: #fff;
  border: none;
  text-decoration: underline;
  color: #7e0a0a;
  cursor: pointer;
}
#emptyCart button {
  margin-top: 10px;
  background: #fff;
  border: none;
  color: #7e0a0a;
  cursor: pointer;
}
#buyFinished {
  text-align: center;
}
#buyFinished h4 {
  color: #7e0a0a;
  background: #ffffff;
  font-size: 22px;
  font-weight: 600;
  text-decoration: underline;
  transition: width 3.5s;
}
#buyFinished button {
  border: 1px solid #7e0a0a;
  border-radius: 32px;
  color: #7e0a0a;
  background: #ffffff;
  font-weight: 600;
  cursor: pointer;
}
#buyFinished button:hover {
  background: #7e0a0a;
  color: #ffffff;
  border: 1px solid #7e0a0a;
}
#closeCartDropdownContainer {
  display: flex;
  justify-content: flex-end;
}
#closeCartDropdownContainer img {
  cursor: pointer;
}
</style>
