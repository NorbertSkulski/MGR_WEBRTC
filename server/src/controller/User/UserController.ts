import { NextFunction, Request, Response, Router } from "express";
import { registration } from "../../service/User/UserService";
import { prisma } from "../../database/Datadase";
import { User, Permission } from "@prisma/client";
import { Auth, READ } from "../../middleware/Auth/passport";

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
   
    res.json({hello:"world"});
});

router.post('/registration', async (req: Request, res: Response, next:NextFunction) => {
    try {
        res.send(await registration(req.body));
    } catch (err) {
        res.status(500).send(err.message);
    }
});


export default router;