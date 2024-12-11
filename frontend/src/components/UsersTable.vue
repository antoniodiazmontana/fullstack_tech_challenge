<template>
  <div>
    <div class="header">
      <h2 class="table__users">Users:</h2>
      <button @click="addUser" type="button" class="users__addbtn">Add</button>
    </div>

    <div class="main__table">
      <table class="table__table">
        <thead class="table__header">
          <tr>
            <th class="header__item">Name</th>
            <th class="header__item">Email</th>
            <th class="header__item">Credits</th>
          </tr>
        </thead>
        <tbody class="table__body">
          <tr v-for="user in users" :key="user.id" @click="modifyUser(user)">
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.credits }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { API_URL } from "../config.js";

export default {
  data() {
    return {
      users: [],
    };
  },
  mounted() {
    this.loadUsers();
    // Escuchar el evento 'user-added' para actualizar la lista de usuarios
    window.addEventListener("user-added", this.loadUsers);
    window.addEventListener("user-modified", this.loadUsers);
    window.addEventListener("user-deleted", this.loadUsers);
  },
  beforeUnmount() {
    window.removeEventListener("user-added", this.loadUsers);
    window.removeEventListener("user-modified", this.loadUsers);
    window.removeEventListener("user-deleted", this.loadUsers);
  },
  methods: {
    loadUsers() {
      fetch(`${API_URL}/users`)
        .then((response) => response.json())
        .then((data) => {
          this.users = data;
        })
        .catch((error) => {
          console.error("Hubo un error cargando los usuarios:", error);
        });
    },
    addUser() {
      this.$router.push("/adduser");
    },
    modifyUser(user) {
      this.$router.push({ path: `/modifyuser/${user.id}`, state: { user } });
    },
  },
};
</script>

<style>
:root {
  --color-button: #b2e8b7;
  --color-button-hover: #5eff6e;
  --color-header: rgb(207, 244, 240);
}

body {
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 100vh;
  overflow: hidden;
}

.header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.users__addbtn {
  background-color: var(--color-button);
  border: none;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 0 5px 1px #000;
  transition: all 0.3s ease-in-out;
}

.users__addbtn:hover {
  cursor: pointer;
  background-color: var(--color-button-hover);
  transform: scale(1.1);
}

.table__table {
  width: 100%;
  max-width: 800px;
  border-collapse: collapse;
  margin: 20px 0;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

.header__item {
  cursor: default;
  background-color: var(--color-header);
  border: 1px solid black;
  padding: 15px 20px;
  font-weight: bold;
}

.row__item {
  cursor: pointer;
  border: 1px solid black;
  padding: 15px 10px;
}

.table__table th,
.table__table td {
  border: 1px solid black;
  padding: 10px;
  text-align: center;
}

.table__table th {
  background-color: var(--color-header);
}

.table__table tr:hover {
  cursor: pointer;
  background-color: #eef;
}
</style>
