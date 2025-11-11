import express from "express";
import indexPage from "./index.js";
import dataPage from "./data.js";
import homePage from "./homepage.js";

const app = express();

app.use(express.json());

app.use("/", homePage);
app.use("/index", indexPage);
app.use("/data", dataPage);

app.use((req, res) => {
  res.status(404).json({ Error: "Page not found" });
});

export default app;
