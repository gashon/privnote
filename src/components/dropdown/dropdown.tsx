'use client';
import { useState, FC, ReactNode } from 'react';
import { AiOutlineArrowDown, AiOutlineArrowUp } from 'react-icons/ai';
import storage from '@/lib/storage';

type DropDownProps = {
  PreviewComponent: ReactNode;
  children: ReactNode;
  icon?: ReactNode;
  disabled?: boolean;
  storageLabel?: string;
};
export const DropDown: FC<DropDownProps> = ({
  PreviewComponent,
  children,
  icon,
  storageLabel,
  disabled = false,
}) => {
  console.log('GOT', storageLabel);
  const [isOpen, setIsOpen] = useState<boolean>(
    storageLabel ? !!storage.get(`dropdown:${storageLabel}`) : false,
  );

  return (
    <>
      <div
        onClick={() => {
          setIsOpen(!isOpen);
          if (storageLabel) storage.set(`dropdown:${storageLabel}`, !isOpen);
        }}
        className={`cursor-pointer flex flex-row items-center gap-2 ${
          disabled ? 'opacity-25' : ''
        }`}
      >
        {isOpen ? (
          <AiOutlineArrowUp className="inline-block opacity-50" />
        ) : (
          <>{icon ?? <AiOutlineArrowDown className="inline-block" />}</>
        )}
        {PreviewComponent}
      </div>
      {isOpen && <>{children}</>}
    </>
  );
};
