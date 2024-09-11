import { Routes } from '@angular/router';
import {CreateHotelComponent} from "./pages/create-hotel/create-hotel.component";
import {MainPageComponent} from "./pages/main-page/main-page.component";
import {FavoritesComponent} from "./pages/favorites/favorites.component";

export const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'create-hotel', component: CreateHotelComponent },
  { path: 'favorites', component: FavoritesComponent }
];
