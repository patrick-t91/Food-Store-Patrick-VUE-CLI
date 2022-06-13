<template>
  <div id="app">
    <router-view
      :products="products"
      :userLoggedHome="userLoggedApp"
      @login-user="loginUser"
      @register-user="registerUser"
      @close-user-session="closeUserSession"
    />
  </div>
</template>

<script>
import apiServices from "./services/api.services.js";

export default {
  name: "App",
  data() {
    return {
      userLoggedApp: null,
      validations: {
        loginRegex: /^[a-zA-Z0-9]+$/,
      },
      products: [],
    };
  },
  created() {
    this.getuserLoggedAppFromStorage();
    this.getProducts();
    if (this.cartFromStorage == null && this.totalCartPriceFromStorage == null)
      return;
    this.cart = this.cartFromStorage;
    this.totalCartPrice = this.totalCartPriceFromStorage;
  },
  methods: {
    getuserLoggedAppFromStorage() {
      this.userLoggedApp = JSON.parse(localStorage.getItem("Usuario loggeado"));
    },
    async getProducts() {
      this.products = await apiServices.getProducts();
    },
    validateUsername(loginData) {
      if (
        loginData.username &&
        this.validations.loginRegex.test(loginData.username)
      ) {
        this.loginData.errors.usernameError = "";
        return;
      }
      this.errors.usernameError =
        "El nombre de usuario solo admite letras y números";
    },
    validatePassword(loginData) {
      if (loginData.password && loginData.password.length >= 6) {
        this.loginData.errors.passwordError = "";
        return;
      }
      this.loginData.errors.passwordError =
        "La contraseña debe tener al menos 6 caracteres";
    },
    async loginUser() {
      if (
        !this.loginData.errors.usernameError == "" || // Chequeo que el username y contrasena cumplan
        !this.loginData.errors.passwordError == "" // los requisitos de validacion (solo numeros y letras)
      )
        return; // Si falla un requisito, salgo de la funcion
      const users = await apiServices.getUsers();
      this.userLoggedApp = users.find(
        (user) =>
          user.username === this.loginData.username &&
          user.password === this.loginData.password
      );
      if (this.userLoggedApp == undefined) {
        this.loginData.errors.loginError =
          "La combinación de usuario y contraseña ingresados no es válida";
        return;
      }
      localStorage.setItem("Usuario Loggeado", JSON.stringify(this.userLoggedApp));
      this.loginData.errors.loginError = "";
      console.log(this.userLoggedApp);
      this.loginData = {
        username: "",
        password: "",
      };
    },
    async registerUser() {
      if (
        !this.loginData.errors.usernameError == "" ||
        !this.loginData.errors.passwordError == ""
      ) {
        return;
      }
      const users = await apiServices.getUsers();
      for (let user of users) {
        if (user.username === this.loginData.username) {
          this.loginData.errors.registerError = "El usuario ya existe";
          return;
        }
      }
      if (this.passwordConfirmation != this.loginData.password) {
        this.loginData.errors.confirmPasswordError =
          "Las contraseñas ingresadas deben coincidir";
        return;
      }
      this.userLoggedApp = await apiServices.postUser(this.loginData);
      localStorage.setItem("Usuario Loggeado", JSON.stringify(this.userLoggedApp));
      this.loginData.errors.registerError = "";
      this.loginData.errors.confirmPasswordError = "";
      this.emitUserInfo();
      this.loginData = {
        username: "",
        password: "",
      };
    },
    closeUserSession() {
      this.userLoggedApp = null;
      localStorage.removeItem("Usuario Loggeado");
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
