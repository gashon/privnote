import { Kysely, sql } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .alterTable('secret')
    .dropColumn('owner_id')
    .addColumn('owner_id', 'varchar', (col) => col.notNull())
    .execute();

  await db.schema
    .alterTable('view_log')
    .dropColumn('owner_id')
    .dropColumn('viewer_id')
    .addColumn('owner_id', 'varchar', (col) => col.notNull())
    .addColumn('viewer_id', 'varchar', (col) => col.notNull())
    .execute();

  await db.schema.dropIndex('secret_owner_id_index').execute();
  await db.schema.dropIndex('view_log_owner_id_index').execute();
  await db.schema.dropIndex('view_log_viewer_id_index').execute();

  await db.schema
    .createIndex('secret_owner_id_index')
    .on('secret')
    .column('owner_id')
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

  // remove user association from secret table
  await db.schema.dropTable('user').execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable('user')
    .addColumn('id', 'uuid', (col) =>
      col.primaryKey().defaultTo(sql`gen_random_uuid()`),
    )
    .addColumn('last_upload', 'timestamp')
    .addColumn('created_at', 'timestamp', (col) =>
      col.defaultTo(sql`now()`).notNull(),
    )
    .addColumn('updated_at', 'timestamp', (col) =>
      col.defaultTo(sql`now()`).notNull(),
    )
    .execute();

  await db.schema
    .createIndex('user_id_index')
    .on('user')
    .column('id')
    .execute();

  await db.schema
    .alterTable('secret')
    .dropColumn('owner_id')
    .addColumn('owner_id', 'uuid', (col) => col.notNull())
    .execute();

  await db.schema
    .alterTable('view_log')
    .dropColumn('owner_id')
    .dropColumn('viewer_id')
    .addColumn('owner_id', 'uuid', (col) => col.notNull())
    .addColumn('viewer_id', 'uuid', (col) => col.notNull())
    .execute();

  await db.schema.dropIndex('secret_owner_id_index').execute();
  await db.schema.dropIndex('view_log_owner_id_index').execute();
  await db.schema.dropIndex('view_log_viewer_id_index').execute();

  await db.schema
    .createIndex('secret_owner_id_index')
    .on('secret')
    .column('owner_id')
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
}
