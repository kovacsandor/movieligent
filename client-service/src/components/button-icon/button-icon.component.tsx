import classnames from 'classnames';
import { IconType } from '../../types';
import { IconComponent } from '../icon';

type Props = {
  readonly onClick: () => void;
  readonly compact?: boolean;
  readonly dark?: boolean;
  readonly disabled?: boolean;
  readonly icon: IconType;
  readonly className: string;
  readonly ariaLabel: string;
};

export const ButtonIconComponent = ({ ariaLabel, className, compact, dark, onClick, disabled, icon }: Props) => {
  return (
    <button
      aria-label={ariaLabel}
      className={classnames({
        'hover:bg-movieligent-light-background': !dark,
        'disabled:bg-movieligent-header-background': !dark,
        'hover:bg-movieligent-dark-background': dark,
        'disabled:bg-movieligent-dark-card': dark,
        'p-1': !compact,
      })}
      onClick={() => onClick()}
      disabled={disabled}
    >
      <IconComponent className={className} icon={icon} />
    </button>
  );
};
