import classnames from 'classnames';
import { useMemo, useState } from 'react';
import { useListFavouritesQuery } from '../../hooks';
import { ButtonIconComponent } from '../button-icon';
import { CardComponent } from '../card';
import { ErrorComponent } from '../error';
import { IconComponent } from '../icon';
import { TextInputComponent } from '../text-input';

export const ListFavouritesComponent = () => {
  const [open, setOpen] = useState(true);
  const [title, setTitle] = useState('');

  const { data, error, isFetching } = useListFavouritesQuery();

  const favourites = useMemo(() => {
    if (title) {
      return data?.favourites.filter((favourite) => favourite.title.toLowerCase().includes(title.toLowerCase())) || [];
    }

    return data?.favourites || [];
  }, [data, title]);

  return (
    <aside
      className={classnames(
        'flex flex-col gap-4 bg-movieligent-dark-background h-fit md:flex-1 md:h-full p-4 text-movieligent-dark-text-heading',
        {
          'flex-1': open,
        },
      )}
    >
      <div className='flex items-center'>
        <div className='grow text-base uppercase'>Favourites</div>
        <ButtonIconComponent
          ariaLabel='expand'
          compact
          dark
          className={'fill-movieligent-header-background'}
          icon={open ? 'expand-less' : 'expand-more'}
          onClick={() => setOpen(!open)}
        />
      </div>
      <TextInputComponent
        dark
        initialValue={title}
        placeholder='Filter favourites by title...'
        onChange={(value: string) => {
          if (!open) {
            setOpen(true);
          }
          setTitle(value);
        }}
      />
      {open && (
        <>
          {error && <ErrorComponent message={error.message} stack={error.stack} />}
          {!!favourites.length && (
            <div className='flex flex-col gap-2'>
              {favourites.map((favourite) => (
                <CardComponent
                  dark
                  disabled={true}
                  icon={'star'}
                  key={favourite.id}
                  heading={favourite.title}
                  secondary={favourite.releaseDate ? new Date(favourite.releaseDate).getFullYear().toString() : '-'}
                  description={favourite.overview}
                />
              ))}
            </div>
          )}
          {isFetching && (
            <div className='flex justify-around'>
              <IconComponent icon='sync' className='fill-movieligent-dark-text-normal' />
            </div>
          )}
          {!favourites.length && !isFetching && (
            <div className='flex justify-around font-light text-movieligent-dark-text-normal'>
              There are no favourites...
            </div>
          )}
        </>
      )}
    </aside>
  );
};
