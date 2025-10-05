import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router,RouterModule } from '@angular/router';
import { StudentService } from '../student.service';
import { Location } from '@angular/common';
import { Attendance, AttendanceStatus } from '../models/attendance.module';

@Component({
  selector: 'app-mark-attendance',
  imports: [CommonModule, RouterModule],
  templateUrl: './mark-attendance.component.html',
  styleUrl: './mark-attendance.component.scss'
})
export class MarkAttendanceComponent {
  students: any[] = [];
  selectedStudentIds: number[] = [];
  attendance: Attendance[] = [];
  constructor(private studentService: StudentService, private location: Location,private router: Router) {
    this.studentService.getStudents().subscribe((students: any[]) => {
      this.students = students;
    });
  }
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }
  goBack() {
    this.location.back();
  }
  goHome() {
   this.router.navigate(['/home']);
  }

onCheckboxChange(event: any, studentId: number) {
  if (event.target.checked) {
    console.log(studentId);
    this.selectedStudentIds.push(studentId);
  } else {
    this.selectedStudentIds = this.selectedStudentIds.filter(id => id !== studentId);
  }
}

onPresent() {
  if (this.selectedStudentIds.length === 0) {
    alert('Please select at least one student.');
    return;
  }
  const formattedDate = new Date().toISOString().split('T')[0];
  this.attendance = [];
  for (let studentId of this.selectedStudentIds) {
    const attendanceRecord: Attendance = {
      studentId: studentId,
      date: formattedDate as unknown as Date,
      status: AttendanceStatus.Present
    };
    this.attendance.push(attendanceRecord);
  }

  console.log(this.attendance);
  this.studentService.markAttendance(this.attendance).subscribe(() => {
    // this.students = this.students.filter(student => !this.selectedStudentIds.includes(student.id));
    // this.selectedStudentIds = [];
    alert('Selected students have been marked Present.');
  });
}

onAbsent() {
  if (this.selectedStudentIds.length === 0) {
    alert('Please select at least one student.');
    return;
  }
  const formattedDate = new Date().toISOString().split('T')[0];
  this.attendance = [];

 for (let studentId of this.selectedStudentIds) {
    const attendanceRecord: Attendance = {
      studentId: studentId,
      date: formattedDate as unknown as Date,
      status: AttendanceStatus.Absent
    };
    this.attendance.push(attendanceRecord);
  }

  console.log(this.attendance);
  this.studentService.markAttendance(this.attendance).subscribe(() => {
    // this.students = this.students.filter(student => !this.selectedStudentIds.includes(student.id));
    // this.selectedStudentIds = [];
    alert('Selected students have been marked Absent.');
  });
}
onLate() {
  if (this.selectedStudentIds.length === 0) {
    alert('Please select at least one student.');
    return;
  }
  const formattedDate = new Date().toISOString().split('T')[0];
  this.attendance = [];

  for (let studentId of this.selectedStudentIds) {
    const attendanceRecord: Attendance = {
      studentId: studentId,
      date: formattedDate as unknown as Date,
      status: AttendanceStatus.Late
    };
    this.attendance.push(attendanceRecord);
  }

  console.log(this.attendance);
  this.studentService.markAttendance(this.attendance).subscribe(() => {
    // this.students = this.students.filter(student => !this.selectedStudentIds.includes(student.id));
    // this.selectedStudentIds = [];
    alert('Selected students have been marked Late.');
  });
}
}
