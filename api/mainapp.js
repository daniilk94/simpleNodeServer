import express from "express";
import indexPage from "./index.js";
import dataPage from "./data.js";
import homePage from "./homepage.js";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";

const swaggerDocument = YAML.load("./swagger.yaml");
const swaggerOptions = {};

const app = express();

app.use(express.json());
app.use(cors());

app.use(
  "/doc",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, swaggerOptions)
);

app.use("/", homePage);
app.use("/index", indexPage);
app.use("/data", dataPage);

app.use((req, res) => {
  res.status(404).json({ Error: "Page not found" });
});

export default app;
