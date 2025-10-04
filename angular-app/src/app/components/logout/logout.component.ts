import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-logout',
  imports: [RouterModule,CommonModule],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.scss'
})
export class LogoutComponent implements OnInit {
  constructor(private router: Router) {
    // Clear the token from local storage
    // localStorage.removeItem('X-Auth-token');
    // Optionally, you can redirect to the login page or home page
    // window.location.href = '/home'; // Redirect to login page
  }

  loading = false;
  isLoginPage = false;
  
ngOnInit() {
  this.isLoginPage = this.router.url === '/login';
  this.loading = true;
  localStorage.removeItem('X-Auth-token');
  console.log('token delete successfully:', localStorage.getItem('X-Auth-token')); // Clear token on logout

  setTimeout(() => {
        if (localStorage.getItem('X-Auth-token') == null) {
          // console.log('token found:', localStorage.getItem('X-Auth-token'));
          // console.log('api response:',result);
          this.router.navigate(['/login']);
        } 
        this.loading = false; // Stop spinner
      }, 300);
}
}
