import { Routes } from '@angular/router';
import {CreateHotelComponent} from "./pages/create-hotel/create-hotel.component";
import {MainPageComponent} from "./pages/main-page/main-page.component";
import {FavoritesComponent} from "./pages/favorites/favorites.component";
import {RegistrationComponent} from "./pages/registration/registration.component";
import {LoginComponent} from "./pages/login/login.component";

export const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'login', component: LoginComponent },
  { path: 'create-announcement', component: CreateHotelComponent },
  { path: 'favorites', component: FavoritesComponent }
];
