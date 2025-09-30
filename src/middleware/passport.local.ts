import { prisma } from "config/client";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { getUserWithRoleById } from "services/auth/auth.service";
import { comparePassword } from "services/user.service";


const configPassportLocal = () => {
    passport.use(new LocalStrategy({
        passReqToCallback: true
    }, async function verify(req, username, password, callback) {

        const { session } = req as any;
        if (session?.messages?.length) {
            session.messages = []
        }

        console.log(">>> check username/password : ", username, password)
        const user = await prisma.user.findUnique({
            where: { username: username }
        })

        if (!user) {
            //throw error
            // throw new Error(`Username : ${username} not found`)
            return callback(null, false, { message: `Username/password Invalid` });
        }

        //compare password
        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) {
            // throw new Error(`Invalid password`)
            return callback(null, false, { message: `Username/password Invalid` });
        }

        return callback(null, user as any);
    }));
    passport.serializeUser(function (user: any, callback) {
        callback(null, { id: user.id, username: user.username });
    });

    passport.deserializeUser(async function (user: any, callback) {
        const { id, username } = user;
        //query to db
        const userInDb = await getUserWithRoleById(id);
        return callback(null, { ...userInDb });
    });
}

export default configPassportLocal;