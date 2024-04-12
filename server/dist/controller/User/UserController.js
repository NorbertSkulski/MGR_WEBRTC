"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserService_1 = require("../../service/User/UserService");
const passport_1 = require("../../middleware/Auth/passport");
const router = (0, express_1.Router)();
router.get('/', passport_1.Auth, passport_1.READ, async (req, res) => {
    // const newUser = await prisma.user.create({
    //     data:{
    //         email:"norbert@gmail.com",
    //         name :"norbert",
    //         phone: "973123213",
    //         login: "norbert",
    //         password:"password",
    //         permissions: [Permission.READ]
    //     }
    // })
    // const oldUser: User|any = await prisma.user.findFirst({
    //     where:{
    //         uuid:"879dbb07-1d18-45d5-823d-a5aef94864db"
    //     },
    // })
    // const newUser = await prisma.user.update({
    //     where:{
    //         uuid:"879dbb07-1d18-45d5-823d-a5aef94864db"
    //     },
    //     data:{
    //        permissions:[...oldUser.permissions,Permission.UPDATE]           
    //     }
    // })
    res.json({ hello: "world" });
});
router.post('/registration', async (req, res, next) => {
    try {
        res.send(await (0, UserService_1.registration)(req.body));
    }
    catch (err) {
        res.status(500).send(err.message);
    }
});
exports.default = router;
