<template>
  <div id="formContainer">
    <h4 id="formTitle">FORMULARIO DE SUGERENCIAS Y RECLAMOS</h4>
    <h4 id="usernameInSuggestionsForm">
      Hola, {{ getUser.username }}! Dejanos tu sugerencia o reclamo y te
      ayudaremos en caso de ser necesario.
    </h4>
    <form @submit.prevent="emitForm">
      <div id="inputsContainer">
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
            placeholder="Dejanos tus comentarios, sugerencias o un reclamo en caso de necesitarlo"
            v-model.trim="formData.userComment"
          />
        </div>
        <div v-if="userDidNotComment">{{ userDidNotComment }}</div>
        <button type="submit" id="submitButton">
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
import apiServices from "../../services/api.services";
import { mapGetters } from "vuex";

export default {
  name: "SuggestionsForm",
  data() {
    return {
      qualifications: ["Mala", "Regular", "Buena", "Muy buena", "Excelente"],
      userDidNotComment: "",
      formData: {
        user: "",
        userQualification: "",
        userComment: "",
      },
    };
  },
  methods: {
    toggleForm(value) {
      this.openForm = value;
    },
    async emitForm() {
      this.formData.user = this.getUser.username
      this.userDidNotComment = "";
      if (
        this.formData.userComment.length < 25 ||
        this.formData.userComment.split(" ").length < 5
      ) {
        this.userDidNotComment =
          "Debes dejar un comentario, sugerencia o reclamo de al menos 5 palabras y 25 caracteres";
        return;
      }
      await apiServices.postUserComment(this.formData);
      alert(
        "Tu calificación y tus comentarios, sugerencias o reclamo han sido enviados!"
      );
      this.resetFormData();
    },
    resetFormData() {
      this.formData.userQualification = "";
      this.formData.userComment = "";
    },
  },
  computed: {
    ...mapGetters("user", ["getUser"]),
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
#usernameInSuggestionsForm {
  color: #7e0a0a;
  text-align: center;
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
}
#qualifyOptions h4 {
  color: #7e0a0a;
  margin-bottom: 10px;
}
#qualifyOptions label {
  color: #7e0a0a;
  font-weight: 600;
  margin-top: 15px;
}
#qualifyOptions select {
  border: 2px solid #7e0a0a;
  color: #7e0a0a;
  margin-bottom: 20px;
}
#qualifyOptions select option {
  color: #7e0a0a;
  font-size: 18px;
}
#qualifyOptions textarea {
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
