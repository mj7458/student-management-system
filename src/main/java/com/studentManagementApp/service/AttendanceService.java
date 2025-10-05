package com.studentManagementApp.service;

import com.studentManagementApp.entity.Attendance;
import com.studentManagementApp.mapper.MapperUtilImpl;
import com.studentManagementApp.repo.AttendanceRepository;
import dto.AttendanceDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class AttendanceService {
    @Autowired
    private AttendanceRepository attendanceRepository;

    @Autowired
    MapperUtilImpl mapperUtil;

    public List<AttendanceDto> getAttendanceForStudent(Long studentId, int year, int month) {
        LocalDate startDate = LocalDate.of(year, month, 1);
        LocalDate endDate = startDate.withDayOfMonth(startDate.lengthOfMonth());

        return attendanceRepository.findByStudentIdAndDateBetween(studentId, startDate, endDate).stream().map(mapperUtil::toDto).toList();
    }

    public List<AttendanceDto> saveAttendance(List<AttendanceDto> attendanceList) {
        List<Attendance> attendance = attendanceList.stream().map(mapperUtil::toEntity).toList();
        return attendanceRepository.saveAll(attendance).stream().map(mapperUtil::toDto).toList();
    }

}
