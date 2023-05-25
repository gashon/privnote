export * from './secret';
import { SecretTable } from './secret';

export interface Database {
  secret: SecretTable;
}
