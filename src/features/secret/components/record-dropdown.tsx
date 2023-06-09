'use client';
import { DropDown } from '@/components';
import { trpc } from '@/lib';
import { EditSecretForm } from '@/features/secret';
import type { ViewLog } from '@/server/db/types';
import type { Selectable } from 'kysely';

function DropDownRecord({ secret }: any) {
  return (
    <div
      key={secret.key}
      className="flex flex-row gap-8 "
      style={{
        width: '100%',
      }}
    >
      <p
        className="break-words opacity-50"
        style={{
          width: '25%',
          borderRight: '2px solid white',
        }}
      >
        {secret.createdAt}
      </p>

      <div
        className="flex justify-center flex-col"
        style={{
          width: '75%',
          marginLeft: 10,
        }}
      >
        <p className="w-full">
          Key: <strong>{secret.key}</strong>
        </p>
        <div className="w-full flex justify-between items-center">
          <p className="flex flex-row items-center">
            Views: {secret.views}
            {secret.maxViews != -1 && `/ ${secret.maxViews}`}
          </p>
          <p className="opacity-75">
            {!secret.deletedAt ? 'Active' : 'Deleted'}
          </p>
        </div>
      </div>
    </div>
  );
}

function DropDownLog({
  ipAddress,
  userAgent,
  id,
  geo,
  createdAt,
}: Pick<
  Selectable<ViewLog>,
  'ipAddress' | 'id' | 'createdAt' | 'userAgent' | 'geo'
>) {
  return (
    <div key={id} className="flex flex-row gap-4 w-full my-2">
      <p className="w-1/4 border-r-2 border-white opacity-50">
        {new Date(createdAt).toLocaleString()}
      </p>

      <div className="w-3/4">
        <p className="w-full">
          I<span className="underline">{ipAddress}</span>
        </p>
        {geo && (
          <p>
            <strong>
              {geo?.city}, {geo?.regionName}, {geo?.country}, {geo?.continent}
            </strong>
          </p>
        )}
        {geo && (
          <p>
            {geo?.zip} {geo?.lat && geo?.lon && `(${geo?.lat}, ${geo?.lon})`}{' '}
            {geo?.isp && `${geo.isp} (ISP)`}
          </p>
        )}
        <div className="w-full flex justify-between items-center">
          <p className="flex flex-row items-center">User Agent: {userAgent}</p>
        </div>
      </div>
    </div>
  );
}

export function RecordDropDown() {
  const secrets = trpc.secret.list.useQuery();

  if (secrets.data && secrets.data.length === 0)
    return (
      <div className="text-white">
        <h4>No records found.</h4>
      </div>
    );

  return (
    <DropDown PreviewComponent={<h4>Records</h4>} storageLabel="records">
      {!secrets.isFetched ? (
        <p className="opacity-50">Loading...</p>
      ) : (
        <div
          className="text-white"
          style={{
            marginTop: 3,
          }}
        >
          {secrets.data?.length === 0 && (
            <h4 className="opacity-50">No records found.</h4>
          )}
          {secrets.data?.map((secret: any) => (
            <div
              style={{
                margin: '10px 0 10px 0',
              }}
            >
              <DropDown
                disabled={!!secret.deletedAt}
                PreviewComponent={<DropDownRecord secret={secret} />}
                storageLabel={`record:${secret.key}`}
              >
                <div
                  style={{
                    marginTop: 10,
                    marginBottom: 10,
                    marginLeft: 10,
                  }}
                >
                  <DropDown
                    disabled={!!secret.deletedAt}
                    PreviewComponent={<h5>View logs</h5>}
                    storageLabel={`record:${secret.key}:logs`}
                  >
                    <div
                      style={{
                        borderRight: '2px solid rgba(255, 255, 255, 0.5)',
                        paddingLeft: 20,
                        paddingRight: 10,
                      }}
                    >
                      {secret.logs?.length === 0 && (
                        <p className="opacity-50">No logs found.</p>
                      )}

                      {secret.logs?.map((log: any) => (
                        <DropDownLog {...log} />
                      ))}
                    </div>
                  </DropDown>
                  <DropDown
                    disabled={!!secret.deletedAt}
                    PreviewComponent={<h5>Edit settings</h5>}
                    storageLabel={`record:${secret.key}:settings`}
                  >
                    <div
                      style={{
                        borderRight: '2px solid rgba(255, 255, 255, 0.5)',
                        paddingLeft: 20,
                        paddingRight: 10,
                      }}
                    >
                      {secret?.deletedAt ? (
                        <p className="opacity-50 underline">
                          This secret has been deleted and cannot be edited.
                        </p>
                      ) : (
                        <EditSecretForm secret={secret} />
                      )}
                    </div>
                  </DropDown>
                </div>
              </DropDown>
            </div>
          ))}
        </div>
      )}
    </DropDown>
  );
}
