import { Generated, ColumnType, Updateable } from 'kysely';

export type Resource = {
  id: Generated<number>;
  created_at: ColumnType<Date, 'timestamp'>;
  updated_at: ColumnType<Date, 'timestamp', 'timestamp'>;
  deleted_at: ColumnType<Date | null, 'timestamp', 'timestamp'>;
};
