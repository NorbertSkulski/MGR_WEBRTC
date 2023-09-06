import { Router } from "express";
import UserController from "./User/UserController"
import AuthController from "./Auth/AuthController"

const router: Router = Router();

router.use("/user",UserController)

router.use("/auth",AuthController)

export default router;