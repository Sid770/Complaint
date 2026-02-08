import { Routes } from '@angular/router';
import { Header } from './header/header';
import { Home } from './home/home';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'header', component: Header },
];
