"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AuthService_1 = require("../../service/Auth/AuthService");
const router = (0, express_1.Router)();
router.post('/login', async (req, res, next) => {
    try {
        const { token, userlogin } = await (0, AuthService_1.login)(req.body);
        res.cookie("Authorization", `${token}`, { signed: true, httpOnly: true, secure: true, sameSite: true });
        res.json({ login: userlogin });
    }
    catch (err) {
        next(err);
    }
});
router.post('/logout', (req, res) => {
    res.clearCookie("Authorization", { signed: true, httpOnly: true, secure: true, sameSite: true });
    res.json({ message: "Log out successfully!" });
});
exports.default = router;
