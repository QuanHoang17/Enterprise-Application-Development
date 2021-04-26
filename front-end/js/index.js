console.log("hi");
import Header from './components/Header.vue'

const app = Vue.createApp({
    components: {
        Header
    }
})

app.mount('#app')