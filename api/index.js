import express from "express";
import connectToDatabase from "../database/mongodb.js";
import authRouter from "../routes/auth.routes.js";
import userRouter from "../routes/user.routes.js";
import subscriptionRouter from "../routes/subscription.routes.js";
import errorMiddleware from "../middlewares/error.middleware.js";
import cookieParser from "cookie-parser";
import arcjetMiddleware from "../middlewares/arcjet.middleware.js";
import workflowRouter from "../routes/workflow.routes.js";

const app = express();

// Connect to database (for serverless, connect on each request)
await connectToDatabase();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(arcjetMiddleware);

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/subscriptions", subscriptionRouter);
app.use("/api/v1/workflows", workflowRouter);

app.use(errorMiddleware);

app.get("/", (req, res) => {
  res.send("Welcome to the subscription management API");
});

export default app;
