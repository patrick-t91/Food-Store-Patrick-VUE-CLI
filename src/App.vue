<template>
  <div id="app">
    <router-view
      :products="products"
      :userLogged="userLogged"
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
      userLogged: null,
      loginData: {
        username: "",
        password: "",
      },
      validations: {
        loginRegex: /^[a-zA-Z0-9]+$/,
      },
      passwordConfirmation: "",
      errors: {
        usernameError: "",
        passwordError: "",
        loginError: "",
        registerError: "",
        confirmPasswordError: "",
      },
    };
  },
  methods: {
    getUserLoggedFromStorage() {
      this.userLogged = JSON.parse(localStorage.getItem("Usuario loggeado"));
    },
    validateUsername() {
      if (
        this.loginData.username &&
        this.validations.loginRegex.test(this.loginData.username)
      ) {
        this.errors.usernameError = "";
        return;
      }
      this.errors.usernameError =
        "El nombre de usuario solo admite letras y números";
    },
    validatePassword() {
      if (this.loginData.password && this.loginData.password.length >= 6) {
        this.errors.passwordError = "";
        return;
      }
      this.errors.passwordError =
        "La contraseña debe tener al menos 6 caracteres";
    },

    async loginUser() {
      if (
        !this.errors.usernameError == "" || // Chequeo que el username y contrasena cumplan
        !this.errors.passwordError == "" // los requisitos de validacion (solo numeros y letras)
      )
        return; // Si falla un requisito, salgo de la funcion
      const users = await apiServices.getUsers();
      this.userLogged = users.find(
        (user) =>
          user.username === this.loginData.username &&
          user.password === this.loginData.password
      );
      if (this.userLogged == undefined) {
        this.errors.loginError =
          "La combinación de usuario y contraseña ingresados no es válida";
        return;
      }
      localStorage.setItem("Usuario Loggeado", JSON.stringify(this.userLogged));
      if (this.userLogged.isAdmin) {
        this.toggleLoginModal(4);
      } else {
        this.toggleLoginModal(3);
      }
      this.errors.loginError = "";
      console.log(this.userLogged);
      this.emitUserInfo();
      this.loginData = {
        username: "",
        password: "",
      };
    },
    async registerUser() {
      if (
        !this.errors.usernameError == "" ||
        !this.errors.passwordError == ""
      ) {
        return;
      }
      const users = await apiServices.getUsers();
      for (let user of users) {
        if (user.username === this.loginData.username) {
          this.errors.registerError = "El usuario ya existe";
          return;
        }
      }
      if (this.passwordConfirmation != this.loginData.password) {
        this.errors.confirmPasswordError =
          "Las contraseñas ingresadas deben coincidir";
        return;
      }
      this.userLogged = await apiServices.postUser(this.loginData);
      localStorage.setItem("Usuario Loggeado", JSON.stringify(this.userLogged));
      if (this.userLogged.isAdmin) {
        this.toggleLoginModal(4);
      } else {
        this.toggleLoginModal(3);
      }
      this.errors.registerError = "";
      this.errors.confirmPasswordError = "";
      this.emitUserInfo();
      this.loginData = {
        username: "",
        password: "",
      };
    },
    closeUserSession() {
      this.userLogged = null;
      localStorage.removeItem("Usuario Loggeado");
      this.toggleLoginModal(1);
    },
  },
  created() {
    this.getUserLoggedFromStorage();
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
