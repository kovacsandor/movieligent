import { HeaderComponent } from '../header';
import { MainComponent } from '../main';
import { SearchMoviesComponent } from '../search-movies';

export const AppComponent = () => {
  return (
    <>
      <HeaderComponent />
      <MainComponent>
        <SearchMoviesComponent />
      </MainComponent>
    </>
  );
};
