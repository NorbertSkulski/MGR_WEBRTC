"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserService_1 = require("../../service/User/UserService");
const passport_1 = require("../../middleware/Auth/passport");
const CheckType_1 = require("../../utils/Types/CheckType");
const Errors_1 = require("../../utils/Errors/Errors");
const router = (0, express_1.Router)();
router.post('/registration', async (req, res, next) => {
    try {
        res.send(await (0, UserService_1.registration)(req.body));
    }
    catch (err) {
        next((0, Errors_1.requerstError)(err));
    }
});
router.patch('/friendRequest', passport_1.Auth, passport_1.READ, async (req, res, next) => {
    try {
        if (!(0, CheckType_1.checkIsUser)(req?.user)) {
            throw "Is not a user!";
        }
        ;
        res.send(await (0, UserService_1.friendRequest)({ fromUserUuid: req.user.uuid, toUserUuid: req.body.id }));
    }
    catch (err) {
        next((0, Errors_1.requerstError)(err));
    }
});
router.get("/friendRequestsList", passport_1.Auth, passport_1.READ, async (req, res, next) => {
    try {
        if (!(0, CheckType_1.checkIsUser)(req?.user)) {
            throw "Is not a user!";
        }
        ;
        res.send(await (0, UserService_1.friendRequestsLists)({ logedUser: req.user }));
    }
    catch (err) {
        next((0, Errors_1.requerstError)(err));
    }
});
router.patch('/acceptFriendRequest', passport_1.Auth, passport_1.READ, async (req, res, next) => {
    try {
        res.send(await (0, UserService_1.acceptFriendRequest)({ body: req.body }));
    }
    catch (err) {
        next((0, Errors_1.requerstError)(err));
    }
});
router.delete('/deleteFriendRequest/:fromUserUuid/:toUserUuid', passport_1.Auth, passport_1.READ, async (req, res, next) => {
    try {
        res.send(await (0, UserService_1.deleteFriendRequest)(req.params.fromUserUuid, req.params.toUserUuid));
    }
    catch (err) {
        next((0, Errors_1.requerstError)(err));
    }
});
exports.default = router;
