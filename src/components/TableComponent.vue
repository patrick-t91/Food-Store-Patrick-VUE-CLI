<template>
  <div class="tableContainer">
    <h3 class="tiendaTitle"></h3>
    <table class="table">
      <thead>
        <tr>
          <th v-for="(data, i) in dataTitles" :key="i" class="tableTitles">
            {{ data }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(userData, i) in usersData" :key="i">
          <td v-for="(data, i) in userData" :key="i">{{ data }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "formComponent",
  data() {
    return {
      dataTitles: ["Usuario", "Email", "Edad", "Calificacion"],
    };
  },
  props: {
    usersData: {
      type: Array,
      required: true,
    },
  },
  methods: {
    getImgUrl(imgUrl) {
      return require(`@/assets/images/products/${imgUrl}`);
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
table {
  margin: auto;
}
table thead {
  background: #7e0a0a;
  color: #ffffff;
}
table thead .tableTitles {
  max-width: 20%;
  width: 200px;
}
table tbody {
  text-align: center;
  color: #7e0a0a;
  border-left: 1px dotted #7e0a0a;
}
</style>
