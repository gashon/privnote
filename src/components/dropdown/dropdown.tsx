'use client';
import { useState, FC, ReactNode } from 'react';
import { AiOutlineArrowDown, AiOutlineArrowUp } from 'react-icons/ai';
type DropDownProps = {
  PreviewComponent: ReactNode;
  children: ReactNode;
  disabled?: boolean;
};
export const DropDown: FC<DropDownProps> = ({
  PreviewComponent,
  children,
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`cursor-pointer flex flex-row items-center gap-2 ${
          disabled ? 'opacity-25' : ''
        }`}
      >
        {isOpen ? (
          <AiOutlineArrowUp className="inline-block opacity-50" />
        ) : (
          <AiOutlineArrowDown className="inline-block" />
        )}
        {PreviewComponent}
      </div>
      {isOpen && <>{children}</>}
    </>
  );
};
