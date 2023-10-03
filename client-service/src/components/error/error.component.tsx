import classnames from 'classnames';
import { useState } from 'react';
import { ButtonIconComponent } from '../button-icon';
import { IconComponent } from '../icon';

type Props = {
  readonly dark?: boolean;
  readonly stack?: string;
  readonly message: string;
};

export const ErrorComponent = ({ dark, message, stack }: Props) => {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={classnames('flex flex-col p-2 shadow text-movieligent-button-primary', {
        'bg-movieligent-header-background': !dark,
        'bg-movieligent-dark-card': dark,
        'text-movieligent-button-primary': !dark,
        'text-movieligent-logo-light': dark,
      })}
    >
      <div className='flex items-center gap-2'>
        <IconComponent
          className={classnames('m-1 min-w-[24px]', {
            'fill-movieligent-button-primary': !dark,
            'fill-movieligent-logo-light': dark,
          })}
          icon='error'
        />
        <div className='grow'>
          <div className='text-base'>Error</div>
          <div className='text-sm'>{message}</div>
        </div>
        <ButtonIconComponent
          ariaLabel='expand'
          className={classnames({
            'fill-movieligent-button-primary': stack && !dark,
            'fill-movieligent-logo-light': stack && dark,
            'fill-movieligent-header-background': !stack && !dark,
            'fill-movieligent-dark-card': !stack && dark,
          })}
          dark={dark}
          disabled={!stack}
          icon={open ? 'expand-less' : 'expand-more'}
          onClick={() => setOpen(!open)}
        />
      </div>
      {stack && open && (
        <div
          className={classnames('text-sm border-t pt-2 mt-2 mx-10', {
            'border-movieligent-light-background': !dark,
            'border-movieligent-dark-background': dark,
          })}
        >
          {stack}
        </div>
      )}
    </div>
  );
};
