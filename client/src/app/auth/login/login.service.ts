import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private readonly httpClient: HttpClient) { 
    
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    const headers = new HttpHeaders({
      'accept': 'application/json',
      'Content-Type': 'application/json',
    });

    return this.httpClient.post(`${apiUrl}/auth/login`, credentials, { headers });
  }

}
