import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { User } from './models/user.module';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class UserService{
    private apiUrl = `${environment.apiUrl}/users`;


    constructor(private http: HttpClient,  private authService: AuthService) {}

    addUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user,{
      headers: this.authService.getAuthHeaders(),
    });
  }

    getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

    updateUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user,{
      headers: this.authService.getAuthHeaders(),
    });
  }

   deleteUser(user: User): Observable<User> {
    return this.http.delete<User>(this.apiUrl, {
      headers: this.authService.getAuthHeaders(),
      body: user
    });
  }

    getUserByUsername(username: string): Observable<User> {
      return this.http.get<User>(`${this.apiUrl}/${username}`);
    }


}