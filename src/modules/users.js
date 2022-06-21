export default {
  namespaced: true,
  state: { userLogged: {} },
  getters: {
    getUsers: (state) => {
      return state.userLogged;
    },
  },
  mutations: {},
  actions: {},
};
