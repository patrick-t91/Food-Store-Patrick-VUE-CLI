export default {
  data() {
    return {
      userLogged: null,
      lsUserKey: "Usuario Loggeado",
    };
  },
  mounted() {
    this.userLogged = this.getUserLoggedFromStorage();
    if (this.userLogged == null) return
  },
  methods: {
    getUserLoggedFromStorage () {
        return JSON.parse(localStorage.getItem(this.lsUserKey))
    },
  },
};
