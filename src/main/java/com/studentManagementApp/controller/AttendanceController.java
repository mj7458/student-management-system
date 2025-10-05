package com.studentManagementApp.controller;

import api.AttendanceApi;
import com.studentManagementApp.service.AttendanceService;
import dto.AttendanceDto;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
public class AttendanceController implements AttendanceApi {
    @Autowired
    private AttendanceService attendanceService;


    @Override
    public ResponseEntity<List<AttendanceDto>> getAttendance(Long studentId, Integer year, Integer month) {
        List<AttendanceDto> list = attendanceService.getAttendanceForStudent(studentId, year, month);
        log.info(list.toString());
        return ResponseEntity.ok(list);
    }

    @Override
    public ResponseEntity<List<AttendanceDto>> saveAttendance(List<@Valid AttendanceDto> attendanceDto) {
        List<AttendanceDto> list = attendanceService.saveAttendance(attendanceDto);
        log.info(list.toString());
        return ResponseEntity.ok(list);
    }

}
