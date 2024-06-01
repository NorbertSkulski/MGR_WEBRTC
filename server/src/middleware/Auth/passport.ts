import passport from 'passport';
import { Strategy as JwtStrategy, StrategyOptions } from 'passport-jwt';
import { get } from 'lodash';
import { Request, Response, NextFunction } from 'express';
import { permissionError } from '../../utils/Errors/Errors';
import { User, Permission } from '@prisma/client';
import { checkIsUser } from '../../utils/Types/CheckType';
import { prisma } from '../../database/Datadase';


const customExtractor = (req: Request) => {
    const token: string = get(req, 'signedCookies.Authorization', null);

    if (token && token.startsWith(`${process.env.TOKEN_PREFIX}`))
        return token.replace(`${process.env.TOKEN_PREFIX}`, "").trim();
    return null;
}

const options: StrategyOptions = {
    passReqToCallback: true,
    jwtFromRequest: customExtractor,
    secretOrKey: process.env.SECRET_JWT,
    algorithms: [`${process.env.JWT_ALGORITHM}`]
}


passport.use(new JwtStrategy(options, async (req: Request, payload: any, done: Function) => {

    const { login } = payload;
    const user = await prisma.user.findFirst({ where: { login } });

    if (!user) {
        done(permissionError,false);
        return;
    }

    done(null, user);
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
        //Dopisac rozpoznawanie praw i dobobic update idt...

        if (req.user.permissions.includes(Permission.READ))
            return next();

    }
    next(permissionError);
};

export const UPDATE = (req: Request, res: Response, next: NextFunction) => {
    if (checkIsUser(req.user)) {
        if (req.user.admin)
            return next();

        if (req.user.permissions.includes(Permission.UPDATE))
            return next();
    }
    next(permissionError);
};

export const CREATE = (req: Request, res: Response, next: NextFunction) => {
    if (checkIsUser(req.user)) {
        if (req.user.admin)
            return next();

        if (req.user.permissions.includes(Permission.CREATE))
            return next();
    }
    next(permissionError);
};

export const DELETE = (req: Request, res: Response, next: NextFunction) => {
    if (checkIsUser(req.user)) {
        if (req.user.admin)
            return next();

        if (req.user.permissions.includes(Permission.DELETE))
            return next();
    }
    next(permissionError);
};


