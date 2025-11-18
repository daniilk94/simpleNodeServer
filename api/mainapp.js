import express from "express";
import indexPage from "./index.js";
import dataPage from "./data.js";
import homePage from "./homepage.js";
import loginPage from "./login.js";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import { verifyToken } from "./tokenVerification.js";
import { rateLimiter } from "./ratelimiter.js";

const swaggerDocument = YAML.load("./swagger.yaml");
const swaggerOptions = {};

const app = express();

app.get("/favicon.ico", (req, res) => res.status(204).end());
app.use(express.json());
app.use(cors());

app.use(
  "/doc",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, swaggerOptions)
);

app.use("/", homePage);
app.use("/index", indexPage);
app.use("/login", loginPage);
app.use("/data", verifyToken, rateLimiter, dataPage);

app.use((req, res) => {
  res.status(404).json({ Error: "Page not found" });
});

export default app;
