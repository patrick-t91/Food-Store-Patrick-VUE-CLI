<template>
  <header>
    <nav>
      <div id="siteLogoAndName">
        <router-link to="/">
          <img src="../assets/images/site-logo.jpg" alt="site logo" />
        </router-link>
        <h1>TIENDA DE COMIDAS PATRICK</h1>
      </div>
      <div id="navLinks">
        <SearchBar />
        <div
          v-if="menuHamburguesaIsActive"
          id="menuHamburguesa"
          @click="toggleNavLinks"
        >
          <div class="menu-line"></div>
          <div class="menu-line"></div>
          <div class="menu-line"></div>
        </div>
        <ul v-if="navLinksIsActive">
          <li>
            <router-link
              v-if="getUser"
              :to="{
                name: 'UserOrders',
                params: {
                  userId: parseInt(getUser.id),
                },
              }"
              >Mis pedidos</router-link
            >
          </li>
          <li>
            <router-link v-if="getUser" to="/sugerencias-y-reclamos"
              >Sugerencias y reclamos</router-link
            >
          </li>
          <li><LoginComponent /></li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
import LoginComponent from "./LoginComponent.vue";
import SearchBar from "./SearchBar.vue";
import { mapGetters } from "vuex";

export default {
  name: "HeaderComponent",
  components: {
    LoginComponent,
    SearchBar,
  },
  data() {
    return {
      navLinksIsActive: true,
      menuHamburguesaIsActive: false,
    };
  },
  created() {
    if (window.innerWidth < 1024) {
      this.navLinksIsActive = false;
      this.menuHamburguesaIsActive = true;
    }
  },
  methods: {
    toggleNavLinks() {
      this.navLinksIsActive = !this.navLinksIsActive;
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
  width: 80px;
  height: 80px;
  padding: 10px 20px;
}

#app nav #siteLogoAndName h1 {
  max-width: 50px;
  font-size: 17px;
  font-style: italic;
}

#app nav #navLinks {
  margin: auto;
  padding-right: 60px;
  display: flex;
  align-items: center;
}

#app #navLinks #menuHamburguesa {
  width: 50px;
  height: 50px;
  border-radius: 9px;
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  cursor: pointer;
}
#app #navLinks #menuHamburguesa:hover {
  transform: scale(1.1);
}
#app #navLinks #menuHamburguesa .menu-line {
  width: 30px;
  height: 5px;
  background-color: #730a0a;
  margin: 1px;
}
#app nav #navLinks ul {
  display: flex;
  align-items: center;
  list-style: none;
}

#app nav #navLinks ul a {
  text-decoration: none;
  margin: 10px 20px;
  color: #ffffff;
  cursor: pointer;
  padding: 14px;
}

#app nav #navLinks ul a:hover {
  background-color: #ffffff;
  color: #7e0a0a;
  font-weight: 700;
  font-size: 14px;
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

@media screen and (max-width: 400px) {
  #app nav #siteLogoAndName {
    display: flex;
    flex-direction: column;
    margin: 0 10px;
    text-align: center;
  }
  #app nav #siteLogoAndName h1 {
    margin-top: 0;
  }
  #app nav #navLinks {
    display: flex;
    flex-direction: column;
    margin: 0;
    padding: 0;
  }
  #app #navLinks #menuHamburguesa {
    margin-top: 20px;
  }
}
@media screen and (max-width: 600px) {
  #app header nav {
    height: 120px;
  }
  #app nav #siteLogoAndName img {
    width: 40px;
    height: 40px;
    padding: 6px;
  }
  #app nav #siteLogoAndName h1 {
    font-size: 12px;
  }
  #app #navLinks #menuHamburguesa {
    width: 32px;
    height: 32px;
  }
}

@media screen and (min-width: 426px) and (max-width: 767px) {
  #app nav #navLinks {
    padding-right: 20px;
  }
}

@media screen and (min-width: 601px) and (max-width: 767px) {
  #app nav #siteLogoAndName img {
    width: 50px;
    height: 50px;
    padding: 10px;
  }
  #app nav #siteLogoAndName h1 {
    font-size: 13px;
  }
}

@media screen and (max-width: 767px) {
  #app header nav {
    height: 120px;
  }
}
@media screen and (max-width: 1023px) {
  #app nav #navLinks ul {
    position: absolute;
    top: 100px;
    flex-direction: column;
    background: #7e0a0a;
    width: 100vw;
    left: 0;
    border: 1px solid white;
    z-index: 1;
    display: block;
    height: 163px;
    transition: height 1s;
  }
  #app nav #navLinks ul li {
    margin: 20px 0;
  }
  #app nav #navLinks ul a {
    font-size: 12px;
    margin: 0;
    padding: 0;
  }
  #app nav #navLinks ul a:hover {
    padding: 14px 0;
  }
}
@media screen and (min-width: 1024px) {
  #app #navLinks #menuHamburguesa {
    display: none;
  }
}
</style>
