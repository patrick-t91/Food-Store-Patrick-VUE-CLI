<template>
  <div id="updateProductContainer">
    <router-link to="/admin"
      >Volver a la sesión principal de administrador</router-link
    >
    <form action="">
      <h4>Edita el producto</h4>
      <div id="inputsContainer">
        <label for="productName">Nombre del producto</label>
        <input id="productName" type="text" v-model="productData.productName" />
        <label for="productPrice">Precio del producto</label>
        <input id="productPrice" type="number" v-model="productData.price" />
        <label for="productCategory">Categoría del producto</label>
        <input id="productCategory" type="text" v-model="productData.category" />
        <label for="imgSrc">Fuente de la imagen del producto</label>
        <input id="imgSrc" type="text" v-model="productData.imgSrc" />
        <label for="productDiscount">Descuento del producto</label>
        <input id="productDiscount" type="text" v-model="productData.hasDiscount" />
        <select
          name="hasDiscount"
          id="hasDiscount"
          v-model="productData.hasDiscount"
        >
          <option
            v-for="(boolean, i) in discountBooleans"
            :value="boolean"
            :key="i"
          >
            {{ boolean }}
          </option>
        </select>
        <label for="productDiscountAmount">Monto del descuento</label>
        <input
          id="productDiscountAmount"
          type="number"
          v-model="productData.discount"
        />
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "UpdateProduct",
  props: {
    id: {
      type: String,
      required: true,
    },
    product: {
      type: Object,
    },
  },
  data() {
    return {
      discountBooleans: [true, false],
      productData: this.product
    };
  },
};
</script>

<style scoped>
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
#inputsContainer input {
  margin-bottom: 20px;
  width: 350px;
  max-width: 90%;
}
</style>
