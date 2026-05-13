import express from "express";
import type { Router } from "express";

import {
  register,
  verifyAccount,
  login,
} from "../controller/auth.controller.ts";

const AuthRouter: Router = express.Router();

AuthRouter.post("/register", register);
AuthRouter.post("/verify", verifyAccount);
AuthRouter.post("/login", login);

export default AuthRouter;
