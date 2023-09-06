import passport from 'passport';
import { Strategy as JwtStrategy } from 'passport-jwt';
import { get } from 'lodash';
import { Request, Response, NextFunction } from 'express';
import { User } from '../../model/models/User';
import { ERROR_TYPE } from '../../Types/Errors';
import { perrmieionsError } from '../../utils/Errors/Errors';


const customExtractor = (req: Request) => {
    const token: string = get(req, 'signedCookies.Authorization', null);
    if (token && token.startsWith("Bearer"))
        return token.replace("Bearer", "").trim();
    return null;
}

const options: object = {
    passReqToCallback: true,
    jwtFromRequest: customExtractor,
    secretOrKey: process.env.SECRET_JWT,
    algorithms: ['HS512']
}


passport.use(new JwtStrategy(options, (req,payload, done) => {

    console.log("TESTE::", payload)
    //todo jutro


    done(null, { uuid: "wqewqeqweqweqwe21321312eqwe", name: "ELIO" })

}))

passport.serializeUser((user: User, cb) => {
    process.nextTick(() => {
        cb(null, { id: user.uuid, username: user.name })
    })
})
passport.deserializeUser((user, cb) => {
    process.nextTick(() => {
        cb(null, user)
    })
})


export const Auth = (req:Request, res:Response, next:NextFunction) => passport.authenticate('jwt', { session: false  })(req, res,next);

export const READ = (req:Request, res:Response, next:NextFunction) => {
    console.log("is_Auth: ",req.isAuthenticated())
    // next()
    next(perrmieionsError);   
};
