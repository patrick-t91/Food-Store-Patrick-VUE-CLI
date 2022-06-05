export default {
    data () {
        return {
            loginModal: Number(0),
        }
    },
    methods: {
        toggleLoginModal(value) {
            this.loginModal = value;
        }
    }
}