import { Pool } from 'pg';
import { Kysely, PostgresDialect } from 'kysely';
import { Database } from '@/db/models';

export const db = new Kysely<Database>({
  // Use MysqlDialect for MySQL and SqliteDialect for SQLite.
  dialect: new PostgresDialect({
    pool: new Pool({
      host: process.env.POSTGRES_DB,
      port: Number(process.env.POSTGRES_PORT),
      database: process.env.POSTGRES_NAME,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
    }),
  }),
});
