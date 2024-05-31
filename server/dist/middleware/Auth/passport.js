import passport from 'passport';
import { Strategy as JwtStrategy } from 'passport-jwt';
import { get } from 'lodash';
import { permissionError } from '../../utils/Errors/Errors';
import { Permission } from '@prisma/client';
import { checkIsUser } from '../../utils/Types/CheckType';
import { prisma } from '../../database/Datadase';
const customExtractor = (req) => {
    const token = get(req, 'signedCookies.Authorization', null);
    if (token && token.startsWith(`${process.env.TOKEN_PREFIX}`))
        return token.replace(`${process.env.TOKEN_PREFIX}`, "").trim();
    return null;
};
const options = {
    passReqToCallback: true,
    jwtFromRequest: customExtractor,
    secretOrKey: process.env.SECRET_JWT,
    algorithms: [`${process.env.JWT_ALGORITHM}`]
};
passport.use(new JwtStrategy(options, async (req, payload, done) => {
    const { login } = payload;
    const user = await prisma.user.findFirst({ where: { login } });
    if (!user) {
        done(null, false);
        return;
    }
    done(null, user);
}));
passport.serializeUser((user, cb) => {
    process.nextTick(() => {
        cb(null, { id: user.uuid });
    });
});
passport.deserializeUser((user, cb) => {
    process.nextTick(() => {
        cb(null, user);
    });
});
export const Auth = (req, res, next) => passport.authenticate('jwt', { session: false })(req, res, next);
export const READ = (req, res, next) => {
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
export const UPDATE = (req, res, next) => {
    if (checkIsUser(req.user)) {
        if (req.user.admin)
            return next();
        if (req.user.permissions.includes(Permission.UPDATE))
            return next();
    }
    next(permissionError);
};
export const CREATE = (req, res, next) => {
    if (checkIsUser(req.user)) {
        if (req.user.admin)
            return next();
        if (req.user.permissions.includes(Permission.CREATE))
            return next();
    }
    next(permissionError);
};
export const DELETE = (req, res, next) => {
    if (checkIsUser(req.user)) {
        if (req.user.admin)
            return next();
        if (req.user.permissions.includes(Permission.DELETE))
            return next();
    }
    next(permissionError);
};
