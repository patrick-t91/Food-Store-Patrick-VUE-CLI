<template>
  <div id="categoriesMainContainer">
    <div id="categoriesMainContainer--content">
      <div id="categoriesContainer">
        <div
          id="burgers"
          :class="`category ${
            getCategory && (getCategory === categories.burgers ? 'active' : 'inactive')
          }`"
          @click="selectCategory(categories.burgers)"
        >
          <p>Hamburguesas</p>
          <img
            src="../assets/images/category-burgers.jpg"
            alt="burgers"
            width="150"
            height="120"
          />
        </div>
        <div
          id="pizzas"
          :class="`category ${
            getCategory && (getCategory === categories.pizza ? 'active' : 'inactive')
          }`"
          @click="selectCategory(categories.pizza)"
        >
          <p>Pizzas</p>
          <img
            src="../assets/images/category-pizza.jpg"
            alt="pizza"
            width="150"
            height="120"
          />
        </div>
        <div
          id="empanadas"
          :class="`category ${
            getCategory && (getCategory == categories.empanadas ? 'active' : 'inactive')
          }`"
          @click="selectCategory(categories.empanadas)"
        >
          <p>Empanadas</p>
          <img
            src="../assets/images/category-empanadas.jpg"
            alt="empanadas"
            width="150"
            height="120"
          />
        </div>
        <div
          id="arabe"
          :class="`category ${
            getCategory && (getCategory === categories.comidaArabe ? 'active' : 'inactive')
          }`"
          @click="selectCategory(categories.comidaArabe)"
        >
          <p>Comida árabe</p>
          <img
            src="../assets/images/category-arabe.jpg"
            alt="arabe"
            width="150"
            height="120"
          />
        </div>
        <div
          id="mexicana"
          :class="`category ${
            getCategory && (getCategory === categories.comidaMexicana ? 'active' : 'inactive')
          }`"
          @click="selectCategory(categories.comidaMexicana)"
        >
          <p>Comida mexicana</p>
          <img
            src="../assets/images/category-mexicana.jpg"
            alt="mexicana"
            width="150"
            height="120"
          />
        </div>
        <div
          id="bebidas"
          :class="`category ${
            getCategory && (getCategory === categories.bebidas ? 'active' : 'inactive')
          }`"
          @click="selectCategory(categories.bebidas)"
        >
          <p>Bebidas</p>
          <img
            src="../assets/images/category-bebidas.jpg"
            alt="bebidas"
            width="150"
            height="120"
          />
        </div>
      </div>
      <div id="allCategories">
        <button @click="selectCategory(categories.none)">
          Ver todos los productos
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      categories: {
        burgers: "Burgers",
        pizza: "Pizza",
        empanadas: "Empanadas",
        comidaArabe: "Comida árabe",
        comidaMexicana: "Comida mexicana",
        bebidas: "Bebidas",
        none: "",
      },
    };
  },
  methods: {
    ...mapActions("products", ["setCategory", "setProducts"]),
    selectCategory(category) {
      this.setCategory(category);
    },
  },
  computed: {
    ...mapGetters("products", ["getCategory"]),
  },
};
</script>

<style scoped>
#app #categoriesMainContainer {
  margin-top: 30px;
}
#app #categoriesMainContainer h4 {
  text-align: center;
  background-color: #7e0a0a;
  color: #ffffff;
  padding: 20px;
  font-size: 25px;
}
#app #categoriesMainContainer--content {
  display: flex;
  justify-content: center;
  margin-bottom: 50px;
}
#app #categoriesContainer {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
#app #categoriesContainer .category {
  cursor: pointer;
  padding: 10px;
}
#app #categoriesContainer .category:hover {
  cursor: pointer;
  padding: 10px;
  transform: scale(1.2);
}
#app #categoriesContainer .category.active {
    transform: scale(1.2);
}
#app #categoriesContainer .category.inactive {
    opacity: 0.5
}
#app #categoriesContainer .category p {
  position: absolute;
  color: #7e0a0a;
  font-weight: bold;
  background-color: #ffffff;
}
#app #categoriesMainContainer #allCategories {
  display: flex;
  justify-content: center;
  padding: 40px 0 40px;
}
#app #categoriesMainContainer #allCategories button {
  border: none;
  border-radius: 32px;
  color: #7e0a0a;
  background: #ffffff;
  font-weight: 600;
  cursor: pointer;
  margin: auto;
  text-decoration: underline;
}
#app #categoriesMainContainer #allCategories button:hover {
  background: #7e0a0a;
  color: #ffffff;
  border: none;
}
</style>
