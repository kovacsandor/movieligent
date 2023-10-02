import { IconType } from '../../types';
import { IconComponent } from '../icon';

type Props = {
  readonly disabled?: boolean;
  readonly label: string;
  readonly icon?: IconType | null;
  readonly onClick: () => void;
};

export const Button = ({ disabled, onClick, icon, label }: Props) => {
  return (
    <button
      className='flex gap-2 bg-movieligent-button-primary hover:bg-movieligent-logo-dark disabled:bg-movieligent-logo-dark text-movieligent-dark-text-heading uppercase text-base py-1 px-2 shadow font-light'
      disabled={disabled}
      onClick={() => onClick()}
    >
      {icon && <IconComponent icon={icon} className='fill-movieligent-dark-text-heading' />}
      {label && <span>{label}</span>}
    </button>
  );
};
