<template>
  <div>
    <header class="newUsers__header">
      <h2 class="header__newUser">User: {{ userName }}</h2>
      <button class="save__info" @click="addUser">Save</button>
    </header>

    <form @submit.prevent="addUser">
      <label for="userName" class="user__name">
        Name:
        <input
          v-model="userName"
          name="userName"
          type="text"
          class="name__input"
          placeholder="Introduce user's name"
        />
      </label>

      <label for="userEmail" class="user__email">
        Email:
        <input
          v-model="userEmail"
          name="userEmail"
          type="email"
          class="email__input"
          placeholder="Introduce user's email"
        />
      </label>

      <label for="userCredits" class="user__credits">
        Credits:
        <button
          class="substract__credits"
          @click.prevent="substractCredits"
          :disabled="counter === 0"
        >
          -
        </button>
        <p class="counter">{{ counter }}</p>
        <button class="add__credits" @click.prevent="addCredits">+</button>
      </label>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userName: "",
      userEmail: "",
      counter: 0,
    };
  },
  methods: {
    async addUser() {
      try {
        const response = await fetch("http://localhost:5000/adduser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: this.userName,
            email: this.userEmail,
            credits: this.counter,
          }),
        });

        if (!response.ok) {
          throw new Error("Error al agregar el usuario");
        }

        const newUser = await response.json();
        console.log("Usuario agregado:", newUser);

        // Emitir evento global para actualizar tabla
        window.dispatchEvent(new Event("user-added"));

        // Redirigir a la tabla de usuarios
        this.$router.push("/");
      } catch (error) {
        console.error("Hubo un error al agregar el usuario:", error);
      }
    },
    addCredits() {
      this.counter++;
    },
    substractCredits() {
      if (this.counter > 0) {
        this.counter--;
      }
    },
  },
};
</script>

<style scoped>
:root {
  --color-button: #b2e8b7;
  --color-button-hover: #5eff6e;
}
body {
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  overflow: hidden;
}
.newUsers__header {
  display: flex;
  flex-direction: row;
  padding: 0 50px;
  align-items: center;
}

.save__info {
  background-color: var(--color-button);
  margin-left: auto;
  height: 50%;
  border-radius: 5px;
  transition: all 0.3s ease-in-out;
}

.save__info:hover {
  cursor: pointer;
  background-color: var(--color-button-hover);
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

.user__credits {
  display: flex;
  flex-direction: row;
  padding: 0 65px;
  align-items: center;
  justify-content: space-around;
}

.substract__credits,
.add__credits {
  cursor: pointer;
  margin: 0 10px;
}

p.counter {
  padding: 0 70px;
  border: 1px solid black;
  border-radius: 5px;
}
</style>
