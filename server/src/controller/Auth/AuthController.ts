import { Request, Response, Router } from "express";
import { login } from "../../service/Auth/AuthService";

const router: Router = Router();

router.post('/login', async (req: Request, res: Response) => {
    try {
        res.cookie("Authorization"
        ,"Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.T7Ts_Qv6ZTu4CC9avJPQQDrEPfcj0Rn_yY-v7xSg1Eq_FXX445y6wPvlAYSF05t6KwjFDhFpZ6Q8kYqUQYD6qg"
        ,{signed:true,httpOnly:true, secure:true, sameSite:true})
        res.send(await login(req.body));
    } catch (err) {
        res.status(500).send(err.message);
    }
});


export default router;