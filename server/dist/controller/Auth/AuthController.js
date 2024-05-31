import { Router } from "express";
import { login } from "../../service/Auth/AuthService";
import { permissionError } from "../../utils/Errors/Errors";
const router = Router();
router.post('/login', async (req, res, next) => {
    try {
        const { token, userData } = await login(req.body);
        res.cookie("Authorization", `${token}`, { signed: true, httpOnly: true, secure: true, sameSite: true });
        res.json(userData);
    }
    catch (err) {
        next(permissionError);
    }
});
router.post('/logout', (req, res) => {
    res.clearCookie("Authorization", { signed: true, httpOnly: true, secure: true, sameSite: true });
    res.json({ message: "Log out successfully!" });
});
export default router;
