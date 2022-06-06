export default {
  data() {
    return {
      userLogged: null,
      lsUserKey: "Usuario Loggeado",
    };
  },
  created() {
    this.userLogged = this.getUserLoggedFromStorage();
    if (this.userLogged == null) return
    if (this.userLogged.isAdmin) {
      this.$router.push("/admin")
    }
  },
  methods: {
    getUserLoggedFromStorage () {
        return JSON.parse(localStorage.getItem(this.lsUserKey))
    },
  },
};
