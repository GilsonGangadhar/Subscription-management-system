import express from "express";
import { PORT } from "./config/env.js";
import connectToDatabase from "./database/mongodb.js";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import subscriptionRouter from "./routes/subscription.routes.js";

const app = express();
const port = PORT || 3000;

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("api/v1/subscriptions", subscriptionRouter);

app.get("/", (req, res) => {
  res.send("Welcome to the subscription tracker API");
});

app.listen(3000, async () => {
  console.log(
    `subscription management system is running on https://localhost:${port}`
  );
  await connectToDatabase();
});

export default app;
