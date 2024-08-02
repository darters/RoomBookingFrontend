import { Routes } from '@angular/router';
import {CreateHotelComponent} from "./pages/create-hotel/create-hotel.component";
import {MainPageComponent} from "./pages/main-page/main-page.component";

export const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'create-hotel', component: CreateHotelComponent }
];
