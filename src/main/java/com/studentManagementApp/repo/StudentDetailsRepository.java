package com.studentManagementApp.repo;

import com.studentManagementApp.entity.StudentDetails;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentDetailsRepository  extends JpaRepository<StudentDetails, Long> {
}
