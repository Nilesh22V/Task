const express = require("express");
require("dotenv/config");
const cors = require("cors");
const helmet = require("helmet");
const v1Routes = require("./api/v1/routes.index.js");
const { Sequelize } = require("sequelize");
const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

const app = express();

// set security HTTP headers
app.use(helmet());

// added cross origin request support
app.use(cors());
// parse json request body
app.use(express.json());
// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));
// attach routes
app.get("/", (req, res) => {
  res.send("server Running");
});
app.use("/api/v1", v1Routes);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");

    app.listen(process.env.PORT, () => {
      console.log("API server started sucessfully on port " + process.env.PORT);
    });
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });
