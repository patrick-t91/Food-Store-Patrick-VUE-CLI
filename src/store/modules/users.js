export default {
  namespaced: true,
  state: { userLogged: JSON.parse(localStorage.getItem("userLogged")) || null},
  getters: {
    getUser: (state) => {
      return state.userLogged;
    },
  },
  mutations: {
    LOG_USER: (state, userLogged) => {
      delete userLogged.password
      state.userLogged = userLogged;
      localStorage.setItem("userLogged", JSON.stringify(userLogged));
    },
    CLOSE_USER_SESSION: (state) => {
      state.userLogged = null;
      localStorage.removeItem("userLogged")
    },
  },
  actions: {
    logUser: ({ commit }, userLogged) => {
      commit("LOG_USER", userLogged);
    },
    closeUserSession: ({ commit }) => {
      commit("CLOSE_USER_SESSION");
    },
  },
};
