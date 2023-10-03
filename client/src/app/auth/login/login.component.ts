import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { CreateUserInput } from 'src/app/types/createUserInput';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private readonly loginService: LoginService,
    private readonly router: Router,
    private fb: FormBuilder,
    private authService: AuthService
  ) {}

   loginForm!: FormGroup;


  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.login(this.loginForm);
      this.loginForm.reset();
    }
  }

  login(loginForm: FormGroup): void {
    this.loginService
      .login({ email: loginForm.get('email')?.value, password: loginForm.get('password')?.value })
      .subscribe({
        next:(res) => {
          localStorage.setItem('token', res.access_token);
          localStorage.setItem('userId', res.userId);
          this.router.navigate(['/']);
          
        },
        error:(error) => console.error('Login failed:', error)
      });
  }

  getErrorMsg(controlName: string) {
    if(controlName === 'email'){
      return this.authService.getEmailErrorMessage(this.loginForm.get('email'))
    }else if(controlName === 'password'){
      return this.authService.getPasswordErrorMessage(this.loginForm.get('password'))
    }
    return null;
  }
}
