<template>
  <header>
    <nav>
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
          <a href="">Tiendas</a>
          <a href="">Comidas</a>
          <a href="">Ofertas</a>
          <a href="">Mis pedidos</a>
          <a href="">Sugerencias y reclamos</a>
        </ul>
      </div>
    </nav>
    <div id="banner">
      <img src="../assets/images/foodBanner.jpg" alt="food banner" />
    </div>
  </header>
</template>

<script>
export default {
  name: "header-component",
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
</style>
