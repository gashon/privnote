// https://ip-api.com/docs/api:json

export interface GeoIpLookup {
  continent: string;
  country: string;
  regionName: string;
  city: string;
  zip: string;
  lat: number;
  lon: number;
  isp: string;
  org: string;
  as: string;
  mobile: boolean;
  proxy: boolean;
  hosting: boolean;
  query: string;
}

export const getGeoIp = async (ip: string): Promise<GeoIpLookup> => {
  const geoFetch = await fetch(
    `http://ip-api.com/json/${ip}?fields=continent,country,regionName,city,zip,lat,lon,isp,org,as,mobile,proxy,hosting,query`,
    {
      headers: {
        'User-Agent': 'curl/7.64.1',
        Accept: 'json',
      },
    },
  );

  const geo = await geoFetch.json();

  return geo;
};
