"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserService_1 = require("../../service/User/UserService");
const passport_1 = require("../../middleware/Auth/passport");
const router = (0, express_1.Router)();
router.get('/', passport_1.Auth, passport_1.READ, (req, res) => {
    res.send('Server running');
});
router.post('/registration', async (req, res) => {
    try {
        res.send(await (0, UserService_1.registration)(req.body));
    }
    catch (err) {
        res.status(500).send(err.message);
    }
});
exports.default = router;
