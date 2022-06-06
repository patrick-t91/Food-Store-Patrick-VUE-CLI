<template>
  <div id="adminContainer">
    <header>
      <h2>Sesión de Administrador</h2>
      <button @click="closeAdminSession">Cerrar Sesión</button>
    </header>
    <div id="adminTable">
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
              <router-link
                :to="{ name: 'UpdateProduct', params: { id: product.id, product } }"
              >
                <img
                  id="editIcon"
                  src="../../assets/images/editIcon.jpg"
                  alt="edit product icon"
                  width="25"
                  height="25"
                />
              </router-link>
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
    };
  },
  created() {
    this.getProducts();
  },
  methods: {
    closeAdminSession() {
      this.userLogged = null;
      localStorage.removeItem("Usuario Loggeado");
      this.$router.push("/");
    },
    async getProducts() {
      this.products = await apiServices.getProducts();
    },
    async deleteProduct(id) {
      try {
        const res = await axios.delete(`${apiUrl}/Products/${id}`);
        console.log(res.data);
        this.getProducts();
        console.log(this.products);
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style scoped>
header {
  display: flex;
  justify-content: space-around;
  background: #7e0a0a;
  color: #ffffff;
}
header button {
  border: 1px solid #7e0a0a;
  border-radius: 12px;
  background: #7e0a0a;
  color: #ffffff;
  font-weight: 600;
  cursor: pointer;
}
header button:hover {
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
</style>
