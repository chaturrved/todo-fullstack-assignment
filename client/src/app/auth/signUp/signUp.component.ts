import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { SignUpService } from './signUp.service';

@Component({
  selector: 'app-signUp',
  templateUrl: './signUp.component.html',
  styleUrls: ['./signUp.component.css']
})
export class SignUpComponent {

  signupForm!: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private router: Router,
    private signUpService: SignUpService,  
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      fullname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirm_password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.formValid()) {
      this.signUp(this.signupForm.value);
      console.log(this.signupForm.value);
    }
  }

  formValid() { 
    if(this.signupForm.get('password')?.value !== this.signupForm.get('confirm_password')?.value){
      return false;
    }else if(!this.signupForm.valid){
      return false;
    }
    return true;
  }


 getErrorMsg(controlName: string) {
    if(controlName === 'email'){
      return this.authService.getEmailErrorMessage(this.signupForm.get('email'))
    }else if(controlName === 'password'){
      return this.authService.getPasswordErrorMessage(this.signupForm.get('password'))
    }
    return null;
  }

  signUp(data: any) {
    const createUserData = {
      name: data.fullname,
      email: data.email,
      password: data.password
    }

    this.signUpService
    .signUp(createUserData)
    .subscribe({
      next:(res: any) => {
       this.router.navigate(['/login']);
      },
      error:(error) => {
        console.error('Signup failed:', error);
        alert('Signup Failed');}
    });
  }
}