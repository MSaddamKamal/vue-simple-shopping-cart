import {createApp} from 'vue';
import App from './App.vue'
import {applyPolyfills, defineCustomElements} from "h8k-components/loader";

applyPolyfills()
    .then(() => {
        defineCustomElements()
    })

const app = createApp(App)
app.mount('#app')
