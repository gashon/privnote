'use client';
import { SecretInput, RecordDropDown } from '@/features/secret';

export default function Home() {
  return (
    <>
      <div className="w-full flex flex-col mb-6 gap-2">
        <SecretInput />
      </div>

      <RecordDropDown />
    </>
  );
}
