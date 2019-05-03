import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NewUserComponent } from './components/new-user/new-user.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { EditUserResolver } from './components/edit-user/edit-user.resolver';

export const rootRouterConfig: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'new-user', component: NewUserComponent },
  { path: 'details/:id', component: EditUserComponent, resolve:{data : EditUserResolver} }
];
