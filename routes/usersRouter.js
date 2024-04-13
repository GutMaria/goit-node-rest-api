import express from "express";
import {
  register,
  verify,
  resendVerify,
  login,
  getCurrent,
  logout,
  updateSubscription,
  updateAvatar,
} from "../controllers/userControllers.js";
import {
  userRegisterSchema,
  userLoginSchema,
  userEmailSchema,
} from "../schemas/usersSchemas.js";
import validateBody from "../decorators/validateBody.js";
import autenticate from "../middlwares/authenticate.js";
import upload from "../middlwares/upload.js";
// import { verify } from "jsonwebtoken";

const userRouter = express.Router();

userRouter.post("/register", validateBody(userRegisterSchema), register);
userRouter.get("/verify/:verificationToken", verify);
userRouter.post("/verify", validateBody(userEmailSchema), resendVerify);
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
