import { Routes } from '@angular/router';
import { Header } from './header/header';      // adjust path if needed
import { Contact } from './contact/contact';   // adjust path if needed
import { AboutUs } from './about-us/about-us';  // adjust path if needed
 import {Login} from './login/login';
export const routes: Routes = [

  { path: 'header', component: Header },
  { path: 'about-us', component: AboutUs },
  { path: 'contact', component: Contact },
  {path: 'login',component: Login}
];

