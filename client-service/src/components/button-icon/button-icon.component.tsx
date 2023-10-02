import { IconType } from '../../types';
import { IconComponent } from '../icon';

type Props = {
  readonly onClick: () => void;
  readonly disabled?: boolean;
  readonly icon: IconType;
  readonly className: string;
};

export const ButtonIconComponent = ({ className, onClick, disabled, icon }: Props) => {
  return (
    <button
      className='p-1 hover:bg-movieligent-light-background disabled:bg-movieligent-header-background'
      onClick={() => onClick()}
      disabled={disabled}
    >
      <IconComponent className={className} icon={icon} />
    </button>
  );
};
