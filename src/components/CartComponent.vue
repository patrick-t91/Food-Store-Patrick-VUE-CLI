<template>
  <div id="CartContainer">
    <div
      v-if="getCart.products.length > 0"
      @click="toggleCartDropdown(), toggleBuyAlert(false)"
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
          <button @click="removeFromCart({ product, quantity: 1 })">-</button>
          <button @click="addToCart({ product, quantity: 1 })">+</button>
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
            @click="emptyCart"
          />
        </div>
      </div>
      <div v-if="!buyAlert" id="confirmBuyContainer">
        <button @click="confirmBuy">Confirmar compra</button>
      </div>
      <div v-if="buyAlert" id="buyFinished">
        <h4>Gracias por tu compra!</h4>
        <div id="buyFinished--buttons">
          <button @click="toggleBuyAlert(false), toggleCartDropdown()">
            Volver a comprar
          </button>
          <router-link
            v-if="getUser"
            :to="{
              name: 'UserOrders',
              params: {
                userId: parseInt(getUser.id),
              },
            }"
            >Mis pedidos</router-link
          >
        </div>
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
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      cartDropdown: false,
      buyAlert: false,
    };
  },
  methods: {
    ...mapActions("cart", ["addToCart", "removeFromCart", "clearCart"]),
    toggleCartDropdown() {
      this.cartDropdown = !this.cartDropdown;
    },
    async confirmBuy() {
      if (!this.getUser) {
        this.$swal({
          title:
            "Debés estar loggeado para confirmar tu compra. Loggeate o registrate, y volvé que tu carrito estará esperando!",
          text: "Do you want to continue",
          icon: "error",
          confirmButtonText: "Cool",
        });
        return;
      }
      if (this.getUser && this.getUser.isAdmin) {
        alert("No puedes comprar productos como administrador");
        return;
      }
      if (this.getCart.products.length == 0) {
        alert(
          "El carrito está vacío, agrega productos para realizar tu compra!"
        );
        return;
      }
      apiServices.postUserOrder(this.getUser.id, {
        cart: this.getCart,
        date: new Date().toLocaleString(),
      });
      this.toggleBuyAlert(true);
      this.emptyCart();
      localStorage.removeItem("Cart");
    },
    emptyCart() {
      this.clearCart();
      if (this.buyAlert == false) {
        setTimeout(() => {
          this.toggleCartDropdown();
        }, 100);
      }
    },
    toggleBuyAlert(value) {
      this.buyAlert = value;
    },
  },
  computed: {
    ...mapGetters("cart", ["getCart"]),
    ...mapGetters("user", ["getUser"]),
  },
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
  width: 80px;
  height: 60px;
  position: absolute;
  top: 0;
  right: 0;
  border: 6px solid #7e0a0a;
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
  position: fixed;
  top: 61px;
  right: 0;
  background: white;
  width: 600px;
  max-width: 80%;
  padding: 20px;
  margin: auto;
  border: 3px solid #7e0a0a;
  border-radius: 30px;
  max-height: 80vh;
  overflow-y: scroll;
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
#buyFinished #buyFinished--buttons {
  display: flex;
  justify-content: center;
  flex-direction: column;
}
#buyFinished button {
  border: 1px solid #7e0a0a;
  border-radius: 32px;
  color: #7e0a0a;
  background: #ffffff;
  font-weight: 600;
  cursor: pointer;
  margin: auto;
}
#buyFinished button:hover {
  background: #7e0a0a;
  color: #ffffff;
  border: 1px solid #7e0a0a;
}
#buyFinished a {
    border: 1px solid #7e0a0a;
    border-radius: 32px;
    color: #7e0a0a;
    background: #ffffff;
    font-weight: 600;
    cursor: pointer;
    text-decoration: none;
    margin: auto;
    padding: 0 13.5px;
    margin-top: 10px;
}
#buyFinished a:hover {
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
