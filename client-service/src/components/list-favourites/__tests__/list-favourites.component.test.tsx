import { render, screen } from '@testing-library/react';
import { AxiosResponse } from 'axios';
import { QueryClient, QueryClientProvider } from 'react-query';
import { MovieServiceListFavouritesResponseDto } from '../../../types';
import { ListFavouritesComponent } from '../list-favourites.component';

const mockGET = jest.fn();

jest.mock('openapi-fetch', () => () => ({
  GET: mockGET,
}));

describe('ListFavouritesComponent', () => {
  test('renders favourites', async () => {
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

    mockGET.mockResolvedValueOnce(listFavouritesResponse);

    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <ListFavouritesComponent />)
      </QueryClientProvider>,
    );

    const element = await screen.findByText(/matrix/i);
    expect(element).toBeInTheDocument();
  });
});
