package com.studentManagementApp.service;

import com.studentManagementApp.entity.Attendance;
import com.studentManagementApp.repo.AttendanceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class AttendanceService {
    @Autowired
    private AttendanceRepository attendanceRepository;

    public List<Attendance> getAttendanceForStudent(Long studentId, int year, int month) {
        LocalDate startDate = LocalDate.of(year, month, 1);
        LocalDate endDate = startDate.withDayOfMonth(startDate.lengthOfMonth());

        return attendanceRepository.findByStudentIdAndDateBetween(studentId, startDate, endDate);
    }

    public List<Attendance> markAttendance(List<Attendance> attendanceList){
       return attendanceRepository.saveAll(attendanceList);
    }

}
