<template>
  <div id="userOrderContainer">
    <h4 id="orderDate">Fecha de la orden: {{ order.date }}</h4>
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
              <img
                :src="product.imgSrc"
                alt="product image"
                width="40"
                height="40"
              />
              <div>{{ product.productName }}</div>
            </td>
            <td>{{ product.price }}</td>
            <td>{{ product.quantity }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <h4 id="orderTotalPrice">
      Precio total de la orden: $ {{ parseInt(order.totalCartPrice) }}
    </h4>
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
  }
};
</script>

<style scoped>
table {
  margin: auto;
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
#userOrderContainer {
  margin-top: 40px;
  border-bottom: 2px dotted #7e0a0a;
}
#userOrderContainer #orderDate {
  margin-bottom: 10px;
  color: #7e0a0a;
}
#userOrderContainer #orderTotalPrice {
  color: #7e0a0a;
  font-size: 18px;
}
</style>
