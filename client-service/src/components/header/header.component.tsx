import { IconPersonComponent } from '../icon-person';
import { LogoComponent } from '../logo';

export const HeaderComponent = () => {
  return (
    <header className='flex px-4 py-3 bg-movieligent-header-background sticky top-0 shadow items-center justify-between'>
      <LogoComponent />
      <div className='flex gap-2'>
        <IconPersonComponent className='fill-movieligent-dark-icon' />
        <span className='text-movieligent-light-text-normal text-base'>Guest</span>
      </div>
    </header>
  );
};
