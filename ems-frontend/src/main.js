import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";

import router from "./router";
import { createPinia } from "pinia";

import PrimeVue from "primevue/config";

// add css
import "primevue/resources/themes/lara-light-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";

//prime css
import "primevue/resources/themes/lara-light-blue/theme.css";

// primevue componets
import InputText from "primevue/inputtext";
import Textarea from "primevue/textarea";

import Button from "primevue/button";

const app = createApp(App);

// use packages
app.use(router);
app.use(createPinia());
app.use(PrimeVue, { ripple: true });

app.component("UiButton", Button);
app.component("InputText", InputText);
app.component("InputTextarea", Textarea);

app.mount("#app");
