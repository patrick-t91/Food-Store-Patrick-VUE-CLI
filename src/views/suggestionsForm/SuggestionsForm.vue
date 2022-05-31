<template>
  <div id="formContainer">
    <h4 id="formTitle">FORMULARIO DE SUGERENCIAS Y RECLAMOS</h4>
    <form @submit.prevent="emitForm">
      <div id="inputsContainer">
        <label for="inputNombre">Nombre completo</label>
        <input
          type="text"
          id="inputNombre"
          placeholder="Ingresa tu nombre completo"
          v-model.trim="formData.name"
          @keyup="validateName"
        />
        <span v-if="errors.nameError.length > 0" class="error">
          {{ errors.nameError }}
        </span>
        <label for="inputEmail">Ingresa tu email</label>
        <input
          type="email"
          id="inputEmail"
          placeholder="Ingresa tu email"
          v-model="formData.email"
          @keyup="validateEmail"
        />
        <span v-if="errors.emailError.length" class="error">
          {{ errors.emailError }}
        </span>
        <label for="inputEdad">Ingresa tu edad</label>
        <input
          type="number"
          id="inputEdad"
          placeholder="Ingresa tu edad"
          v-model.number="formData.age"
          @keyup="validateAge"
        />
        <span v-if="errors.ageError.length" class="error">
          {{ errors.ageError }}
        </span>
        <div id="qualifyOptions">
          <h4>Califica nuestra aplicacion!</h4>
          <select
            name="qualification"
            id="qualificationSelect"
            v-model="formData.userQualification"
          >
            <option
              v-for="(qualification, i) in qualifications"
              :value="qualification"
              :key="i"
            >
              {{ qualification }}
            </option>
          </select>
          <textarea
            id="inputComentario"
            placeholder="Dejanos tu sugerencia o reclamo"
            v-model.trim="userComment"
          />
        </div>
        <button
          type="submit"
          id="submitButton"
          @click="validateName, validateEmail, validateAge"
        >
          ENVIAR
        </button>
      </div>
      <router-link to="/">
        <img
          id="closeForm"
          src="../../assets/images/closeButton.png"
          alt="storesDropdown close button"
          width="100"
          height="100"
        />
      </router-link>
    </form>
  </div>
</template>

<script>
export default {
  name: "SuggestionsForm",
  data() {
    return {
      formData: {
        name: "",
        email: "",
        age: 0,
        userQualification: "",
      },
      validations: {
        nameRegex: /^[a-zA-Z\s]+$/,
        emailRegex: /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i,
      },
      errors: {
        nameError: "",
        emailError: "",
        ageError: "",
      },
      qualifications: ["Mala", "Regular", "Buena", "Muy buena", "Excelente"],
      userComment: "",
    };
  },
  methods: {
    toggleForm(value) {
      this.openForm = value;
    },
    validateName() {
      if (
        this.formData.name &&
        this.validations.nameRegex.test(this.formData.name)
      ) {
        this.errors.nameError = "";
        return;
      }
      this.errors.nameError = "Ingresa tu nombre completo";
    },
    validateEmail() {
      if (
        this.formData.email &&
        this.validations.emailRegex.test(this.formData.email)
      ) {
        this.errors.emailError = "";
        return;
      }
      this.errors.emailError = "Ingresa un email valido";
    },
    validateAge() {
      if (this.formData.age && this.formData.age >= 18) {
        this.errors.ageError = "";
        return;
      }
      this.errors.ageError = "Debes ser mayor de 18";
    },
    emitForm() {
      if (
        this.formData.name &&
        this.validations.nameRegex.test(this.formData.name)
      ) {
        this.errors.nameError = "";
      } else {
        this.errors.nameError = "Ingresa tu nombre completo";
      }

      if (
        this.formData.email &&
        this.validations.emailRegex.test(this.formData.email)
      ) {
        this.errors.emailError = "";
      } else {
        this.errors.emailError = "Ingresa un email valido";
      }
      if (this.formData.age && parseInt(this.formData.age) > 18) {
        this.errors.ageError = "";
      } else {
        this.errors.ageError = "Debes ser mayor de 18";
      }

      if (
        this.errors.nameError == "" &&
        this.errors.emailError == "" &&
        this.errors.ageError == ""
      ) {
        this.$emit("submit-form", this.formData);
        this.resetFormData();
        return;
      }
    },
    resetFormData() {
      this.formData.name = "";
      this.formData.email = "";
      this.formData.age = 0;
      this.formData.comment = "";
      this.formData.userQualification = "";
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
  margin: 10px;
  color: #ffffff;
  cursor: pointer;
}

#app nav #navLinks a:hover {
  background-color: #ffffff;
  color: #7e0a0a;
  font-weight: 700;
  padding: 10px;
}

#app #banner img {
  width: 100%;
}

#formContainer {
  border: 1px solid #7e0a0a;
  width: 800px;
  min-width: 50%;
  margin: auto;
}

#formTitle {
  text-align: center;
  background-color: #7e0a0a;
  color: #ffffff;
  margin-bottom: 30px;
  padding: 20px;
}

form {
  height: 100vh;
  z-index: 1;
}
form #inputsContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
}
form #inputsContainer input {
  border: 1px solid #7e0a0a;
  color: #7e0a0a;
  margin: 10px;
  width: 400px;
  height: 30px;
}
form #inputsContainer .error {
  color: #7e0a0a;
}
#closeForm {
  cursor: pointer;
  position: absolute;
  right: 0;
}
#qualifyOptions {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
}
#qualifyOptions h4 {
  color: #7e0a0a;
}
label {
  color: #7e0a0a;
  font-weight: 600;
  margin-top: 15px;
}
select {
  border: 2px solid #7e0a0a;
  color: #7e0a0a;
}
option {
  color: #7e0a0a;
  font-size: 18px;
}
textarea {
  color: #7e0a0a;
  min-height: 200px;
  min-width: 500px;
  max-width: 90%;
  margin: 10px;
}
#submitButton {
  margin-top: 50px;
  padding: 15px;
  border: 1px solid #7e0a0a;
  border-radius: 32px;
  color: #7e0a0a;
  background: #ffffff;
  font-weight: 600;
  font-size: 20px;
  cursor: pointer;
}
#submitButton:hover {
  background: #7e0a0a;
  color: #ffffff;
  border: 1px solid #7e0a0a;
}
</style>
