'use client';
import { useState, FC, ReactNode } from 'react';
import { AiOutlineArrowDown, AiOutlineArrowUp } from 'react-icons/ai';
type DropDownProps = {
  PreviewComponent: ReactNode;
  children: ReactNode;
  icon?: ReactNode;
  disabled?: boolean;
};
export const DropDown: FC<DropDownProps> = ({
  PreviewComponent,
  children,
  icon,
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
          <>{icon ?? <AiOutlineArrowDown className="inline-block" />}</>
        )}
        {PreviewComponent}
      </div>
      {isOpen && <>{children}</>}
    </>
  );
};
