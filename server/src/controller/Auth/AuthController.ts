import { NextFunction, Request, Response, Router } from "express";
import { login } from "../../service/Auth/AuthService";

const router: Router = Router();

router.post('/login', async (req: Request, res: Response, next:NextFunction) => {
    try {
        const {token, userlogin} = await login(req.body);
        res.cookie("Authorization",`${token}`,{signed:true,httpOnly:true, secure:true, sameSite:true})
        res.json({login:userlogin});
    } catch (err) {
        next(err);
    }
});

router.post('/logout',(req: Request, res: Response)=>{
    res.clearCookie("Authorization",{signed:true,httpOnly:true, secure:true, sameSite:true});
    res.json({message:"Log out successfully!"})
})


export default router;