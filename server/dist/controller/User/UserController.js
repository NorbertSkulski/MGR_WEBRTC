"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserService_1 = require("../../service/User/UserService");
const passport_1 = require("../../middleware/Auth/passport");
const router = (0, express_1.Router)();
router.get('/', passport_1.Auth, passport_1.READ, (req, res) => {
    console.log(req.session);
    res.send('Server running');
});
router.post('/registration', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.send(yield (0, UserService_1.registration)(req.body));
    }
    catch (err) {
        res.status(500).send(err.message);
    }
}));
exports.default = router;
