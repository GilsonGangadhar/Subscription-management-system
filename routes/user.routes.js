import { Router } from "express";
import { getUser, getUsers } from "../controller/user.controller.js";
import authorize from "../middlewares/auth.middleware.js";

const userRouter = Router();

userRouter.get("/", getUsers);
userRouter.get("/:id", authorize, getUser);
userRouter.post("/", (req, res) => res.send({ title: "CREATE new user" }));
userRouter.put("/", (req, res) => res.send({ title: "UPDATE user" }));
userRouter.delete("/:id", (req, res) => res.send({ title: "Delete user" }));

export default userRouter;
