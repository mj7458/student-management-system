import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Credentials } from '../models/credentials.model';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../models/user.module';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,RouterModule,CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  resetForm: FormGroup;
  loading = false;
  credential: Credentials = { username: '', password: '' };
  errorMessage: string = ''; // Add this line 
  newPassword: string ='';
  loginPage: boolean = true;
  resetPage:boolean = false;
  user: User = { name: '', email: '', password: '', username: '', role: ''};

  constructor(@Inject(PLATFORM_ID) private platformId: Object,private fb: FormBuilder, private authService: AuthService,private router: Router, private userService: UserService) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
        this.resetForm = this.fb.group(
      {
        password: ['', [Validators.required, Validators.minLength(6)]],
        username: ['', Validators.required],
        rpassword: ['', [Validators.required, Validators.minLength(6)]]
      },
      { validators: this.passwordsMatchValidator } // ✅ apply validator here
    );
  }
  ngOnInit(): void {
  if (isPlatformBrowser(this.platformId)) {
    localStorage.removeItem('X-Auth-token');
    console.log('token delete successfully:', localStorage.getItem('X-Auth-token')); // Clear token on logout
  }
  }

    passwordsMatchValidator(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const rpassword = group.get('rpassword')?.value;
    return password === rpassword ? null : { passwordsMismatch: true };
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
reset(){
  if (this.resetForm.valid) {
    this.userService.getUserByUsername(this.resetForm.value.username).subscribe({
      next: (data) => this.user = data,
      error: (err) => console.error('Error loading users:', err)
    });
    if(this.user.email !=null){
            this.userService.updateUser(this.user).subscribe({
      next: () => this.userSaved(),
      error: (err) => console.error('Update failed:', err)
    });
    }
  }
  else {
        console.log('Form is invalid');
        this.resetForm.markAllAsTouched(); // ✅ mark all fields as touched to show validation errors
      }
}
onForgotPass(){
  this.resetPage=true;
  this.loginPage=false;
}
userSaved(){
 console.log("Password is updated");
}
back(){
    this.resetPage=false;
    this.loginPage=true;
    this.resetForm.reset();
}
}


