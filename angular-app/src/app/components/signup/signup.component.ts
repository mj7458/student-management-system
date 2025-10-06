import { CommonModule, NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../models/user.module';



@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule, RouterModule,CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {

signupForm: FormGroup;
loading = false;
user: User = { name: '', email: '', password: '', username: '', role: ''};

  constructor(private fb: FormBuilder, private router: Router, private userservice: UserService) {
    this.signupForm = this.fb.group(
      {
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        username: ['', Validators.required],
        rpassword: ['', [Validators.required, Validators.minLength(6)]],
        role: ['', Validators.required]
      },
      { validators: this.passwordsMatchValidator } // ✅ apply validator here
    );
  }


  onSubmit() {
    if (this.signupForm.valid) {

      console.log('Form Submitted:', this.signupForm.value);
      this.user.email = this.signupForm.value.email;
      this.user.name = this.signupForm.value.name;
      this.user.password = this.signupForm.value.password;
      this.user.username = this.signupForm.value.username;
      this.user.role = this.signupForm.value.role;
      console.log('User Object:', this.user);

      this.userservice.addUser(this.user).subscribe({
        next: (response) => {
          console.log('User added successfully', response);
    }
      });
      this.router.navigate(['/login']);
    } else {
      console.log('Form is invalid');
      this.signupForm.markAllAsTouched(); // ✅ mark all fields as touched to show validation errors
    }
  }

  onCancel() {
    this.signupForm.reset(); // ✅ graceful cancel behavior
    this.router.navigate(['/login']);
  }

  passwordsMatchValidator(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const rpassword = group.get('rpassword')?.value;
    return password === rpassword ? null : { passwordsMismatch: true };
  }


}
