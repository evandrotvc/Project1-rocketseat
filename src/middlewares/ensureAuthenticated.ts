import {Request , Response , NextFunction} from 'express'
import {verify, decode} from 'jsonwebtoken'
import authConfig from '../config/auth'


interface TokenPayload{
    iat: number;
    exp: number;
    sub: string;
}

export default function ensureAuthenticated(request:Request , response:Response , next: NextFunction): void{
    const headerToken = request.headers.authorization

    if(!headerToken) {
        throw new Error("JWT Token is missing.")
    }

    const [bearer, token] = headerToken.split(' ')

    try{
    const decoded = verify(token , authConfig.jwt.secret)

    const {sub} = decoded as TokenPayload // "as" is a casting

    request.user = {
        id: sub,
    }
    return next()

    } catch {
        throw new Error('Invalid JWT token.')

    }
}
