import { ColumnType } from 'kysely';
import { Resource } from '@/db/models/resource';
export type SecretTable = Resource & {
  owner_id: ColumnType<number, 'int'>;

  key: ColumnType<string, 'varchar'>;
  token: ColumnType<string, 'varchar'>;

  views: ColumnType<number, 'int', 'int'>;
  max_views: ColumnType<number, 'int'>;

  expires_at: ColumnType<Date | null, 'timestamp', 'timestamp'>;
};
