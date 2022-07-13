<template>
  <footer>
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
    </div>
    <div id="legalFacts">
      <router-link to="/legal-terms">Términos y condiciones</router-link>
      <router-link v-if="getUser" to="/sugerencias-y-reclamos"
        >Sugerencias y reclamos</router-link
      >
    </div>
    <img
      src="../assets/images/site-logo.jpg"
      alt="site logo"
      width="90"
      height="90"
    />
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
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-direction: row;
  flex-direction: row;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  background-color: #7e0a0a;
  color: #ffffff;
  padding: 20px 0 20px;
}

#app footer #footerLinks {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
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
#app footer #legalFacts {
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

#app footer #legalFacts a {
  text-decoration: none;
  color: #ffffff;
}

#app footer #legalFacts a:hover {
  background-color: #ffffff;
  color: #7e0a0a;
  font-weight: 700;
  padding: 10px;
}

#app footer img {
  padding: 5px 40px 10px 20px;
}
</style>
