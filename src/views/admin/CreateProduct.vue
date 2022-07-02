<template>
  <div id="createProductContainer">
    <header>
      <h2>Sesión de Administrador</h2>
      <div id="backLinks">
        <router-link to="/admin"
          >Volver a la sesión principal de Administrador</router-link
        >
        <router-link to="/">Volver a la home</router-link>
      </div>
    </header>
    <form @submit.prevent>
      <h4>Crea el producto</h4>
      <div id="inputsContainer">
        <label for="productName">Nombre del producto</label>
        <input id="productName" type="text" v-model="newProduct.productName" />
        <label for="productPrice">Precio del producto</label>
        <input id="productPrice" type="number" v-model="newProduct.price" />
        <label for="productCategory">Categoría del producto</label>
        <input id="productCategory" type="text" v-model="newProduct.category" />
        <label for="imgSrc">Fuente de la imagen del producto</label>
        <input id="imgSrc" type="text" v-model="newProduct.imgSrc" />
        <label for="productDiscount">Descuento del producto</label>
        <input
          id="productDiscount"
          type="text"
          v-model="newProduct.hasDiscount"
        />
        <select
          name="hasDiscount"
          id="hasDiscount"
          v-model="newProduct.hasDiscount"
        >
          <option
            v-for="(boolean, i) in discountBooleans"
            :value="boolean"
            :key="i"
          >
            {{ boolean }}
          </option>
        </select>
        <label for="productDiscountAmount">Porcentaje del descuento</label>
        <input
          id="productDiscountAmount"
          type="number"
          v-model="newProduct.discountAmount"
        />
      </div>
      <button id="createProductButton" type="submit" @click="createProduct">
        Crear producto
      </button>
    </form>
  </div>
</template>

<script>
import {  mapActions } from "vuex";

export default {
  data() {
    return {
      newProduct: {
        productName: "",
        price: 0,
        category: "",
        imgSrc: "",
        hasDiscount: false,
        discountAmount: 0,
      },
      discountBooleans: [true, false],
    };
  },
  methods: {
    ...mapActions("products", ["postProduct"]),
    async createProduct() {
      this.postProduct(this.newProduct);
      alert("Producto creado!");
    },
  },
};
</script>

<style scoped>
header {
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: #7e0a0a;
  color: #ffffff;
}
header #backLinks a {
  border: 1px solid #ffffff;
  border-radius: 6px;
  background: #7e0a0a;
  color: #ffffff;
  font-weight: 600;
  cursor: pointer;
  padding: 10px 5px;
  margin: 20px;
  text-decoration: none;
}
header #backLinks a:hover {
  color: #7e0a0a;
  background: #ffffff;
  border: 1px solid #7e0a0a;
}
#createProductContainer form {
  text-align: center;
}
#createProductContainer h4 {
  background-color: #7e0a0a;
  color: #ffffff;
  padding: 10px 0;
}
#inputsContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
}
#inputsContainer label {
  color: #7e0a0a;
  margin-bottom: 2px;
}
#inputsContainer input,
select {
  margin-bottom: 20px;
  width: 350px;
  max-width: 90%;
  background-color: #ffffff;
  color: #7e0a0a;
  text-align: center;
  border: 3px solid #7e0a0a;
}
#inputsContainer select {
  margin-bottom: 20px;
  margin-top: -10px;
  width: 80px;
}
#createProductButton {
  border: 1px solid #7e0a0a;
  border-radius: 6px;
  color: #7e0a0a;
  background: #ffffff;
  font-weight: 600;
  cursor: pointer;
  padding: 20px;
}
#createProductButton:hover {
  background: #7e0a0a;
  color: #ffffff;
  border: 1px solid #7e0a0a;
}
</style>
