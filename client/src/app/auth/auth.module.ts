import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpComponent } from './signUp/signUp.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';



@NgModule({
  declarations: [
    LoginComponent,
    SignUpComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    LoginComponent,
    SignUpComponent
  ]
})
export class AuthModule { }
