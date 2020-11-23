const isDev = process.env.NODE_ENV !== 'production';

const host = isDev ? 'localhost' : undefined;
const username = isDev ? 'stackly' : undefined;
const password = isDev ? 'stackly' : undefined;
const database = isDev ? 'stackly' : undefined;
const url = isDev ? '' : process.env.DATABASE_URL;
const port = isDev ? 5432 : undefined;

module.exports = {
  type: 'postgres',
  host,
  username,
  password,
  database,
  url,
  port,
  synchronize: isDev,
};
