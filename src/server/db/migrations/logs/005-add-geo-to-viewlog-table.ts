import { Kysely, sql } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema.alterTable('view_log').addColumn('geo', 'jsonb').execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.alterTable('view_log').dropColumn('geo').execute();
}
