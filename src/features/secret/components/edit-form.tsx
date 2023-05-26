'use client';
import { useState } from 'react';
import { trpc, successNotification } from '@/lib';

type FormInput = {
  key: string;
  token?: string;
  maxViews?: number;
  expiresAt?: string;
};

export function EditSecretForm({ secret }: any) {
  const updateMutation = trpc.secret.update.useMutation({
    onSuccess: () => {
      successNotification('Record updated');
    },
  });
  const deleteMutation = trpc.secret.delete.useMutation({
    onSuccess: () => {
      successNotification('Record deleted');

      // trpc.invalidateQuery(['secret.list']);
    },
  });
  const [formInput, setFormInput] = useState<FormInput>({
    key: secret.key,
    token: secret.token,
    maxViews: secret.maxViews,
    expiresAt: secret.expiresAt ?? undefined,
  });

  return (
    <div
      className="w-full flex justify-end"
      style={{
        marginBottom: '3rem',
      }}
    >
      <form className="w-full">
        <div className="w-full flex justify-between">
          <div className="flex flex-col">
            <label
              htmlFor="expires_at"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Expires at
            </label>
            <input
              id="expires_at"
              type="date"
              value={
                secret.expiresAt &&
                new Date(secret.expiresAt).toISOString().substr(0, 10)
              }
              onChange={(e) =>
                setFormInput({ ...formInput, expiresAt: e.target.value })
              }
              className="text-gray-400 p-2 rounded"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                padding: 5,
                borderRadius: 2.5,
              }}
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="max_views"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Allowed views
            </label>
            <input
              id="max_views"
              type="number"
              value={formInput.maxViews !== -1 ? formInput.maxViews : undefined}
              placeholder={'Views before expiration'}
              onChange={(e) =>
                setFormInput({
                  ...formInput,
                  maxViews: parseInt(e.target.value),
                })
              }
              className="text-gray-400 p-2 rounded"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                padding: 5,
                borderRadius: 2.5,
              }}
            />
          </div>
        </div>

        <div
          className="w-full flex justify-between"
          style={{
            marginTop: '1rem',
          }}
        >
          <input
            type="button"
            value="Delete"
            className=" text-white font-bold cursor-pointer"
            style={{
              borderBottom: '3px solid rgba(255, 255, 255, 0.15)',
            }}
            onClick={() => {
              deleteMutation.mutateAsync({
                key: secret.key,
              });
            }}
          />

          <input
            onClick={() => {
              updateMutation.mutateAsync({
                key: secret.key,
                max_views: formInput.maxViews,
                expires_at: formInput.expiresAt
                  ? new Date(formInput.expiresAt).getTime()
                  : undefined,
              });
            }}
            type="button"
            value="Update"
            className=" text-white font-bold cursor-pointer"
            style={{
              borderBottom: '3px solid rgba(255, 255, 255, 0.15)',
            }}
          />
        </div>
      </form>
    </div>
  );
}
