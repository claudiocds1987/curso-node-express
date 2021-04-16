// npm i -S dotenv esta libreria es para leer el archivo ".env"
require("dotenv").config();
// guardos los datos del archivo .env en objeto config
const config = {
  dev: process.env.NODE_ENV !== "production",
  port: process.env.PORT,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbPort: process.env.DB_PORT,
  dbName: process.env.DB_NAME
};

// exporto el objeto config por eso es entre llevas
module.exports = { config };
