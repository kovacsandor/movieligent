import { useState } from 'react';
import { IconType } from '../../types';
import { ButtonIconComponent } from '../button-icon';

type Props = {
  readonly dark?: boolean;
  readonly description?: string;
  readonly heading: string;
  readonly secondary: string;
  readonly onClick: () => void;
  readonly disabled?: boolean;
  readonly icon: IconType;
};

export const CardComponent = ({ dark, description, heading, secondary, onClick, disabled, icon }: Props) => {
  const [open, setOpen] = useState(false);
  return (
    <div className='flex flex-col p-2 bg-movieligent-header-background shadow '>
      <div className='flex items-center gap-2'>
        <ButtonIconComponent
          className='fill-movieligent-light-icon'
          icon={icon}
          onClick={() => onClick()}
          disabled={disabled}
        />
        <div className='grow'>
          <div className='text-base text-movieligent-light-text-heading'>{heading}</div>
          <div className='text-sm text-movieligent-light-text-normal'>{secondary}</div>
        </div>
        <ButtonIconComponent
          className={description ? 'fill-movieligent-light-icon' : 'fill-movieligent-header-background'}
          icon={open ? 'expand-less' : 'expand-more'}
          onClick={() => setOpen(!open)}
          disabled={!description}
        />
      </div>
      {description && open && (
        <div className='text-sm text-movieligent-light-text-normal border-t border-movieligent-light-background pt-2 mt-2 mx-10'>
          {description}
        </div>
      )}
    </div>
  );
};
