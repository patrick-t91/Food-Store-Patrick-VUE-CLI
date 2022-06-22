export default {
  data() {
    return {
      cartFromStorage: [],
      totalCartPriceFromStorage: 0,
      lsCartKey: "Carrito Pendiente",
      lsCartPriceKey: "Precio Total Carrito"
    };
  },
  created() {
    this.cartFromStorage = this.getCartFromStorage();
    this.totalCartPriceFromStorage = parseInt(this.getTotalCartPriceFromStorage());
    return;
  },
  methods: {
    getCartFromStorage() {
      return JSON.parse(localStorage.getItem(this.lsCartKey));
    },
    getTotalCartPriceFromStorage() {
      return JSON.parse(localStorage.getItem(this.lsCartPriceKey));
    },
  },
};
