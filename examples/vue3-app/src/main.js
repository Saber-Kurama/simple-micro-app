import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import SimpleMicroApp from "../../../src/index";

SimpleMicroApp.start();
createApp(App).use(router).mount("#app");
