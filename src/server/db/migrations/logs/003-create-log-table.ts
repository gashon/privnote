import { Kysely, sql } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable('view_log')
    .addColumn('id', 'uuid', (col) =>
      col.primaryKey().defaultTo(sql`gen_random_uuid()`),
    )
    .addColumn('owner_id', 'uuid', (col) => col.notNull().references('user.id'))
    .addColumn('viewer_id', 'uuid', (col) =>
      col.notNull().references('user.id'),
    )
    .addColumn('secret_id', 'uuid', (col) =>
      col.notNull().references('secret.id'),
    )
    .addColumn('ip_address', 'varchar(45)', (col) => col.notNull())
    .addColumn('user_agent', 'varchar', (col) => col.notNull())
    .addColumn('deleted_at', 'timestamp')
    .addColumn('created_at', 'timestamp', (col) =>
      col.defaultTo(sql`now()`).notNull(),
    )
    .addColumn('updated_at', 'timestamp', (col) =>
      col.defaultTo(sql`now()`).notNull(),
    )
    .execute();

  await db.schema
    .createIndex('view_log_owner_id_index')
    .on('view_log')
    .column('owner_id')
    .execute();

  await db.schema
    .createIndex('view_log_viewer_id_index')
    .on('view_log')
    .column('viewer_id')
    .execute();

  await db.schema
    .createIndex('view_log_secret_id_index')
    .on('view_log')
    .column('secret_id')
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('view_log').execute();
}
