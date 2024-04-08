import express from "express";
import {
  register,
  login,
  getCurrent,
  logout,
  updateSubscription,
  updateAvatar,
} from "../controllers/userControllers.js";
import {
  userRegisterSchema,
  userLoginSchema,
} from "../schemas/usersSchemas.js";
import validateBody from "../decorators/validateBody.js";
import autenticate from "../middlwares/authenticate.js";
import upload from "../middlwares/upload.js";

const userRouter = express.Router();

userRouter.post("/register", validateBody(userRegisterSchema), register);
userRouter.post("/login", validateBody(userLoginSchema), login);
userRouter.post("/logout", autenticate, logout);
userRouter.get("/current", autenticate, getCurrent);
userRouter.patch("/", autenticate, updateSubscription);
userRouter.patch(
  "/avatars",
  autenticate,
  upload.single("avatar"),

  updateAvatar
);

export default userRouter;
