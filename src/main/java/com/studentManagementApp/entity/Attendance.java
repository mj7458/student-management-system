package com.studentManagementApp.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "ATTENDANCE")
public class Attendance {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Reference to the student
    @JsonProperty("studentId")
    @Column(name = "student_id", nullable = false)
    private Long studentId;

    // Date of attendance
    @JsonProperty("date")
    @JsonFormat(pattern = "yyyy-MM-dd")
    @Column(name = "attendance_date", nullable = false)
    private LocalDate date;

    // Status: Present, Absent, etc.
    @JsonProperty("status")
    @Column(name = "status", nullable = false)
    private String status;


}
