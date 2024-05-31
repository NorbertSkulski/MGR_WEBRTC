import { NextFunction, Request, Response, Router } from "express";
import { registration, friendRequest, friendRequestsLists, acceptFriendRequest, deleteFriendRequest } from "../../service/User/UserService";

import { Auth, READ } from "../../middleware/Auth/passport";
import { checkIsUser } from "../../utils/Types/CheckType";
import { requerstError } from "../../utils/Errors/Errors";

const router: Router = Router();

router.post('/registration', async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.send(await registration(req.body));
    } catch (err:any) {
        next(requerstError(err));
    }
});

router.patch('/friendRequest', Auth, READ, async (req: Request, res: Response, next: NextFunction) => {
    try {

        if (!checkIsUser(req?.user)) {
            throw "Is not a user!";
        };

        res.send(await friendRequest({ fromUserUuid: req.user.uuid, toUserUuid: req.body.id }));
    } catch (err:any) {
        next(requerstError(err));
    }
});

router.get("/friendRequestsList", Auth, READ, async (req: Request, res: Response, next: NextFunction) => {
    try {

        if (!checkIsUser(req?.user)) {
            throw "Is not a user!";
        };

        res.send(await friendRequestsLists({logedUser:req.user}));
    } catch (err:any) {
        next(requerstError(err));
    }
});

router.patch('/acceptFriendRequest',Auth, READ, async (req: Request, res: Response, next: NextFunction) => {
    try {    
        res.send(await acceptFriendRequest({body:req.body}));
    } catch (err:any) {
        next(requerstError(err));
    }
})

router.delete('/deleteFriendRequest/:fromUserUuid/:toUserUuid',Auth, READ, async (req: Request, res: Response, next: NextFunction) => {
    try {    
        res.send(await deleteFriendRequest(req.params.fromUserUuid,req.params.toUserUuid));
    } catch (err:any) {
        next(requerstError(err));
    }
})

export default router;