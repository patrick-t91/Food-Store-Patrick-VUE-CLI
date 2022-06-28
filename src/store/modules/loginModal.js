export default {
    namespaced: true,
    state: { loginModal: 0 },
    getters: {
      getLoginModal: (state) => {
        return state.loginModal;
      },
    },
    mutations: {
        TOGGLE_LOGIN_MODAL: (state, value) => {
            state.loginModal = value;
        }
    },
    actions: {
        toggleLoginModal: ({commit}, value) => {
            commit("TOGGLE_LOGIN_MODAL", value)
        }
    },
  };
  