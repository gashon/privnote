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
  const mutation = trpc.secret.update.useMutation({
    onSuccess: () => {
      successNotification('Record updated');
    },
  });
  const [formInput, setFormInput] = useState<FormInput>({
    key: secret.key,
    token: secret.token,
    maxViews: secret.maxViews,
    expiresAt: secret.expiresAt ?? undefined,
  });

  return (
    <div className="w-full flex justify-end mb-4">
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
              }}
            />
          </div>
        </div>

        <div className="w-full flex justify-between">
          <input
            type="button"
            value="Delete"
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => {
              trpc.secret.delete.useMutation({
                key: secret.key,
                onSuccess: () => {
                  successNotification('Record deleted');
                },
              });
            }}
          />

          <input
            onClick={() => {
              mutation.mutateAsync({
                key: secret.key,
                max_views: formInput.maxViews,
                expires_at: formInput.expiresAt,
              });
            }}
            type="button"
            value="Update"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          />
        </div>
      </form>
    </div>
  );
}
