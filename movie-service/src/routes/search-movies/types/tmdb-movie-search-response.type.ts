import { TmdbMovieSearchResultItem } from './tmdb-movie-search-result-item.type';

export type TmdbMovieSearchResponse = {
  readonly page: number;
  readonly results: readonly TmdbMovieSearchResultItem[];
  readonly total_pages: number;
  readonly total_results: number;
};
