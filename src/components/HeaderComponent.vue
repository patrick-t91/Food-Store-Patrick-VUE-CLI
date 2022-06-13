<template>
  <header>
    <nav>
      <div id="siteLogoAndName">
        <router-link to="/">
          <img
            src="../assets/images/site-logo.jpg"
            alt="site logo"
            width="90"
            height="90"
          />
        </router-link>
        <h1>TIENDA DE COMIDAS PATRICK</h1>
      </div>
      <div id="navLinks">
        <ul>
          <a @mouseover="toggleCategoriesDropdown(true)">Comidas</a>
          <router-link to="">Ofertas</router-link>
          <router-link
            :to="`/mis-pedidos/${userLoggedHeader && userLoggedHeader.id}`"
            >Mis pedidos</router-link
          >
          <router-link to="/sugerencias-y-reclamos"
            >Sugerencias y reclamos</router-link
          >
          <LoginComponent
            :userLogged="userLoggedHeader"
            :errors="errorsHeader"
            @validate-username="validateUsername"
            @validate-password="validatePassword"
            @login-user="loginUser"
            @register-user="registerUser"
            @close-user-session="closeUserSession"
          />
          
        </ul>
      </div>
    </nav>

    <div id="banner">
      <img src="../assets/images/foodBanner.jpg" alt="food banner" />
    </div>
  </header>
</template>

<script>
import LoginComponent from "./LoginComponent.vue";

export default {
  name: "HeaderComponent",
  components: {
    LoginComponent,
  },
  props: {
    userLoggedHeader: { type: Object },
    errorsHeader: { type: Object },
  },
  methods: {
    toggleCategoriesDropdown(value) {
      this.categoriesDropdown = value;
    },
    validateUsername(username) {
      this.$emit("validate-username", username);
    },
    validatePassword(password) {
      this.$emit("validate-password", password);
    },
    loginUser(userLogged) {
      this.$emit("login-user", userLogged);
    },
    registerUser(userLogged) {
      this.$emit("register-user", userLogged);
    },
    closeUserSession(userLogged) {
      this.$emit("close-user-session", userLogged);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#app nav {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  margin-top: 0;
  background-color: #7e0a0a;
  color: #ffffff;
}

#app nav #siteLogoAndName {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-direction: row;
  flex-direction: row;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}

#app nav #siteLogoAndName img {
  padding: 5px 20px 10px 40px;
}

#app nav #siteLogoAndName h1 {
  max-width: 50px;
  font-size: 20px;
  font-style: italic;
}

#app nav #navLinks {
  padding-right: 40px;
}

#app nav #navLinks a {
  text-decoration: none;
  margin: 10px 20px;
  color: #ffffff;
  cursor: pointer;
  padding: 10px;
}

#app nav #navLinks a:hover {
  background-color: #ffffff;
  color: #7e0a0a;
  font-weight: 700;
  transform: scale(1.1);
}

#app nav #navLinks ul {
  display: flex;
  align-items: center;
}

#app #banner img {
  width: 100%;
}
#app #categoriesDropdown {
  position: absolute;
  z-index: 1;
  width: 100%;
  background-color: #ffffff;
  color: #7e0a0a;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
#app #categoriesDropdown p {
  border: 1px solid #7e0a0a;
  padding: 10px 0;
  margin-right: 40px;
  font-weight: 600;
}
#app #categoriesDropdown p:hover {
  background-color: #7e0a0a;
  color: #ffffff;
  font-weight: 700;
  cursor: pointer;
}
#app #categoriesDropdown img {
  cursor: pointer;
}
#app #categoriesDropdown- .storeLink {
  cursor: pointer;
}
</style>
