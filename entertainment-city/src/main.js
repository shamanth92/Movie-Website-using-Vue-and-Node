import { createApp } from 'vue'
import App from './App.vue'
import routes from './routes.js'
import store from './store/index.js'
import ButtonContainer from './components/Shared/ButtonContainer.vue'
import { library } from "@fortawesome/fontawesome-svg-core";
import { faHeart, faPlus, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import 'ant-design-vue/dist/antd.css';
import Antd from 'ant-design-vue';
import YouTube from 'vue3-youtube'



const app = createApp(App)

app.use(routes)
app.use(store)
app.use(Antd)

library.add(faHeart)
library.add(faPlus)
library.add(faCheck)

app.component('button-container', ButtonContainer)
app.component('font-awesome', FontAwesomeIcon)
app.component('YouTube', YouTube)

app.mount('#app')

