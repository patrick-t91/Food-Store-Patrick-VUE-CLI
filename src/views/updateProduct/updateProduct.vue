<template>
  <div id="updateProductContainer">
    <form action="">
        <h4>Crea un nuevo producto</h4>
      <label for="productName">Nombre del producto</label>
      <input id="productName" type="text" />
      <label for=""></label>
      <input id="" type="text" />
      <label for=""></label>
      <input id="" type="text" />
      <label for=""></label>
      <input id="" type="text" />
      <label for=""></label>
      <input id="" type="text" />
      <label for=""></label>
      <input id="" type="text" />
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
};
</script>

<style></style>
