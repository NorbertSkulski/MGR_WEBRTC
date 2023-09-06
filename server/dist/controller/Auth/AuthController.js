"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AuthService_1 = require("../../service/Auth/AuthService");
const router = (0, express_1.Router)();
router.post('/login', async (req, res) => {
    try {
        res.cookie("Authorization", "Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.T7Ts_Qv6ZTu4CC9avJPQQDrEPfcj0Rn_yY-v7xSg1Eq_FXX445y6wPvlAYSF05t6KwjFDhFpZ6Q8kYqUQYD6qg", { signed: true, httpOnly: true, secure: true, sameSite: true });
        res.send(await (0, AuthService_1.login)(req.body));
    }
    catch (err) {
        res.status(500).send(err.message);
    }
});
exports.default = router;
