# fullstack_tech_challenge backend

## Setting up the database

This tech challenge uses postgre as database engine.

You can run postgre using docker:
```sh
docker run --name local-postgres -p 5432:5432 -e POSTGRES_PASSWORD=1234 -e POSTGRES_USER=mi_usuario postgres
```

Once postgres is running, you should create the database needed for the backend:
```sql
CREATE DATABASE fullstack_tech_challenge
    WITH OWNER = mi_usuario;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    credits INTEGER NOT NULL DEFAULT 0
);
```

You can then insert some test data:
```sql
INSERT INTO users (name, email, credits)
VALUES
    ('John Doe', 'john.doe@example.com', 10),
    ('Jane Smith', 'jane.smith@example.com', 15),
    ('Mike Brown', 'mike.brown@example.com', 20),
    ('Alice Johnson', 'alice.johnson@example.com', 5),
    ('Bob White', 'bob.white@example.com', 30);
```


## Running the server

### Installing dependencies

```sh
npm install
```

### Starting the server
sh
```
node server.js
```
