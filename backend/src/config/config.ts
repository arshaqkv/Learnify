import dotenv from "dotenv";
dotenv.config();

interface CorsConfig {
  CLIENT_URL : string;
  ALLOWED_HEADERS : string[];
  ALLOWED_METHODS : string[];
  CREDENTIALS : boolean
}

interface CloudinaryConfig{
  CLOUDINARY_NAME: string,
  CLOUDINARY_API: string, 
  CLOUDINARY_SECRET: string
}

interface StripeConfig{
  SECRET_KEY: string,
  PUBLISHABLE_KEY: string,
  WEBHOOK_SECRET_KEY: string
}

interface Config {
  client_url: string,
  port: number;
  databaseUrl: string;
  jwtAccessSecret: string;
  jwtRefreshSecret: string;
  environment: string;
  user: string,
  pass: string
  cors: CorsConfig,
  googleclientId: string
  cloudinary: CloudinaryConfig 
  stripe: StripeConfig
}

export const config: Config = {
  client_url: process.env.CLIENT_URL as string || 'http://localhost:5173',
  port: parseInt(process.env.PORT || "3000", 10),
  databaseUrl: process.env.DATABASE_URL as string,
  jwtAccessSecret: process.env.JWT_ACCESS_SECRET as string,
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET as string,
  environment: process.env.NODE_ENV as string,
  user: process.env.USER as string,
  pass: process.env.PASS as string,
  cors: {
    CLIENT_URL: process.env.CLIENT_URL || "http://localhost:5173",
    ALLOWED_HEADERS: ['Content-type', 'Authorization'],
    ALLOWED_METHODS: ["GET", "POST", "DELETE", "PUT","PATCH"],
    CREDENTIALS: true
  },
  googleclientId: process.env.CLIENT_ID as string,
  cloudinary: {
    CLOUDINARY_NAME: process.env.CLOUDINARY_NAME as string,
    CLOUDINARY_API: process.env.CLOUDINARY_API as string,
    CLOUDINARY_SECRET: process.env.CLOUDINARY_SECRET as string
  },
  stripe: {
    SECRET_KEY: process.env.STRIPE_SECRET_KEY as string,
    PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY as string,
    WEBHOOK_SECRET_KEY: process.env.WEBHOOK_SECRET_KEY as string
  }
};
