import { Request, Response, Router } from "express";
import { registration } from "../../service/User/UserService";
import {Auth, READ} from "../../middleware/Auth/passport";

const router: Router = Router();


router.get('/',Auth,READ, (req: Request, res: Response) => {
    console.log(req.session)
    res.send('Server running');
});

router.post('/registration', async (req: Request, res: Response) => {
    try {
        res.send(await registration(req.body));
    } catch (err) {
        res.status(500).send(err.message);
    }
});


export default router;