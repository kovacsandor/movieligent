import createClient from 'openapi-fetch';
import { useMemo, useState } from 'react';
import { useInfiniteQuery } from 'react-query';
import { MovieServiceOpenapi } from 'shared';
import { Button } from '../button';
import { CardComponent } from '../card/card.component';
import { ErrorComponent } from '../error';
import { MovieServiceSearchMoviesResponseDto, MovieServiceSearchMoviesResultItem, Path } from './types';

export const SearchMoviesComponent = () => {
  const pageLength = 20;
  const path: Path = '/api/movie-service/search-movies';
  const [query, setQuery] = useState('');
  const [title, setTitle] = useState('');

  const { GET } = createClient<MovieServiceOpenapi.paths>();

  const { data, error, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery<
    MovieServiceSearchMoviesResponseDto,
    Error
  >(
    [path, query],
    async ({ pageParam = 1 }) => {
      const fetchResponse = await GET(path, {
        params: {
          query: {
            page: pageParam,
            query,
          },
        },
      });

      if (fetchResponse.data) {
        return fetchResponse.data;
      }

      throw new Error(fetchResponse.error.message);
    },
    {
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage.movies.length < pageLength) {
          return undefined;
        }

        return allPages.length + 1;
      },
      enabled: query.length > 2,
    },
  );

  const movies = useMemo(() => {
    return data?.pages.flat().reduce((acc: readonly MovieServiceSearchMoviesResultItem[], curr) => {
      return [...acc, ...curr.movies];
    }, []);
  }, [data]);

  const favouriteMovieIds = [555879, 604, 605];

  return (
    <div>
      <div className='flex flex-col gap-4'>
        <div className='text-base uppercase'>Search movies</div>
        <div className='flex gap-2'>
          <input
            onChange={(event) => setTitle(event.currentTarget.value)}
            type='text'
            value={title}
            placeholder='Search movies by title...'
            className='text-base px-2 py-1 w-full shadow font-light'
          />
          <Button
            label={'Search'}
            onClick={() => setQuery(title)}
            disabled={isLoading || isFetchingNextPage || title.length < 3}
            icon={isLoading || isFetchingNextPage ? 'sync' : 'search'}
          />
        </div>
        <div className='flex flex-col gap-2'>
          {error && <ErrorComponent message={error.message} stack={error.stack} />}
          {movies && (
            <div className='flex flex-col gap-2'>
              {movies.map((movie) => (
                <CardComponent
                  disabled={favouriteMovieIds.includes(movie.id)}
                  icon={favouriteMovieIds.includes(movie.id) ? 'star' : 'star-border'}
                  key={movie.id}
                  heading={movie.title}
                  secondary={new Date(movie.releaseDate).getFullYear().toString()}
                  description={Math.random() > 0.5 ? movie.overview : ''}
                  onClick={() => alert(movie.title)}
                />
              ))}
            </div>
          )}
          {movies?.length && (
            <div className='flex justify-around'>
              <Button
                label={hasNextPage ? 'Load more' : 'No more pages'}
                onClick={() => fetchNextPage()}
                disabled={!hasNextPage || isFetchingNextPage}
                icon={isFetchingNextPage ? 'sync' : null}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
