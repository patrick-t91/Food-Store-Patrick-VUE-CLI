<template>
  <footer>
    <div id="footerLinks">
      <a href="">Tiendas</a>
      <a href="">Comidas</a>
      <a href="">Ofertas</a>
      <a href="">Mis pedidos</a>
      <a href="">Sugerencias y reclamos</a>
    </div>
    <div id="legalFacts">
      <a href="">Términos y condiciones</a>
      <a href="">Acerca de nosotros</a>
      <a href="" id="btnArrepentimiento">BOTÓN DE ARREPENTIMIENTO</a>
    </div>
    <img
      src="../assets/images/site-logo.jpg"
      alt="site logo"
      width="90"
      height="90"
    />
  </footer>
</template>

<script>
export default {
  name: "header-component",
};
</script>

<style scoped>
#app footer {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-direction: row;
  flex-direction: row;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  background-color: #7e0a0a;
  color: #ffffff;
  padding: 20px 0 20px;
}

#app footer #footerLinks {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  padding-left: 40px;
}

#app footer #footerLinks a {
  text-decoration: none;
  color: #ffffff;
}

#app footer #footerLinks a:hover {
  background-color: #ffffff;
  color: #7e0a0a;
  font-weight: 700;
  padding: 10px;
}

#app footer #legalFacts {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: space-evenly;
  -ms-flex-pack: space-evenly;
  justify-content: space-evenly;
}

#app footer #legalFacts a {
  text-decoration: none;
  color: #ffffff;
}

#app footer #legalFacts a:hover {
  background-color: #ffffff;
  color: #7e0a0a;
  font-weight: 700;
  padding: 10px;
}

#app footer img {
  padding: 5px 40px 10px 20px;
}
</style>
