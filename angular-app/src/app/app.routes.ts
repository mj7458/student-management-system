import { Routes } from '@angular/router';
import { provideRouter } from '@angular/router';
import { StudentListComponent } from './components/student-list/student-list.component';
import { StudentDetailComponent } from './components/student-detail/student-detail.component';
import { AddStudentComponent } from './components/add-student/add-student.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { LogoutComponent } from './components/logout/logout.component';
import { authGuard } from './auth.guard';
import { AttendanceComponent } from './components/attendance/attendance.component';
import { MarkAttendanceComponent } from './components/mark-attendance/mark-attendance.component';
import { SignupComponent } from './components/signup/signup.component';
import { UsersManagementComponent } from './components/users-management/users-management.component';
import path from 'path';

export const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [authGuard], pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [authGuard] },
  { path: 'students', component: StudentListComponent, canActivate: [authGuard] },
  { path: 'attendance', component: AttendanceComponent, canActivate: [authGuard] },
  { path: 'students/:id', component: StudentDetailComponent, canActivate: [authGuard] },
  { path: 'add-student', component: AddStudentComponent, canActivate: [authGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'mark-attendance',component: MarkAttendanceComponent, canActivate: [authGuard] },
  { path: 'users-management',component: UsersManagementComponent, canActivate: [authGuard] , 
    children: [ {path: 'signup',component: SignupComponent  }]},
  { path: 'signup',component: SignupComponent },
  { path: 'logout', component: LogoutComponent }
];

export const appRoutingProviders = [provideRouter(routes)];