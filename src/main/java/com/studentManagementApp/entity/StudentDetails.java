package com.studentManagementApp.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.Date;

@Getter
@Setter
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "STUDENT_DETAILS")
public class StudentDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String studentName;
    private Long studentId;
    private int studentAge;
    private String sex;
    private String course;
    private String address;
    private String phoneNumber;
    private String email;
    private LocalDate enrollDate = new Date().toInstant().atZone(java.time.ZoneId.systemDefault()).toLocalDate();
    private String fathersName;
    private String fathersPhoneNumber;
    private String mothersName;
    private String mothersPhoneNumber;
    private String fathersOccupation;
    private String mothersOccupation;
    private String emergencyContact;
    private String emergencyContactRelation;
    private String emergencyContactPhone;
}
