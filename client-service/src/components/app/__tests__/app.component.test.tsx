import { render, screen } from '@testing-library/react';
import { AxiosResponse } from 'axios';
import { MovieServiceHeartbeatResponseDto } from 'shared';
import { App } from '../app.component';

jest.mock('axios', () => ({
  get: () => {
    const response: Partial<AxiosResponse<MovieServiceHeartbeatResponseDto>> = { data: { message: 'App is working' } };
    return Promise.resolve(response);
  },
}));

test('renders learn react link', async () => {
  render(<App />);
  const element = await screen.findByText(/app is working/i);
  expect(element).toBeInTheDocument();
});
