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
    expiresAt: secret.expiresAt,
  });

  return (
    <div className="w-full flex justify-end">
      <form
        onClick={(e) => {
          e.preventDefault();
          mutation.mutateAsync(formInput);
        }}
      >
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
          type="date"
          value={formInput.expiresAt}
          onChange={(e) =>
            setFormInput({ ...formInput, expiresAt: e.target.value })
          }
          className="bg-gray-900 text-white font-bold py-2 px-4 rounded"
        />
        <input
          type="number"
          value={formInput.maxViews}
          onChange={(e) =>
            setFormInput({ ...formInput, maxViews: parseInt(e.target.value) })
          }
          className="bg-gray-900 text-white font-bold py-2 px-4 rounded"
        />

        <input
          type="submit"
          value="Update"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        />
      </form>
    </div>
  );
}
