<template>
  <div>
    <div v-if="userLogged == null" id="noUserLoggedOrders">
      <div>
        <h4>Para ver tus pedidos, debes estar loggeado</h4>
        <router-link to="/">Volver a la home</router-link>
      </div>
    </div>
    <div v-if="userLogged != null" id="userOrdersContainer">
      <router-link to="/">Volver a la home</router-link>
      <h4>Hola, {{ userLogged.username }}! Esta es tu lista de pedidos</h4>
      <div v-for="(order, i) in userOrders" :key="i">
        <UserOrderComponent :order="order" />
      </div>
    </div>
  </div>
</template>

<script>
import apiServices from "../../services/api.services.js";
import UserOrderComponent from "../../components/UserOrderComponent.vue";

export default {
  name: "UserOrders",
  components: {
    UserOrderComponent
  },
  created() {
    this.getOrders();
  },
  data() {
    return {
      userOrders: [],
    };
  },
  methods: {
    async getOrders() {
      this.userOrders = await apiServices.getUserOrders(this.userLogged.id);
      this.userOrders.reverse()
    },
  },
};
</script>

<style scoped>
#noUserLoggedOrders div {
  color: #7e0a0a;
}
#noUserLoggedOrders a {
  color: #7e0a0a;
}
#userOrdersContainer {
  text-align: center;
  margin-top: 20px;
}
#userOrdersContainer a {
  border: 1px solid #7e0a0a;
  border-radius: 32px;
  color: #7e0a0a;
  background: #ffffff;
  font-weight: 600;
  cursor: pointer;
  text-decoration: none;
  padding: 10px;
}
#userOrdersContainer a:hover {
  background: #7e0a0a;
  color: #ffffff;
  border: 1px solid #7e0a0a;
}
#userOrdersContainer h4 {
  font-size: 22px;
  color: #ffffff;
  background-color: #7e0a0a;
  padding: 10px 0;
}
</style>
