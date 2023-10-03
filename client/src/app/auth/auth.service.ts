import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, tap, catchError, of } from 'rxjs';
import { apiUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    private readonly authenticated = new Subject<boolean>;
    authenticated$ = this.authenticated.asObservable();

    constructor(private readonly httpClient: HttpClient, private readonly router: Router) {}

    getEmailErrorMessage(email: any) {
        if(email.hasError('required')){
        return 'You must enter a value!';
        }

        return email.hasError('email') ? 'Please enter a valid email Id.' : '';
    }

    getPasswordErrorMessage(password: any) {
        if(password.hasError('required')){
        return 'You must enter a value!';
        }
        return '';
    }

    logout() {

        const headers = new HttpHeaders({
            'accept': '`*/*`',
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
        });

        const options = {headers: headers};

        return this.httpClient.post(`${apiUrl}/auth/logout`, options).pipe(
            tap(() => this.authenticated.next(false)),
            catchError(() => of(false))
        );
    }
}
