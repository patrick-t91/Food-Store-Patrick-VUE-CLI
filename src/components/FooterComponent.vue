<template>
  <footer>
    <div id="mainContainer">
      <div id="footerLinks">
        <router-link
          v-if="getUser"
          :to="{
            name: 'UserOrders',
            params: {
              userId: parseInt(getUser.id),
            },
          }"
          >Mis pedidos</router-link
        >
        <router-link to="/legal-terms">Términos y condiciones</router-link>
        <router-link v-if="getUser" to="/sugerencias-y-reclamos"
          >Sugerencias y reclamos</router-link
        >
      </div>
      <router-link to="/">
        <img
          src="../assets/images/site-logo.jpg"
          alt="site logo"
          width="90"
          height="90"
      /></router-link>
    </div>
    <div id="developedBy"><p>Desarrollado por Patricio Toribio ©</p></div>
  </footer>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "header-component",
  computed: {
    ...mapGetters("user", ["getUser"]),
  },
};
</script>

<style scoped>
#app footer {
  background-color: #7e0a0a;
  color: #ffffff;
  padding: 20px 0 1px;
}

#app footer #mainContainer {
  display: flex;
  justify-content: space-between;
}
#app footer #footerLinks {
  padding-left: 40px;
}

#app footer #footerLinks a {
  text-decoration: none;
  color: #ffffff;
}

#app footer #footerLinks a:hover {
  background-color: #ffffff;
  color: #7e0a0a;
  font-weight: 700;
  padding: 10px;
}
#app footer #footerLinks {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: space-evenly;
  -ms-flex-pack: space-evenly;
  justify-content: space-evenly;
}
#app footer #developedBy {
  color: #ffffff;
  font-style: italic;
  font-weight: bold;
  font-size: 12px;
  text-align: center;
  margin: 20px 0 0;
}
#app footer img {
  width: 80px;
  height: 80px;
  padding: 10px 20px;
}
@media screen and (max-width: 767px) {
  #app footer #footerLinks {
    padding-left: 5%;
    font-size: 14px;
  }
  #app footer img {
    width: 50px;
    height: 50px;
    padding: 10px;
  }
}
</style>
