import dotenv from 'dotenv'
dotenv.config()

interface Config{
    port: number,
    databaseUrl: string,
    jwtSecret: string,
    jwtExpiration: string
    environment: string
}


export const config: Config = {
    port: parseInt(process.env.PORT || '3000', 10),
    databaseUrl: process.env.DATABASE_URL as string,
    jwtSecret: process.env.JWT_SECRET as string,
    jwtExpiration: process.env.JWT_EXPIRATION as string,
    environment: process.env.NODE_ENV as string
}