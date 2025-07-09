import { Router } from "express";
import {
  createSubscription,
  getUserSubscriptions,
} from "../controller/subscription.controller.js";
import authorize from "../middlewares/auth.middleware.js";

const subscriptionRouter = Router();

subscriptionRouter.get("/", authorize, createSubscription);

subscriptionRouter.get("/:id", (req, res) =>
  res.send({ message: "GET subscription details" })
);
subscriptionRouter.post("/", (req, res) =>
  res.send({ message: "CREATE a subscription" })
);
subscriptionRouter.put("/:id", (req, res) =>
  res.send({ message: "UPDATE a subscription" })
);
subscriptionRouter.delete("/:id", (req, res) =>
  res.send({ message: "DELETE a subscription" })
);
subscriptionRouter.get("/user/:id", authorize, getUserSubscriptions);
subscriptionRouter.put("/:id/cancel", (req, res) =>
  res.send({ message: "Cancel subscription" })
);
subscriptionRouter.get("/upcoming-renewals", (req, res) =>
  res.send({ message: "GET all upcoming renewels" })
);

export default subscriptionRouter;
