import { createApp } from "vue";
import App from "./App.vue";
import "./assets/style.css"; // Custom styles
import router from "./router"; // Router setup

const app = createApp(App);
app.use(router); // Attach the router to the app
app.mount("#app"); // Mount the app to the DOM
