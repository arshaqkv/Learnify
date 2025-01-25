import dotenv from "dotenv";
dotenv.config();

interface CorsConfig {
  CLIENT_URL : string;
  ALLOWED_HEADERS : string[];
  ALLOWED_METHODS : string[];
  CREDENTIALS : boolean
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
  googleclientId: process.env.CLIENT_ID as string
};
