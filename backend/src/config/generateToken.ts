import jwt from 'jsonwebtoken'
import { config } from './config'

const ACCESS_TOKEN_SERCRET = config.jwtSecret

export const generateAccessToken = (payload: {id?: string , role: string}): string =>{
    const token = jwt.sign(payload, ACCESS_TOKEN_SERCRET, {expiresIn: config.jwtExpiration})
    return token
}