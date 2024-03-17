'use client';
import { useState, FC, ReactNode } from 'react';
import { AiOutlineArrowDown, AiOutlineArrowUp } from 'react-icons/ai';
import { dropDownStorageHandler } from '@/lib/storage';

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
  const [isOpen, setIsOpen] = useState<boolean>(
    dropDownStorageHandler.isOpen(storageLabel),
  );

  return (
    <>
      <div
        data-tracking-label={storageLabel}
        onClick={() => {
          setIsOpen(!isOpen);

          if (isOpen) {
            dropDownStorageHandler.remove(storageLabel);
            return;
          }
          dropDownStorageHandler.add(storageLabel);
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
