const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const pool = new Pool({
  user: "mi_usuario",
  host: "localhost",
  database: "fullstack_tech_challenge",
  password: "1234",
  port: 5432,
});

const app = express();

app.use(cors());
app.use(express.json());

app.get("/users", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users");
    res.json(result.rows);
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    res.status(500).json({ error: "Hubo un error al obtener los usuarios" });
  }
});

app.get("/users/:id", async (req, res) => {
  const { id } = req.params; // Obtener el ID desde la URL
  try {
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    if (result.rows.length > 0) {
      res.json(result.rows[0]); // Retornar los detalles del usuario
    } else {
      res.status(404).json({ error: "Usuario no encontrado" }); // Manejar si no se encuentra el usuario
    }
  } catch (error) {
    console.error("Error al obtener el usuario:", error);
    res.status(500).json({ error: "Hubo un error al obtener el usuario" });
  }
});

app.post("/adduser", async (req, res) => {
  const { name, email, credits } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO users (name, email, credits) VALUES ($1, $2, $3) RETURNING *",
      [name, email, credits]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error al añadir usuarios:", error);
    res.status(500).json({ error: "Hubo un error al añadir al nuevo usuario" });
  }
});

// Modificar un usuario
app.put("/users/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email, credits } = req.body;

  try {
    const result = await pool.query(
      "UPDATE users SET name = $1, email = $2, credits = $3 WHERE id = $4 RETURNING *",
      [name, email, credits, id]
    );

    if (result.rows.length > 0) {
      res.json(result.rows[0]); // Retornar el usuario modificado
    } else {
      res.status(404).json({ error: "Usuario no encontrado" });
    }
  } catch (error) {
    console.error("Error al modificar el usuario:", error);
    res.status(500).json({ error: "Hubo un error al modificar el usuario" });
  }
});

// Eliminar un usuario
app.delete("/users/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "DELETE FROM users WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length > 0) {
      res.json({
        message: "Usuario eliminado correctamente",
        user: result.rows[0],
      });
    } else {
      res.status(404).json({ error: "Usuario no encontrado" });
    }
  } catch (error) {
    console.error("Error al eliminar el usuario:", error);
    res.status(500).json({ error: "Hubo un error al eliminar el usuario" });
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Servidor Express en puerto ${port}`);
});
