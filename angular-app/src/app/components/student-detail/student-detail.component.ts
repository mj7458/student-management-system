import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Location } from '@angular/common';
import { AuthService } from '../auth.service';
import { StudentService } from '../student.service';
import { StudentDetails } from '../models/student-detail.module';

@Component({
  selector: 'app-student-detail',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './student-detail.component.html',
  styleUrl: './student-detail.component.scss'
})
export class StudentDetailComponent implements OnInit {
  addStudentForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private studentService: StudentService,
    private location: Location
  ) {
    this.addStudentForm = this.fb.group({
      studentName: ['', Validators.required],
      studentId: ['', Validators.required],
      studentAge: ['', Validators.required],
      sex: ['', Validators.required],
      course: ['', Validators.required],
      address: [''],
      phoneNumber: [''],
      email: [''],
      enrollDate: [''],
      fathersName: [''],
      fathersOccupation: [''],
      mothersName: [''],
      mothersOccupation: [''],
      emergencyContact: [''],
      emergencyContactRelation: ['', Validators.required],
      emergencyContactPhone: ['']
    });
  }

  ngOnInit(): void {
    const navState = history.state;

    this.addStudentForm.patchValue({
      studentName: navState.studentName || '',
      studentId: navState.studentId || '',
      studentAge: navState.studentAge || '',
      course: navState.course || ''
    });
  }

  goBack(): void {
    this.location.back();
  }

  goHome(): void {
    this.router.navigate(['/home']);
  }

  onCancel(): void {
    this.addStudentForm.reset();
    this.goBack();
  }

  onSubmit(): void {
    if (this.addStudentForm.valid) {
      const student: StudentDetails = {
        id: this.addStudentForm.value.studentId,
        name: this.addStudentForm.value.studentName,
        age: this.addStudentForm.value.studentAge,
        sex: this.addStudentForm.value.sex,
        course: this.addStudentForm.value.course,
        address: this.addStudentForm.value.address,
        phoneNumber: this.addStudentForm.value.phoneNumber,
        email: this.addStudentForm.value.email,
        enrollDate: this.addStudentForm.value.enrollDate,
        fathersName: this.addStudentForm.value.fathersName,
        fathersOccupation: this.addStudentForm.value.fathersOccupation,
        mothersName: this.addStudentForm.value.mothersName,
        mothersOccupation: this.addStudentForm.value.mothersOccupation,
        emergencyContact: this.addStudentForm.value.emergencyContact,
        emergencyContactRelation: this.addStudentForm.value.emergencyContactRelation,
        emergencyContactPhone: this.addStudentForm.value.emergencyContactPhone
      };

      console.log('Submitting student:', student);

      this.studentService.addStudent(student).subscribe({
        next: (response) => {
          console.log('Student added successfully', response);
          this.router.navigate(['/students']);
        },
        error: (error) => {
          console.error('Error adding student', error);
        }
      });
    } else {
      console.warn('Form is invalid');
    }
  }
}