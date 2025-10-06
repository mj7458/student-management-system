// auth.service.ts
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router, RouterModule } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/auth/login'; // Update with your backend URL

  constructor(private http: HttpClient, private router: Router) {
  }


  login(credentials: { username: string; password: string }): Promise<string> {
  return new Promise((resolve) => {
    this.http.post<{ token: string, message: string }>(this.apiUrl, credentials).subscribe({
      next: (response) => {
        if (response?.token) {
          localStorage.setItem('X-Auth-token', response.token);
          resolve(response?.message); // No error, return empty string
        } else {
          // console.error('Error: No token received in response');
          // console.log('api response:',response?.Error);
          resolve(response?.message);
        }
      },
      error: (err) => {
        console.error('Login failed:', err);
        resolve('Login failed: ' + (err?.error?.message || err.message || 'Unknown error'));
      },
      complete: () => {
        // console.log('Login successful');
      },
    });
  });
}

  getToken() {
    if (typeof window !== 'undefined' && window.localStorage) {
    return localStorage.getItem('X-Auth-token');
  }
  return null;
  }

  getAuthHeaders() {
    // console.log('Getting auth headers', this.getToken());
    return new HttpHeaders({ 'X-Auth-token': `${this.getToken()}` });
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;

    // Optionally, you can add logic to check token expiration
    const payload = JSON.parse(atob(token.split('.')[1]));
    const exp = payload.exp * 1000; // Convert to milliseconds
    return Date.now() < exp;
  }


}