import geoip from 'fast-geoip';

export type GeoIpLookup = Awaited<ReturnType<typeof geoip.lookup>>;
export { geoip };
