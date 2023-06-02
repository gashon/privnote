import type { ColumnType } from "kysely";

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;

export type Json = ColumnType<JsonValue, string, string>;

export type JsonArray = JsonValue[];

export type JsonObject = {
  [K in string]?: JsonValue;
};

export type JsonPrimitive = boolean | null | number | string;

export type JsonValue = JsonArray | JsonObject | JsonPrimitive;

export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export interface Secret {
  id: Generated<string>;
  key: string;
  token: string;
  views: Generated<number>;
  maxViews: Generated<number>;
  expiresAt: Timestamp | null;
  deletedAt: Timestamp | null;
  createdAt: Generated<Timestamp>;
  updatedAt: Generated<Timestamp>;
  ownerId: string;
}

export interface ViewLog {
  id: Generated<string>;
  secretId: string;
  ipAddress: string;
  userAgent: string;
  deletedAt: Timestamp | null;
  createdAt: Generated<Timestamp>;
  updatedAt: Generated<Timestamp>;
  ownerId: string;
  viewerId: string;
  geo: Json | null;
}

export interface DB {
  secret: Secret;
  viewLog: ViewLog;
}
