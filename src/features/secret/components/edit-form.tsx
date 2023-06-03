'use client';
import { useForm } from 'react-hook-form';
import { trpc, successNotification } from '@/lib';
import { errorNotification } from '@/lib';

type FormInput = {
  key: string;
  token?: string;
  maxViews?: number;
  expiresAt?: string;
};

export function EditSecretForm({ secret }: any) {
  const trpcContext = trpc.useContext();

  const updateMutation = trpc.secret.update.useMutation({
    onSuccess: () => {
      successNotification('Record updated');
      trpcContext.secret.list.invalidate();
    },
    onError: (error) => {
      errorNotification(error.message);
    },
  });
  const deleteMutation = trpc.secret.delete.useMutation({
    onSuccess: () => {
      successNotification('Record deleted');

      trpcContext.secret.list.invalidate();
    },
    onError: (error) => {
      errorNotification(error.message);
    },
  });

  const { register, handleSubmit, formState, getValues, watch } =
    useForm<FormInput>({
      defaultValues: {
        key: secret.key,
        token: secret.token,
        maxViews: secret.maxViews,
        expiresAt: secret.expiresAt ?? undefined,
      },
    });
  watch('maxViews');

  return (
    <div
      className="w-full flex justify-end"
      style={{
        marginBottom: '3rem',
      }}
    >
      <form
        className="w-full"
        style={{
          marginTop: '1rem',
        }}
        onSubmit={handleSubmit((data) => {
          updateMutation.mutateAsync({
            key: secret.key,
            max_views: data.maxViews
              ? parseInt(data.maxViews?.toString())
              : undefined,
            expires_at: data.expiresAt
              ? new Date(data.expiresAt).getTime()
              : undefined,
          });
        })}
      >
        <div className="w-full flex flex-col">
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
              className="text-gray-400 p-2 rounded"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                padding: 5,
                borderRadius: 2.5,
              }}
              {...register('expiresAt', {
                required: false,
              })}
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
              value={
                getValues('maxViews') !== -1 ? getValues('maxViews') : undefined
              }
              placeholder={'Views before expiration'}
              className="text-gray-400 p-2 rounded"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                padding: 5,
                borderRadius: 2.5,
              }}
              {...register('maxViews', {
                required: false,
              })}
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
            type="submit"
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
