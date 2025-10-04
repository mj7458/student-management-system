export interface Attendance {
  id?: number;
  studentId: number;
  date: Date;
  status: AttendanceStatus;
}

export enum AttendanceStatus {
  Present = 'Present',
  Absent = 'Absent',
  Late = 'Late'
}
