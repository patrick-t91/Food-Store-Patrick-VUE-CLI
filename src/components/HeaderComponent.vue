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
          <router-link :to="`/mis-pedidos/${userLoggedHeader && userLoggedHeader.id}`"
            >Mis pedidos</router-link
          >
          <router-link to="/sugerencias-y-reclamos"
            >Sugerencias y reclamos</router-link
          >
          <div
            id="loginLogoContainer"
            @click="
              userLoggedHeader == null
                ? toggleLoginModal(1)
                : !userLoggedHeader.isAdmin
                ? toggleLoginModal(3)
                : toggleLoginModal(4)
            "
          >
            <img
              src="../assets/images/loginLogo.png"
              alt="login"
              width="40"
              height="40"
            />
          </div>
        </ul>
      </div>
    </nav>
    <LoginComponent
      :userLogged="userLoggedHeader"
      :errors="errors"
      :loginModal="loginModal"
      @toggle-login-modal="toggleLoginModal"
      @validate-username="validateUsername"
      @validate-password="validatePassword"
      @login-user="loginUser"
      @register-user="registerUser"
      @close-user-session="closeUserSession"
    />
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
    loginModal: { type: Number, required: true },
    userLoggedHeader: { type: Object},
    errors: { type: Object},
  },
  methods: {
    toggleLoginModal() {
      this.$emit("toggle-login-modal", this.loginModal);
    },
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
#app .loginModal {
  display: flex;
  justify-content: center;
}
#app #navLinks #loginLogoContainer {
  cursor: pointer;
}
#app #navLinks #loginLogoContainer:hover {
  background-color: #ffffff;
  color: #7e0a0a;
  font-weight: 700;
  transform: scale(1.1);
}
#app .loginModal--container {
  z-index: 2;
  position: fixed;
  width: 400px;
  max-width: 85%;
  padding: 20px 0;
  border: 6px solid #7e0a0a;
  background: #ffffff;
  text-align: center;
  border-radius: 20px;
}
#app .loginModal--mainContainer form {
  display: flex;
  flex-direction: column;
  align-items: center;
}
#app #loginModal--loginLogo {
  margin-bottom: 30px;
}
#app .loginModal label {
  color: #7e0a0a;
  font-weight: 600;
}
#app .loginModal input {
  margin: 10px 0 20px;
  width: 200px;
  border: 1px solid #7e0a0a;
  color: #7e0a0a;
  text-align: center;
}
#app .loginModal #loginButton {
  border: 1px solid #7e0a0a;
  border-radius: 32px;
  color: #7e0a0a;
  background: #ffffff;
  font-weight: 600;
  cursor: pointer;
}
#app .loginModal #loginButton:hover {
  background: #7e0a0a;
  color: #ffffff;
  border: 1px solid #7e0a0a;
}
#app .loginModal #goToRegisterButton {
  margin-top: 10px;
  background: #fff;
  border: none;
  text-decoration: underline;
  color: #7e0a0a;
  cursor: pointer;
}
#app .loginModal #closeSessionButton {
  border: 1px solid #7e0a0a;
  border-radius: 32px;
  color: #7e0a0a;
  background: #ffffff;
  font-weight: 600;
  cursor: pointer;
}
#app .loginModal #closeSessionButton:hover {
  background: #7e0a0a;
  color: #ffffff;
  border: 1px solid #7e0a0a;
}
#app .loginModal #closeAdminSessionButton {
  border: 1px solid #7e0a0a;
  border-radius: 32px;
  color: #7e0a0a;
  background: #ffffff;
  font-weight: 600;
  cursor: pointer;
  margin-top: 30px;
}
#app .loginModal #closeAdminSessionButton:hover {
  background: #7e0a0a;
  color: #ffffff;
  border: 1px solid #7e0a0a;
}
#app .loginModal .error {
  margin-top: 10px;
  margin-bottom: 15px;
  color: #7e0a0a;
}
#app .loginModal #loginError {
  width: 75%;
  margin-top: 15px;
}
#app .loginModal #confirmPasswordError {
  margin-top: -10px;
}
#adminLogin {
  margin-top: 40px;
}
#app .loginModal a {
  border: 1px solid #7e0a0a;
  border-radius: 6px;
  color: #7e0a0a;
  background: #ffffff;
  font-weight: 600;
  cursor: pointer;
  text-decoration: none;
  padding: 10px 5px;
}
#app .loginModal a:hover {
  color: #ffffff;
  background: #7e0a0a;
}
#app .loginModal #closeLoginModal {
  display: flex;
  justify-content: flex-end;
}
#app .loginModal #closeLoginModal img {
  cursor: pointer;
  margin: 10px 10px 0;
}
</style>
