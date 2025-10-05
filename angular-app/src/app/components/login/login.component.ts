import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Credentials } from '../models/credentials.model';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,RouterModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  credential: Credentials = { username: '', password: '' };
  errorMessage: string = ''; // Add this line 

  constructor(@Inject(PLATFORM_ID) private platformId: Object,private fb: FormBuilder, private authService: AuthService,private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  ngOnInit(): void {
  if (isPlatformBrowser(this.platformId)) {
    localStorage.removeItem('X-Auth-token');
    console.log('token delete successfully:', localStorage.getItem('X-Auth-token')); // Clear token on logout
  }
  }

  async onSubmit() {
    this.errorMessage = ''; // Reset error on submit
    if (this.loginForm.valid) {
      this.loading = true; // Start spinner
      this.credential.username = this.loginForm.value.username;
      this.credential.password = this.loginForm.value.password;
      // const result = this.authService.login(this.credential);
      const message = await this.authService.login(this.credential);
      // console.log('api response:',message);

      setTimeout(() => {
        if (localStorage.getItem('X-Auth-token') != null && message === 'success') {
          // console.log('token found:', localStorage.getItem('X-Auth-token'));
          // console.log('api response:',result);
          this.router.navigate(['/home']);
        } else {
          this.errorMessage = message; // Show error
        }
        this.loading = false; // Stop spinner
      }, 300);
    }
  }
  onSignUp() {
  this.router.navigate(['/signup']);
}
}


