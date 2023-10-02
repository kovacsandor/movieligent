export type TmdbMovieSearchQueryParams = {
  readonly include_adult?: boolean;
  readonly language?: string;
  readonly page?: number;
  readonly primary_release_year?: string;
  readonly query: string;
  readonly region?: string;
  readonly year?: string;
};
