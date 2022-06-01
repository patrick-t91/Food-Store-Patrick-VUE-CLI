<template>
  <div>
    <div v-if="loginModal === 1" class="loginModal">
      <div class="loginModal--container">
        <div class="loginModal--mainContainer">
          <img
            id="loginModal--loginLogo"
            src="../assets/images/loginLogo.png"
            alt="login"
            width="60"
            height="60"
          />
          <form @submit.prevent="emitLogin">
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
          <form @submit.prevent="emitLogin">
            <label for="inputUsuerName">Crea tu nombre de usuario</label>
            <input
              type="text"
              placeholder="Crea tu nombre de usuario(numeros y letras)"
              @keyup="validateUsername"
            />
            <span v-if="errors.usernameError.length > 0" class="error">
              {{ errors.usernameError }}
            </span>
            <label for="inputPassword">Crea tu contraseña</label>
            <input
              type="password"
              placeholder="Crea tu contraseña"
              @keyup="validatePassword"
            />
            <span v-if="errors.passwordError.length" class="error">
              {{ errors.passwordError }}
            </span>
            <input type="password" placeholder="Repite la " />
            <button type="submit" id="loginButton" @click="postUser">
              REGISTRATE
            </button>
            <span
              v-if="errors.loginError.length"
              id="loginError"
              class="error"
              >{{ errors.loginError }}</span
            >
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
  </div>
</template>

<script>
import apiServices from '../services/api.services.js';
import loginMixin from '../mixins/loginMixin/loginMixin.js';

export default {
  name: "LoginModal",
  mixins: [loginMixin],
  data() {
    return {
      loginData: {
        username: "",
        password: "",
      },
      validations: {
        loginRegex: /^[a-zA-Z0-9]+$/,
      },
      errors: {
        usernameError: "",
        passwordError: "",
        loginError: "",
        registerError: "",
      },
    };
  },    
  methods: {
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
        !this.errors.passwordError == "" || // los requisitos de validacion (solo numeros y letras)
        !this.userLogged == null // , y que no haya previamente un usuario loggeado.
      )
        return; // Si falla un requisito, salgo de la funcion
      const users = await apiServices.getUsers();
      this.userLogged = users.find(
        (user) =>
          user.username === this.loginData.username &&
          user.password === this.loginData.password
      );
      localStorage.setItem("Usuario Loggeado", this.userLogged);
      console.log(this.userLogged);
      if (this.userLogged == undefined) {
        this.errors.loginError =
          "La combinación de usuario y contraseña ingresados no es válida";
      }
    },
    async postUser() {
      if (
        !this.errors.usernameError == "" ||
        !this.errors.passwordError == "" ||
        !this.userLogged == null
      )
        return;
      const users = await apiServices.getUsers();
      if (users.find((user) => user.username === this.loginData.username)) {
        this.errors.registerError = "El usuario ya existe";
      }
      this.userLogged = await apiServices.postUser();
      localStorage.setItem("Usuario Loggeado", this.userLogged);
    },
  },
};
</script>

<style scoped>
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
#app .loginModal .error {
  margin-top: 0;
  margin-bottom: 20px;
  color: #7e0a0a;
}
#app .loginModal #loginError {
  width: 75%;
  margin-top: 15px;
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
