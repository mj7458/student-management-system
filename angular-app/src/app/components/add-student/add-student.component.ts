import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';
import { Student } from '../models/student.model';
import { StudentService } from '../student.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-student',
  imports: [ReactiveFormsModule,RouterModule],
  templateUrl: './add-student.component.html',
  styleUrl: './add-student.component.scss'
})
export class AddStudentComponent {
  addStudentForm: FormGroup;
  // student: Student {id=0, name: '', age: 0, course: '' };
  student: Student = {  name: '', age: 0, course: ''  };

    constructor(private fb: FormBuilder, private authService: AuthService,private router: Router, private studentService: StudentService,private location: Location) {
    this.addStudentForm = this.fb.group({
      name: ['', Validators.required],
      age: ['', Validators.required],
      course: ['', Validators.required],
    });
  }
  goBack() {
    this.location.back();
  }
  goHome() {
   this.router.navigate(['/home']);
  }
  onSubmit(){
    this.student.name = this.addStudentForm.value.name;
    this.student.age = this.addStudentForm.value.age;
    this.student.course = this.addStudentForm.value.course;
    console.log('Add Student form value', this.addStudentForm.value);
    if (this.addStudentForm.valid) {
      this.studentService.addStudent(this.student).subscribe({
        next: (response) => {
          console.log('Student added successfully', response);
          this.router.navigate(['/students']);
        },
        error: (error) => {
          console.error('Error adding student', error);
        }
      });
    }

  }
}
