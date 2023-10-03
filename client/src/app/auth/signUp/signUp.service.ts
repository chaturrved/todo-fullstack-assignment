import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {
  constructor(private httpClient: HttpClient) { }

  signUp(userData: any) {
     const headers = new HttpHeaders({
      'accept': 'application/json',
      'Content-Type': 'application/json',
    });

    return this.httpClient.post(`${apiUrl}/users`, userData, { headers });
  }
}
