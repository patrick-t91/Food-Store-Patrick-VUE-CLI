<template>
  <div id="userOrderContainer">
    <h4>Fecha de la orden: {{ order.date }}</h4>
    <h4>Precio total de la orden: $ {{ order.totalCartPrice }}</h4>
    <div id="ordersTable">
      <table>
        <thead>
          <tr>
            <th v-for="(data, i) in dataTitles" :key="i" class="tableTitles">
              {{ data }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(product, i) in order.cart" :key="i">
            <td>
              <div>{{ product.imgSrc }}</div>
              <div>{{ product.productName }}</div>
            </td>
            <td>{{ product.price }}</td>
            <td>{{ product.quantity }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dataTitles: ["Productos", "Precio", "Cantidad"],
    };
  },
  props: {
    order: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped></style>
