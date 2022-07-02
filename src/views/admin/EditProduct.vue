<template>
  <div v-if="productToEdit" id="updateProductContainer">
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
      <h4>Edita el producto</h4>
      <div id="inputsContainer">
        <label for="productName">Nombre del producto</label>
        <input
          id="productName"
          type="text"
          v-model="productToEdit.productName"
        />
        <label for="productPrice">Precio del producto</label>
        <input id="productPrice" type="number" v-model="productToEdit.price" />
        <label for="productCategory">Categoría del producto</label>
        <input
          id="productCategory"
          type="text"
          v-model="productToEdit.category"
        />
        <label for="imgSrc">Fuente de la imagen del producto</label>
        <input id="imgSrc" type="text" v-model="productToEdit.imgSrc" />
        <label for="productDiscount">Descuento del producto</label>
        <input
          id="productDiscount"
          type="text"
          v-model="productToEdit.hasDiscount"
        />
        <select
          name="hasDiscount"
          id="hasDiscount"
          v-model="productToEdit.hasDiscount"
        >
          <option
            v-for="(booleanValue, i) in discountBooleans"
            :value="booleanValue"
            :key="i"
          >
            {{ booleanValue }}
          </option>
        </select>
        <label for="productDiscountAmount">Porcentaje del descuento</label>
        <input
          id="productDiscountAmount"
          type="number"
          v-model="productToEdit.discountAmount"
        />
      </div>
      <button id="updateProductButton" type="submit" @click="editProduct()">
        Actualizar producto
      </button>
    </form>
  </div>
</template>

<script>
import apiServices from "../../services/api.services";
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      productToEdit: null,
      productId: parseInt(this.$route.params.productId),
      discountBooleans: [true, false],
    };
  },
  created() {
    this.getProduct();
  },
  methods: {
    ...mapActions("products", ["updateProduct"]),
    async getProduct() {
      this.productToEdit = this.getProductById(this.productId);
      if (!this.productToEdit) {
        this.productToEdit = await apiServices.getProductById(this.productId);
      }
    },
    async editProduct() {
      await this.updateProduct({
        productId: this.productId,
        product: this.productToEdit,
      });
      alert("Producto actualizado!");
    }
  },
  computed: {
    ...mapGetters("products", ["getProductById"]),
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
#updateProductContainer {
  margin: 30px 0;
}
#updateProductContainer a {
  border: 1px solid #7e0a0a;
  border-radius: 6px;
  color: #7e0a0a;
  background: #ffffff;
  font-weight: 600;
  cursor: pointer;
  text-decoration: none;
  padding: 10px 5px;
}
#updateProductContainer a:hover {
  color: #ffffff;
  background: #7e0a0a;
}
#updateProductContainer form {
  text-align: center;
}
#updateProductContainer h4 {
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
#updateProductButton {
  border: 1px solid #7e0a0a;
  border-radius: 6px;
  color: #7e0a0a;
  background: #ffffff;
  font-weight: 600;
  cursor: pointer;
  padding: 20px;
}
#updateProductButton:hover {
  background: #7e0a0a;
  color: #ffffff;
  border: 1px solid #7e0a0a;
}
</style>
