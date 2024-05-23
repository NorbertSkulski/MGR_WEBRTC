import { NextFunction, Request, Response, Router } from "express";

import { Auth, READ } from "../../middleware/Auth/passport";
import { checkIsUser } from "../../utils/Types/CheckType";
import { requerstError } from "../../utils/Errors/Errors";
import { contactList, deleteContact } from "../../service/Friend/FriendService";

const router: Router = Router();

router.get('/contactList', Auth, READ, async (req: Request, res: Response, next: NextFunction) => {
    try {

        if (!checkIsUser(req?.user)) {
            throw "Is not a user!";
        };

        res.send(await contactList(req.user));
    } catch (err) {
        next(requerstError(err));
    }
});

router.delete("/delete/:uuid", Auth, READ, async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!checkIsUser(req?.user)) {
            throw "Is not a user!";
        };
        res.send(await deleteContact(req.user, req?.params?.uuid));
    } catch (err) {
        next(requerstError(err));
    }
})



export default router;