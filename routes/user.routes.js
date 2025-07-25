import { Router } from "express";
import {
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "../controller/user.controller.js";
import authorize from "../middlewares/auth.middleware.js";
import { signUp } from "../controller/auth.controller.js";

const userRouter = Router();

userRouter.get("/", getUsers);
userRouter.get("/:id", authorize, getUser);
userRouter.post("/", signUp);
userRouter.put("/:id", authorize, updateUser);
userRouter.delete("/:id", authorize, deleteUser);

export default userRouter;
