import { SERVER_URL } from "../config/env.js";
import { workflowClient } from "../config/upstash.js";
import Subscription from "../models/subscription.model.js";

export const createSubscription = async (req, res, next) => {
  try {
    const {
      name,
      price,
      currency,
      frequency,
      category,
      paymentMethod,
      startDate,
    } = req.body;

    // Validate req.user._id
    if (!req.user?._id) {
      const error = new Error("User not authenticated");
      error.statusCode = 401;
      throw error;
    }

    const subscription = await Subscription.create({
      name,
      price,
      currency,
      frequency,
      category,
      paymentMethod,
      startDate,
      user: req.user._id, // user data is coming from middleware authorize
    });

    await workflowClient.trigger({
      url: `${SERVER_URL}/api/v1/workflows/subscription/reminder`,
      body: {
        subscriptionId: subscription.id,
      },
      headers: {
        "content-type": "application/json",
      },
      retries: 0,
    });

    res.status(201).json({ success: true, data: subscription });
  } catch (error) {
    next(error);
  }
};

export const getAllSubscriptions = async (req, res, next) => {
  try {
    const subscriptions = await Subscription.find();

    if (!subscriptions || subscriptions.length === 0) {
      const error = new Error("No subscriptions found");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      success: true,
      data: subscriptions,
    });
  } catch (error) {
    next(error);
  }
};

export const getUserSubscriptions = async (req, res, next) => {
  try {
    if (req.user._id.toString() !== req.params.id.toString()) {
      const error = new Error("You are not the owner of this account");
      error.status = 401;
      throw error;
    }

    const userSubscriptions = await Subscription.find({ user: req.params.id });

    if (!userSubscriptions || userSubscriptions.length === 0) {
      const error = new Error("No Subscriptions has been found for this user");
      error.statusCode = 404;
      throw error;
    }

    res.status(201).json({
      success: true,
      data: userSubscriptions,
    });
  } catch (error) {
    next(error);
  }
};

export const getSubscriptionById = async (req, res, next) => {
  try {
    const subscription = await Subscription.findById(req.params.id);
    if (!subscription) {
      const error = new Error("Subscription not found");
      error.status = 404;
      throw error;
    }

    //check if the user owns the subscription
    if (subscription.user.toString() !== req.user._id.toString()) {
      const error = new Error(
        "You are not authorised to view this subscription"
      );
      error.status = 403;
      throw error;
    }

    res.status(200).json({
      success: true,
      data: subscription,
    });
  } catch (error) {
    next(error);
  }
};

export const updateSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.findById(req.params.id);
    if (!subscription) {
      const error = new Error("Subscription not found");
      error.status = 404;
      throw error;
    }

    if (subscription.user.toString() !== req.user._id.toString()) {
      const error = new Error(
        "You are not authorised to update this subscription"
      );
      error.status = 403;
      throw error;
    }

    const allowedUpdates = [
      "name",
      "price",
      "currency",
      "frequency",
      "category",
      "paymentMethod",
      "startDate",
      "renewalDate",
    ];
    const updates = Object.keys(req.body);
    const isValidUpdates = updates.every((update) =>
      allowedUpdates.includes(update)
    );

    if (!isValidUpdates) {
      const error = new Error("Invalid updates provided");
      error.status = 400;
      throw error;
    }

    Object.assign(subscription, req.body);
    await subscription.save();

    res.status(200).json({
      success: true,
      data: subscription,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.findById(req.params.id);
    if (!subscription) {
      const error = new Error("Subscription not found");
      error.status = 404;
      throw error;
    }

    if (subscription.user.toString() !== req.user._id.toString()) {
      const error = new Error(
        "You are not authorized to delete this subscription"
      );
      error.status = 403;
      throw error;
    }

    await subscription.deleteOne();
    res.status(200).json({
      success: true,
      message: "Subscription deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const cancelSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.findById(req.params.id);
    if (!subscription) {
      const error = new Error("Subscription not found");
      error.status = 404;
      throw error;
    }

    if (subscription.user.toString() !== req.user._id.toString()) {
      const error = new Error(
        "You are not authorized to cancel this subscription"
      );
      error.status = 403;
      throw error;
    }

    //check if subscription called cancelled
    if (subscription.status === "cancelled") {
      const error = new Error("Subscription is already cancelled");
      error.status = 400;
      throw error;
    }

    subscription.status = "cancelled";
    await subscription.save();

    res.status(200).json({
      success: true,
      data: subscription,
      message: "Subscription cancelled successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const getUpcomingRenewals = async (req, res, next) => {
  try {
    const today = new Date();
    const nextWeek = new Date(today);
    nextWeek.setDate(today.getDate() + 7);

    const upcomingSubscriptions = await Subscription.find({
      user: req.user._id,
      status: "active",
      renewalDate: {
        $gte: today,
        $lte: nextWeek,
      },
    });

    res.status(200).json({
      success: true,
      data: upcomingSubscriptions,
    });
  } catch (error) {
    next(error);
  }
};
