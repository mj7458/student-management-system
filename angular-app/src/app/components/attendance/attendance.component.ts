import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Location } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StudentService } from '../student.service';

import { Student } from '../models/student.model';
import { Attendance } from '../models/attendance.module';

// interface AttendanceRecord {
//   studentId: number;
//   date: Date;
//   status: 'Present' | 'Absent' | 'Late';
// }

@Component({
  selector: 'app-attendance',
  imports: [CommonModule, FormsModule,RouterModule],
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss']
})
export class AttendanceComponent implements OnInit {
   students: any[] = [];

   constructor(private studentService: StudentService,private location: Location) {
     
   }

  attendanceRecords: Attendance[] = [
    // { studentId: 43, date: new Date("2025-10-01"), status: 'Present' },
    // { studentId: 43, date: new Date("2025-10-02"), status: 'Absent' },
    // { studentId: 43, date: new Date("2025-10-03"), status: 'Late' },
    // ...add more mock data as needed
  ];

  months: string[] = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  years: number[] = [];
  selectedYear: number = new Date().getFullYear();
  selectedMonth: number = new Date().getMonth();
  selectedStudentId: number=0;

  get selectedStudent(): Student{
    return this.students.find(s => s.id === this.selectedStudentId);
  }

  get daysInMonth(): number[] {
    const days = new Date(this.selectedYear, this.selectedMonth + 1, 0).getDate();
    return Array.from({ length: days }, (_, i) => i + 1);
  }

  ngOnInit(): void {
    // Populate years (e.g., last 5 years)
     const currentYear = new Date().getFullYear();
    for (let y = currentYear - 4; y <= currentYear + 1; y++) {
      this.years.push(y);
    }
    this.studentService.getStudents().subscribe((students: Student[]) => {
      this.students = students;
      console.log('Students loaded:', this.students.length);
      // Optionally select the first student by default
      if (this.students.length > 0) {
        this.selectedStudentId = this.students[0].id;
      }
      this.getAttendance();
    });
   
    
  }

  goBack() {
    this.location.back();
  }
  onStudentChange(event: any): void {
    if(event && event.target){
      this.selectedStudentId = +event.target.value;
      console.log('Selected Student ID:', this.selectedStudentId);
      this.getAttendance();
    }
  }

  private getAttendance() {
    this.studentService.getStudentAttendance(this.selectedStudentId, this.selectedYear, this.selectedMonth + 1).subscribe((attendance: Attendance[]) => {
      this.attendanceRecords = attendance;
      console.log('Attendance loaded:', this.attendanceRecords.length);
    });
  }

  onYearChange(event: number): void {
     this.selectedYear = +event;
     console.log('Selected Year:', this.selectedYear);
     this.getAttendance();

  }

  prevMonth(): void {
    if (this.selectedMonth === 0) {
      this.selectedMonth = 11;
      this.selectedYear--;
    } else {
      this.selectedMonth--;
    }
    this.getAttendance();
  }

  nextMonth(): void {
    if (this.selectedMonth === 11) {
      this.selectedMonth = 0;
      this.selectedYear++;
    } else {
      this.selectedMonth++;
    }
    this.getAttendance();
  }

  // getAttendanceStatus(studentId: number | null, year: number, month: number, day: number): string {
 
  //   if (!studentId) return '';
  //   const record = this.attendanceRecords.find(
  //     r => r.studentId === studentId && new Date(r.date).toISOString().split('T')[0]==new Date(year, month, day).toISOString().split('T')[0]
  //   );
  //   console.log('Found record:', record);
  //   return record ? record.status : 'N/A';
  // }

  getAttendanceStatus(studentId: number | null, year: number, month: number, day: number): string {
  if (!studentId) return '';

  // Format target date as 'YYYY-MM-DD'
  const targetDate = `${year}-${(month + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

  // Find matching record
  const record = this.attendanceRecords.find(r =>
    r.studentId === studentId &&
    this.formatDate(r.date) === targetDate
  );

  return record ? record.status : 'N/A';
}

// Helper to format Date object to 'YYYY-MM-DD'
private formatDate(date: string | Date): string {
  const d = new Date(date); // safely convert string to Date
  return `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getDate().toString().padStart(2, '0')}`;
}
}
