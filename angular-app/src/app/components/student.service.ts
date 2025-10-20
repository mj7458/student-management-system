import { Injectable } from '@angular/core';
import { Student } from './models/student.model';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { Attendance } from './models/attendance.module';
import { StudentDetails } from './models/student-detail.module';
import { environment } from '../../environments/environment';



@Injectable({
  providedIn: 'root',
})
export class StudentService {
  // private baseUrl = environment.apiUrl; 
  private apiUrl = `${environment.apiUrl}/students`;
  private deleteApi = environment.apiUrl+'/students/delete';
  private attendanceApi = environment.apiUrl+'/attendance';
  private saveAttendanceApi = environment.apiUrl+'/attendance/save';
  private saveStudentDetailsApi = environment.apiUrl+'/students/saveDetails';
  private getStudentDetailsApi = environment.apiUrl+'/students/{name}/getDetails';

  constructor(private http: HttpClient,  private authService: AuthService) {}

  // getStudents(): Observable<Student[]> {
  //   return this.http.get<Student[]>(this.apiUrl,  {
  //     headers: this.authService.getAuthHeaders(),
  //   });
  // }

    getStudents(): Observable<Student[]> {
    const headers = this.authService.getAuthHeaders(); // returns HttpHeaders

    return this.http.get<Student[]>(this.apiUrl, { headers }).pipe(
      tap((data) => {
        console.log('Received students:', data);
      }),
      catchError((error) => {
        console.error('Error fetching students:', error);
        return throwError(() => error);
      })
    );
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
