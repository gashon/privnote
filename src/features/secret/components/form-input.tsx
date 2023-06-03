'use client';
import { useMemo, useState, useCallback } from 'react';
import { BsFillClipboardFill } from 'react-icons/bs';
import { useForm, SubmitHandler } from 'react-hook-form';
import { CiSettings } from 'react-icons/ci';
import { trpc, successNotification, errorNotification } from '@/lib';
import { generateKey, encryptPayload } from '@/utils/crypto';
import { DropDown } from '@/components';

type FormValues = {
  secret: string;
  maxViews?: number;
  expiresAt?: number;
};

export function SecretInput() {
  const trpcContext = trpc.useContext();
  const [secretURL, setSecretURL] = useState<string | undefined>(undefined);
  const mutation = trpc.secret.create.useMutation({
    onSuccess: () => {
      trpcContext.secret.list.invalidate();
    },
  });

  const { register, handleSubmit, formState, getValues, watch } =
    useForm<FormValues>({
      defaultValues: {
        secret: '',
        maxViews: 1,
      },
    });
  watch('secret'); // to update the number of rows

  const copyToClipboard = useCallback(async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      successNotification('URL copied to clipboard');
    } catch (error) {
      console.error('Failed to copy URL to clipboard:', error);
      errorNotification('Failed to copy URL to clipboard');
    }
  }, []);

  const createSecret: SubmitHandler<FormValues> = async (values) => {
    const encryptionToken = generateKey();
    const secret = await mutation.mutateAsync({
      token: encryptionToken,
      max_views: values.maxViews
        ? parseInt(values.maxViews.toString(), 10)
        : undefined,
      expires_at: values.expiresAt
        ? new Date(values.expiresAt).getTime()
        : undefined,
    });
    const encryptedText = encryptPayload(values.secret, encryptionToken);
    const url = `${
      process.env.NEXT_PUBLIC_VERCEL_URL || 'http://localhost:3000'
    }/secret?key=${secret.key}&secret=${encryptedText}`;
    setSecretURL(url);

    await copyToClipboard(url);
  };

  return (
    <>
      <form onSubmit={handleSubmit(createSecret)}>
        <textarea
          id="secret"
          className="w-full rounded block text-sm text-gray-400 hover:resize-y"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.15)',
            padding: 10,
            borderRadius: 5,
            marginBottom: 5,
          }}
          rows={getValues('secret').split('\n').length}
          placeholder="POSTGRES_USER=..."
          {...register('secret', {
            required: true,
          })}
        />
        <div
          className="w-full"
          style={{
            position: 'relative',
          }}
        >
          <DropDown
            PreviewComponent={
              <div className="flex flex-row items-center">
                <h4>Advanced Settings</h4>
              </div>
            }
            icon={<CiSettings />}
            storageLabel="advanced-settings"
          >
            <div className="w-full px-10 opacity-50">
              <label htmlFor="maxViews" className="block">
                # views before self-destruct
              </label>
              <input
                id="maxViews"
                className="w-full rounded block text-sm text-gray-400"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  padding: 10,
                  borderRadius: 5,
                }}
                type="number"
                placeholder="∞"
                {...register('maxViews', {
                  required: false,
                })}
              />
              <label htmlFor="expiresAt" className="block">
                expiration date
              </label>
              <input
                id="expiresAt"
                className="w-full rounded block text-sm text-gray-400"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  padding: 10,
                  borderRadius: 5,
                }}
                type="datetime-local"
                {...register('expiresAt', {
                  required: false,
                })}
              />
            </div>
          </DropDown>
          <div
            style={{
              position: 'absolute',
              right: 0,
              top: 0,
            }}
            className="flex flex-row justify-center items-center gap-4"
          >
            <button
              type="submit"
              className="w-fit"
              style={{
                borderBottom: '3px solid rgba(255, 255, 255, 0.15)',
              }}
            >
              {formState.isSubmitting ? 'Loading...' : ' Create URL'}
            </button>
            {secretURL && (
              <div
                onClick={() => copyToClipboard(secretURL)}
                className="cursor-pointer"
              >
                <BsFillClipboardFill />
              </div>
            )}
          </div>
        </div>
      </form>
    </>
  );
}
