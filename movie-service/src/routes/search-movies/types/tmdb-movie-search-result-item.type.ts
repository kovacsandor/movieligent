export type TmdbMovieSearchResultItem = {
  readonly adult: boolean;
  readonly backdrop_path: string;
  readonly genre_ids: readonly number[];
  readonly id: number;
  readonly original_language: string;
  readonly original_title: string;
  readonly overview?: string;
  readonly popularity: number;
  readonly poster_path: string;
  readonly release_date?: string;
  readonly title: string;
  readonly video: boolean;
  readonly vote_average: number;
  readonly vote_count: number;
};
