import Users from '../model/users';
import JWT from 'jsonwebtoken';

export const ensureAuthenticated = (req: any, res: any, next: any) => {
    const token = req.headers['authorization']
    if (token) {
        JWT.verify(token, 'env.JWT_SCERET', (err: any, decoded: any) => {
            if (err) {
                return res.status(401).json({status: 'error', message: 'Unautherised access.'})
            }
            req.decoded = decoded
            Users.findOne({ email: decoded.email}, (err: any, user: any) => {
                if (err) {
                    return res.status(401).json({status: 'error', message: 'Unautherised access.'})
                }
                if (user) {
                    const currentUser = {
                        id: user._id,
                        fullName: user.fullName,
                        email: user.email
                    }

                    req.user = currentUser
                    next()
                } else {
                    return res.status(401).json({status: 'error', message: 'Unautherised access.'})
                }
            })
        })
    } else {
        return res.status(401).json({status: 'error', message: 'Unautherised access.'})
    }
}

export const signRefreshToken = (email: any) => {
    return new Promise((resolve, reject) => {
        const payload = {
            email: email
        }
        const secret = 'env.JWT_SCERET';
        const options = {}
        JWT.sign(payload, secret, (err, token) => {
            if (err) {
                reject({error: 'There was an error'})
                return;
            }
            resolve(token)
            return;
        })
    })
}
