<template>
  <div>
    <header class="newUsers__header">
      <h2 class="header__newUser">User: {{ userName }}</h2>
    </header>

    <form @submit.prevent="saveUser">
      <label for="userName" class="user__name">
        Name:
        <input
          v-model="userName"
          type="text"
          class="name__input"
          placeholder="Introduce user's name"
        />
      </label>

      <label for="userEmail" class="user__email">
        Email:
        <input
          v-model="userEmail"
          type="email"
          class="email__input"
          placeholder="Introduce user's email"
        />
      </label>

      <label for="userCredits" class="user__credits">
        Credits:
        <button
          type="button"
          @click.prevent="substractCredits"
          :disabled="counter === 0"
        >
          -
        </button>
        <p class="counter">{{ counter }}</p>
        <button type="button" @click.prevent="addCredits">+</button>
      </label>

      <div class="buttons">
        <button class="save__info" type="submit">Save</button>
        <button class="delete__info" @click="deleteUser">Delete</button>
      </div>
    </form>
  </div>
</template>

<script>
import { API_URL } from "../config.js";

export default {
  data() {
    return {
      userName: "", // Nombre del usuario
      userEmail: "", // Correo electrónico del usuario
      counter: 0, // Créditos del usuario
      userId: null, // ID del usuario
    };
  },
  mounted() {
    // Obtener el ID del usuario de la ruta
    const userId = this.$route.params.id;
    this.userId = userId;

    // Cargar los detalles del usuario usando el ID
    this.loadUserDetails(userId);
  },
  methods: {
    // Función para cargar los detalles del usuario desde la API
    loadUserDetails(userId) {
      fetch(`${API_URL}/users/${userId}`)
        .then((response) => response.json())
        .then((data) => {
          // Asignar los valores obtenidos a los campos
          this.userName = data.name;
          this.userEmail = data.email;
          this.counter = data.credits;
        })
        .catch((error) => {
          console.error("Error al cargar los detalles del usuario:", error);
        });
    },

    // Guardar los cambios del usuario
    saveUser() {
      fetch(`${API_URL}/users/${this.userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: this.userName,
          email: this.userEmail,
          credits: this.counter,
        }),
      })
        .then((response) => response.json())
        .then(() => {
          // Emitir evento para actualizar la lista de usuarios
          window.dispatchEvent(new Event("user-modified"));
          this.$router.push("/"); // Redirigir a la tabla de usuarios
        })
        .catch((error) => {
          console.error("Hubo un error al guardar el usuario:", error);
        });
    },

    // Eliminar usuario
    deleteUser() {
      fetch(`${API_URL}/users/${this.userId}`, {
        method: "DELETE",
      })
        .then(() => {
          window.dispatchEvent(new Event("user-deleted"));
          this.$router.push("/"); // Volver a la tabla de usuarios
        })
        .catch((error) => {
          console.error("Hubo un error al eliminar el usuario:", error);
        });
    },

    // Aumentar créditos
    addCredits() {
      this.counter++;
    },

    // Disminuir créditos
    substractCredits() {
      if (this.counter > 0) {
        this.counter--;
      }
    },
  },
};
</script>

<style>
:root {
  --color-button: #b2e8b7;
  --color-button-hover: #5eff6e;
  --color-button-delete: #ff0000ad;
  --color-button-delete-hover: #ff0000;
}
body {
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 100vh;
  overflow: hidden;
  box-sizing: border-box;
}
.newUsers__header {
  padding-left: 50px;
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

input {
  padding: 3px;
  border-radius: 5px;
  margin: 5px;
  text-align: center;
}

.user__credits{
    display: flex;
    align-items: center;
}

p.counter{
    border: 1px solid black;
    border-radius: 15px;
    padding: 1px 60px;
}

.buttons {
  display: inline;
  justify-content: center;
  padding: 15px;
}

.save__info {
  background-color: var(--color-button);
  border-radius: 5px;
  margin-left: 45px;
  transition: all 0.3s ease-in-out;
}

.save__info:hover {
  cursor: pointer;
  background-color: var(--color-button-hover);
  transform: scale(1.1);
}

.delete__info {
  background-color: var(--color-button-delete);
  border-radius: 5px;
  margin-left: 50px;
  transition: all 0.3s ease-in-out;
}

.delete__info:hover {
  cursor: pointer;
  background-color: var(--color-button-delete-hover);
  transform: scale(1.1);
}
</style>
