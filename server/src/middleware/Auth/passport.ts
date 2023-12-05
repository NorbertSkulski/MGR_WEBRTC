import passport from 'passport';
import { Strategy as JwtStrategy, StrategyOptions } from 'passport-jwt';
import { get } from 'lodash';
import { Request, Response, NextFunction } from 'express';
import { permissionError } from '../../utils/Errors/Errors';
import { User } from '@prisma/client';
import { checkIsUser } from '../../utils/Types/CheckType';


const customExtractor = (req: Request) => {
    const token: string = get(req, 'signedCookies.Authorization', null);
    if (token && token.startsWith("Bearer"))
        return token.replace("Bearer", "").trim();
    return null;
}

const options: StrategyOptions = {
    passReqToCallback: true,
    jwtFromRequest: customExtractor,
    secretOrKey: process.env.SECRET_JWT,
    algorithms: ['HS512']
}


passport.use(new JwtStrategy(options, (req: Request, payload: any, done: Function) => {

    console.log("TEST:", payload)
    //todo 


    done(null, { uuid: "test", name: payload.name, isAdmin: payload.admin })

}))

passport.serializeUser((user: User | any, cb) => {
    process.nextTick(() => {
        cb(null, { id: user.uuid })
    })
})
passport.deserializeUser((user: User, cb) => {
    process.nextTick(() => {
        cb(null, user)
    })
})


export const Auth = (req: Request, res: Response, next: NextFunction) => passport.authenticate('jwt', { session: false })(req, res, next);

export const READ = (req: Request, res: Response, next: NextFunction) => {
    if (checkIsUser(req.user)) {
        if (req.user.admin) {
            return next();
        }
    }
    next(permissionError);
};

