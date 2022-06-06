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
          <router-link to="/mis-pedidos">Mis pedidos</router-link>
          <router-link to="/sugerencias-y-reclamos"
            >Sugerencias y reclamos</router-link
          >
          <a
            @click="
              userLogged == null ? toggleLoginModal(1) : toggleLoginModal(3)
            "
            ><img
              src="../assets/images/loginLogo.png"
              alt="login"
              width="40"
              height="40"
          /></a>
        </ul>
      </div>
    </nav>
    <div v-if="loginModal == 1" class="loginModal">
      <div class="loginModal--container">
        <div class="loginModal--mainContainer">
          <img
            id="loginModal--loginLogo"
            src="../assets/images/loginLogo.png"
            alt="login"
            width="60"
            height="60"
          />
          <form @submit.prevent>
            <label for="inputUsuerName">Nombre de usuario</label>
            <input
              type="text"
              placeholder="Ingresa tu nombre de usuario"
              v-model="loginData.username"
              @keyup="validateUsername"
            />
            <span v-if="errors.usernameError.length > 0" class="error">
              {{ errors.usernameError }}
            </span>
            <label for="inputPassword">Ingresa tu contraseña</label>
            <input
              type="password"
              placeholder="Ingresa tu contraseña"
              v-model="loginData.password"
              @keyup="validatePassword"
            />
            <span v-if="errors.passwordError.length" class="error">
              {{ errors.passwordError }}
            </span>
            <button type="submit" id="loginButton" @click="validateLogin">
              INICIAR SESION
            </button>
            <span
              v-if="errors.loginError.length"
              id="loginError"
              class="error"
              >{{ errors.loginError }}</span
            >
          </form>
          <button id="goToRegisterButton" @click="toggleLoginModal(2)">
            Aun no eres usuario de la tienda? Registrate!
          </button>
        </div>
        <div id="closeLoginModal">
          <img
            src="../assets/images/closeButton.png"
            alt="loginModal close button"
            @click="toggleLoginModal(0)"
            width="40"
            height="40"
          />
        </div>
      </div>
    </div>
    <div v-if="loginModal == 2" class="loginModal">
      <div class="loginModal--container">
        <div class="loginModal--mainContainer">
          <img
            id="loginModal--loginLogo"
            src="../assets/images/loginLogo.png"
            alt="login"
            width="60"
            height="60"
          />
          <form @submit.prevent>
            <label for="inputUsername">Crea tu nombre de usuario</label>
            <input
              id="inputUsername"
              type="text"
              placeholder="Solo numeros y letras"
              v-model="loginData.username"
              @keyup="validateUsername"
            />
            <span v-if="errors.usernameError.length > 0" class="error">
              {{ errors.usernameError }}
            </span>
            <label for="inputPassword">Crea tu contraseña</label>
            <input
              id="inputPassword"
              type="password"
              placeholder="Crea tu contraseña"
              v-model="loginData.password"
              @keyup="validatePassword"
            />
            <span v-if="errors.passwordError.length" class="error">
              {{ errors.passwordError }}
            </span>
            <label for="secondPassword">Confirma tu contraseña</label>
            <input
              id="secondPassword"
              type="password"
              v-model="passwordConfirmation"
              placeholder="Repite la contraseña"
            />
            <span
              v-if="errors.confirmPasswordError.length"
              id="confirmPasswordError"
              class="error"
            >
              {{ errors.confirmPasswordError }}
            </span>
            <button type="submit" id="loginButton" @click="registerUser">
              REGISTRATE
            </button>
            <span v-if="errors.registerError.length" class="error">
              {{ errors.registerError }}
            </span>
          </form>
          <button id="goToRegisterButton" @click="toggleLoginModal(1)">
            Si ya tienes un usuario, inicia sesion.
          </button>
        </div>
        <div id="closeLoginModal">
          <img
            src="../assets/images/closeButton.png"
            alt="loginModal close button"
            @click="toggleLoginModal(0)"
            width="40"
            height="40"
          />
        </div>
      </div>
    </div>
    <div v-if="loginModal == 3">
      <div class="loginModal">
        <div class="loginModal--container">
          <div class="loginModal--mainContainer">
            <h4>{{ `!Hola, ${userLogged.username}!` }}</h4>
            <button id="closeSessionButton" @click="closeUserSession">
              Cerrar sesión
            </button>
          </div>
          <div id="closeLoginModal">
            <img
              src="../assets/images/closeButton.png"
              alt="loginModal close button"
              @click="toggleLoginModal(0)"
              width="40"
              height="40"
            />
          </div>
        </div>
      </div>
    </div>
    <div id="banner">
      <img src="../assets/images/foodBanner.jpg" alt="food banner" />
    </div>
  </header>
</template>

<script>
import apiServices from "../services/api.services.js";

export default {
  name: "HeaderComponent",
  data() {
    return {
      categoriesDropdown: false,
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
    toggleCategoriesDropdown(value) {
      this.categoriesDropdown = value;
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
    async validateLogin() {
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
      this.toggleLoginModal(3);
      this.errors.loginError = "";
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
      this.toggleLoginModal(3);
      this.errors.registerError = "";
      this.errors.confirmPasswordError = "";
    },
    closeUserSession() {
      this.userLogged = null;
      localStorage.removeItem("Usuario Loggeado");
      this.toggleLoginModal(1);
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
#app .loginModal #closeLoginModal {
  display: flex;
  justify-content: flex-end;
}
#app .loginModal #closeLoginModal img {
  cursor: pointer;
  margin: 10px 10px 0;
}
</style>
