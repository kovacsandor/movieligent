import axios from 'axios';
import { useEffect, useState } from 'react';
import { MovieServiceHeartbeatResponseDto, MovieServiceOpenapi } from 'shared';

export const App = () => {
  const [data, setData] = useState('');
  const path: keyof Pick<MovieServiceOpenapi.paths, '/api/movie-service/favourite'> = '/api/movie-service/favourite';
  useEffect(() => {
    const testApi = async () => {
      const res = await axios.get<MovieServiceHeartbeatResponseDto>('/api/movie-service/heartbeat');
      setData(res.data.message);
    };

    testApi();
  }, []);
  return (
    <div>
      {path}: {data}
    </div>
  );
};
