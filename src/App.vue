<template>
  <div id="app">
    <router-view
      :products="products"
    />
  </div>
</template>

<script>
import apiServices from "./services/api.services.js";

export default {
  name: "App",
  data() {
    return {
      validations: {
        loginRegex: /^[a-zA-Z0-9]+$/,
      },
      products: [],
    };
  },
  methods: {

    validateUsername(loginData) {
      if (
        loginData.username &&
        this.validations.loginRegex.test(loginData.username)
      ) {
        loginData.errors.usernameError = "";
        return;
      }
      loginData.errors.usernameError =
        "El nombre de usuario solo admite letras y números";
    },
    validatePassword(loginData) {
      if (loginData.password && loginData.password.length >= 6) {
        loginData.errors.passwordError = "";
        return;
      }
      loginData.errors.passwordError =
        "La contraseña debe tener al menos 6 caracteres";
    },
    async loginUser(loginData) {
      if (
        !loginData.errors.usernameError == "" || // Chequeo que el username y contrasena cumplan
        !loginData.errors.passwordError == "" // los requisitos de validacion (solo numeros y letras)
      )
        return; // Si falla un requisito, salgo de la funcion
      const users = await apiServices.getUsers();
      this.userLogged = users.find(
        (user) =>
          user.username === loginData.username &&
          user.password === loginData.password
      );
      if (this.userLogged == undefined) {
        loginData.errors.loginError =
          "La combinación de usuario y contraseña ingresados no es válida";
        return;
      }
      localStorage.setItem("Usuario Loggeado", JSON.stringify(this.userLogged));
      Object.keys(loginData).forEach((key) => {
        loginData[key] = "";
      });
    },
    async registerUser(loginData) {
      if (
        !loginData.errors.usernameError == "" ||
        !loginData.errors.passwordError == ""
      ) {
        return;
      }
      const users = await apiServices.getUsers();
      for (let user of users) {
        if (user.username === loginData.username) {
          loginData.errors.registerError = "El usuario ya existe";
          return;
        }
      }
      if (loginData.passwordConfirmation != loginData.password) {
        loginData.errors.confirmPasswordError =
          "Las contraseñas ingresadas deben coincidir";
        return;
      }
      this.userLogged = await apiServices.postUser(loginData);
      localStorage.setItem("Usuario Loggeado", JSON.stringify(this.userLogged));
      Object.keys(loginData).forEach((key) => {
        loginData[key] = "";
      });
    }
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
