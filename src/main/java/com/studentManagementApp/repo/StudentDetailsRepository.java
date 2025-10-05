package com.studentManagementApp.repo;

import com.studentManagementApp.entity.StudentDetails;
import dto.StudentDetailsDto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentDetailsRepository  extends JpaRepository<StudentDetails, Long> {

    StudentDetails findByStudentName(String name);
}
