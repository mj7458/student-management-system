import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { User } from './models/user.module';


@Injectable({
  providedIn: 'root',
})
export class UserService{
    private apiUrl = 'http://localhost:8080/users';

    constructor(private http: HttpClient,  private authService: AuthService) {}

    addUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user,{
      headers: this.authService.getAuthHeaders(),
    });
  }
}