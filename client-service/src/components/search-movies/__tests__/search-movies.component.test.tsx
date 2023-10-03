import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AxiosResponse } from 'axios';
import { QueryClient, QueryClientProvider } from 'react-query';
import {
  MovieServiceCreateFavouriteResponseDto,
  MovieServiceListFavouritesResponseDto,
  MovieServiceSearchMoviesResponseDto,
} from '../../../types';
import { SearchMoviesComponent } from '../search-movies.component';

const mockGET = jest.fn();
const mockPOST = jest.fn();

jest.mock('openapi-fetch', () => () => ({
  GET: mockGET,
  POST: mockPOST,
}));

describe('SearchMoviesComponent', () => {
  const listFavouritesResponse: Partial<AxiosResponse<MovieServiceListFavouritesResponseDto>> = {
    data: {
      favourites: [
        {
          id: 'favourite-id',
          overview: 'overview',
          releaseDate: '1999-12-05',
          title: 'Matrix',
          movieId: 123456,
          userId: 'user-id',
        },
      ],
      requestStatus: 'Success',
    },
  };

  const searchMoviesResponse: Partial<AxiosResponse<MovieServiceSearchMoviesResponseDto>> = {
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

  test('renders movies', async () => {
    mockGET.mockResolvedValueOnce(listFavouritesResponse);
    mockGET.mockResolvedValueOnce(searchMoviesResponse);

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

  test('can add favourite', async () => {
    const initialListFavouritesResponse: Partial<AxiosResponse<MovieServiceListFavouritesResponseDto>> = {
      data: {
        favourites: [],
        requestStatus: 'Success',
      },
    };

    const createFavouriteResponse: Partial<AxiosResponse<MovieServiceCreateFavouriteResponseDto>> = {
      data: {
        favourite: {
          id: 'favourite-id',
          overview: 'overview',
          releaseDate: '1999-12-05',
          title: 'Matrix',
          movieId: 123456,
          userId: 'user-id',
        },

        requestStatus: 'Success',
      },
    };

    mockPOST.mockResolvedValueOnce(createFavouriteResponse);
    mockGET.mockResolvedValueOnce(initialListFavouritesResponse);
    mockGET.mockResolvedValueOnce(searchMoviesResponse);
    mockGET.mockResolvedValueOnce(listFavouritesResponse);

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

    const addFavouriteButton = await screen.findByRole('button', {
      name: /favourite/i,
    });

    waitFor(() => userEvent.click(addFavouriteButton));

    await screen.findByTitle(/^star$/i);

    expect(element).toBeInTheDocument();
  });
});
