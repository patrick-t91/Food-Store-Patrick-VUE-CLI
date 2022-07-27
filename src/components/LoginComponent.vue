<template>
  <div id="loginContainer">
    <div id="loginLogoContainer" @click="toggleLoginModal(1)">
      <img
        src="../assets/images/loginLogo.png"
        alt="login"
        width="40"
        height="40"
      />
    </div>
    <div v-if="getLoginModal == 1 && !getUser" class="loginModal">
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
              @keyup="clearEmptyFieldsError()"
            />
            <label for="inputPassword">Ingresa tu contraseña</label>
            <input
              type="password"
              placeholder="Ingresa tu contraseña"
              v-model="loginData.password"
              @keyup="clearEmptyFieldsError()"
            />
            <button type="submit" id="loginButton" @click="validateLogin">
              INICIAR SESION
            </button>
            <span v-if="loginData.emptyFieldsError" class="login-error error"
              >Por favor, completa todos los campos.</span
            >
            <span v-if="loginData.error" class="login-error error"
              >La combinación de usuario y contraseña ingresados no es
              válida</span
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
    <div v-if="getLoginModal == 2 && !getUser" class="loginModal">
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
              placeholder="Crea tu nombre de usuario"
              v-model="registerData.username"
              @keyup="validateUsername(), clearUserExistsError(), clearEmptyFieldsError()"
            />
            <span
              v-if="
                registerData.username.length &&
                registerData.errors.usernameError
              "
              class="error"
            >
              El nombre de usuario debe tener entre 8 y 12 caracteres y solo
              admite caracteres alfanuméricos, sin espacios.
            </span>
            <label for="inputPassword">Crea tu contraseña</label>
            <input
              id="inputPassword"
              type="password"
              placeholder="Crea tu contraseña"
              v-model="registerData.password"
              @keyup="validatePassword(), clearEmptyFieldsError()"
            />
            <span
              v-if="
                registerData.password.length &&
                registerData.errors.passwordError.length
              "
              class="error"
            >
              La contraseña debe tener al menos 8 caracteres
            </span>
            <span
              v-if="
                !registerData.errors.passwordError.length &&
                registerData.errors.passwordError.characters
              "
              id="passwordError"
              class="error"
            >
              La contraseña debe tener al menos una letra minúscula, una letra
              mayúscula, un número y un caracter especial, sin espacios.
            </span>
            <label for="secondPassword">Confirma tu contraseña</label>
            <input
              id="secondPassword"
              type="password"
              v-model="registerData.confirmPassword"
              placeholder="Repite la contraseña"
            />
            <span
              v-if="
                registerData.confirmPassword.length &&
                registerData.errors.confirmPasswordError
              "
              id="confirmPasswordError"
              class="error"
            >
              Las contraseñas ingresadas deben coincidir
            </span>
            <button type="submit" id="loginButton" @click="registerUser">
              REGISTRATE
            </button>
            <span v-if="registerData.errors.emptyFieldsError" class="error">
              Por favor, completa todos los campos.
            </span>
            <span
              v-if="
                registerData.username.length && registerData.errors.userExists
              "
              class="error"
            >
              El nombre de usuario elegido ya existe.
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
    <div v-if="getUser && getLoginModal != 0">
      <div class="loginModal">
        <div class="loginModal--container">
          <div class="loginModal--mainContainer">
            <h4>
              !Hola,
              <span style="font-size: 18px">{{ getUser.username }}</span
              >!
            </h4>
            <button id="closeSessionButton" @click="closeSession">
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
    <div v-if="getUser && getUser.isAdmin && getLoginModal != 0">
      <div class="loginModal">
        <div class="loginModal--container">
          <div class="loginModal--mainContainer">
            <h4>
              !Hola,
              <span style="font-size: 18px">{{ getUser.username }}</span
              >!
            </h4>
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
import apiServices from "../services/api.services.js";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "LoginComponent",
  data() {
    return {
      loginData: {
        username: "",
        password: "",
        emptyFieldsError: false,
        error: false,
      },
      registerData: {
        username: "",
        password: "",
        confirmPassword: "",
        errors: {
          emptyFieldsError: false,
          usernameError: false,
          passwordError: { length: false, characters: false },
          confirmPasswordError: false,
          userExists: false,
        },
        isValid: true,
      },
      validations: {
        usernameRegex: /^(?!.* )[a-zA-Z\d]{8,12}$/,
        passwordRegex:
          /^(?!.* )(?=(.*[a-z]))(?=(.*[A-Z]))(?=(.*[0-9]))(?=(.*[!@#$%^&*()\-__+.]))/,
      },
    };
  },
  methods: {
    ...mapActions("user", ["logUser", "closeUserSession"]),
    ...mapActions("loginModal", ["toggleLoginModal"]),
    validateEmptyFieldsInLogin() {
      !this.loginData.username
        ? (this.loginData.emptyFieldsError = true)
        : (this.loginData.emptyFieldsError = false);
      !this.loginData.password
        ? (this.loginData.emptyFieldsError = true)
        : (this.loginData.emptyFieldsError = false);
    },
    validateEmptyFieldsInRegister() {
      !this.registerData.username
        ? (this.registerData.errors.emptyFieldsError = true)
        : (this.registerData.errors.emptyFieldsError = false);
      !this.registerData.password
        ? (this.registerData.errors.emptyFieldsError = true)
        : (this.registerData.errors.emptyFieldsError = false);
      !this.registerData.confirmPassword
        ? (this.registerData.errors.emptyFieldsError = true)
        : (this.registerData.errors.emptyFieldsError = false);
    },
    validateUsername() {
      !this.validations.usernameRegex.test(this.registerData.username)
        ? (this.registerData.errors.usernameError = true)
        : (this.registerData.errors.usernameError = false);
    },
    validatePassword() {
      this.registerData.password.length < 8
        ? (this.registerData.errors.passwordError.length = true)
        : (this.registerData.errors.passwordError.length = false);
      !this.validations.passwordRegex.test(this.registerData.password)
        ? (this.registerData.errors.passwordError.characters = true)
        : (this.registerData.errors.passwordError.characters = false);
    },
    async validateLogin() {
      this.validateEmptyFieldsInLogin();
      if (this.loginData.emptyFieldsError) return;
      const users = await apiServices.getUsers();
      let validUser = users.find(
        (user) =>
          user.username === this.loginData.username &&
          user.password === this.loginData.password
      );
      if (!validUser) {
        this.loginData.error = true;
        return;
      }
      this.logUser(validUser);
      this.loginData.username = "";
      this.loginData.password = "";
    },
    async validateRegister() {
      this.validateEmptyFieldsInRegister();
      if (this.registerData.errors.emptyFieldsError)
        this.registerData.isValid = false;
      if (
        this.registerData.errors.usernameError ||
        this.registerData.errors.passwordError.length ||
        this.registerData.errors.passwordError.characters ||
        this.registerData.errors.confirmPasswordError
      ) {
        this.registerData.isValid = false;
      }
      const users = await apiServices.getUsers();
      for (let user of users) {
        if (user.username === this.registerData.username) {
          this.registerData.errors.userExists = true;
          this.registerData.isValid = false;
          this.registerData.password = "";
          this.registerData.confirmPassword = "";
        }
      }
      if (this.registerData.confirmPassword != this.registerData.password) {
        this.registerData.errors.confirmPasswordError = true;
        this.registerData.isValid = false;
      }
    },
    async registerUser() {
      await this.validateRegister();
      if (!this.registerData.isValid) {
        return;
      }
      await apiServices.postUser({
        username: this.registerData.username,
        password: this.registerData.password,
      });
      alert("Usuario registrado. Inicia sesion");
      this.emptyRegisterData();
    },
    closeSession() {
      this.closeUserSession();
      this.toggleLoginModal(1);
    },
    emptyRegisterData() {
      this.registerData.username = "";
      this.registerData.password = "";
      this.registerData.confirmPassword = "";
    },
    clearUserExistsError() {
      this.registerData.errors.userExists = false;
    },
    clearEmptyFieldsError() {
      this.loginData.emptyFieldsError = false;
      this.registerData.errors.emptyFieldsError = false;
    }
  },
  computed: {
    ...mapGetters("user", ["getUser"]),
    ...mapGetters("loginModal", ["getLoginModal"]),
  },
};
</script>

<style scoped>
#loginContainer {
  width: 40px;
}
#loginContainer #loginLogoContainer {
  cursor: pointer;
}
#loginContainer #loginLogoContainer:hover {
  background-color: #ffffff;
  color: #7e0a0a;
  font-weight: 700;
  transform: scale(1.1);
}
#loginContainer .loginModal {
  display: flex;
  justify-content: center;
}
#loginContainer .loginModal {
  z-index: 2;
  position: fixed;
  width: 400px;
  max-width: 85%;
  padding: 20px 0;
  border: 6px solid #7e0a0a;
  background: #ffffff;
  text-align: center;
  border-radius: 20px;
  top: 133px;
  right: 8px;
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
#loginContainer .loginModal #passwordError {
  margin: 0 10px 15px;
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
#loginContainer .loginModal .login-error {
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
#loginContainer .loginModal .loginModal--container {
  width: 100%;
}
#loginContainer
  .loginModal
  .loginModal--container
  .loginModal--mainContainer
  h4 {
  color: #7e0a0a;
}
</style>
