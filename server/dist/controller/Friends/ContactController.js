"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_1 = require("../../middleware/Auth/passport");
const CheckType_1 = require("../../utils/Types/CheckType");
const Errors_1 = require("../../utils/Errors/Errors");
const FriendService_1 = require("../../service/Friend/FriendService");
const router = (0, express_1.Router)();
router.get('/contactList', passport_1.Auth, passport_1.READ, async (req, res, next) => {
    try {
        if (!(0, CheckType_1.checkIsUser)(req?.user)) {
            throw "Is not a user!";
        }
        ;
        res.send(await (0, FriendService_1.contactList)(req.user));
    }
    catch (err) {
        next((0, Errors_1.requerstError)(err));
    }
});
exports.default = router;
