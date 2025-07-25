import { Router } from "express";
import {
  cancelSubscription,
  createSubscription,
  deleteSubscription,
  getAllSubscriptions,
  getSubscriptionById,
  getUpcomingRenewals,
  getUserSubscriptions,
  updateSubscription,
} from "../controller/subscription.controller.js";
import authorize from "../middlewares/auth.middleware.js";

const subscriptionRouter = Router();

subscriptionRouter.get("/", authorize, getAllSubscriptions);

subscriptionRouter.get("/:id", authorize, getSubscriptionById);
subscriptionRouter.post("/", authorize, createSubscription);

subscriptionRouter.put("/:id", authorize, updateSubscription);
subscriptionRouter.delete("/:id", authorize, deleteSubscription);
subscriptionRouter.get("/user/:id", authorize, getUserSubscriptions);
subscriptionRouter.put("/:id/cancel", authorize, cancelSubscription);
subscriptionRouter.get("/upcoming-renewals", authorize, getUpcomingRenewals);

export default subscriptionRouter;
