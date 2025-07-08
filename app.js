import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Welcome to the subscription tracker API");
});

app.listen(3000, () => {
  console.log(
    `subscription management system is running on https://localhost:3000`
  );
});
