import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TasksComponent } from './tasks/tasks.component';
import { LoginComponent } from './auth/login/login.component';
import { SignUpComponent } from './auth/signUp/signUp.component';
import { HomeComponent } from './home/home.component';
import { GuardsDown } from './auth/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: SignUpComponent
  },
  {
    path: '',
    component: HomeComponent,
    canActivate: [GuardsDown]
  },
  {
    path: '**',
    redirectTo: ''
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
