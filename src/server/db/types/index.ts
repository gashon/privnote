import { GeoIpLookup } from '@/server/lib';
import { ViewLog as ViewLogTable } from './generated.types';
export * from './generated.types';

export interface ViewLog extends Omit<ViewLogTable, 'geo'> {
  geo?: GeoIpLookup;
}
