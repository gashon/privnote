import { Kysely, sql } from 'kysely';
import { v4 as uuid } from 'uuid';

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable('secret')
    .addColumn('id', 'uuid', (col) => col.primaryKey().defaultTo(uuid()))
    .addColumn('owner_id', 'uuid', (col) => col.notNull().references('user.id'))
    .addColumn('key', 'varchar', (col) => col.unique().notNull())
    .addColumn('token', 'varchar', (col) => col.notNull())
    .addColumn('views', 'integer', (col) => col.notNull().defaultTo(0))
    .addColumn('max_views', 'integer', (col) => col.notNull().defaultTo(1))
    .addColumn('expires_at', 'timestamp')
    .addColumn('deleted_at', 'timestamp')
    .addColumn('created_at', 'timestamp', (col) =>
      col.defaultTo(sql`now()`).notNull(),
    )
    .addColumn('updated_at', 'timestamp', (col) =>
      col.defaultTo(sql`now()`).notNull(),
    )
    .execute();

  await db.schema
    .createIndex('secret_owner_id_index')
    .on('secret')
    .column('owner_id')
    .execute();

  await db.schema
    .createIndex('secret_key_index')
    .on('secret')
    .column('key')
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('secret').execute();
}
