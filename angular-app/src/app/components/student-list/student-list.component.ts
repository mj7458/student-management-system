import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router,RouterModule } from '@angular/router';
import { StudentService } from '../student.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-student-list',
  standalone: true,
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss'],
  imports: [CommonModule, RouterModule] // Include RouterModule here
})
export class StudentListComponent implements OnInit {


  students: any[] = [];
  selectedStudentIds: number[] = [];

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
  goToStudentForm(student: any): void {
    this.router.navigate(['/students', student.id], {
      state: {
        studentName: student.name,
        studentId: student.id,
        studentAge: student.age,
        course: student.course,
        enroll_date: student.enroll_date
      }
    });
  }
onCheckboxChange(event: any, studentId: number) {
  if (event.target.checked) {
    console.log(studentId);
    this.selectedStudentIds.push(studentId);
  } else {
    this.selectedStudentIds = this.selectedStudentIds.filter(id => id !== studentId);
  }
}

onDeleteStudent() {
  if (this.selectedStudentIds.length === 0) {
    alert('Please select at least one student to delete.');
    return;
  }

  this.studentService.deleteStudents(this.selectedStudentIds).subscribe(() => {
    this.students = this.students.filter(student => !this.selectedStudentIds.includes(student.id));
    this.selectedStudentIds = [];
    alert('Selected students have been deleted.');
  });
}
}