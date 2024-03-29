import Joi from "joi";
import { emailRegexp, typeSubscription } from "../constants/user-constants.js";

export const userRegisterSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().pattern(emailRegexp).required(),
  subscription: Joi.string()
    .valid(...typeSubscription)
    .default("starter"),
  // token: Joi.string().default(null),
});

export const userLoginSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().pattern(emailRegexp).required(),
  // token: Joi.string().default(null),
});
