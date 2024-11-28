import "../src/style.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { store } from "./store/store";
import FontAwesomeIcon from "../fontawesome"

const app = createApp(App);
app.component("font-awesome-icon", FontAwesomeIcon);
app.use(router);
app.use(store);
app.mount("#app");
