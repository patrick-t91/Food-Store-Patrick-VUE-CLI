<template>
  <div id="adminContainer">
    <header>
      <h2>Sesión de Administrador</h2>
      <div id="backToHome">
        <router-link to="/">Volver a la home</router-link>
      </div>
    </header>
    <div v-if="userLogged != null && userLogged.isAdmin" id="adminTable">
      <table>
        <thead>
          <tr>
            <th v-for="(data, i) in dataTitles" :key="i" class="tableTitles">
              {{ data }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(product, i) in products" :key="i">
            <td>
              {{ product.productName }}
            </td>
            <td>{{ product.price }}</td>
            <td>{{ product.category }}</td>
            <td>{{ product.imgSrc }}</td>
            <td>{{ product.hasDiscount }}</td>
            <td>{{ product.discountAmount }}</td>
            <td>
              <img
                id="editIcon"
                src="../../assets/images/editIcon.jpg"
                alt="edit product icon"
                width="25"
                height="25"
                @click="toggleEditProduct(product.id)"
              />
            </td>
            <td>
              <img
                id="removeIcon"
                src="../../assets/images/removeIcon.png"
                alt="remove product icon"
                width="25"
                height="20"
                @click="deleteProduct(product.id)"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- Edit product section -->
    <div v-if="productToEdit >= 0" class="updateCreateProductContainer">
      <form @submit.prevent>
        <h4>Edita el producto</h4>
        <div id="inputsContainer">
          <label for="productName">Nombre del producto</label>
          <input
            id="productName"
            type="text"
            v-model="products[productToEdit].productName"
          />
          <label for="productPrice">Precio del producto</label>
          <input
            id="productPrice"
            type="number"
            v-model="products[productToEdit].price"
          />
          <label for="productCategory">Categoría del producto</label>
          <input
            id="productCategory"
            type="text"
            v-model="products[productToEdit].category"
          />
          <label for="imgSrc">Fuente de la imagen del producto</label>
          <input
            id="imgSrc"
            type="text"
            v-model="products[productToEdit].imgSrc"
          />
          <label for="productDiscount">Descuento del producto</label>
          <input
            id="productDiscount"
            type="text"
            v-model="products[productToEdit].hasDiscount"
          />
          <select
            name="hasDiscount"
            id="hasDiscount"
            v-model="products[productToEdit].hasDiscount"
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
            v-model="products[productToEdit].discountAmount"
          />
        </div>
        <button
          id="updateProductButton"
          type="submit"
          @click="updateProduct(productToEdit + 1, products[productToEdit])"
        >
          Actualizar producto
        </button>
      </form>
      <div id="closeButtonContainer">
        <img
          src="../../assets/images/closeButton.png"
          alt="Cart dropdown close button"
          width="40"
          height="40"
          @click="toggleEditProduct(0)"
        />
      </div>
    </div>
    <!--     Create product section
 -->
    <button @click="toggleNewProductForm(true)">Crea un nuevo producto</button>
    <div v-if="newProductForm" class="updateCreateProductContainer">
      <form @submit.prevent>
        <h4>Crea el producto</h4>
        <div id="inputsContainer">
          <label for="productName">Nombre del producto</label>
          <input
            id="productName"
            type="text"
            v-model="newProduct.productName"
          />
          <label for="productPrice">Precio del producto</label>
          <input id="productPrice" type="number" v-model="newProduct.price" />
          <label for="productCategory">Categoría del producto</label>
          <input
            id="productCategory"
            type="text"
            v-model="newProduct.category"
          />
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
        <button id="updateProductButton" type="submit" @click="createProduct()">
          Crear producto
        </button>
      </form>
      <div id="closeButtonContainer">
        <img
          src="../../assets/images/closeButton.png"
          alt="Cart dropdown close button"
          width="40"
          height="40"
          @click="toggleNewProductForm(false)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import apiServices from "../../services/api.services.js";
import axios from "axios";
const apiUrl = process.env.VUE_APP_API_URL;

export default {
  data() {
    return {
      dataTitles: [
        "Producto",
        "Precio",
        "Categoría",
        "Recurso de imagen",
        "Descuento",
        "Cantidad del descuento",
      ],
      products: [],
      discountBooleans: [true, false],
      productToEdit: -1,
      newProductForm: false,
      newProduct: {
        productName: "",
        price: 0,
        category: "",
        imgSrc: "",
        hasDiscount: false,
        discountAmount: 0,
      },
    };
  },
  created() {
    this.getProducts();
  },
  methods: {
    toggleEditProduct(id) {
      this.productToEdit = id - 1;
    },
    toggleNewProductForm(value) {
      this.newProductForm = value;
      console.log(this.newProductForm);
    },
    async getProducts() {
      this.products = await apiServices.getProducts();
    },
    async deleteProduct(id) {
      try {
        const res = await axios.delete(`${apiUrl}/Products/${id}`);
        alert("Producto")
        console.log(res.data);
        this.getProducts();
        console.log(this.products);
      } catch (err) {
        console.log(err);
      }
    },
    async updateProduct(id) {
      await apiServices.updateProduct(id, this.products[this.productToEdit]);
      alert("Producto actualizado!")
    },
    async createProduct() {
      await apiServices.postProduct(this.newProduct);
      alert("Producto creado!")
      this.clearNewProductForm()
    },
    clearNewProductForm () {
        this.newProduct = {
        productName: "",
        price: 0,
        category: "",
        imgSrc: "",
        hasDiscount: false,
        discountAmount: 0,
      }
    }
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
header #backToHome a {
  border: 1px solid #ffffff;
  border-radius: 6px;
  background: #7e0a0a;
  color: #ffffff;
  font-weight: 600;
  cursor: pointer;
  padding: 10px 5px;
  text-decoration: none;
}
header #backToHome a:hover {
  color: #7e0a0a;
  background: #ffffff;
  border: 1px solid #7e0a0a;
}
table {
  margin: auto;
  margin-top: 25px;
}
table thead {
  background: #7e0a0a;
  color: #ffffff;
}
table thead .tableTitles {
  max-width: 20%;
  width: 200px;
}
table tbody {
  text-align: center;
  color: #7e0a0a;
  border-left: 1px dotted #7e0a0a;
}
table tbody td #editIcon {
  padding: 0 40px;
  cursor: pointer;
}
table tbody td #removeIcon {
  cursor: pointer;
}
.updateCreateProductContainer {
  margin: 30px 0;
}
.updateCreateProductContainer a {
  border: 1px solid #7e0a0a;
  border-radius: 6px;
  color: #7e0a0a;
  background: #ffffff;
  font-weight: 600;
  cursor: pointer;
  text-decoration: none;
  padding: 10px 5px;
}
.updateCreateProductContainer a:hover {
  color: #ffffff;
  background: #7e0a0a;
}
.updateCreateProductContainer form {
  text-align: center;
}
.updateCreateProductContainer h4 {
  background-color: #7e0a0a;
  color: #ffffff;
  padding: 10px 0;
}
#inputsContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
}
#inputsContainer input {
  margin-bottom: 20px;
  width: 350px;
  max-width: 90%;
}
#inputsContainer select {
  margin-bottom: 20px;
}
#adminContainer form #updateProductButton {
  border: 1px solid #7e0a0a;
  border-radius: 32px;
  color: #7e0a0a;
  background: #ffffff;
  font-weight: 600;
  cursor: pointer;
}
#adminContainer form #updateProductButton:hover {
  background: #7e0a0a;
  color: #ffffff;
  border: 1px solid #7e0a0a;
}
#closeButtonContainer {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
#closeButtonContainer img {
  cursor: pointer;
}
</style>
