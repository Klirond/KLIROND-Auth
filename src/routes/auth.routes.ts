import express from "express";
import type { Router } from "express";

import { register, verifyAccount } from "../controller/auth.controller.ts";

const AuthRouter: Router = express.Router();

AuthRouter.post("/register", register);
AuthRouter.post("/verify", verifyAccount);

export default AuthRouter;
