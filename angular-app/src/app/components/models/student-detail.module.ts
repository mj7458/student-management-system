export interface StudentDetails {
  id?: number;
  studentId?: number;
  studentName: string;
  studentAge: number;
  sex?: string;
  course: string;
  address?: string;
  phoneNumber?: string;
  email?: string;
  enroll_date?: Date;
  fathersName?: string;
  fathersOccupation?: string;
  mothersName?: string;
  mothersOccupation?: string;
  emergencyContact?: string;
  emergencyContactRelation?: string;
  emergencyContactPhone?: string;
  mothersPhoneNumber?: string;
  fathersPhoneNumber?: string;
}
