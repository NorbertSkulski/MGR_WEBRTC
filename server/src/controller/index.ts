import { Router } from "express";
import UserController from "./User/UserController"
import AuthController from "./Auth/AuthController"
import ContactController from "./Contact/ContactController"

const router: Router = Router();

router.use("/user",UserController)

router.use("/contact",ContactController)

router.use("/auth",AuthController)

export default router;