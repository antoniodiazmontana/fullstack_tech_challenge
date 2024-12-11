import { createApp } from "vue";

import { createRouter, createWebHistory } from "vue-router";

import App from "./App.vue";
import UsersTable from "./components/UsersTable.vue";
import AddUser from "./components/AddUser.vue";
import ModifyUser from "./components/ModifyUser.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: UsersTable },
    { path: "/adduser", component: AddUser },
    { path: "/modifyuser/:id", component: ModifyUser },
  ],
});

const app = createApp(App);

app.use(router);

app.mount("#app");
