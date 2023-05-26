'use client';
import { DropDown } from '@/components';
import { trpc } from '@/lib';
import { EditSecretForm } from '@/features/secret';

function DropDownRecord({ secret }: any) {
  return (
    <div key={secret.key} className="flex flex-row gap-4 w-full my-2">
      <p className="w-1/4 border-r-2 border-white opacity-50">
        {secret.createdAt}
      </p>

      <div className="w-3/4">
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

export function RecordDropDown() {
  const secrets = trpc.secret.list.useQuery();

  return (
    <DropDown PreviewComponent={<h4>Records</h4>}>
      <div className="text-white">
        {secrets.data?.map((secret: any) => (
          <DropDown
            disabled={!!secret.deletedAt}
            PreviewComponent={<DropDownRecord secret={secret} />}
          >
            <EditSecretForm secret={secret} />
          </DropDown>
        ))}
      </div>
    </DropDown>
  );
}
