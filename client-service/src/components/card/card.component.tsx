import classnames from 'classnames';
import { useState } from 'react';
import { IconType } from '../../types';
import { ButtonIconComponent } from '../button-icon';

type Props = {
  readonly dark?: boolean;
  readonly description?: string;
  readonly heading: string;
  readonly secondary: string;
  readonly onClick?: () => void;
  readonly disabled?: boolean;
  readonly icon: IconType;
};

export const CardComponent = ({ dark, description, heading, secondary, onClick, disabled, icon }: Props) => {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={classnames('flex flex-col p-2 shadow', {
        'bg-movieligent-header-background': !dark,
        'bg-movieligent-dark-card': dark,
      })}
    >
      <div className='flex items-center gap-2'>
        <ButtonIconComponent
          ariaLabel='favourite'
          dark={dark}
          className='fill-movieligent-light-icon'
          icon={icon}
          onClick={() => onClick?.()}
          disabled={disabled}
        />
        <div className='grow'>
          <div
            className={classnames('text-base', {
              'text-movieligent-light-text-heading': !dark,
              'text-movieligent-dark-text-heading': dark,
            })}
          >
            {heading}
          </div>
          <div
            className={classnames('text-sm ', {
              'text-movieligent-light-text-normal': !dark,
              'text-movieligent-dark-text-normal': dark,
            })}
          >
            {secondary}
          </div>
        </div>
        <ButtonIconComponent
          ariaLabel='expand'
          dark={dark}
          className={classnames({
            'fill-movieligent-light-icon': description,
            'fill-movieligent-header-background': !description && !dark,
            'fill-movieligent-dark-card': !description && dark,
          })}
          icon={open ? 'expand-less' : 'expand-more'}
          onClick={() => setOpen(!open)}
          disabled={!description}
        />
      </div>
      {description && open && (
        <div
          className={classnames('text-sm border-t pt-2 mt-2 mx-10', {
            'text-movieligent-light-text-normal': !dark,
            'border-movieligent-light-background': !dark,
            'text-movieligent-dark-text-normal': dark,
            'border-movieligent-dark-background': dark,
          })}
        >
          {description}
        </div>
      )}
    </div>
  );
};
