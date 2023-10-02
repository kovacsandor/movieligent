import { useState } from 'react';
import { ButtonIconComponent } from '../button-icon';
import { IconComponent } from '../icon';

type Props = {
  readonly stack?: string;
  readonly message: string;
};

export const ErrorComponent = ({ message, stack }: Props) => {
  const [open, setOpen] = useState(false);
  return (
    <div className='flex flex-col p-2 bg-movieligent-header-background shadow '>
      <div className='flex items-center gap-2'>
        <IconComponent className='fill-movieligent-button-primary m-1 min-w-[24px]' icon={'error'} />
        <div className='grow'>
          <div className='text-base text-movieligent-button-primary'>Error</div>
          <div className='text-sm text-movieligent-button-primary'>{message}</div>
        </div>
        <ButtonIconComponent
          className={stack ? 'fill-movieligent-button-primary' : 'fill-movieligent-header-background'}
          disabled={!stack}
          icon={open ? 'expand-less' : 'expand-more'}
          onClick={() => setOpen(!open)}
        />
      </div>
      {stack && open && (
        <div className='text-sm text-movieligent-button-primary border-t border-movieligent-light-background pt-2 mt-2 mx-10'>
          {stack}
        </div>
      )}
    </div>
  );
};
