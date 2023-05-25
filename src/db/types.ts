import type { ColumnType } from "kysely";

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;

export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export interface Secret {
  id: Generated<number>;
  ownerId: number;
  key: string;
  token: string;
  views: Generated<number>;
  maxViews: Generated<number>;
  expiresAt: Timestamp | null;
  deletedAt: Timestamp | null;
  createdAt: Generated<Timestamp>;
  updatedAt: Generated<Timestamp>;
}

export interface User {
  id: Generated<number>;
  lastUpload: Timestamp | null;
  createdAt: Generated<Timestamp>;
  updatedAt: Generated<Timestamp>;
}

export interface DB {
  secret: Secret;
  user: User;
}
