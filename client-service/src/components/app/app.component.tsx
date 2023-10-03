import { HeaderComponent } from '../header';
import { ListFavouritesComponent } from '../list-favourites';
import { MainComponent } from '../main';
import { SearchMoviesComponent } from '../search-movies';

export const AppComponent = () => {
  return (
    <>
      <HeaderComponent />
      <MainComponent>
        <SearchMoviesComponent />
        <ListFavouritesComponent />
      </MainComponent>
    </>
  );
};
