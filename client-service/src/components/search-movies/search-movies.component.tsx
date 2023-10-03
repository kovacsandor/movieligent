import { useEffect, useMemo, useState } from 'react';
import { useDebounce } from 'react-use';
import { useCreateFavouriteMutation, useListFavouritesQuery, useSearchMoviesQuery } from '../../hooks';
import { IconType, MovieServiceSearchMoviesResultItem } from '../../types';
import { Button } from '../button';
import { CardComponent } from '../card/card.component';
import { ErrorComponent } from '../error';
import { TextInputComponent } from '../text-input';

export const SearchMoviesComponent = () => {
  const initialTitle = '';
  const [query, setQuery] = useState(initialTitle);
  const [title, setTitle] = useState(initialTitle);

  const createFavouriteMutation = useCreateFavouriteMutation();
  const listFavouritesQuery = useListFavouritesQuery();
  const searchMoviesQuery = useSearchMoviesQuery(query);

  useDebounce(
    () => {
      if (title && title !== query) {
        setQuery(title);
      }
    },
    600,
    [title],
  );

  const movies = useMemo(() => {
    return searchMoviesQuery.data?.pages.flat().reduce((acc: readonly MovieServiceSearchMoviesResultItem[], curr) => {
      return [...acc, ...curr.movies];
    }, []);
  }, [searchMoviesQuery.data]);

  const favouriteMovieIds = useMemo(() => {
    return listFavouritesQuery.data?.favourites.map((favourite) => favourite.movieId) || [];
  }, [listFavouritesQuery]);

  const getCardIcon = (movieId: number): IconType => {
    if (favouriteMovieIds.includes(movieId)) {
      return 'star';
    }

    if (
      (createFavouriteMutation.isLoading && createFavouriteMutation.variables?.id === movieId) ||
      listFavouritesQuery.isFetching
    ) {
      return 'sync';
    }

    return 'star-border';
  };

  useEffect(() => {
    if (createFavouriteMutation.isSuccess) {
      listFavouritesQuery.refetch();
    }
  }, [createFavouriteMutation.isSuccess, listFavouritesQuery.refetch]);

  return (
    <div className='flex flex-col gap-4 flex-[2] xl:flex-[3] p-4'>
      <div className='text-base uppercase'>Search movies</div>
      <div className='flex gap-2'>
        <TextInputComponent
          initialValue={title}
          placeholder='Search movies by title...'
          onChange={(value: string) => setTitle(value)}
          onEnter={(value: string) => setQuery(value)}
        />
        <Button
          label={'Search'}
          onClick={() => setQuery(title)}
          disabled={searchMoviesQuery.isFetching || title.length < 3}
          icon={searchMoviesQuery.isFetching ? 'sync' : 'search'}
        />
      </div>
      <div className='flex flex-col gap-2'>
        {searchMoviesQuery.error && (
          <ErrorComponent message={searchMoviesQuery.error.message} stack={searchMoviesQuery.error.stack} />
        )}
        {createFavouriteMutation.error && (
          <ErrorComponent message={createFavouriteMutation.error.message} stack={createFavouriteMutation.error.stack} />
        )}
        {movies && (
          <div className='flex flex-col gap-2'>
            {movies.map((movie) => (
              <CardComponent
                disabled={
                  favouriteMovieIds.includes(movie.id) ||
                  createFavouriteMutation.isLoading ||
                  listFavouritesQuery.isFetching
                }
                icon={getCardIcon(movie.id)}
                key={movie.id}
                heading={movie.title}
                secondary={movie.releaseDate ? new Date(movie.releaseDate).getFullYear().toString() : '-'}
                description={movie.overview}
                onClick={() => createFavouriteMutation.mutate(movie)}
              />
            ))}
          </div>
        )}
        {searchMoviesQuery.hasNextPage && (
          <div className='flex justify-around'>
            <Button
              label={'Load more'}
              onClick={() => searchMoviesQuery.fetchNextPage()}
              disabled={searchMoviesQuery.isFetching}
              icon={searchMoviesQuery.isFetching ? 'sync' : null}
            />
          </div>
        )}
        {!searchMoviesQuery.isFetching && !searchMoviesQuery.hasNextPage && (
          <div className='flex justify-around font-light text-movieligent-light-text-normal'>
            {movies?.length ? 'No more pages...' : 'Nothing to show...'}
          </div>
        )}
      </div>
    </div>
  );
};
