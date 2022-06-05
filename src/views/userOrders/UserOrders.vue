<template>
  <div>
    <div>
      <div v-if="userLogged == null" id="noUserLoggedOrders">
        Para ver tus pedidos, debes estar loggeado
      </div>
    </div>
    <div v-if="userLogged != null">
      <h4>Hola, {{ userLogged }}! Esta es tu lista de pedidos</h4>
      <div></div>
    </div>
  </div>
</template>

<script>
import apiServices from "../../services/api.services.js";

export default {
  created () {
    this.getOrders()
  },
  data () {
    return {
      userOrders: {}
    }
  },
  methods: {
    async getOrders() {
      this.userOrders = await apiServices.getUserOrders(this.userLogged.id)
    }
  }
}
</script>

<style></style>
