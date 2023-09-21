// DotEnv
import 'dotenv/config';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const {
    MYSQL_HOST,
    MYSQL_USER,
    MYSQL_PASSWORD,
    MYSQL_DATABASE,
    SMTP_USER,
    SENDGRID_KEY,
    SECRET,
    UPLOADS_DIR,
    NODE_ENV,
    MJ_APIKEY_PUBLIC,
    MJ_APIKEY_PRIVATE,
} = process.env;

const root = dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 3000;
const env = NODE_ENV || 'production';

export {
    PORT,
    root,
    env,
    MYSQL_HOST,
    MYSQL_USER,
    MYSQL_PASSWORD,
    MYSQL_DATABASE,
    SMTP_USER,
    SENDGRID_KEY,
    SECRET,
    UPLOADS_DIR,
    MJ_APIKEY_PUBLIC,
    MJ_APIKEY_PRIVATE,
};
