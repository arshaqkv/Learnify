import dotenv from "dotenv";
dotenv.config();

interface Config {
  port: number;
  databaseUrl: string;
  jwtAccessSecret: string;
  jwtRefreshSecret: string;
  environment: string;
  user: string,
  pass: string
}

export const config: Config = {
  port: parseInt(process.env.PORT || "3000", 10),
  databaseUrl: process.env.DATABASE_URL as string,
  jwtAccessSecret: process.env.JWT_ACCESS_SECRET as string,
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET as string,
  environment: process.env.NODE_ENV as string,
  user: process.env.USER as string,
  pass: process.env.PASS as string
};
