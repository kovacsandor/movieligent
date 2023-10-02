import { IconType } from '../../types';
import { IconErrorComponent } from '../icon-error';
import { IconExpandLessComponent } from '../icon-expand-less';
import { IconExpandMoreComponent } from '../icon-expand-more';
import { IconPersonComponent } from '../icon-person';
import { IconSearchComponent } from '../icon-search';
import { IconStarComponent } from '../icon-star';
import { IconStarBorderComponent } from '../icon-star-border';
import { IconSyncComponent } from '../icon-sync';

type Props = {
  readonly className?: string;
  readonly icon: IconType;
};

export const IconComponent = ({ className, icon }: Props) => {
  switch (icon) {
    case 'error':
      return <IconErrorComponent className={className} />;
    case 'expand-less':
      return <IconExpandLessComponent className={className} />;
    case 'expand-more':
      return <IconExpandMoreComponent className={className} />;
    case 'person':
      return <IconPersonComponent className={className} />;
    case 'search':
      return <IconSearchComponent className={className} />;
    case 'star':
      return <IconStarComponent className={className} />;
    case 'star-border':
      return <IconStarBorderComponent className={className} />;
    case 'sync':
      return <IconSyncComponent className={className} />;
    default:
      return <></>;
  }
};
