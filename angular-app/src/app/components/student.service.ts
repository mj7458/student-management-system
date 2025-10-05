import { Injectable } from '@angular/core';
import { Student } from './models/student.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Attendance } from './models/attendance.module';
import { StudentDetails } from './models/student-detail.module';


@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private apiUrl = 'http://localhost:8080/students';
  private deleteApi = 'http://localhost:8080/students/delete';
  private attendanceApi = 'http://localhost:8080/attendance';
  private saveAttendanceApi = 'http://localhost:8080/attendance/save';
  private saveStudentDetailsApi = 'http://localhost:8080/students/saveDetails';
  private getStudentDetailsApi = 'http://localhost:8080/students/{name}/getDetails';

  constructor(private http: HttpClient,  private authService: AuthService) {}

  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.apiUrl,  {
      headers: this.authService.getAuthHeaders(),
    });
  }

  getStudentById(id: number): Observable<Student> {
    return this.http.get<Student>(`${this.apiUrl}/${id}`,{
      headers: this.authService.getAuthHeaders(),
    });
  }

  addStudent(student: Student): Observable<Student> {
    return this.http.post<Student>(this.apiUrl, student,{
      headers: this.authService.getAuthHeaders(),
    });
  }
  saveStudentDetails(student: StudentDetails): Observable<any> {
    return this.http.post<any>(this.saveStudentDetailsApi, student,{
      headers: this.authService.getAuthHeaders(),
    });
  }
  getStudentDetails(name: string): Observable<StudentDetails> {
    const url = `${this.apiUrl}/${name}/getDetails`;
    return this.http.get<StudentDetails>(url, {
      headers: this.authService.getAuthHeaders(),
    });
  }

  deleteStudents(studentIds: number[]): Observable<any> {
    return this.http.request<any>('delete', this.deleteApi, {
      headers: this.authService.getAuthHeaders(),
      body: studentIds
    });
  }
  getStudentAttendance(studentId: number, year: number, month: number): Observable<Attendance[]> {
    const url = `${this.attendanceApi}/${studentId}?year=${year}&month=${month}`;
    return this.http.get<Attendance[]>(url, {
      headers: this.authService.getAuthHeaders(),
    });
  }

  markAttendance(attendance: Attendance[]): Observable<Attendance> {
    return this.http.post<Attendance>(this.saveAttendanceApi, attendance, {
      headers: this.authService.getAuthHeaders(),
    });
  }

}
