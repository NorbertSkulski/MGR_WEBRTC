import { NextFunction, Request, Response, Router } from "express";
import { registration, friendRequest, friendRequestsLists, acceptFriendRequest, deleteFriendRequest } from "../../service/User/UserService";
import { User } from "@prisma/client";

import { Auth, READ } from "../../middleware/Auth/passport";
import { checkIsUser } from "../../utils/Types/CheckType";
import { requerstError } from "../../utils/Errors/Errors";

const router: Router = Router();

router.get('/', Auth, READ, async (req: Request, res: Response) => {

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

router.post('/registration', async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.send(await registration(req.body));
    } catch (err) {
        next(requerstError(err));
    }
});

router.patch('/friendRequest', Auth, READ, async (req: Request, res: Response, next: NextFunction) => {
    try {

        if (!checkIsUser(req?.user)) {
            throw "Is not a user!";
        };

        res.send(await friendRequest({ fromUserUuid: req.user.uuid, toUserUuid: req.body.id }));
    } catch (err) {
        next(requerstError(err));
    }
});

router.get("/friendRequestsList", Auth, READ, async (req: Request, res: Response, next: NextFunction) => {
    try {

        if (!checkIsUser(req?.user)) {
            throw "Is not a user!";
        };

        res.send(await friendRequestsLists({logedUser:req.user}));
    } catch (err) {
        next(requerstError(err));
    }
});

router.patch('/acceptFriendRequest',Auth, READ, async (req: Request, res: Response, next: NextFunction) => {
    try {    
        res.send(await acceptFriendRequest({body:req.body}));
    } catch (err) {
        next(requerstError(err));
    }
})

router.delete('/deleteFriendRequest/:fromUserUuid/:toUserUuid',Auth, READ, async (req: Request, res: Response, next: NextFunction) => {
    try {    
        res.send(await deleteFriendRequest(req.params.fromUserUuid,req.params.toUserUuid));
    } catch (err) {
        next(requerstError(err));
    }
})

export default router;