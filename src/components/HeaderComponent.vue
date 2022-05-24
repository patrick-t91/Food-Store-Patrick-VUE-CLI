<template>
  <header>
    <nav v-if="!openForm">
      <div id="siteLogoAndName">
        <img
          src="../assets/images/site-logo.jpg"
          alt="site logo"
          width="90"
          height="90"
        />
        <h1>TIENDA DE COMIDAS PATRICK</h1>
      </div>
      <div id="navLinks">
        <ul>
          <a @click="toggleForm(true)">Sugerencias y reclamos</a>
        </ul>
      </div>
    </nav>
    <div v-show="storesDropdown" class="dropdownContainer">
      <div class="dropdownContainer--links">
        <div v-for="(store, i) in stores" :key="i" class="storeLink">
          <p @click="chooseStore()">{{ store.name }}</p>
        </div>
      </div>
      <img
        src="../assets/images/closeButton.png"
        alt="storesDropdown close button"
        @click="hideStoresDropdown"
        width="100"
        height="100"
      />
    </div>
    <!--     <div v-if="productsDropdown" class="dropdownContainer">
      <div class="dropdownContainer--links">
        <div v-for="(typeOfProduct, i) in typeOfProducts" :key="i" class="dropdownContainer--storeLink">
          <p>{{ typeOfProduct }}</p>
        </div>
      </div>
      <div>
        <img
          src="../assets/images/closeButton.png"
          alt="productsDropdown close button"
          @click="hideProductsDropdown"
          width="100"
          height="100"
        />
      </div>
    </div> -->
    <div v-if="!openForm" id="banner">
      <img src="../assets/images/foodBanner.jpg" alt="food banner" />
    </div>
    <div v-if="openForm" id="formContainer">
      <img
        id="closeForm"
        src="../assets/images/closeButton.png"
        alt="storesDropdown close button"
        @click="toggleForm(false)"
        width="100"
        height="100"
      />
    </div>
  </header>
</template>

<script>
export default {
  name: "header-component",
  data() {
    return {
      storesDropdown: false,
      productsDropdown: false,
      openForm: false,
    };
  },
  props: {
    typeOfProducts: {
      type: Array,
    },
    stores: {
      type: Array,
    },
  },
  methods: {
    chooseStoresDropdown() {
      this.productsDropdown = false;
      this.storesDropdown = true;
    },
    chooseProductsDropdown() {
      this.storesDropdown = false;
      this.productsDropdown = true;
    },
    hideStoresDropdown() {
      this.storesDropdown = false;
    },
    hideProductsDropdown() {
      this.productsDropdown = false;
    },
    chooseStore() {
      this.$emit("choose-store", this.stores);
    },
    toggleForm(value) {
      this.openForm = value;
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
#app .dropdownContainer {
  z-index: 1;
  width: 100%;
  background-color: #ffffff;
  color: #7e0a0a;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
#app .dropdownContainer p {
  border: 1px solid #7e0a0a;
  padding: 10px 0;
  margin-right: 40px;
  font-weight: 600;
}
#app .dropdownContainer p:hover {
  background-color: #7e0a0a;
  color: #ffffff;
  font-weight: 700;
  cursor: pointer;
}
#app .dropdownContainer img {
  cursor: pointer;
}
#app .dropdownContainer- .storeLink {
  cursor: pointer;
}
#formContainer {
  height: 100vh;
  z-index: 1;
}
#closeForm {
  cursor: pointer;
}
</style>
