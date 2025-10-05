import { CommonModule, NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';



@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule, RouterModule,CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {

signupForm: FormGroup;
loading = false;

  constructor(private fb: FormBuilder) {
    this.signupForm = this.fb.group(
      {
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        username: ['', Validators.required],
        rpassword: ['', [Validators.required, Validators.minLength(6)]]
      },
      { validators: this.passwordsMatchValidator } // ✅ apply validator here
    );
  }


  onSubmit() {
    if (this.signupForm.valid) {
      console.log('Form Submitted:', this.signupForm.value);
      // TODO: Send data to backend
    }
  }
  onCancel() {
    this.signupForm.reset(); // ✅ graceful cancel behavior
  }

  passwordsMatchValidator(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const rpassword = group.get('rpassword')?.value;
    return password === rpassword ? null : { passwordsMismatch: true };
  }


}
