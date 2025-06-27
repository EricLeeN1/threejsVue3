import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "./router";
import "@/assets/styles/index.scss";
import App from "./App.vue";

const app = createApp(App);
app.use(createPinia()).use(router).mount("#app");
