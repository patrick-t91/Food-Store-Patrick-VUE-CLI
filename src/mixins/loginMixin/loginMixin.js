export default {
    data () {
        return {
            loginModal: 0,
        }
    },
    methods: {
        toggleLoginModal(value) {
            this.loginModal = value;
            console.log(this.loginModal)
        }
    }
}