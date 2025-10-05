import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Location, NgClass } from '@angular/common';
import { AuthService } from '../auth.service';
import { StudentService } from '../student.service';
import { StudentDetails } from '../models/student-detail.module';

@Component({
  selector: 'app-student-detail',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule,NgClass],
  templateUrl: './student-detail.component.html',
  styleUrl: './student-detail.component.scss'
})
export class StudentDetailComponent implements OnInit {
  addStudentForm: FormGroup;
  formSubmitted = false;
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
      address: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      email: ['', Validators.required],
      enrollDate: ['', Validators.required],
      fathersName: ['', Validators.required],
      fathersOccupation: ['', Validators.required],
      mothersName: ['', Validators.required],
      mothersOccupation: ['', Validators.required],
      emergencyContact: ['', Validators.required],
      emergencyContactRelation: ['', Validators.required],
      emergencyContactPhone: ['', Validators.required],
      mothersPhoneNumber: ['', Validators.required],
      fathersPhoneNumber: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const navState = history.state;

    this.addStudentForm.patchValue({
      studentName: navState.studentName || '',
      studentId: navState.studentId || '',
      studentAge: navState.studentAge || '',
      course: navState.course || '',
      enrollDate: navState.enroll_date || ''
    });
    // console.log("Date from prev page"+navState.enroll_date);
    if(navState.studentName != null){
      this.studentService.getStudentDetails(navState.studentName).subscribe({
        next: (details: StudentDetails) => {
          if (details) {
            this.addStudentForm.patchValue({
              studentName: details.studentName || '',
              studentId: details.studentId || '',
              studentAge: details.studentAge || '',
              course: details.course || '',
              enrollDate: details.enroll_date || '',
              address: details.address || '',
              phoneNumber: details.phoneNumber || '',
              email: details.email || '',
              fathersName: details.fathersName || '',
              fathersOccupation: details.fathersOccupation || '',
              mothersName: details.mothersName || '',
              mothersOccupation: details.mothersOccupation || '',
              emergencyContact: details.emergencyContact || '',
              emergencyContactRelation: details.emergencyContactRelation || '',
              emergencyContactPhone: details.emergencyContactPhone || '',
              mothersPhoneNumber: details.mothersPhoneNumber || '',
              fathersPhoneNumber: details.fathersPhoneNumber || '',
              sex: details.sex || ''
            });
            this.addStudentForm.disable();
          }
        },
        error: (err) => {
          if (err.status === 404) {
            // Optional: show a user-friendly message or skip silently
            console.warn('Student not found:', navState.studentName);
          } else {
            console.error('Error fetching student details:', err);
          }
        }
      });
      }
      
  }

  formatDate(date: string): string {
    return new Date(date).toISOString().split('T')[0]; // "YYYY-MM-DD"
  }
  goBack(): void {
    this.location.back();
  }

  goHome(): void {
    this.router.navigate(['/home']);
  }

  onCancel(): void {
    if(!this.addStudentForm.disabled){
      this.addStudentForm.reset();
    }
    this.goBack();
  }
  isInvalid(controlName: string): boolean {
    const control = this.addStudentForm.get(controlName);
    return !!(control?.invalid && (control?.touched || control?.dirty));
  }

  onSubmit(): void {
    this.formSubmitted = true;
    if (this.addStudentForm.valid) {
      const student: StudentDetails = {
        studentId: this.addStudentForm.value.studentId,
        studentName: this.addStudentForm.value.studentName,
        studentAge: this.addStudentForm.value.studentAge,
        sex: this.addStudentForm.value.sex,
        course: this.addStudentForm.value.course,
        address: this.addStudentForm.value.address,
        phoneNumber: this.addStudentForm.value.phoneNumber,
        email: this.addStudentForm.value.email,
        enroll_date: this.addStudentForm.value.enrollDate,
        fathersName: this.addStudentForm.value.fathersName,
        fathersOccupation: this.addStudentForm.value.fathersOccupation,
        mothersName: this.addStudentForm.value.mothersName,
        mothersOccupation: this.addStudentForm.value.mothersOccupation,
        emergencyContact: this.addStudentForm.value.emergencyContact,
        emergencyContactRelation: this.addStudentForm.value.emergencyContactRelation,
        emergencyContactPhone: this.addStudentForm.value.emergencyContactPhone,
        mothersPhoneNumber: this.addStudentForm.value.mothersPhoneNumber,
        fathersPhoneNumber: this.addStudentForm.value.emergencyContactPhone
      };

      console.log('Submitting student:', student);

      this.studentService.saveStudentDetails(student).subscribe({
        next: (response) => {
          alert('Student saved successfully!');
          console.log('Student added successfully', response);
          this.router.navigate(['/students']);
        },
        error: (error) => {
          alert('Failed to save student. Please try again.');
          console.error('Error adding student', error);
        }
      });
    } else {
       alert('Please filled all required fields correctly.');
      console.warn('Form is invalid');
      this.addStudentForm.markAllAsTouched();
    }
  }
}