<template>
  <div id="adminContainer">
    <header>
      <h2>Sesión de Administrador</h2>
      <div id="linksContainer">
        <router-link to="/admin/create-product">Crear producto</router-link>
        <router-link to="/">Volver a la home</router-link>
      </div>
    </header>
    <div v-if="getUser && getUser.isAdmin" id="adminTable">
      <table>
        <thead>
          <tr>
            <th v-for="(data, i) in dataTitles" :key="i" class="tableTitles">
              {{ data }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(product, i) in getProducts" :key="i">
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
                :to="{
                  name: 'EditProduct',
                  params: {
                    productId: parseInt(product.id),
                    product,
                  },
                }"
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
                @click="apiServices.deleteProduct(product.id)"
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
import { mapActions, mapGetters } from "vuex";

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
    };
  },
  created() {
    this.setProducts();
  },
  methods: {
    ...mapActions("products", ["setProducts"]),
    async deleteProduct(productId) {
      await apiServices.deleteProduct(productId);
      alert("Producto eliminado!");
    },
  },
  computed: {
    ...mapGetters("products", ["getProducts"]),
    ...mapGetters("user", ["getUser"]),
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
header #linksContainer a {
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
header #linksContainer a:hover {
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
}
table tbody td #editIcon {
  padding: 0 40px;
  cursor: pointer;
}
table tbody td #removeIcon {
  cursor: pointer;
}

</style>
