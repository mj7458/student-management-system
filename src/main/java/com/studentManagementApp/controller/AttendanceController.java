package com.studentManagementApp.controller;

import com.studentManagementApp.entity.Attendance;
import com.studentManagementApp.mapper.AttendanceMapper;
import com.studentManagementApp.service.AttendanceService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.openapitools.api.AttendanceApi;
import org.openapitools.model.AttendanceDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
public class AttendanceController implements AttendanceApi {
    @Autowired
    private AttendanceService attendanceService;

    @Autowired
    AttendanceMapper attendanceMapper;

    @Override
    public ResponseEntity<List<AttendanceDto>> getAttendance(Long studentId, Integer year, Integer month) {
        return ResponseEntity.ok(attendanceService.getAttendanceForStudent(studentId, year, month));
    }

    @Override
    public ResponseEntity<List<AttendanceDto>> saveAttendance(List<@Valid AttendanceDto> attendanceDto) {
        List<Attendance> attendanceList = attendanceDto.stream().map(attendanceMapper::toEntity).toList();
        return ResponseEntity.ok(attendanceService.markAttendance(attendanceList));
    }

}
