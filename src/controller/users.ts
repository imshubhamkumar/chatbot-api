import express, { Request, Response } from "express";
const router = express.Router();
import * as passportLocal from 'passport-local';
import passport from 'passport';
import Users from "../model/users";
import { comparePassword } from "../model/users";
import { signRefreshToken } from '../utilities/auth.service';


const LocalStrategy = passportLocal.Strategy;

router.get("/", (req: Request, res: Response) => {
  return res.status(200).json({ message: "this is the user route" });
});

router.post('/authenticate', async (req, res, next) => {
    const user = await Users.countDocuments();
    if (user <= 0) {
        const firstUser = new Users({
            fullName: 'Admin',
            email: 'admin@buddyest.com',
            password: 'admin',
        })
        firstUser.save();
    } else {
        passport.authenticate('local', (err, user) => {
            if (err)  return next(err);
            if (!user) {
                return res.status(200).json({errors: false, message: 'Email/Password is wrong.'})
            }
            req.logIn(user, async (err) => {
                if (err) {  
                    return next(err)
                }
                const accessToken = await signRefreshToken(user.email)
                Users.updateOne({_id: user._id}, {active: true}, (err: any, data: any) => {
                    if(err) {
                        return res.status(200).json({errors: false, data: 'Error while login please try again'})
                    } else {
                        return res.status(200).json({errors: true, message: 'Login Successfull', accessToken: accessToken, user})
                    }
                })
            })
        })(req, res, next)
    }
})

passport.use(new LocalStrategy({usernameField: 'email'},
    (email, password, done) =>{
        Users.findOne({email: email}, (err: any, user: any) => {
            if (err) {
                return done(err)
            }
            if (!user) {
                return done(null, false, { message: 'There is no user with this email id.' });
            }
            comparePassword(password, user.password, (err, isMatch) => {
                if (err) {
                    return done(err)
                }
                if (isMatch) {
                    return done(null, user)
                } else {
                    return done(null, false)
                }
            })
        })
    }
))

passport.serializeUser(function (user, done) {
    done(null, user)
})

passport.deserializeUser((user: any, done) => {
    Users.findOne({ _id: user._id }, (err: any, user: any) => {
        done(err, user)
    })
})

export = router;
