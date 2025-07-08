import express from "express";

import { PORT } from "./config/env.js";
const app = express();
const port = PORT || 3000;

app.get("/", (req, res) => {
  res.send("Welcome to the subscription tracker API");
});

app.listen(3000, () => {
  console.log(
    `subscription management system is running on https://localhost:${port}`
  );
});

export default app;
