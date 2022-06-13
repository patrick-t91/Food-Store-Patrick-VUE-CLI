<template>
  <div id="loginContainer">
    <div
      id="loginLogoContainer"
      @click="
        toggleLoginModal(1)
      "
    >
      <img
        src="../assets/images/loginLogo.png"
        alt="login"
        width="40"
        height="40"
      />
    </div>
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
            <button type="submit" id="loginButton" @click="loginUser">
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
            <h4>!Hola{userLogged.username}!</h4>
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
    <div v-if="loginModal == 4">
      <div class="loginModal">
        <div class="loginModal--container">
          <div class="loginModal--mainContainer">
            <h4>!Hola{userLogged.username}!</h4>
            <router-link to="/admin">
              Ir a la sesión de administrador
            </router-link>
          </div>
          <button id="closeAdminSessionButton" @click="closeUserSession">
            Cerrar sesión
          </button>
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
  </div>
</template>

<script>
export default {
  name: "LoginComponent",
  data() {
    return {
      loginModal: 0,
      loginData: { username: "", password: "" },
    };
  },
  props: {
    userLogged: { type: Object },
    errors: { type: Object },
  },
  methods: {
    toggleLoginModal(value) {
      this.loginModal = value
    },
    validateUsername() {
      this.$emit("validate-username", this.loginData, this.errors);
    },
    validatePassword() {
      this.$emit("validate-password", this.loginData, this.errors);
    },
    loginUser() {
      this.$emit("login-user", this.userLogged);
    },
    registerUser() {
      this.$emit("register-user", this.userLogged);
    },
    closeUserSession() {
      this.$emit("close-user-session", this.userLogged);
    },
  },
};
</script>

<style scoped>
#loginContainer #loginLogoContainer {
  cursor: pointer;
}
#loginContainer #loginLogoContainer:hover {
  background-color: #ffffff;
  color: #7e0a0a;
  font-weight: 700;
  transform: scale(1.1);
}
#app .loginModal {
  display: flex;
  justify-content: center;
}
#loginContainer .loginModal--container {
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
#loginContainer .loginModal--mainContainer form {
  display: flex;
  flex-direction: column;
  align-items: center;
}
#loginContainer #loginModal--loginLogo {
  margin-bottom: 30px;
}
#loginContainer .loginModal label {
  color: #7e0a0a;
  font-weight: 600;
}
#loginContainer .loginModal input {
  margin: 10px 0 20px;
  width: 200px;
  border: 1px solid #7e0a0a;
  color: #7e0a0a;
  text-align: center;
}
#loginContainer .loginModal #loginButton {
  border: 1px solid #7e0a0a;
  border-radius: 32px;
  color: #7e0a0a;
  background: #ffffff;
  font-weight: 600;
  cursor: pointer;
}
#loginContainer .loginModal #loginButton:hover {
  background: #7e0a0a;
  color: #ffffff;
  border: 1px solid #7e0a0a;
}
#loginContainer .loginModal #goToRegisterButton {
  margin-top: 10px;
  background: #fff;
  border: none;
  text-decoration: underline;
  color: #7e0a0a;
  cursor: pointer;
}
#loginContainer .loginModal #closeSessionButton {
  border: 1px solid #7e0a0a;
  border-radius: 32px;
  color: #7e0a0a;
  background: #ffffff;
  font-weight: 600;
  cursor: pointer;
}
#loginContainer .loginModal #closeSessionButton:hover {
  background: #7e0a0a;
  color: #ffffff;
  border: 1px solid #7e0a0a;
}
#loginContainer .loginModal #closeAdminSessionButton {
  border: 1px solid #7e0a0a;
  border-radius: 32px;
  color: #7e0a0a;
  background: #ffffff;
  font-weight: 600;
  cursor: pointer;
  margin-top: 30px;
}
#loginContainer .loginModal #closeAdminSessionButton:hover {
  background: #7e0a0a;
  color: #ffffff;
  border: 1px solid #7e0a0a;
}
#loginContainer .loginModal .error {
  margin-top: 10px;
  margin-bottom: 15px;
  color: #7e0a0a;
}
#loginContainer .loginModal #loginError {
  width: 75%;
  margin-top: 15px;
}
#loginContainer .loginModal #confirmPasswordError {
  margin-top: -10px;
}
#adminLogin {
  margin-top: 40px;
}
#loginContainer .loginModal a {
  border: 1px solid #7e0a0a;
  border-radius: 6px;
  color: #7e0a0a;
  background: #ffffff;
  font-weight: 600;
  cursor: pointer;
  text-decoration: none;
  padding: 10px 5px;
}
#loginContainer .loginModal a:hover {
  color: #ffffff;
  background: #7e0a0a;
}
#loginContainer .loginModal #closeLoginModal {
  display: flex;
  justify-content: flex-end;
}
#loginContainer .loginModal #closeLoginModal img {
  cursor: pointer;
  margin: 10px 10px 0;
}
</style>
