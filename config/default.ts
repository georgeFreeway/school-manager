import dotenv from 'dotenv';
dotenv.config();

export default {
    host: process.env.HOST!,
    port: process.env.PORT!,
    logLevel: process.env.LOG_INFO!,
    mysql_database_name: process.env.MY_SQL_DATABASE_NAME!,
    mysql_username: process.env.MY_SQL_USERNAME!,
    mysql_password: process.env.MY_SQL_PASSWORD!,
    mysql_dialect: process.env.MY_SQL_DIALECT!,

    accessTokenPrivateKey: process.env.ACCESS_TOKEN_PRIVATE_KEY,
    accessTokenPublicKey: process.env.ACCESS_TOKEN_PUBLIC_KEY,
    refreshTokenPrivateKey: process.env.REFRESH_TOKEN_PRIVATE_KEY,
    refreshTokenPublicKey: process.env.REFRESH_TOKEN_PUBLIC_KEY
}