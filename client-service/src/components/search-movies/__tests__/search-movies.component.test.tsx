import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AxiosResponse } from 'axios';
import { QueryClient, QueryClientProvider } from 'react-query';
import { SearchMoviesComponent } from '../search-movies.component';
import { MovieServiceSearchMoviesResponseDto } from '../types/movie-service-search-movies-response-dto.type';

jest.mock('openapi-fetch', () => () => ({
  GET: () => {
    const response: Partial<AxiosResponse<MovieServiceSearchMoviesResponseDto>> = {
      data: {
        movies: [
          {
            id: 123456,
            overview: 'overview',
            releaseDate: '1999-12-05',
            title: 'Matrix',
          },
        ],
        requestStatus: 'Success',
      },
    };
    return Promise.resolve(response);
  },
}));

describe('SearchMoviesComponent', () => {
  test('renders movies', async () => {
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <SearchMoviesComponent />)
      </QueryClientProvider>,
    );

    const input = screen.getByPlaceholderText(/search movies by title.../i);

    waitFor(() => userEvent.type(input, 'user types something'));

    const button = screen.getByRole('button', {
      name: /search/i,
    });
    waitFor(() => userEvent.click(button));

    const element = await screen.findByText(/matrix/i);
    expect(element).toBeInTheDocument();
  });
});
